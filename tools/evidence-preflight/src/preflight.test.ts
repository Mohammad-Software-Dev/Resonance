import { describe, expect, it } from "vitest";
import {
  evaluatePerformanceCapture,
  parsePerformanceCapture,
  summarizeEvidence,
} from "./preflight";

const BUILD = "abc123";

function performance(overrides: Record<string, unknown> = {}) {
  return {
    schema: "resonance.m0.performance-capture.v1",
    buildId: BUILD,
    userAgent: "Mozilla/5.0 Chrome/153",
    backend: "webgpu",
    backendPreference: "webgpu",
    graphics: {
      preset: "medium",
      activeMeshes: 80,
      materials: 12,
      textures: 10,
    },
    performance: {
      runtimeShaderCompilationMs: 0,
    },
    frameSummary: {
      samples: 7200,
      captureDurationMs: 120000,
      frameP50Ms: 15,
      frameP95Ms: 16.5,
      frameP99Ms: 20,
      frameMaxMs: 30,
      framesOver50Ms: 0,
      minimumRenderScale: 0.8,
      averageRenderScale: 0.9,
      cpuFrameP95Ms: 7,
      gpuFrameP95Ms: 12,
      drawCallsMin: 40,
      drawCallsMax: 100,
    },
    ...overrides,
  };
}

function blind(sessionId: string, voluntaryReplay: boolean) {
  return {
    schema: "resonance.m0.blind-test.v1",
    buildId: BUILD,
    sessionId,
    startedAt: "2026-09-27T00:00:00Z",
    exportedAt: "2026-09-27T00:05:00Z",
    tasks: {
      basicTraversal: true,
      movingAnchor: true,
      attract: true,
      repel: true,
      targetChoiceFork: true,
      recovery: true,
    },
    questionnaire: {
      responsiveness: 4,
      targetingClarity: 4,
      repelPredictability: 4,
      voluntaryReplay,
      confusionNotes: "",
    },
    events: [
      ...(voluntaryReplay
        ? [{ tick: 300, type: "voluntary-replay-complete" }]
        : []),
      { tick: 360, type: "questionnaire-complete" },
    ],
    samples: [],
  };
}

describe("M0 evidence preflight", () => {
  it("passes objective Tier M gates for a healthy capture", () => {
    const parsed = parsePerformanceCapture(performance());
    const evaluation = evaluatePerformanceCapture("webgpu.json", parsed, BUILD);
    expect(evaluation.gates.backendSelection).toBe("pass");
    expect(evaluation.gates.duration120s).toBe("pass");
    expect(evaluation.gates.frameP95).toBe("pass");
    expect(evaluation.gates.cpuFrameP95).toBe("pass");
    expect(evaluation.gates.gpuFrameP95).toBe("pass");
    expect(evaluation.gates.mediumRenderScale).toBe("pass");
  });

  it("fails WebGPU Tier-M evidence collected below Medium preset", () => {
    const base = performance();
    const value = performance({
      graphics: { ...base.graphics, preset: "low" },
    });
    const evaluation = evaluatePerformanceCapture(
      "webgpu-low.json",
      parsePerformanceCapture(value),
      BUILD,
    );
    expect(evaluation.gates.mediumRenderScale).toBe("fail");
  });

  it("fails captures that relied on auto backend selection", () => {
    const value = performance({ backendPreference: "auto" });
    const evaluation = evaluatePerformanceCapture(
      "auto.json",
      parsePerformanceCapture(value),
      BUILD,
    );
    expect(evaluation.gates.backendSelection).toBe("fail");
  });

  it("requires review rather than fabricating a hitch or unavailable-GPU verdict", () => {
    const value = performance({
      frameSummary: {
        ...performance().frameSummary,
        framesOver50Ms: 2,
        gpuFrameP95Ms: null,
      },
    });
    const evaluation = evaluatePerformanceCapture(
      "fallback.json",
      parsePerformanceCapture(value),
      BUILD,
    );
    expect(evaluation.gates.longHitch).toBe("review");
    expect(evaluation.gates.gpuFrameP95).toBe("unavailable");
  });

  it("detects missing physical backends and blind-test sample requirements", () => {
    const files = [
      { file: "performance/webgpu.json", value: performance() },
      ...[1, 2, 3, 4, 5].map((id) => ({
        file: `blind/${id}.json`,
        value: blind(String(id), id <= 3),
      })),
    ];
    const summary = summarizeEvidence(files, BUILD);
    expect(summary.performance.webgpuCount).toBe(1);
    expect(summary.performance.webgl2Count).toBe(0);
    expect(summary.blind.testerCount).toBe(5);
    expect(summary.blind.voluntaryReplay.majorityMet).toBe(true);
    expect(summary.blockers).toContain("No WebGL2 performance capture found.");
    expect(summary.blockers).toContain("No Firefox physical performance capture found.");
  });

  it("rejects blind reports from a different deployed build", () => {
    const wrong = { ...blind("wrong", true), buildId: "other" };
    const summary = summarizeEvidence([{ file: "blind/wrong.json", value: wrong }], BUILD);
    expect(summary.blind.matchingBuildCount).toBe(0);
    expect(summary.blind.wrongBuildFiles).toEqual(["blind/wrong.json"]);
    expect(summary.blockers.some((item) => item.includes("wrong build"))).toBe(true);
  });
});
