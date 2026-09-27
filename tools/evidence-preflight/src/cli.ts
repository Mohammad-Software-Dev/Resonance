import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { summarizeEvidence, type EvidenceFile } from "./preflight";

async function collectJson(directory: string): Promise<EvidenceFile[]> {
  const result: EvidenceFile[] = [];

  async function visit(current: string): Promise<void> {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = resolve(current, entry.name);
      if (entry.isDirectory()) {
        await visit(absolute);
        continue;
      }
      if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
      const relative = absolute.slice(directory.length + 1);
      let value: unknown;
      try {
        value = JSON.parse(await readFile(absolute, "utf8"));
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`${relative}: invalid JSON: ${detail}`);
      }
      result.push({ file: relative, value });
    }
  }

  await visit(directory);
  return result;
}

const invocationRoot = process.env.INIT_CWD ?? process.cwd();
const directory = resolve(
  invocationRoot,
  process.argv[2] ?? ".local/m0-evidence",
);
const expectedBuildId = process.argv[3] ?? process.env.M0_EVIDENCE_BUILD_SHA;

if (!expectedBuildId) {
  throw new Error(
    "Expected build SHA required. Usage: pnpm evidence:preflight <evidence-directory> <build-sha>",
  );
}

const files = await collectJson(directory);
const summary = summarizeEvidence(files, expectedBuildId);
process.stdout.write(JSON.stringify(summary, null, 2) + "\n");

if (summary.blockers.length > 0) {
  process.stderr.write(
    `M0 evidence preflight has ${summary.blockers.length} blocker(s).\n`,
  );
  process.exitCode = 2;
}
