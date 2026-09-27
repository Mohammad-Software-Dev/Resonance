import { describe, expect, it } from "vitest";
import {
  BLIND_TEST_TASKS,
  assertUniqueSessions,
  parseBlindTestReport,
  summarizeBlindTestReports,
  type BlindTestReport,
} from "./report";

function report(
  sessionId: string,
  options: {
    complete?: boolean;
    voluntaryReplay?: boolean | null;
    recoveryCount?: number;
  } = {},
): BlindTestReport {
  const complete = options.complete ?? true;
  const recoveryCount = options.recoveryCount ?? 1;
  return parseBlindTestReport({
    schema: "resonance.m0.blind-test.v1",
    buildId: "test",
    sessionId,
    startedAt: "2026-09-27T00:00:00.000Z",
    exportedAt: "2026-09-27T00:05:00.000Z",
    tasks: Object.fromEntries(BLIND_TEST_TASKS.map((task) => [task, true])),
    questionnaire: {
      responsiveness: 4,
      targetingClarity: 3,
      repelPredictability: 5,
      voluntaryReplay: options.voluntaryReplay ?? true,
      confusionNotes: "",
    },
    events: [
      ...Array.from({ length: recoveryCount }, (_, index) => ({
        tick: 30 + index,
        type: "task-complete",
        detail: "recovery",
      })),
      ...(complete ? [{ tick: 360, type: "questionnaire-complete" }] : []),
    ],
    samples: [],
  });
}

describe("blind-test report validation", () => {
  it("rejects out-of-range questionnaire ratings", () => {
    const value = {
      ...report("valid"),
      questionnaire: {
        ...report("valid").questionnaire,
        responsiveness: 6,
      },
    };
    expect(() => parseBlindTestReport(value)).toThrow(/ratings/);
  });

  it("rejects malformed task flags and duplicate sessions", () => {
    const value = {
      ...report("valid"),
      tasks: { basicTraversal: true },
    };
    expect(() => parseBlindTestReport(value)).toThrow(/six M0/);
    expect(() => assertUniqueSessions([report("same"), report("same")]))
      .toThrow(/duplicate sessionId/);
  });
});

describe("blind-test report summary", () => {
  it("counts only questionnaire-completed sessions toward the five-tester minimum", () => {
    const reports = [
      report("1"),
      report("2"),
      report("3"),
      report("4"),
      report("5"),
      report("partial", { complete: false }),
    ];
    const summary = summarizeBlindTestReports(reports);
    expect(summary.reportCount).toBe(6);
    expect(summary.testerCount).toBe(5);
    expect(summary.incompleteReportCount).toBe(1);
    expect(summary.minimumCompletedSessionCountMet).toBe(true);
    expect(summary.allObservedTasksCompletedSessions).toBe(5);
  });

  it("reports recovery totals and voluntary-replay majority over completed sessions", () => {
    const summary = summarizeBlindTestReports([
      report("1", { voluntaryReplay: true, recoveryCount: 2 }),
      report("2", { voluntaryReplay: true }),
      report("3", { voluntaryReplay: true }),
      report("4", { voluntaryReplay: false }),
      report("5", { voluntaryReplay: null }),
    ]);
    expect(summary.totalRecoveries).toBe(6);
    expect(summary.recoverySessions).toBe(5);
    expect(summary.voluntaryReplay).toEqual({
      yes: 3,
      no: 1,
      unanswered: 1,
      majorityMet: true,
    });
  });
});
