export type WayfarerPresentationMotionMode =
  | "idle"
  | "run"
  | "air"
  | "evade"
  | "attract"
  | "repel";

export interface WayfarerPresentationMotionInput {
  readonly elapsedSeconds: number;
  readonly velocityX: number;
  readonly velocityY: number;
  readonly grounded: boolean;
  readonly movementMode:
    | "grounded"
    | "airborne"
    | "evade"
    | "attract"
    | "repelRecovery";
  readonly attractActive: boolean;
  readonly repelActive: boolean;
}

export interface WayfarerPresentationPose {
  readonly mode: WayfarerPresentationMotionMode;
  readonly rootYOffset: number;
  readonly rootLeanZ: number;
  readonly rootScaleY: number;
  readonly helmetTiltZ: number;
  readonly emitterScale: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function wayfarerPresentationMotionMode(
  input: WayfarerPresentationMotionInput,
): WayfarerPresentationMotionMode {
  if (input.repelActive || input.movementMode === "repelRecovery") return "repel";
  if (input.movementMode === "evade") return "evade";
  if (input.attractActive || input.movementMode === "attract") return "attract";
  if (!input.grounded || input.movementMode === "airborne") return "air";
  if (Math.abs(input.velocityX) > 0.35) return "run";
  return "idle";
}

export function wayfarerPresentationPose(
  input: WayfarerPresentationMotionInput,
): WayfarerPresentationPose {
  const mode = wayfarerPresentationMotionMode(input);
  const t = Number.isFinite(input.elapsedSeconds) ? input.elapsedSeconds : 0;
  const speed = clamp(Math.abs(input.velocityX) / 8, 0, 1);

  switch (mode) {
    case "run": {
      const gait = Math.sin(t * (8.5 + speed * 3.5));
      return {
        mode,
        rootYOffset: Math.abs(gait) * 0.045 * speed,
        rootLeanZ: clamp(-0.04 - speed * 0.055, -0.105, 0),
        rootScaleY: 0.985 + Math.abs(gait) * 0.018,
        helmetTiltZ: gait * 0.018,
        emitterScale: 1.04 + speed * 0.07,
      };
    }
    case "air": {
      const vertical = clamp(input.velocityY / 10, -1, 1);
      return {
        mode,
        rootYOffset: 0,
        rootLeanZ: clamp(-vertical * 0.075 - Math.sign(input.velocityX) * 0.025, -0.12, 0.12),
        rootScaleY: 1.025,
        helmetTiltZ: clamp(-vertical * 0.045, -0.06, 0.06),
        emitterScale: 1.08,
      };
    }
    case "evade":
      return {
        mode,
        rootYOffset: -0.085,
        rootLeanZ: -0.19,
        rootScaleY: 0.87,
        helmetTiltZ: -0.06,
        emitterScale: 1.18,
      };
    case "attract": {
      const pulse = 0.5 + 0.5 * Math.sin(t * 8.2);
      return {
        mode,
        rootYOffset: 0.012 + pulse * 0.012,
        rootLeanZ: -0.065,
        rootScaleY: 0.975,
        helmetTiltZ: -0.035,
        emitterScale: 1.22 + pulse * 0.16,
      };
    }
    case "repel": {
      const recoil = 0.5 + 0.5 * Math.sin(t * 12.5);
      return {
        mode,
        rootYOffset: 0.018,
        rootLeanZ: 0.14 + recoil * 0.035,
        rootScaleY: 0.9 + recoil * 0.025,
        helmetTiltZ: 0.055,
        emitterScale: 1.3 + recoil * 0.16,
      };
    }
    case "idle":
    default: {
      const breath = Math.sin(t * 2.1);
      return {
        mode: "idle",
        rootYOffset: 0.012 + breath * 0.012,
        rootLeanZ: breath * 0.006,
        rootScaleY: 1 + breath * 0.008,
        helmetTiltZ: -breath * 0.009,
        emitterScale: 1.02 + (0.5 + 0.5 * breath) * 0.05,
      };
    }
  }
}
