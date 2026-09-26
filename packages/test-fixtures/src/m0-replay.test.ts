import { describe, expect, it } from "vitest";
import {
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

  it("matches at every approved render cadence", async () => {
    const artifact = await generateCanonicalM0Replay("test");
    const results = await verifyM0ReplayRenderMatrix(artifact);
    expect(results.map((result) => result.renderFps)).toEqual([30, 45, 60, 90, 120, 144]);
    expect(results.every((result) => result.ok)).toBe(true);
    expect(new Set(results.map((result) => result.finalHash)).size).toBe(1);
  });
});
