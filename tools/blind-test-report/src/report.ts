export const BLIND_TEST_SCHEMA = "resonance.m0.blind-test.v1" as const;
export const BLIND_TEST_TASKS = [
  "basicTraversal",
  "movingAnchor",
  "attract",
  "repel",
  "targetChoiceFork",
  "recovery",
] as const;

type BlindTask = typeof BLIND_TEST_TASKS[number];

export interface BlindTestReport {
  readonly schema: typeof BLIND_TEST_SCHEMA;
  readonly buildId: string;
  readonly sessionId: string;
  readonly startedAt: string;
  readonly exportedAt: string;
  readonly tasks: Record<BlindTask, boolean>;
  readonly questionnaire: {
    readonly responsiveness: number | null;
    readonly targetingClarity: number | null;
    readonly repelPredictability: number | null;
    readonly voluntaryReplay: boolean | null;
    readonly confusionNotes: string;
  };
  readonly events: readonly {
    readonly tick: number;
    readonly type: string;
    readonly detail?: string;
  }[];
  readonly samples: readonly unknown[];
}

export interface BlindTestSummary {
  readonly schema: "resonance.m0.blind-test-summary.v1";
  readonly reportCount: number;
  readonly testerCount: number;
  readonly incompleteReportCount: number;
  readonly minimumTesterCount: number;
  readonly minimumCompletedSessionCountMet: boolean;
  readonly allObservedTasksCompletedSessions: number;
  readonly completedByTask: Record<BlindTask, number>;
  readonly recoverySessions: number;
  readonly totalRecoveries: number;
  readonly voluntaryReplay: {
    readonly yes: number;
    readonly no: number;
    readonly unanswered: number;
    readonly majorityMet: boolean;
  };
  readonly ratings: {
    readonly responsiveness: Record<string, number>;
    readonly targetingClarity: Record<string, number>;
    readonly repelPredictability: Record<string, number>;
  };
  readonly confusionNotes: readonly string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isRating(value: unknown): value is number | null {
  return value === null
    || (typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5);
}

function parseTasks(value: unknown): Record<BlindTask, boolean> {
  if (!isRecord(value)) throw new Error("tasks must be an object");
  const keys = Object.keys(value).sort();
  const expected = [...BLIND_TEST_TASKS].sort();
  if (keys.length !== expected.length || keys.some((key, index) => key !== expected[index])) {
    throw new Error("tasks must contain exactly the six M0 blind-test task flags");
  }
  for (const task of BLIND_TEST_TASKS) {
    if (typeof value[task] !== "boolean") {
      throw new Error(`task ${task} must be boolean`);
    }
  }
  return value as Record<BlindTask, boolean>;
}

export function parseBlindTestReport(value: unknown): BlindTestReport {
  if (!isRecord(value) || value.schema !== BLIND_TEST_SCHEMA) {
    throw new Error(`unsupported blind-test report schema; expected ${BLIND_TEST_SCHEMA}`);
  }
  if (typeof value.buildId !== "string" || value.buildId.trim() === "") {
    throw new Error("buildId must be a non-empty string");
  }
  if (typeof value.sessionId !== "string" || value.sessionId.trim() === "") {
    throw new Error("sessionId must be a non-empty string");
  }
  if (typeof value.startedAt !== "string" || typeof value.exportedAt !== "string") {
    throw new Error("startedAt/exportedAt must be strings");
  }

  const tasks = parseTasks(value.tasks);
  if (!isRecord(value.questionnaire)) throw new Error("questionnaire must be an object");
  const questionnaire = value.questionnaire;
  if (!isRating(questionnaire.responsiveness)
    || !isRating(questionnaire.targetingClarity)
    || !isRating(questionnaire.repelPredictability)) {
    throw new Error("questionnaire ratings must be null or integers from 1 to 5");
  }
  if (questionnaire.voluntaryReplay !== null
    && typeof questionnaire.voluntaryReplay !== "boolean") {
    throw new Error("questionnaire voluntaryReplay must be boolean or null");
  }
  if (typeof questionnaire.confusionNotes !== "string") {
    throw new Error("questionnaire confusionNotes must be a string");
  }

  if (!Array.isArray(value.events)) throw new Error("events must be an array");
  const events = value.events.map((event, index) => {
    if (!isRecord(event)
      || typeof event.tick !== "number"
      || !Number.isInteger(event.tick)
      || event.tick < 0
      || typeof event.type !== "string"
      || event.type.trim() === ""
      || (event.detail !== undefined && typeof event.detail !== "string")) {
      throw new Error(`events[${index}] is invalid`);
    }
    return {
      tick: event.tick,
      type: event.type,
      ...(typeof event.detail === "string" ? { detail: event.detail } : {}),
    };
  });
  if (!Array.isArray(value.samples)) throw new Error("samples must be an array");

  return {
    schema: BLIND_TEST_SCHEMA,
    buildId: value.buildId,
    sessionId: value.sessionId,
    startedAt: value.startedAt,
    exportedAt: value.exportedAt,
    tasks,
    questionnaire: {
      responsiveness: questionnaire.responsiveness,
      targetingClarity: questionnaire.targetingClarity,
      repelPredictability: questionnaire.repelPredictability,
      voluntaryReplay: questionnaire.voluntaryReplay,
      confusionNotes: questionnaire.confusionNotes,
    },
    events,
    samples: value.samples,
  };
}

export function isCompletedSession(report: BlindTestReport): boolean {
  return report.events.some((event) => event.type === "questionnaire-complete");
}

export function assertUniqueSessions(reports: readonly BlindTestReport[]): void {
  const sessions = new Set<string>();
  for (const report of reports) {
    if (sessions.has(report.sessionId)) {
      throw new Error(`duplicate sessionId ${report.sessionId}`);
    }
    sessions.add(report.sessionId);
  }
}

function distribution(values: readonly (number | null)[]): Record<string, number> {
  const out: Record<string, number> = {
    unanswered: 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
  };
  for (const value of values) {
    const key = value === null ? "unanswered" : String(value);
    out[key] = (out[key] ?? 0) + 1;
  }
  return out;
}

export function summarizeBlindTestReports(
  reports: readonly BlindTestReport[],
): BlindTestSummary {
  assertUniqueSessions(reports);
  const completed = reports.filter(isCompletedSession);
  const completedByTask = Object.fromEntries(
    BLIND_TEST_TASKS.map((task) => [
      task,
      completed.filter((report) => report.tasks[task]).length,
    ]),
  ) as Record<BlindTask, number>;
  const recoveries = completed.map((report) =>
    report.events.filter(
      (event) => event.type === "task-complete" && event.detail === "recovery",
    ).length,
  );
  const replayYes = completed.filter(
    (report) => report.questionnaire.voluntaryReplay === true,
  ).length;
  const replayNo = completed.filter(
    (report) => report.questionnaire.voluntaryReplay === false,
  ).length;
  const replayUnanswered = completed.length - replayYes - replayNo;

  return {
    schema: "resonance.m0.blind-test-summary.v1",
    reportCount: reports.length,
    testerCount: completed.length,
    incompleteReportCount: reports.length - completed.length,
    minimumTesterCount: 5,
    minimumCompletedSessionCountMet: completed.length >= 5,
    allObservedTasksCompletedSessions: completed.filter((report) =>
      BLIND_TEST_TASKS.every((task) => report.tasks[task])
    ).length,
    completedByTask,
    recoverySessions: recoveries.filter((count) => count > 0).length,
    totalRecoveries: recoveries.reduce((sum, count) => sum + count, 0),
    voluntaryReplay: {
      yes: replayYes,
      no: replayNo,
      unanswered: replayUnanswered,
      majorityMet: replayYes > completed.length / 2,
    },
    ratings: {
      responsiveness: distribution(
        completed.map((report) => report.questionnaire.responsiveness),
      ),
      targetingClarity: distribution(
        completed.map((report) => report.questionnaire.targetingClarity),
      ),
      repelPredictability: distribution(
        completed.map((report) => report.questionnaire.repelPredictability),
      ),
    },
    confusionNotes: completed
      .map((report) => report.questionnaire.confusionNotes.trim())
      .filter(Boolean),
  };
}
