export interface TargetPresentationState {
  readonly selected: boolean;
  readonly active: boolean;
  readonly repelFlash: boolean;
}

export interface WayfarerSubjectProfile {
  readonly scaleX: number;
  readonly scaleY: number;
  readonly scaleZ: number;
  readonly yawY: number;
  readonly helmetScale: number;
  readonly visorScaleX: number;
}

export interface ScrapperPresentationPose {
  readonly x: number;
  readonly y: number;
  readonly rotationZ: number;
  readonly eyeScale: number;
  readonly damagedArmRotationZ: number;
  readonly loosePlateRotationZ: number;
  readonly scanStrength: number;
}

export function targetPresentationScale(state: TargetPresentationState): number {
  if (state.repelFlash) return 0.54;
  if (state.active) return 0.49;
  if (state.selected) return 0.42;
  return 0.31;
}

export function wayfarerSubjectProfile(): WayfarerSubjectProfile {
  return {
    scaleX: 0.68,
    scaleY: 0.77,
    scaleZ: 0.72,
    yawY: -0.11,
    helmetScale: 0.88,
    visorScaleX: 1.12,
  };
}

export function scrapperPresentationPose(
  elapsedSeconds: number,
  baseX = 4.9,
): ScrapperPresentationPose {
  const scanWave = 0.5 + 0.5 * Math.sin(elapsedSeconds * 2.4 - 0.6);
  return {
    x: baseX + Math.sin(elapsedSeconds * 0.9) * 0.18,
    y: 0.96 + Math.sin(elapsedSeconds * 1.55) * 0.035,
    rotationZ: -0.11 + Math.sin(elapsedSeconds * 1.3) * 0.025,
    eyeScale: 0.86 + Math.sin(elapsedSeconds * 6.2) * 0.14,
    damagedArmRotationZ: -0.48 + Math.sin(elapsedSeconds * 2.1) * 0.08,
    loosePlateRotationZ: 0.22 + Math.sin(elapsedSeconds * 4.2) * 0.08,
    scanStrength: Math.max(0, (scanWave - 0.72) / 0.28),
  };
}


export function targetPresentationVisibility(
  state: TargetPresentationState,
): number {
  if (state.repelFlash || state.active) return 1;
  if (state.selected) return 0.82;
  return 0.38;
}

export function wayfarerFillLightIntensity(elapsedSeconds: number): number {
  return 0.38 + Math.sin(elapsedSeconds * 1.6) * 0.035;
}
