import { describe, expect, it } from "vitest";
import {
  M0_ATTRACT_CONFIG,
  asAuthoredTargetGuid,
  asEntityId,
  asRevision,
  asTargetId,
  type ResonanceTargetState,
} from "@resonance/game-data";
import { createInitialMovementState } from "./controller";
import {
  cancelAttract,
  createAttractRuntimeState,
  recordAttractCollision,
  stepAttract,
} from "./attract";

function target(x: number, y: number, revision = 0): ResonanceTargetState {
  return {
    id: asTargetId(7),
    guid: asAuthoredTargetGuid("test-anchor"),
    entityId: asEntityId(77),
    position: { x, y, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    active: true,
    attractable: true,
    repelable: true,
    anchored: true,
    massClass: "fixed",
    priority: 0,
    designerBias: 0,
    revision: asRevision(revision),
  };
}

describe("Attract movement kernel", () => {
  it("accelerates toward a static target and clamps authored maximum speed", () => {
    const state = createInitialMovementState();
    const runtime = createAttractRuntimeState();
    const anchor = target(8, 4);

    for (let tick = 0; tick < 180; tick += 1) {
      stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);
    }

    expect(state.velocity.x).toBeGreaterThan(0);
    expect(state.velocity.y).toBeGreaterThan(0);
    expect(Math.hypot(state.velocity.x, state.velocity.y)).toBeLessThanOrEqual(
      M0_ATTRACT_CONFIG.maxSpeed + 1e-9,
    );
    expect(state.movementMode).toBe("attract");
  });

  it("adds bounded tangential steering without replacing radial pull", () => {
    const neutralState = createInitialMovementState();
    const steerState = createInitialMovementState();
    const neutralRuntime = createAttractRuntimeState();
    const steerRuntime = createAttractRuntimeState();
    const anchor = target(8, 0);

    stepAttract(neutralState, neutralRuntime, anchor, 0, M0_ATTRACT_CONFIG);
    stepAttract(steerState, steerRuntime, anchor, 1, M0_ATTRACT_CONFIG);

    expect(steerState.velocity.x).toBeCloseTo(neutralState.velocity.x, 8);
    expect(steerState.velocity.y).toBeGreaterThan(neutralState.velocity.y);
  });

  it("tracks the target fixed-tick position without changing target identity", () => {
    const state = createInitialMovementState();
    const runtime = createAttractRuntimeState();
    const anchor = target(5, 0);

    stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);
    const firstY = state.velocity.y;
    anchor.position = { x: 5, y: 4, z: 0 };
    stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);

    expect(runtime.targetId).toBe(anchor.id);
    expect(state.velocity.y).toBeGreaterThan(firstY);
  });

  it("preserves release momentum and emits an explicit release event", () => {
    const state = createInitialMovementState();
    const runtime = createAttractRuntimeState();
    stepAttract(state, runtime, target(6, 2), 0, M0_ATTRACT_CONFIG);
    const velocity = { ...state.velocity };

    const event = cancelAttract(state, runtime, "released");

    expect(event).toMatchObject({ type: "cancelled", reason: "released" });
    expect(state.velocity).toEqual(velocity);
    expect(runtime.targetId).toBe(0);
  });

  it("cancels when semantic target revision changes", () => {
    const state = createInitialMovementState();
    const runtime = createAttractRuntimeState();
    stepAttract(state, runtime, target(6, 0, 1), 0, M0_ATTRACT_CONFIG);

    const result = stepAttract(state, runtime, target(6, 0, 2), 0, M0_ATTRACT_CONFIG);

    expect(result.event).toMatchObject({ type: "cancelled", reason: "target-revision" });
    expect(runtime.targetId).toBe(0);
  });

  it("cancels only after the authored consecutive collision threshold", () => {
    const state = createInitialMovementState();
    const runtime = createAttractRuntimeState();
    stepAttract(state, runtime, target(6, 0), 0, M0_ATTRACT_CONFIG);

    for (let tick = 1; tick < M0_ATTRACT_CONFIG.collisionCancelTicks; tick += 1) {
      expect(recordAttractCollision(state, runtime, true, M0_ATTRACT_CONFIG)).toBeNull();
    }

    expect(recordAttractCollision(state, runtime, true, M0_ATTRACT_CONFIG)).toMatchObject({
      type: "cancelled",
      reason: "blocked",
    });
  });

  it("requires button release before restarting after a hard cancel", () => {
    const state = createInitialMovementState();
    const runtime = createAttractRuntimeState();
    const anchor = target(6, 0);
    stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);

    for (let tick = 0; tick < M0_ATTRACT_CONFIG.collisionCancelTicks; tick += 1) {
      recordAttractCollision(state, runtime, true, M0_ATTRACT_CONFIG);
    }

    expect(runtime.requiresRelease).toBe(true);
    const held = stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);
    expect(held.event).toBeNull();
    expect(runtime.targetId).toBe(0);

    cancelAttract(state, runtime, "released");
    const restarted = stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);
    expect(restarted.event?.type).toBe("started");
    expect(runtime.requiresRelease).toBe(false);
  });

  it("emits arrival once when entering the authored arrival radius", () => {
    const state = createInitialMovementState();
    state.position = { x: 0.3, y: 0, z: 0 };
    const runtime = createAttractRuntimeState();
    const anchor = target(0, 0);

    const first = stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);
    const second = stepAttract(state, runtime, anchor, 0, M0_ATTRACT_CONFIG);

    expect(first.event?.type).toBe("arrived");
    expect(second.event).toBeNull();
  });
});
