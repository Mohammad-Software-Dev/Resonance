import RAPIER from "@dimforge/rapier3d-deterministic-compat";
import { asEntityId, type EntityId, type Vec3 } from "@resonance/game-data";
import { initializePhysics } from "./index";

export interface CharacterPhysicsConfig {
  readonly capsuleHalfHeight: number;
  readonly capsuleRadius: number;
  readonly controllerOffset: number;
  readonly snapToGroundDistance: number;
  readonly maxSlopeClimbRadians: number;
  readonly minSlopeSlideRadians: number;
  readonly autostepMaxHeight: number;
  readonly autostepMinWidth: number;
  readonly gameplayLaneZ: number;
}

export const M0_CHARACTER_PHYSICS_CONFIG: CharacterPhysicsConfig = {
  capsuleHalfHeight: 0.55,
  capsuleRadius: 0.35,
  controllerOffset: 0.015,
  snapToGroundDistance: 0.12,
  maxSlopeClimbRadians: Math.PI * (50 / 180),
  minSlopeSlideRadians: Math.PI * (55 / 180),
  autostepMaxHeight: 0.22,
  autostepMinWidth: 0.18,
  gameplayLaneZ: 0,
};

export interface CharacterCollisionResult {
  readonly position: Vec3;
  readonly appliedTranslation: Vec3;
  readonly platformTranslation: Vec3;
  readonly grounded: boolean;
  readonly groundEntityId: EntityId | 0;
  readonly blockedX: boolean;
  readonly hitCeiling: boolean;
  readonly collisionCount: number;
  readonly maximumCorrection: number;
}

interface PlatformRecord {
  readonly entityId: EntityId;
  readonly collider: RAPIER.Collider;
  translationDelta: Vec3;
}

function add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function length(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z);
}

export class RapierCharacterWorld {
  readonly world: RAPIER.World;
  readonly config: CharacterPhysicsConfig;

  private readonly controller: RAPIER.KinematicCharacterController;
  private readonly colliderEntity = new Map<number, EntityId>();
  private readonly platforms = new Map<EntityId, PlatformRecord>();
  private character?: RAPIER.Collider;

  private constructor(
    world: RAPIER.World,
    controller: RAPIER.KinematicCharacterController,
    config: CharacterPhysicsConfig,
  ) {
    this.world = world;
    this.controller = controller;
    this.config = config;
  }

  static async create(
    config: CharacterPhysicsConfig = M0_CHARACTER_PHYSICS_CONFIG,
  ): Promise<RapierCharacterWorld> {
    const rapier = await initializePhysics();
    const world = new rapier.World({ x: 0, y: 0, z: 0 });
    const controller = world.createCharacterController(config.controllerOffset);
    controller.enableSnapToGround(config.snapToGroundDistance);
    controller.enableAutostep(config.autostepMaxHeight, config.autostepMinWidth, false);
    controller.setMaxSlopeClimbAngle(config.maxSlopeClimbRadians);
    controller.setMinSlopeSlideAngle(config.minSlopeSlideRadians);
    return new RapierCharacterWorld(world, controller, config);
  }

  createCharacter(position: Vec3): void {
    if (this.character) throw new Error("Character collider already exists.");
    this.character = this.world.createCollider(
      RAPIER.ColliderDesc.capsule(this.config.capsuleHalfHeight, this.config.capsuleRadius)
        .setTranslation(position.x, position.y, this.config.gameplayLaneZ),
    );
  }

  addStaticBox(
    entityId: EntityId,
    center: Vec3,
    halfExtents: Vec3,
    rotationZRadians = 0,
  ): void {
    const halfAngle = rotationZRadians * 0.5;
    const collider = this.world.createCollider(
      RAPIER.ColliderDesc.cuboid(halfExtents.x, halfExtents.y, halfExtents.z)
        .setTranslation(center.x, center.y, center.z)
        .setRotation({ w: Math.cos(halfAngle), x: 0, y: 0, z: Math.sin(halfAngle) }),
    );
    this.colliderEntity.set(collider.handle, entityId);
  }

  addMovingBox(entityId: EntityId, center: Vec3, halfExtents: Vec3): void {
    const collider = this.world.createCollider(
      RAPIER.ColliderDesc.cuboid(halfExtents.x, halfExtents.y, halfExtents.z)
        .setTranslation(center.x, center.y, center.z),
    );
    this.colliderEntity.set(collider.handle, entityId);
    this.platforms.set(entityId, {
      entityId,
      collider,
      translationDelta: { x: 0, y: 0, z: 0 },
    });
  }

  setMovingBoxPosition(entityId: EntityId, position: Vec3): void {
    const platform = this.platforms.get(entityId);
    if (!platform) throw new Error(`Unknown moving platform ${Number(entityId)}.`);
    const previous = platform.collider.translation();
    const next = { x: position.x, y: position.y, z: position.z };
    platform.translationDelta = sub(next, previous);
    platform.collider.setTranslation(next);
  }

  moveCharacter(desiredTranslation: Vec3, previousGroundEntityId: EntityId | 0): CharacterCollisionResult {
    const character = this.character;
    if (!character) throw new Error("Create the character before moving it.");

    const platformTranslation = previousGroundEntityId === 0
      ? { x: 0, y: 0, z: 0 }
      : this.platforms.get(previousGroundEntityId)?.translationDelta ?? { x: 0, y: 0, z: 0 };

    const current = character.translation();
    const laneCorrection = this.config.gameplayLaneZ - current.z;
    const desired = add(desiredTranslation, {
      x: platformTranslation.x,
      y: platformTranslation.y,
      z: laneCorrection,
    });

    this.controller.computeColliderMovement(
      character,
      desired,
      undefined,
      undefined,
      (collider) => collider.handle !== character.handle,
    );

    const computed = this.controller.computedMovement();
    const appliedTranslation = { x: computed.x, y: computed.y, z: computed.z };
    const nextPosition = {
      x: current.x + computed.x,
      y: current.y + computed.y,
      z: this.config.gameplayLaneZ,
    };
    character.setTranslation(nextPosition);

    let groundEntityId: EntityId | 0 = 0;
    let bestGroundDot = -Infinity;
    let hitCeiling = false;
    const collisionCount = this.controller.numComputedCollisions();
    const minimumGroundDot = Math.cos(this.config.maxSlopeClimbRadians);

    for (let index = 0; index < collisionCount; index += 1) {
      const collision = this.controller.computedCollision(index);
      const normal = collision.normal1;
      const groundDot = normal.y;
      if (groundDot >= minimumGroundDot && groundDot > bestGroundDot) {
        bestGroundDot = groundDot;
        groundEntityId = this.colliderEntity.get(collision.collider.handle) ?? asEntityId(0);
      }
      if (normal.y < -0.5) hitCeiling = true;
    }

    const grounded = this.controller.computedGrounded();
    if (!grounded) groundEntityId = 0;

    const correction = sub(desired, appliedTranslation);
    return {
      position: nextPosition,
      appliedTranslation,
      platformTranslation,
      grounded,
      groundEntityId,
      blockedX: Math.abs(correction.x) > 1e-5,
      hitCeiling,
      collisionCount,
      maximumCorrection: length(correction),
    };
  }

  getCharacterPosition(): Vec3 {
    const character = this.character;
    if (!character) throw new Error("Create the character before reading its position.");
    const p = character.translation();
    return { x: p.x, y: p.y, z: p.z };
  }

  free(): void {
    this.world.removeCharacterController(this.controller);
    this.world.free();
  }
}
