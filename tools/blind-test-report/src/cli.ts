import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

interface Report {
  schema: "resonance.m0.blind-test.v1";
  sessionId: string;
  tasks: Record<string, boolean>;
  questionnaire: {
    responsiveness: number | null;
    targetingClarity: number | null;
    repelPredictability: number | null;
    voluntaryReplay: boolean | null;
    confusionNotes: string;
  };
  events: { type: string; detail?: string }[];
}

function isReport(value: unknown): value is Report {
  if (!value || typeof value !== "object") return false;
  const report = value as Partial<Report>;
  return report.schema === "resonance.m0.blind-test.v1"
    && typeof report.sessionId === "string"
    && !!report.tasks
    && !!report.questionnaire
    && Array.isArray(report.events);
}

function distribution(values: (number | null)[]): Record<string, number> {
  const out: Record<string, number> = { unanswered: 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
  for (const value of values) {
    const key = value === null ? "unanswered" : String(value);
    out[key] = (out[key] ?? 0) + 1;
  }
  return out;
}

async function loadReports(directory: string): Promise<Report[]> {
  const files = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  const reports: Report[] = [];
  const sessions = new Set<string>();
  for (const file of files) {
    const value: unknown = JSON.parse(await readFile(resolve(directory, file), "utf8"));
    if (!isReport(value)) throw new Error(`${file}: unsupported blind-test report schema`);
    if (sessions.has(value.sessionId)) throw new Error(`${file}: duplicate sessionId ${value.sessionId}`);
    sessions.add(value.sessionId);
    reports.push(value);
  }
  return reports;
}

const directory = resolve(process.argv[2] ?? "artifacts/blind-tests");
const reports = await loadReports(directory);
const taskNames = [...new Set(reports.flatMap((report) => Object.keys(report.tasks)))].sort();
const completedByTask = Object.fromEntries(
  taskNames.map((task) => [task, reports.filter((report) => report.tasks[task] === true).length]),
);
const recoveries = reports.map((report) =>
  report.events.filter((event) => event.type === "task-complete" && event.detail === "recovery").length,
);
const replayYes = reports.filter((report) => report.questionnaire.voluntaryReplay === true).length;
const replayNo = reports.filter((report) => report.questionnaire.voluntaryReplay === false).length;
const replayUnanswered = reports.length - replayYes - replayNo;

const summary = {
  schema: "resonance.m0.blind-test-summary.v1",
  testerCount: reports.length,
  minimumTesterCount: 5,
  sampleRequirementMet: reports.length >= 5,
  completedByTask,
  recoverySessions: recoveries.filter((count) => count > 0).length,
  voluntaryReplay: { yes: replayYes, no: replayNo, unanswered: replayUnanswered },
  ratings: {
    responsiveness: distribution(reports.map((report) => report.questionnaire.responsiveness)),
    targetingClarity: distribution(reports.map((report) => report.questionnaire.targetingClarity)),
    repelPredictability: distribution(reports.map((report) => report.questionnaire.repelPredictability)),
  },
  confusionNotes: reports
    .map((report) => report.questionnaire.confusionNotes.trim())
    .filter(Boolean),
};

process.stdout.write(JSON.stringify(summary, null, 2) + "\n");
if (reports.length < 5) {
  process.stderr.write(`M0.11 sample incomplete: ${reports.length}/5 blind-test reports.\n`);
  process.exitCode = 2;
}
