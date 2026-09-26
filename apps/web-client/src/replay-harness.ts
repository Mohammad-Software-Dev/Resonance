import { initializePhysics } from "@resonance/physics";
import type { ReplayArtifact } from "@resonance/simulation";
import {
  verifyM0Replay,
  verifyM0ReplayRenderMatrix,
} from "@resonance/test-fixtures";

interface BrowserReplayOptions {
  readonly renderCadenceMatrix?: boolean;
}

declare global {
  interface Window {
    __RESONANCE_VERIFY_REPLAY__?: (
      artifact: ReplayArtifact,
      options?: BrowserReplayOptions,
    ) => Promise<unknown>;
  }
}

const status = document.querySelector<HTMLPreElement>("#status");
window.__RESONANCE_VERIFY_REPLAY__ = async (
  artifact: ReplayArtifact,
  options?: BrowserReplayOptions,
) => {
  console.info("[replay-harness] physics:init:start");
  await initializePhysics();
  console.info("[replay-harness] physics:init:done");

  console.info("[replay-harness] direct:start");
  const direct = await verifyM0Replay(artifact);
  console.info("[replay-harness] direct:done");

  console.info("[replay-harness] matrix:start");
  const matrix = options?.renderCadenceMatrix
    ? await verifyM0ReplayRenderMatrix(artifact)
    : [];
  console.info("[replay-harness] matrix:done");
  return { direct, matrix };
};
if (status) status.textContent = "replay harness ready";
