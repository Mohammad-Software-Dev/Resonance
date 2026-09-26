import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseReplayArtifact } from "@resonance/simulation";
import {
  generateCanonicalM0Replay,
  verifyM0Replay,
  verifyM0ReplayRenderMatrix,
} from "@resonance/test-fixtures";

function usage(): never {
  console.error(
    [
      "Resonance replay CLI",
      "  pnpm --filter @resonance/replay-cli replay --generate <output.json>",
      "  pnpm --filter @resonance/replay-cli replay <replay.json>",
      "  pnpm --filter @resonance/replay-cli replay --matrix <replay.json>",
    ].join("\n"),
  );
  process.exit(2);
}

async function load(path: string) {
  const json = await readFile(resolve(path), "utf8");
  return parseReplayArtifact(JSON.parse(json) as unknown);
}

const args = process.argv.slice(2);
if (args[0] === "--generate") {
  const output = args[1] ?? usage();
  const artifact = await generateCanonicalM0Replay();
  await writeFile(resolve(output), JSON.stringify(artifact, null, 2) + "\n", "utf8");
  console.log(
    `generated ${output}: ${artifact.inputs.length} ticks, ${artifact.checkpoints.length} checkpoints, final=${artifact.finalHash}`,
  );
  process.exit(0);
}

if (args[0] === "--matrix") {
  const path = args[1] ?? usage();
  const artifact = await load(path);
  const results = await verifyM0ReplayRenderMatrix(artifact);
  for (const result of results) {
    console.log(
      `${result.renderFps} fps: ${result.ok ? "PASS" : "FAIL"} final=${result.finalHash}`
      + (result.divergenceTick === null ? "" : ` divergenceTick=${result.divergenceTick}`),
    );
  }
  process.exit(results.every((result) => result.ok) ? 0 : 1);
}

const path = args[0] ?? usage();
const artifact = await load(path);
const result = await verifyM0Replay(artifact);
if (result.ok) {
  console.log(
    `PASS ${artifact.fixture.id}@${artifact.fixture.version}: ${artifact.inputs.length} ticks, final=${result.finalHash}`,
  );
  process.exit(0);
}

console.error(
  JSON.stringify(
    {
      status: "DIVERGED",
      fixture: artifact.fixture,
      divergence: result.divergence,
    },
    null,
    2,
  ),
);
process.exit(1);
