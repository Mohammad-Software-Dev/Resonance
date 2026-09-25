import type { Vec3 } from "@resonance/game-data";

export type TargetAimSource = "gamepad" | "mouse" | "facing";

export interface TargetAimSample {
  readonly gamepadX: number;
  readonly gamepadY: number;
  readonly mouseX: number;
  readonly mouseY: number;
  readonly hasMouse: boolean;
  readonly facing: -1 | 1;
  readonly gamepadDeadzone?: number;
  readonly mouseDeadzone?: number;
}

export interface TargetAimResult {
  readonly vector: Vec3;
  readonly source: TargetAimSource;
}

function normalized2(x: number, y: number): Vec3 | null {
  const magnitude = Math.hypot(x, y);
  if (magnitude <= 1e-8) return null;
  return { x: x / magnitude, y: y / magnitude, z: 0 };
}

export function resolveTargetAim(sample: TargetAimSample): TargetAimResult {
  const gamepadMagnitude = Math.hypot(sample.gamepadX, sample.gamepadY);
  if (gamepadMagnitude > (sample.gamepadDeadzone ?? 0.25)) {
    return {
      vector: normalized2(sample.gamepadX, sample.gamepadY) ?? { x: sample.facing, y: 0, z: 0 },
      source: "gamepad",
    };
  }

  const mouseMagnitude = Math.hypot(sample.mouseX, sample.mouseY);
  if (sample.hasMouse && mouseMagnitude > (sample.mouseDeadzone ?? 0.08)) {
    return {
      vector: normalized2(sample.mouseX, sample.mouseY) ?? { x: sample.facing, y: 0, z: 0 },
      source: "mouse",
    };
  }

  return {
    vector: { x: sample.facing, y: 0, z: 0 },
    source: "facing",
  };
}
