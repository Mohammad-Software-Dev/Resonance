import { describe, expect, it } from "vitest";
import { asEntityId, asRevision, asTick } from "@resonance/game-data";
import { quantizeAxis } from "./input";
import { ReplayRecorder, deserializeSimInput, parseReplayArtifact } from "./replay";
import type { SimSnapshot } from "./state";

const initialSnapshot: SimSnapshot = {
  tick: asTick(0),
  wayfarers: [{
    entityId: asEntityId(1),
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    up: { x: 0, y: 1, z: 0 },
    facing: 1,
    movementMode: "airborne",
    grounded: false,
    groundEntityId: 0,
    coyoteTicksRemaining: 0,
    jumpBufferTicksRemaining: 0,
    evadeTicksRemaining: 0,
    repelRecoveryTicksRemaining: 0,
    attractTargetId: 0,
    stateRevision: asRevision(0),
  }],
};

describe("ReplayRecorder", () => {
  it("records fixed-step inputs and checkpoints as JSON-safe data", () => {
    const recorder = new ReplayRecorder({
      buildId: "test",
      fixture: { id: "fixture", version: 1 },
      initialSeed: 7,
      checkpointIntervalTicks: 30,
      initialSnapshot,
    });
    recorder.recordInput({
      tick: asTick(1),
      moveX: quantizeAxis(0.5),
      moveY: quantizeAxis(0),
      jumpPressed: true,
      jumpHeld: true,
      evadePressed: false,
      attractPressed: false,
      repelPressed: false,
      targetId: 0,
    });
    recorder.recordCheckpoint(asTick(1), "abcd", { grounded: false });

    const artifact = parseReplayArtifact(
      JSON.parse(JSON.stringify(recorder.artifact())),
    );
    expect(artifact.inputs).toHaveLength(1);
    expect(deserializeSimInput(artifact.inputs[0]!).jumpPressed).toBe(true);
    expect(artifact.checkpoints[0]?.hash).toBe("abcd");
  });

  it("rejects discontinuous input ticks", () => {
    const recorder = new ReplayRecorder({
      buildId: "test",
      fixture: { id: "fixture", version: 1 },
      initialSeed: 0,
      checkpointIntervalTicks: 30,
      initialSnapshot,
    });
    expect(() => recorder.recordInput({
      tick: asTick(2),
      moveX: quantizeAxis(0),
      moveY: quantizeAxis(0),
      jumpPressed: false,
      jumpHeld: false,
      evadePressed: false,
      attractPressed: false,
      repelPressed: false,
      targetId: 0,
    })).toThrow(/expected tick 1/);
  });
});
