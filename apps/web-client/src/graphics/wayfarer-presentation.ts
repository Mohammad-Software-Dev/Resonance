export type WayfarerPresentationMode = "idle" | "run" | "air" | "attract" | "repel";

export interface WayfarerPresentationInput {
  readonly velocityX: number;
  readonly velocityY: number;
  readonly grounded: boolean;
  readonly attractActive: boolean;
  readonly repelActive: boolean;
  readonly facing: -1 | 1;
}

export interface WayfarerPresentationPose {
  readonly mode: WayfarerPresentationMode;
  readonly bodyLean: number;
  readonly gaitAmplitude: number;
  readonly gaitFrequency: number;
  readonly armBias: number;
  readonly legBias: number;
  readonly fabricLift: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function wayfarerPresentationPose(
  input: WayfarerPresentationInput,
): WayfarerPresentationPose {
  if (input.repelActive) {
    return {
      mode: "repel",
      bodyLean: -input.facing * 0.14,
      gaitAmplitude: 0,
      gaitFrequency: 1,
      armBias: input.facing * 0.62,
      legBias: -input.facing * 0.1,
      fabricLift: 0.34,
    };
  }
  if (input.attractActive) {
    return {
      mode: "attract",
      bodyLean: input.facing * 0.11,
      gaitAmplitude: 0.08,
      gaitFrequency: 5.5,
      armBias: -input.facing * 0.48,
      legBias: input.facing * 0.08,
      fabricLift: 0.24,
    };
  }
  if (!input.grounded) {
    return {
      mode: "air",
      bodyLean: clamp(input.velocityY * -0.018, -0.12, 0.12),
      gaitAmplitude: 0.04,
      gaitFrequency: 3.4,
      armBias: input.facing * -0.18,
      legBias: input.velocityY >= 0 ? 0.16 : -0.08,
      fabricLift: 0.28,
    };
  }
  if (Math.abs(input.velocityX) > 0.35) {
    return {
      mode: "run",
      bodyLean: clamp(input.velocityX * -0.018, -0.13, 0.13),
      gaitAmplitude: clamp(Math.abs(input.velocityX) * 0.06, 0.2, 0.46),
      gaitFrequency: 10.5,
      armBias: 0,
      legBias: 0,
      fabricLift: clamp(Math.abs(input.velocityX) * 0.035, 0.12, 0.32),
    };
  }
  return {
    mode: "idle",
    bodyLean: 0,
    gaitAmplitude: 0.035,
    gaitFrequency: 2.2,
    armBias: 0,
    legBias: 0,
    fabricLift: 0,
  };
}
