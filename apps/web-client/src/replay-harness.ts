import type { ReplayArtifact } from "@resonance/simulation";
import {
  verifyM0Replay,
  verifyM0ReplayRenderMatrix,
} from "@resonance/test-fixtures";

declare global {
  interface Window {
    __RESONANCE_VERIFY_REPLAY__?: (artifact: ReplayArtifact) => Promise<unknown>;
  }
}

const status = document.querySelector<HTMLPreElement>("#status");
window.__RESONANCE_VERIFY_REPLAY__ = async (artifact: ReplayArtifact) => {
  const direct = await verifyM0Replay(artifact);
  const matrix = await verifyM0ReplayRenderMatrix(artifact);
  return { direct, matrix };
};
if (status) status.textContent = "replay harness ready";
