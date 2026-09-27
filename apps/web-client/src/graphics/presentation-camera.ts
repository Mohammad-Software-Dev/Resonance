export type PresentationCameraStage =
  | "breach"
  | "resonance"
  | "repel"
  | "relay"
  | "complete";

export interface PresentationCameraInput {
  readonly playerX: number;
  readonly playerY: number;
  readonly velocityX: number;
  readonly focusX?: number | null;
  readonly stage?: PresentationCameraStage;
}

export interface PresentationCameraGoal {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly targetY: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function presentationCameraGoal(
  input: PresentationCameraInput,
): PresentationCameraGoal {
  const lookAhead = clamp(input.velocityX * 0.095, -0.72, 0.72);
  const focusX = input.focusX ?? null;
  const focusBias = focusX === null
    ? 0
    : clamp((focusX - input.playerX) * 0.16, -0.72, 0.72);
  const objectiveBias = input.stage === "relay" || input.stage === "complete"
    ? 0.42
    : 0;
  const verticalLift = clamp((input.playerY - 1.1) * 0.16, -0.12, 0.66);

  return {
    x: clamp(input.playerX + lookAhead + focusBias + objectiveBias, -5.05, 5.25),
    y: 2.72 + verticalLift,
    z: -8.55,
    targetY: 1.45 + verticalLift * 0.62,
  };
}

export function cameraSmoothingFactor(
  deltaSeconds: number,
  sharpness = 6.6,
): number {
  const safeDelta = clamp(deltaSeconds, 0, 0.1);
  return 1 - Math.exp(-sharpness * safeDelta);
}
