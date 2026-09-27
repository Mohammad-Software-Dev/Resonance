export interface PresentationCameraInput {
  readonly playerX: number;
  readonly playerY: number;
  readonly velocityX: number;
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
  const lookAhead = clamp(input.velocityX * 0.11, -0.85, 0.85);
  const verticalLift = clamp((input.playerY - 1.1) * 0.12, -0.12, 0.52);

  return {
    x: clamp(input.playerX + lookAhead, -3.15, 3.35),
    y: 3.0 + verticalLift,
    z: -10.9,
    targetY: 1.55 + verticalLift * 0.55,
  };
}

export function cameraSmoothingFactor(
  deltaSeconds: number,
  sharpness = 5.8,
): number {
  const safeDelta = clamp(deltaSeconds, 0, 0.1);
  return 1 - Math.exp(-sharpness * safeDelta);
}
