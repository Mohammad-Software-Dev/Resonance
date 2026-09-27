import { asEntityId, asTick } from "@resonance/game-data";
import { describe, expect, it } from "vitest";
import {
  M0ReplayRuntime,
  canonicalM0Input,
  generateCanonicalM0Replay,
  verifyM0Replay,
  verifyM0ReplayRenderMatrix,
} from "./index";

describe("M0 replay harness", () => {
  it("replays the generated canonical artifact exactly", async () => {
    const artifact = await generateCanonicalM0Replay("test");
    const result = await verifyM0Replay(artifact);
    expect(result.ok).toBe(true);
    expect(result.finalHash).toBe(artifact.finalHash);
    expect(result.checkpoints).toHaveLength(artifact.checkpoints.length);
  });

  it("finds the first divergent checkpoint with diagnostic context", async () => {
    const artifact = await generateCanonicalM0Replay("test");
    const checkpoints = artifact.checkpoints.map((checkpoint, index) => (
      index === 2 ? { ...checkpoint, hash: "deadbeef" } : checkpoint
    ));
    const result = await verifyM0Replay({ ...artifact, checkpoints });
    expect(result.ok).toBe(false);
    expect(result.divergence?.tick).toBe(checkpoints[2]?.tick);
    expect(result.divergence?.actualTelemetry.simulationHash).toBeTypeOf("string");
    expect(result.divergence?.input.tick).toBe(result.divergence?.tick);
  });

  it("restores moving-platform phase for a nonzero replay start tick", async () => {
    const artifact = await generateCanonicalM0Replay("test");
    const wayfarer = artifact.initialSnapshot.wayfarers[0];
    expect(wayfarer).toBeDefined();
    if (!wayfarer) return;

    const startTick = 60;
    const runtime = await M0ReplayRuntime.create({
      ...artifact,
      initialSnapshot: {
        tick: asTick(startTick),
        wayfarers: [{
          ...wayfarer,
          grounded: true,
          groundEntityId: asEntityId(104),
        }],
      },
      inputs: [],
      checkpoints: [],
      finalHash: "",
    });

    try {
      const step = runtime.step(canonicalM0Input(startTick + 1));
      expect(step.collision.platformTranslation.x).toBeCloseTo(0.025, 6);
      expect(step.collision.platformTranslation.y).toBeCloseTo(0, 6);
    } finally {
      runtime.free();
    }
  });

  it("traverses the authored v2 course through the relay approach and exercises Resonance", async () => {
    const artifact = await generateCanonicalM0Replay("test");
    const runtime = await M0ReplayRuntime.create(artifact);
    let sawFirstBreach = false;
    let sawRelayApproach = false;
    let sawAttract = false;
    let sawRepel = false;
    let maxX = Number.NEGATIVE_INFINITY;

    try {
      for (let tick = 1; tick <= artifact.inputs.length; tick += 1) {
        const step = runtime.step(canonicalM0Input(tick));
        const x = Number(step.telemetry.positionX);
        maxX = Math.max(maxX, x);
        if (x > -3.3 && x < -1.6) sawFirstBreach = true;
        if (x > 6.25) sawRelayApproach = true;
        if (Number(step.telemetry.attractTargetId) !== 0) sawAttract = true;
        if (Number(step.telemetry.repelUses) > 0) sawRepel = true;
      }
    } finally {
      runtime.free();
    }

    expect(sawFirstBreach).toBe(true);
    expect(sawRelayApproach, `canonical max x was ${maxX}`).toBe(true);
    expect(sawAttract).toBe(true);
    expect(sawRepel).toBe(true);
  });

  it("matches at every approved render cadence", async () => {
    const artifact = await generateCanonicalM0Replay("test");
    const results = await verifyM0ReplayRenderMatrix(artifact);
    expect(results.map((result) => result.renderFps)).toEqual([30, 45, 60, 90, 120, 144]);
    expect(results.every((result) => result.ok)).toBe(true);
    expect(new Set(results.map((result) => result.finalHash)).size).toBe(1);
  });
});
