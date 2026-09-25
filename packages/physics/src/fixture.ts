import type RAPIER from "@dimforge/rapier3d-deterministic";
import { SIM_DT_SECONDS } from "@resonance/game-data";
import { initializePhysics } from "./index";

export interface PhysicsFixtureResult {
  readonly tickCount: number;
  readonly position: { x: number; y: number; z: number };
  readonly velocity: { x: number; y: number; z: number };
  readonly hash: string;
}

function quantize(value: number): number {
  return Math.round(value * 1_000_000);
}

function hashValues(values: readonly number[]): string {
  let hash = 0x811c9dc5;
  for (const value of values) {
    let data = value | 0;
    for (let byte = 0; byte < 4; byte += 1) {
      hash ^= data & 0xff;
      hash = Math.imul(hash, 0x01000193) >>> 0;
      data >>= 8;
    }
  }
  return hash.toString(16).padStart(8, "0");
}

export async function runPhysicsDeterminismFixture(tickCount = 600): Promise<PhysicsFixtureResult> {
  const rapier = await initializePhysics();
  const world = new rapier.World({ x: 0, y: -9.81, z: 0 });
  world.timestep = SIM_DT_SECONDS;

  world.createCollider(
    rapier.ColliderDesc.cuboid(10, 0.1, 4)
      .setTranslation(0, -0.1, 0)
      .setFriction(0.8),
  );

  const body = world.createRigidBody(
    rapier.RigidBodyDesc.dynamic()
      .setTranslation(0, 4, 0)
      .setLinvel(1.25, 0, 0)
      .setCanSleep(false),
  );
  world.createCollider(rapier.ColliderDesc.capsule(0.5, 0.25).setFriction(0.6), body);

  for (let tick = 0; tick < tickCount; tick += 1) world.step();

  const position = body.translation();
  const velocity = body.linvel();
  const result = {
    tickCount,
    position: { x: position.x, y: position.y, z: position.z },
    velocity: { x: velocity.x, y: velocity.y, z: velocity.z },
    hash: hashValues([
      tickCount,
      quantize(position.x), quantize(position.y), quantize(position.z),
      quantize(velocity.x), quantize(velocity.y), quantize(velocity.z),
    ]),
  };

  world.free();
  return result;
}

export type RapierModule = typeof RAPIER;
