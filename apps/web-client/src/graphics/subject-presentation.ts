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
  readonly rotationY: number;
  readonly scaleX: number;
  readonly scaleY: number;
  readonly scaleZ: number;
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
    x: baseX + Math.sin(elapsedSeconds * 0.9) * 0.16,
    y: 1.08 + Math.sin(elapsedSeconds * 1.55) * 0.035,
    rotationZ: -0.11 + Math.sin(elapsedSeconds * 1.3) * 0.025,
    rotationY: -0.2,
    scaleX: 1.04,
    scaleY: 0.72,
    scaleZ: 0.9,
    eyeScale: 0.9 + Math.sin(elapsedSeconds * 6.2) * 0.1,
    damagedArmRotationZ: -0.52 + Math.sin(elapsedSeconds * 2.1) * 0.1,
    loosePlateRotationZ: 0.26 + Math.sin(elapsedSeconds * 4.2) * 0.1,
    scanStrength: 0.18 + scanWave * 0.62,
  };
}


export function targetPresentationVisibility(
  state: TargetPresentationState,
): number {
  if (state.repelFlash || state.active) return 1;
  if (state.selected) return 0.82;
  return 0.3;
}

export function wayfarerFillLightIntensity(elapsedSeconds: number): number {
  return 0.38 + Math.sin(elapsedSeconds * 1.6) * 0.035;
}
