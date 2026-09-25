import { describe, expect, it } from "vitest";
import { M0_MOVEMENT_CONFIG, asEntityId } from "@resonance/game-data";
import {
  applyMovementCollision,
  createInitialMovementState,
  stepMovement,
} from "@resonance/movement";
import { FixedStepClock } from "@resonance/simulation";
import { RapierCharacterWorld } from "./character";

const FLOOR = asEntityId(201);
const WALL = asEntityId(202);

function q(value: number): number {
  return Math.round(value * 1_000_000);
}

async function runControllerTrace(renderFps: number): Promise<string> {
  const clock = new FixedStepClock();
  const physics = await RapierCharacterWorld.create();
  physics.addStaticBox(FLOOR, { x: 0, y: -0.25, z: 0 }, { x: 8, y: 0.25, z: 1 });
  physics.addStaticBox(WALL, { x: 6.5, y: 1.5, z: 0 }, { x: 0.15, y: 1.5, z: 1 });

  const state = createInitialMovementState();
  state.position = { x: -4, y: 2.2, z: 0 };
  physics.createCharacter(state.position);

  for (let frame = 0; frame < renderFps * 6; frame += 1) {
    for (const step of clock.advance(1 / renderFps)) {
      const tick = Number(step.tick);
      const previousGround = state.groundEntityId;
      const jumpPressed = tick === 90 || tick === 210;
      const jumpHeld = (tick >= 90 && tick < 102) || (tick >= 210 && tick < 218);
      const evadePressed = tick === 150;
      const moveX = tick < 260 ? 1 : tick < 320 ? -1 : 0;

      const movement = stepMovement(
        state,
        { moveX, jumpPressed, jumpHeld, evadePressed },
        { grounded: state.grounded, groundEntityId: state.groundEntityId },
        M0_MOVEMENT_CONFIG,
      );
      const collision = physics.moveCharacter(movement.desiredTranslation, previousGround, state.up);
      applyMovementCollision(state, collision);
    }
  }

  const signature = [
    q(state.position.x), q(state.position.y), q(state.position.z),
    q(state.velocity.x), q(state.velocity.y),
    state.grounded ? 1 : 0,
    Number(state.groundEntityId),
    state.facing,
    state.movementMode,
  ].join(":");
  physics.free();
  return signature;
}

describe("Wayfarer controller deterministic replay", () => {
  it("ends identically across approved render cadences", async () => {
    const signatures = await Promise.all([30, 45, 60, 90, 120, 144].map(runControllerTrace));
    expect(new Set(signatures).size).toBe(1);
  });
});
