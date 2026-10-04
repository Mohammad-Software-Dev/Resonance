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
  const approach = clamp((playerX + 4.6) / 5.8, 0, 1);
  const hostileBaseX = 2.35;
  return {
    hostileBaseX,
    cameraFocusX: encounterActive && playerX > -4.55 ? hostileBaseX : null,
    bracketAlpha: encounterActive ? 0.44 + approach * 0.18 : 0.16,
    scanAlphaFloor: encounterActive ? 0.10 + approach * 0.12 : 0.08,
  };
}
