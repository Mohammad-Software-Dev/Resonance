import { describe, expect, it } from "vitest";
import {
  M0_ATTRACT_CONFIG,
  M0_MOVEMENT_CONFIG,
  M0_REPEL_CONFIG,
  asAuthoredTargetGuid,
  asEntityId,
  asRevision,
  asTargetId,
  type ResonanceTargetState,
} from "@resonance/game-data";
import {
  applyMovementCollision,
  cancelAttract,
  createAttractRuntimeState,
  createInitialMovementState,
  createRepelRuntimeState,
  stepAttract,
  stepMovement,
  stepRepel,
  stepRepelRecovery,
} from "@resonance/movement";
import { FixedStepClock } from "@resonance/simulation";
import { RapierCharacterWorld } from "./character";

const FLOOR = asEntityId(501);
const LEFT_WALL = asEntityId(502);
const RIGHT_WALL = asEntityId(503);

function q(value: number): number {
  return Math.round(value * 1_000_000);
}

function target(id: number, x: number, y: number): ResonanceTargetState {
  return {
    id: asTargetId(id),
    guid: asAuthoredTargetGuid(`repel-fixture-${id}`),
    entityId: asEntityId(600 + id),
    position: { x, y, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    active: true,
    attractable: true,
    repelable: true,
    anchored: true,
    massClass: "fixed",
    priority: 0,
    designerBias: 0,
    revision: asRevision(0),
  };
}

async function fixture(start = { x: -4, y: 2.2, z: 0 }) {
  const physics = await RapierCharacterWorld.create();
  physics.addStaticBox(FLOOR, { x: 0, y: -0.25, z: 0 }, { x: 8, y: 0.25, z: 1 });
  physics.addStaticBox(LEFT_WALL, { x: -8, y: 2, z: 0 }, { x: 0.15, y: 2, z: 1 });
  physics.addStaticBox(RIGHT_WALL, { x: 8, y: 2, z: 0 }, { x: 0.15, y: 2, z: 1 });
  physics.createCharacter(start);
  const state = createInitialMovementState();
  state.position = { ...start };
  return { physics, state };
}

async function runComboTrace(renderFps: number): Promise<string> {
  const { physics, state } = await fixture();
  const clock = new FixedStepClock();
  const attract = createAttractRuntimeState();
  const repel = createRepelRuntimeState();
  const anchor = target(21, 3.5, 4.2);

  for (let frame = 0; frame < renderFps * 6; frame += 1) {
    for (const fixed of clock.advance(1 / renderFps)) {
      const tick = Number(fixed.tick);
      let desiredTranslation;

      if (tick >= 35 && tick < 120) {
        desiredTranslation = stepAttract(
          state,
          attract,
          anchor,
          tick < 80 ? 0.25 : -0.15,
          M0_ATTRACT_CONFIG,
        ).desiredTranslation;
      } else if (tick === 120) {
        cancelAttract(state, attract, "repel");
        desiredTranslation = stepRepel(
          state,
          repel,
          anchor,
          M0_REPEL_CONFIG,
        ).desiredTranslation;
      } else if (state.repelRecoveryTicksRemaining > 0) {
        desiredTranslation = stepRepelRecovery(
          state,
          repel,
          tick < 126 ? -0.6 : 0.2,
          M0_MOVEMENT_CONFIG,
          M0_REPEL_CONFIG,
        ).desiredTranslation;
      } else {
        desiredTranslation = stepMovement(
          state,
          {
            moveX: tick < 240 ? -0.3 : 0.2,
            jumpPressed: false,
            jumpHeld: false,
            evadePressed: false,
          },
          { grounded: state.grounded, groundEntityId: state.groundEntityId },
          M0_MOVEMENT_CONFIG,
        ).desiredTranslation;
      }

      const collision = physics.moveCharacter(
        desiredTranslation,
        state.groundEntityId,
        state.up,
      );
      applyMovementCollision(state, collision);
    }
  }

  const signature = [
    q(state.position.x), q(state.position.y), q(state.position.z),
    q(state.velocity.x), q(state.velocity.y),
    state.grounded ? 1 : 0,
    Number(state.groundEntityId),
    state.movementMode,
    state.repelRecoveryTicksRemaining,
    repel.uses,
  ].join(":");
  physics.free();
  return signature;
}

describe("Repel + Rapier integration", () => {
  it("gains meaningful height from a low anchor", async () => {
    const { physics, state } = await fixture({ x: 0, y: 1.2, z: 0 });
    const repel = createRepelRuntimeState();
    const low = target(22, 0, 0.2);
    let maxY = state.position.y;

    let desired = stepRepel(state, repel, low, M0_REPEL_CONFIG).desiredTranslation;
    for (let tick = 0; tick < 60; tick += 1) {
      const collision = physics.moveCharacter(desired, state.groundEntityId, state.up);
      applyMovementCollision(state, collision);
      maxY = Math.max(maxY, state.position.y);

      desired = state.repelRecoveryTicksRemaining > 0
        ? stepRepelRecovery(state, repel, 0, M0_MOVEMENT_CONFIG, M0_REPEL_CONFIG).desiredTranslation
        : stepMovement(
            state,
            { moveX: 0, jumpPressed: false, jumpHeld: false, evadePressed: false },
            { grounded: state.grounded, groundEntityId: state.groundEntityId },
            M0_MOVEMENT_CONFIG,
          ).desiredTranslation;
    }

    expect(maxY).toBeGreaterThan(3.5);
    physics.free();
  });

  it("launches away from a wall anchor without penetrating the wall", async () => {
    const { physics, state } = await fixture({ x: 6.5, y: 2.1, z: 0 });
    const repel = createRepelRuntimeState();
    const wallAnchor = target(23, 7.3, 2.1);
    const startX = state.position.x;

    let desired = stepRepel(state, repel, wallAnchor, M0_REPEL_CONFIG).desiredTranslation;
    for (let tick = 0; tick < 20; tick += 1) {
      const collision = physics.moveCharacter(desired, state.groundEntityId, state.up);
      applyMovementCollision(state, collision);
      desired = state.repelRecoveryTicksRemaining > 0
        ? stepRepelRecovery(state, repel, -0.2, M0_MOVEMENT_CONFIG, M0_REPEL_CONFIG).desiredTranslation
        : { x: 0, y: 0, z: 0 };
    }

    expect(state.position.x).toBeLessThan(startX - 1);
    expect(state.position.x).toBeLessThan(7.5);
    physics.free();
  });

  it("resolves a downward Repel against ground and ends recovery", async () => {
    const { physics, state } = await fixture({ x: 0, y: 1.05, z: 0 });
    const repel = createRepelRuntimeState();
    const overhead = target(24, 0, 3.5);

    const launch = stepRepel(state, repel, overhead, M0_REPEL_CONFIG);
    for (let tick = 0; tick < 30 && !state.grounded; tick += 1) {
      const desired = tick === 0
        ? launch.desiredTranslation
        : stepRepelRecovery(state, repel, 0, M0_MOVEMENT_CONFIG, M0_REPEL_CONFIG).desiredTranslation;
      const collision = physics.moveCharacter(desired, state.groundEntityId, state.up);
      applyMovementCollision(state, collision);
    }

    expect(state.position.y).toBeGreaterThanOrEqual(0.89);
    expect(state.grounded).toBe(true);
    expect(state.repelRecoveryTicksRemaining).toBe(0);
    expect(state.movementMode).toBe("grounded");
    physics.free();
  });

  it("replays Attract to Repel identically across approved render cadences", async () => {
    const signatures = await Promise.all([30, 45, 60, 90, 120, 144].map(runComboTrace));
    expect(new Set(signatures).size).toBe(1);
  });
});
