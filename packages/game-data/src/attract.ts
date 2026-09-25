export type AttractArrivalMode = "passThrough" | "softCapture" | "radiusBlend";

export interface AttractAccelerationPoint {
  readonly distance: number;
  readonly acceleration: number;
}

export interface AttractConfig {
  readonly accelerationProfile: readonly AttractAccelerationPoint[];
  readonly maxSpeed: number;
  readonly tangentialSteeringAcceleration: number;
  readonly arrivalRadius: number;
  readonly arrivalMode: AttractArrivalMode;
  readonly softCaptureRadialSpeed: number;
  readonly collisionCancelTicks: number;
  readonly maxTranslationPerTick: number;
}

/**
 * Provisional M0.6 feel values. The profile is intentionally authored rather
 * than spring-derived so tuning remains predictable and replay-safe.
 */
export const M0_ATTRACT_CONFIG: AttractConfig = {
  accelerationProfile: [
    { distance: 0, acceleration: 0 },
    { distance: 0.8, acceleration: 12 },
    { distance: 2.5, acceleration: 30 },
    { distance: 6, acceleration: 42 },
    { distance: 10.5, acceleration: 46 },
  ],
  maxSpeed: 15,
  tangentialSteeringAcceleration: 13,
  arrivalRadius: 0.85,
  arrivalMode: "radiusBlend",
  softCaptureRadialSpeed: 5.5,
  collisionCancelTicks: 18,
  maxTranslationPerTick: 0.5,
};
