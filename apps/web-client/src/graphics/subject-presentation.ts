export interface TargetPresentationState {
  readonly selected: boolean;
  readonly active: boolean;
  readonly repelFlash: boolean;
}

export interface ScrapperPresentationPose {
  readonly x: number;
  readonly rotationZ: number;
}

export function targetPresentationScale(state: TargetPresentationState): number {
  if (state.repelFlash) return 0.54;
  if (state.active) return 0.49;
  if (state.selected) return 0.42;
  return 0.31;
}

export function scrapperPresentationPose(
  elapsedSeconds: number,
  baseX = 4.9,
): ScrapperPresentationPose {
  return {
    x: baseX + Math.sin(elapsedSeconds * 0.9) * 0.18,
    rotationZ: -0.11 + Math.sin(elapsedSeconds * 1.3) * 0.025,
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
