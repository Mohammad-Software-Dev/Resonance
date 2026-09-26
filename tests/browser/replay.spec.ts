import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import type { ReplayArtifact } from "@resonance/simulation";

test("canonical M0 replay matches Node in the browser runtime", async ({
  page,
  browserName,
}) => {
  const artifact = JSON.parse(
    await readFile("packages/test-fixtures/replays/m0-canonical.json", "utf8"),
  ) as ReplayArtifact;

  await page.goto("/replay.html");
  await page.waitForFunction(() => typeof window.__RESONANCE_VERIFY_REPLAY__ === "function");

  const runMatrix = browserName === "chromium";
  const result = await page.evaluate(async ({ replay, renderCadenceMatrix }) => {
    const verify = window.__RESONANCE_VERIFY_REPLAY__;
    if (!verify) throw new Error("Browser replay verifier was not installed.");
    return await verify(replay, { renderCadenceMatrix });
  }, { replay: artifact, renderCadenceMatrix: runMatrix }) as {
    direct: { ok: boolean; finalHash: string; divergence: unknown };
    matrix: Array<{
      renderFps: number;
      ok: boolean;
      finalHash: string;
      divergenceTick: number | null;
    }>;
  };

  expect(result.direct.ok, JSON.stringify(result.direct.divergence)).toBe(true);
  expect(result.direct.finalHash).toBe(artifact.finalHash);

  if (runMatrix) {
    expect(result.matrix.map((entry) => entry.renderFps)).toEqual([
      30,
      45,
      60,
      90,
      120,
      144,
    ]);
    expect(
      result.matrix.every(
        (entry) => entry.ok && entry.finalHash === artifact.finalHash,
      ),
      JSON.stringify(result.matrix),
    ).toBe(true);
  } else {
    expect(result.matrix).toEqual([]);
  }
});
