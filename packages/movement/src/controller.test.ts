import { describe, expect, it } from "vitest";
import { M0_MOVEMENT_CONFIG, asEntityId } from "@resonance/game-data";
import { createInitialMovementState, stepMovement } from "./controller";

const GROUND = asEntityId(99);
const grounded = { grounded: true, groundEntityId: GROUND };
const airborne = { grounded: false, groundEntityId: 0 as const };
const neutral = { moveX: 0, jumpPressed: false, jumpHeld: false, evadePressed: false };

describe("Wayfarer movement kernel", () => {
  it("accelerates toward the authored ground speed cap", () => {
    const state = createInitialMovementState();
    for (let tick = 0; tick < 120; tick += 1) {
      stepMovement(state, { ...neutral, moveX: 1 }, grounded, M0_MOVEMENT_CONFIG);
    }
    expect(state.velocity.x).toBeCloseTo(M0_MOVEMENT_CONFIG.groundMaxSpeed, 6);
  });

  it("accepts a coyote jump within the configured grace window", () => {
    const state = createInitialMovementState();
    stepMovement(state, neutral, grounded, M0_MOVEMENT_CONFIG);

    for (let tick = 0; tick < M0_MOVEMENT_CONFIG.coyoteTicks - 1; tick += 1) {
      stepMovement(state, neutral, airborne, M0_MOVEMENT_CONFIG);
    }

    const result = stepMovement(
      state,
      { ...neutral, jumpPressed: true, jumpHeld: true },
      airborne,
      M0_MOVEMENT_CONFIG,
    );
    expect(result.jumped).toBe(true);
    expect(state.velocity.y).toBeGreaterThan(0);
  });

  it("buffers a jump shortly before landing", () => {
    const state = createInitialMovementState();
    stepMovement(
      state,
      { ...neutral, jumpPressed: true, jumpHeld: true },
      airborne,
      M0_MOVEMENT_CONFIG,
    );

    const result = stepMovement(
      state,
      { ...neutral, jumpHeld: true },
      grounded,
      M0_MOVEMENT_CONFIG,
    );
    expect(result.jumped).toBe(true);
  });

  it("cuts upward velocity when jump is released", () => {
    const state = createInitialMovementState();
    stepMovement(state, neutral, grounded, M0_MOVEMENT_CONFIG);
    stepMovement(
      state,
      { ...neutral, jumpPressed: true, jumpHeld: true },
      grounded,
      M0_MOVEMENT_CONFIG,
    );
    stepMovement(state, neutral, airborne, M0_MOVEMENT_CONFIG);
    expect(state.velocity.y).toBeLessThanOrEqual(M0_MOVEMENT_CONFIG.jumpCutVelocity);
  });

  it("uses a fixed-tick evade duration and authored facing", () => {
    const state = createInitialMovementState();
    state.facing = -1;

    const first = stepMovement(
      state,
      { ...neutral, evadePressed: true },
      grounded,
      M0_MOVEMENT_CONFIG,
    );
    expect(first.startedEvade).toBe(true);
    expect(state.velocity.x).toBe(-M0_MOVEMENT_CONFIG.evadeSpeed);

    for (let tick = 1; tick < M0_MOVEMENT_CONFIG.evadeDurationTicks; tick += 1) {
      stepMovement(state, neutral, grounded, M0_MOVEMENT_CONFIG);
    }
    expect(state.evadeTicksRemaining).toBe(0);
    expect(state.movementMode).toBe("grounded");
  });
});
