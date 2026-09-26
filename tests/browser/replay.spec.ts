import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import type { ReplayArtifact } from "@resonance/simulation";

test("canonical M0 replay matches Node in the browser runtime", async ({ page }) => {
  const artifact = JSON.parse(
    await readFile("packages/test-fixtures/replays/m0-canonical.json", "utf8"),
  ) as ReplayArtifact;

  await page.goto("/replay.html");
  await page.waitForFunction(() => typeof window.__RESONANCE_VERIFY_REPLAY__ === "function");

  const result = await page.evaluate(async (replay) => {
    const verify = window.__RESONANCE_VERIFY_REPLAY__;
    if (!verify) throw new Error("Browser replay verifier was not installed.");
    return await verify(replay);
  }, artifact) as {
    direct: { ok: boolean; finalHash: string; divergence: unknown };
  };

  expect(result.direct.ok, JSON.stringify(result.direct.divergence)).toBe(true);
  expect(result.direct.finalHash).toBe(artifact.finalHash);
});
