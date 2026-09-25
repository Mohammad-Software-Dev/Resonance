import { describe, expect, it } from "vitest";
import {
  M0_MOVEMENT_CONFIG,
  M0_REPEL_CONFIG,
  asAuthoredTargetGuid,
  asEntityId,
  asRevision,
  asTargetId,
  type ResonanceTargetState,
} from "@resonance/game-data";
import { createInitialMovementState } from "./controller";
import {
  createRepelRuntimeState,
  stepRepel,
  stepRepelRecovery,
} from "./repel";

function target(x: number, y: number): ResonanceTargetState {
  return {
    id: asTargetId(17),
    guid: asAuthoredTargetGuid("repel-anchor"),
    entityId: asEntityId(117),
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

describe("Repel movement kernel", () => {
  it("launches directly away from the target", () => {
    const state = createInitialMovementState();
    state.position = { x: 2, y: 1, z: 0 };
    const runtime = createRepelRuntimeState();

    const result = stepRepel(state, runtime, target(0, 1), M0_REPEL_CONFIG);

    expect(result.applied).toBe(true);
    expect(state.velocity.x).toBeGreaterThan(0);
    expect(state.velocity.y).toBeCloseTo(0, 8);
    expect(state.movementMode).toBe("repelRecovery");
    expect(state.repelRecoveryTicksRemaining).toBe(M0_REPEL_CONFIG.recoveryTicks);
  });

  it("replaces inward radial velocity instead of amplifying it", () => {
    const state = createInitialMovementState();
    state.position = { x: 2, y: 0, z: 0 };
    state.velocity = { x: -9, y: 3, z: 0 };
    const runtime = createRepelRuntimeState();

    const result = stepRepel(state, runtime, target(0, 0), M0_REPEL_CONFIG);

    expect(result.radialSpeedBefore).toBe(-9);
    expect(result.radialSpeedAfter).toBeGreaterThan(0);
    expect(state.velocity.x).toBeGreaterThan(0);
  });

  it("preserves authored tangential momentum while adding outward launch", () => {
    const state = createInitialMovementState();
    state.position = { x: 2, y: 0, z: 0 };
    state.velocity = { x: 0, y: 6, z: 0 };
    const runtime = createRepelRuntimeState();

    stepRepel(state, runtime, target(0, 0), M0_REPEL_CONFIG);

    expect(state.velocity.y).toBeCloseTo(6 * M0_REPEL_CONFIG.tangentialPreservation, 8);
    expect(state.velocity.x).toBeGreaterThan(0);
  });

  it("caps the resulting launch speed", () => {
    const state = createInitialMovementState();
    state.position = { x: 1, y: 0, z: 0 };
    state.velocity = { x: 40, y: 40, z: 0 };
    const runtime = createRepelRuntimeState();

    stepRepel(state, runtime, target(0, 0), M0_REPEL_CONFIG);

    expect(Math.hypot(state.velocity.x, state.velocity.y))
      .toBeLessThanOrEqual(M0_REPEL_CONFIG.maxResultingSpeed + 1e-9);
  });

  it("launches upward from a low anchor", () => {
    const state = createInitialMovementState();
    state.position = { x: 0, y: 1.8, z: 0 };
    const runtime = createRepelRuntimeState();

    stepRepel(state, runtime, target(0, 0), M0_REPEL_CONFIG);

    expect(state.velocity.y).toBeGreaterThan(10);
  });

  it("provides bounded steering during deterministic recovery", () => {
    const state = createInitialMovementState();
    state.position = { x: 0, y: 2, z: 0 };
    const runtime = createRepelRuntimeState();
    stepRepel(state, runtime, target(0, 0), M0_REPEL_CONFIG);
    const beforeX = state.velocity.x;

    for (let tick = 0; tick < M0_REPEL_CONFIG.recoveryTicks; tick += 1) {
      stepRepelRecovery(state, runtime, 1, M0_MOVEMENT_CONFIG, M0_REPEL_CONFIG);
    }

    expect(state.velocity.x).toBeGreaterThan(beforeX);
    expect(state.repelRecoveryTicksRemaining).toBe(0);
    expect(state.movementMode).toBe("airborne");
  });

  it("rejects repeated Repel while recovery is active", () => {
    const state = createInitialMovementState();
    state.position = { x: 2, y: 0, z: 0 };
    const runtime = createRepelRuntimeState();
    const anchor = target(0, 0);

    expect(stepRepel(state, runtime, anchor, M0_REPEL_CONFIG).applied).toBe(true);
    const repeated = stepRepel(state, runtime, anchor, M0_REPEL_CONFIG);

    expect(repeated.applied).toBe(false);
    expect(repeated.event).toMatchObject({ type: "rejected", reason: "recovery-active" });
  });
});
