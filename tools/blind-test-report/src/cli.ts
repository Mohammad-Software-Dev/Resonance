import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import {
  parseBlindTestReport,
  summarizeBlindTestReports,
  type BlindTestReport,
} from "./report";

async function loadReports(directory: string): Promise<BlindTestReport[]> {
  const files = (await readdir(directory))
    .filter((name) => name.endsWith(".json"))
    .sort();
  const reports: BlindTestReport[] = [];

  for (const file of files) {
    const value: unknown = JSON.parse(
      await readFile(resolve(directory, file), "utf8"),
    );
    try {
      reports.push(parseBlindTestReport(value));
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(`${file}: ${detail}`);
    }
  }
  return reports;
}

const invocationRoot = process.env.INIT_CWD ?? process.cwd();
const directory = resolve(
  invocationRoot,
  process.argv[2] ?? "artifacts/blind-tests",
);
const reports = await loadReports(directory);
const summary = summarizeBlindTestReports(reports);

process.stdout.write(JSON.stringify(summary, null, 2) + "\n");
if (!summary.minimumCompletedSessionCountMet) {
  process.stderr.write(
    `M0.11 sample incomplete: ${summary.testerCount}/${summary.minimumTesterCount} completed blind-test sessions (${summary.reportCount} reports loaded).\n`,
  );
  process.exitCode = 2;
}
