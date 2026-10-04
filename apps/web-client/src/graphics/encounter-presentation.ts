export type EncounterStage =
  | "breach"
  | "resonance"
  | "repel"
  | "relay"
  | "complete";

export interface EncounterPresentation {
  readonly hostileBaseX: number;
  readonly cameraFocusX: number | null;
  readonly bracketAlpha: number;
  readonly scanAlphaFloor: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function encounterPresentation(
  playerX: number,
  stage: EncounterStage,
): EncounterPresentation {
  const encounterActive = stage === "breach"
    || stage === "resonance"
    || stage === "repel";
  const approach = clamp((playerX + 4.2) / 5.4, 0, 1);
  return {
    hostileBaseX: 3.15,
    cameraFocusX: encounterActive && playerX > -3.65 ? 3.15 : null,
    bracketAlpha: encounterActive ? 0.26 + approach * 0.28 : 0.12,
    scanAlphaFloor: encounterActive ? 0.20 + approach * 0.16 : 0.10,
  };
}
