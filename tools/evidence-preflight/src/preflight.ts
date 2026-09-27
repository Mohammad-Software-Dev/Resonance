import {
  isCompletedSession,
  parseBlindTestReport,
  summarizeBlindTestReports,
  type BlindTestReport,
} from "@resonance/blind-test-report/report";

export const PERFORMANCE_SCHEMA = "resonance.m0.performance-capture.v1" as const;

type Backend = "webgpu" | "webgl2";
type GateState = "pass" | "fail" | "review" | "unavailable";

interface PerformanceCapture {
  readonly schema: typeof PERFORMANCE_SCHEMA;
  readonly buildId: string;
  readonly userAgent: string;
  readonly backend: Backend;
  readonly graphics: {
    readonly preset: string;
    readonly activeMeshes: number;
    readonly materials: number;
    readonly textures: number;
  };
  readonly performance: {
    readonly runtimeShaderCompilationMs: number;
  };
  readonly frameSummary: {
    readonly samples: number;
    readonly captureDurationMs: number;
    readonly frameP50Ms: number;
    readonly frameP95Ms: number;
    readonly frameP99Ms: number;
    readonly frameMaxMs: number;
    readonly framesOver50Ms: number;
    readonly minimumRenderScale: number;
    readonly averageRenderScale: number;
    readonly cpuFrameP95Ms: number;
    readonly gpuFrameP95Ms: number | null;
    readonly drawCallsMin: number;
    readonly drawCallsMax: number;
  };
}

export interface EvidenceFile {
  readonly file: string;
  readonly value: unknown;
}

export interface PerformanceEvaluation {
  readonly file: string;
  readonly buildId: string;
  readonly backend: Backend;
  readonly userAgent: string;
  readonly preset: string;
  readonly durationSeconds: number;
  readonly averageFrameMs: number;
  readonly gates: {
    readonly buildId: GateState;
    readonly duration120s: GateState;
    readonly sustained60Hz: GateState;
    readonly frameP50: GateState;
    readonly frameP95: GateState;
    readonly frameP99: GateState;
    readonly longHitch: GateState;
    readonly cpuFrameP95: GateState;
    readonly gpuFrameP95: GateState;
    readonly drawCalls: GateState;
    readonly activeMeshes: GateState;
    readonly materials: GateState;
    readonly textures: GateState;
    readonly runtimeShaderCompile: GateState;
    readonly mediumRenderScale: GateState;
  };
  readonly values: PerformanceCapture["frameSummary"] & {
    readonly activeMeshes: number;
    readonly materials: number;
    readonly textures: number;
    readonly runtimeShaderCompilationMs: number;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function finiteNumber(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number`);
  }
  return value;
}

function parseFrameSummary(value: unknown): PerformanceCapture["frameSummary"] {
  if (!isRecord(value)) throw new Error("frameSummary must be an object");
  const gpu = value.gpuFrameP95Ms;
  if (gpu !== null && (typeof gpu !== "number" || !Number.isFinite(gpu))) {
    throw new Error("frameSummary.gpuFrameP95Ms must be a finite number or null");
  }
  return {
    samples: finiteNumber(value.samples, "frameSummary.samples"),
    captureDurationMs: finiteNumber(value.captureDurationMs, "frameSummary.captureDurationMs"),
    frameP50Ms: finiteNumber(value.frameP50Ms, "frameSummary.frameP50Ms"),
    frameP95Ms: finiteNumber(value.frameP95Ms, "frameSummary.frameP95Ms"),
    frameP99Ms: finiteNumber(value.frameP99Ms, "frameSummary.frameP99Ms"),
    frameMaxMs: finiteNumber(value.frameMaxMs, "frameSummary.frameMaxMs"),
    framesOver50Ms: finiteNumber(value.framesOver50Ms, "frameSummary.framesOver50Ms"),
    minimumRenderScale: finiteNumber(value.minimumRenderScale, "frameSummary.minimumRenderScale"),
    averageRenderScale: finiteNumber(value.averageRenderScale, "frameSummary.averageRenderScale"),
    cpuFrameP95Ms: finiteNumber(value.cpuFrameP95Ms, "frameSummary.cpuFrameP95Ms"),
    gpuFrameP95Ms: gpu,
    drawCallsMin: finiteNumber(value.drawCallsMin, "frameSummary.drawCallsMin"),
    drawCallsMax: finiteNumber(value.drawCallsMax, "frameSummary.drawCallsMax"),
  };
}

export function parsePerformanceCapture(value: unknown): PerformanceCapture {
  if (!isRecord(value) || value.schema !== PERFORMANCE_SCHEMA) {
    throw new Error(`unsupported performance schema; expected ${PERFORMANCE_SCHEMA}`);
  }
  if (typeof value.buildId !== "string" || value.buildId.trim() === "") {
    throw new Error("buildId must be a non-empty string");
  }
  if (typeof value.userAgent !== "string" || value.userAgent.trim() === "") {
    throw new Error("userAgent must be a non-empty string");
  }
  if (value.backend !== "webgpu" && value.backend !== "webgl2") {
    throw new Error("backend must be webgpu or webgl2");
  }
  if (!isRecord(value.graphics)) throw new Error("graphics must be an object");
  if (typeof value.graphics.preset !== "string") throw new Error("graphics.preset must be a string");
  if (!isRecord(value.performance)) throw new Error("performance must be an object");

  return {
    schema: PERFORMANCE_SCHEMA,
    buildId: value.buildId,
    userAgent: value.userAgent,
    backend: value.backend,
    graphics: {
      preset: value.graphics.preset,
      activeMeshes: finiteNumber(value.graphics.activeMeshes, "graphics.activeMeshes"),
      materials: finiteNumber(value.graphics.materials, "graphics.materials"),
      textures: finiteNumber(value.graphics.textures, "graphics.textures"),
    },
    performance: {
      runtimeShaderCompilationMs: finiteNumber(
        value.performance.runtimeShaderCompilationMs,
        "performance.runtimeShaderCompilationMs",
      ),
    },
    frameSummary: parseFrameSummary(value.frameSummary),
  };
}

function gate(condition: boolean): GateState {
  return condition ? "pass" : "fail";
}

export function evaluatePerformanceCapture(
  file: string,
  capture: PerformanceCapture,
  expectedBuildId: string,
): PerformanceEvaluation {
  const summary = capture.frameSummary;
  const averageFrameMs = summary.samples > 0
    ? summary.captureDurationMs / summary.samples
    : Number.POSITIVE_INFINITY;
  return {
    file,
    buildId: capture.buildId,
    backend: capture.backend,
    userAgent: capture.userAgent,
    preset: capture.graphics.preset,
    durationSeconds: summary.captureDurationMs / 1000,
    averageFrameMs,
    gates: {
      buildId: gate(capture.buildId === expectedBuildId),
      duration120s: gate(summary.captureDurationMs >= 120_000),
      sustained60Hz: gate(averageFrameMs <= 16.67),
      frameP50: gate(summary.frameP50Ms <= 16.0),
      frameP95: gate(summary.frameP95Ms <= 16.7),
      frameP99: gate(summary.frameP99Ms <= 25),
      longHitch: summary.framesOver50Ms === 0 ? "pass" : "review",
      cpuFrameP95: gate(summary.cpuFrameP95Ms <= 8),
      gpuFrameP95: summary.gpuFrameP95Ms === null
        ? "unavailable"
        : gate(summary.gpuFrameP95Ms <= 13.5),
      drawCalls: gate(summary.drawCallsMax <= 250),
      activeMeshes: gate(capture.graphics.activeMeshes <= 120),
      materials: gate(capture.graphics.materials <= 24),
      textures: gate(capture.graphics.textures <= 24),
      runtimeShaderCompile: gate(capture.performance.runtimeShaderCompilationMs === 0),
      mediumRenderScale: capture.graphics.preset.toLowerCase() === "medium"
        ? gate(summary.minimumRenderScale >= 0.75)
        : "review",
    },
    values: {
      ...summary,
      activeMeshes: capture.graphics.activeMeshes,
      materials: capture.graphics.materials,
      textures: capture.graphics.textures,
      runtimeShaderCompilationMs: capture.performance.runtimeShaderCompilationMs,
    },
  };
}

export interface EvidencePreflightSummary {
  readonly schema: "resonance.m0.evidence-preflight.v1";
  readonly expectedBuildId: string;
  readonly performance: {
    readonly reportCount: number;
    readonly webgpuCount: number;
    readonly webgl2Count: number;
    readonly firefoxCount: number;
    readonly evaluations: readonly PerformanceEvaluation[];
  };
  readonly blind: ReturnType<typeof summarizeBlindTestReports> & {
    readonly matchingBuildCount: number;
    readonly wrongBuildFiles: readonly string[];
  };
  readonly ignoredFiles: readonly string[];
  readonly blockers: readonly string[];
  readonly reviewItems: readonly string[];
}

export function summarizeEvidence(
  files: readonly EvidenceFile[],
  expectedBuildId: string,
): EvidencePreflightSummary {
  const performance: PerformanceEvaluation[] = [];
  const blindReports: BlindTestReport[] = [];
  const blindFiles: string[] = [];
  const ignoredFiles: string[] = [];

  for (const item of files) {
    if (!isRecord(item.value) || typeof item.value.schema !== "string") {
      ignoredFiles.push(item.file);
      continue;
    }
    if (item.value.schema === PERFORMANCE_SCHEMA) {
      performance.push(evaluatePerformanceCapture(
        item.file,
        parsePerformanceCapture(item.value),
        expectedBuildId,
      ));
      continue;
    }
    if (item.value.schema === "resonance.m0.blind-test.v1") {
      blindReports.push(parseBlindTestReport(item.value));
      blindFiles.push(item.file);
      continue;
    }
    ignoredFiles.push(item.file);
  }

  const blind = summarizeBlindTestReports(blindReports);
  const wrongBuildFiles = blindReports
    .map((report, index) => ({ report, file: blindFiles[index] ?? "unknown" }))
    .filter(({ report }) => report.buildId !== expectedBuildId)
    .map(({ file }) => file);
  const completedMatchingBuild = blindReports.filter(
    (report) => report.buildId === expectedBuildId && isCompletedSession(report),
  ).length;

  const blockers: string[] = [];
  if (!performance.some((entry) => entry.backend === "webgpu")) {
    blockers.push("No WebGPU performance capture found.");
  }
  if (!performance.some((entry) => entry.backend === "webgl2")) {
    blockers.push("No WebGL2 performance capture found.");
  }
  for (const entry of performance) {
    const failed = Object.entries(entry.gates)
      .filter(([, state]) => state === "fail")
      .map(([name]) => name);
    if (failed.length > 0) {
      blockers.push(`${entry.file}: failed gates: ${failed.join(", ")}`);
    }
  }
  if (wrongBuildFiles.length > 0) {
    blockers.push(`Blind reports from the wrong build: ${wrongBuildFiles.join(", ")}`);
  }
  if (completedMatchingBuild < 5) {
    blockers.push(
      `Need at least 5 questionnaire-completed blind sessions from ${expectedBuildId}; found ${completedMatchingBuild}.`,
    );
  }
  if (completedMatchingBuild >= 5 && !blind.voluntaryReplay.majorityMet) {
    blockers.push("Observed voluntary replay is not a majority of completed blind sessions.");
  }

  const reviewItems: string[] = [
    "Human review must confirm at least five qualifying testers actually completed the course.",
    "Any frames >50 ms require human review for repeatability/gameplay impact.",
    "Physical hardware identity, Firefox run, Safari/macOS availability, context recovery, and five-minute memory/GC evidence remain manual signoff items.",
  ];
  for (const entry of performance) {
    if (entry.gates.longHitch === "review") {
      reviewItems.push(
        `${entry.file}: ${entry.values.framesOver50Ms} frame(s) exceeded 50 ms; determine whether the hitch is repeatable.`,
      );
    }
    if (entry.gates.gpuFrameP95 === "unavailable") {
      reviewItems.push(`${entry.file}: GPU timer unavailable; record that limitation in the hardware template.`);
    }
    if (entry.gates.mediumRenderScale === "review") {
      reviewItems.push(
        `${entry.file}: preset is ${entry.preset}; Tier M approval requires a Medium-preset capture.`,
      );
    }
  }

  return {
    schema: "resonance.m0.evidence-preflight.v1",
    expectedBuildId,
    performance: {
      reportCount: performance.length,
      webgpuCount: performance.filter((entry) => entry.backend === "webgpu").length,
      webgl2Count: performance.filter((entry) => entry.backend === "webgl2").length,
      firefoxCount: performance.filter((entry) => /Firefox\//.test(entry.userAgent)).length,
      evaluations: performance,
    },
    blind: {
      ...blind,
      matchingBuildCount: blindReports.filter((report) => report.buildId === expectedBuildId).length,
      wrongBuildFiles,
    },
    ignoredFiles,
    blockers,
    reviewItems,
  };
}
