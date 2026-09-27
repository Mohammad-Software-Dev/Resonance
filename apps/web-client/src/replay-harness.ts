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
    ) => Promise<string>;
  }
}

const status = document.querySelector<HTMLPreElement>("#status");
window.__RESONANCE_VERIFY_REPLAY__ = async (
  artifact: ReplayArtifact,
  options?: BrowserReplayOptions,
) => {
  await initializePhysics();
  const direct = await verifyM0Replay(artifact);
  const matrix = options?.renderCadenceMatrix
    ? await verifyM0ReplayRenderMatrix(artifact)
    : [];
  return JSON.stringify({
    direct: {
      ok: direct.ok,
      finalHash: direct.finalHash,
      divergence: direct.divergence,
    },
    matrix,
  });
};
if (status) status.textContent = "replay harness ready";
