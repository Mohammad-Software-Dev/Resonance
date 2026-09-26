import type { ReplayArtifact } from "@resonance/simulation";
import {
  verifyM0Replay,
  verifyM0ReplayRenderMatrix,
} from "@resonance/test-fixtures";

const status = document.querySelector<HTMLPreElement>("#status");
const verifyReplay = async (artifact: ReplayArtifact) => {
  const direct = await verifyM0Replay(artifact);
  const matrix = await verifyM0ReplayRenderMatrix(artifact);
  return { direct, matrix };
};
Object.assign(window, { __RESONANCE_VERIFY_REPLAY__: verifyReplay });
if (status) status.textContent = "replay harness ready";
