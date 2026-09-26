import { expect, test } from "@playwright/test";
import { generateCanonicalM0Replay } from "@resonance/test-fixtures";

test("canonical M0 replay matches Node in the browser runtime", async ({ page }) => {
  const artifact = await generateCanonicalM0Replay("playwright-node");
  await page.goto("/");
  await page.waitForFunction(() => typeof window.__RESONANCE_VERIFY_REPLAY__ === "function");

  const result = await page.evaluate(async (replay) => {
    const verify = window.__RESONANCE_VERIFY_REPLAY__;
    if (!verify) throw new Error("Browser replay verifier was not installed.");
    return await verify(replay);
  }, artifact) as {
    direct: { ok: boolean; finalHash: string; divergence: unknown };
    matrix: { renderFps: number; ok: boolean; finalHash: string; divergenceTick: number | null }[];
  };

  expect(result.direct.ok, JSON.stringify(result.direct.divergence)).toBe(true);
  expect(result.direct.finalHash).toBe(artifact.finalHash);
  expect(result.matrix.map((entry) => entry.renderFps)).toEqual([30, 45, 60, 90, 120, 144]);
  expect(result.matrix.every((entry) => entry.ok)).toBe(true);
  expect(new Set(result.matrix.map((entry) => entry.finalHash))).toEqual(
    new Set([artifact.finalHash]),
  );
});
