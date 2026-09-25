import { describe, expect, it } from "vitest";
import {
  M0_ATTRACT_CONFIG,
  M0_MOVEMENT_CONFIG,
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
  recordAttractCollision,
  stepAttract,
  stepMovement,
} from "@resonance/movement";
import { FixedStepClock } from "@resonance/simulation";
import { RapierCharacterWorld } from "./character";

const FLOOR = asEntityId(401);
const PILLAR = asEntityId(402);

function q(value: number): number {
  return Math.round(value * 1_000_000);
}

function movingTarget(tick: number): ResonanceTargetState {
  const period = 180;
  const phase = (tick % period) / period;
  const triangle = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
  return {
    id: asTargetId(9),
    guid: asAuthoredTargetGuid("replay-moving-anchor"),
    entityId: asEntityId(409),
    position: { x: 4.5, y: 3.2 + triangle * 2.2, z: 0 },
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

async function runAttractTrace(renderFps: number): Promise<string> {
  const clock = new FixedStepClock();
  const physics = await RapierCharacterWorld.create();
  physics.addStaticBox(FLOOR, { x: 0, y: -0.25, z: 0 }, { x: 9, y: 0.25, z: 1 });
  physics.addStaticBox(PILLAR, { x: 0.5, y: 1.2, z: 0 }, { x: 0.35, y: 1.2, z: 1 });

  const state = createInitialMovementState();
  state.position = { x: -4.5, y: 2.2, z: 0 };
  physics.createCharacter(state.position);
  const attract = createAttractRuntimeState();
  let cancelReason = "-";

  for (let frame = 0; frame < renderFps * 7; frame += 1) {
    for (const fixed of clock.advance(1 / renderFps)) {
      const tick = Number(fixed.tick);
      const held = tick >= 45 && tick < 300;
      const target = movingTarget(tick);
      let desiredTranslation;

      if (held && !attract.requiresRelease) {
        const pull = stepAttract(
          state,
          attract,
          target,
          tick < 170 ? 0.65 : -0.25,
          M0_ATTRACT_CONFIG,
        );
        desiredTranslation = pull.desiredTranslation;
        if (pull.event?.type === "cancelled") cancelReason = pull.event.reason;
      } else {
        if (!held && (attract.targetId !== 0 || attract.requiresRelease)) {
          const event = cancelAttract(state, attract, "released");
          if (event?.type === "cancelled") cancelReason = event.reason;
        }
        desiredTranslation = stepMovement(
          state,
          { moveX: tick < 360 ? 0.35 : -0.2, jumpPressed: false, jumpHeld: false, evadePressed: false },
          { grounded: state.grounded, groundEntityId: state.groundEntityId },
          M0_MOVEMENT_CONFIG,
        ).desiredTranslation;
      }

      const collision = physics.moveCharacter(desiredTranslation, state.groundEntityId, state.up);
      applyMovementCollision(state, collision);

      if (attract.targetId !== 0) {
        const event = recordAttractCollision(
          state,
          attract,
          collision.blockedX
            || collision.hitCeiling
            || (collision.grounded && desiredTranslation.y < -0.01),
          M0_ATTRACT_CONFIG,
        );
        if (event?.type === "cancelled") cancelReason = event.reason;
      }
    }
  }

  const signature = [
    q(state.position.x), q(state.position.y), q(state.position.z),
    q(state.velocity.x), q(state.velocity.y),
    state.grounded ? 1 : 0,
    Number(state.groundEntityId),
    state.movementMode,
    Number(attract.targetId),
    attract.requiresRelease ? 1 : 0,
    cancelReason,
  ].join(":");
  physics.free();
  return signature;
}

describe("Attract + Rapier deterministic replay", () => {
  it("does not tunnel through thin authored collision while pulling", async () => {
    const physics = await RapierCharacterWorld.create();
    physics.addStaticBox(FLOOR, { x: 0, y: -0.25, z: 0 }, { x: 8, y: 0.25, z: 1 });
    physics.addStaticBox(PILLAR, { x: 1, y: 1.5, z: 0 }, { x: 0.06, y: 1.5, z: 1 });

    const state = createInitialMovementState();
    state.position = { x: -2, y: 1.5, z: 0 };
    physics.createCharacter(state.position);
    const runtime = createAttractRuntimeState();
    const anchor = movingTarget(0);
    anchor.position = { x: 5, y: 1.5, z: 0 };

    for (let tick = 0; tick < 120 && !runtime.requiresRelease; tick += 1) {
      const pull = stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);
      const collision = physics.moveCharacter(pull.desiredTranslation, state.groundEntityId, state.up);
      applyMovementCollision(state, collision);
      recordAttractCollision(
        state,
        runtime,
        collision.blockedX
          || collision.hitCeiling
          || (collision.grounded && pull.desiredTranslation.y < -0.01),
        M0_ATTRACT_CONFIG,
      );
    }

    expect(state.position.x).toBeLessThan(0.7);
    expect(runtime.requiresRelease).toBe(true);
    physics.free();
  });

  it("ends identically across approved render cadences", async () => {
    const signatures = await Promise.all([30, 45, 60, 90, 120, 144].map(runAttractTrace));
    expect(new Set(signatures).size).toBe(1);
  });
});
