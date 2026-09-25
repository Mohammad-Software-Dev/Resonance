export interface RepelConfig {
  readonly impulse: number;
  readonly tangentialPreservation: number;
  readonly outwardRadialPreservation: number;
  readonly recoveryTicks: number;
  readonly recoverySteeringAcceleration: number;
  readonly recoveryGravityScale: number;
  readonly maxResultingSpeed: number;
  readonly maxTranslationPerTick: number;
}

/**
 * Provisional M0.7 Repel feel values. Repel is an authored target-relative
 * launch: inward radial velocity is replaced, tangential expression is
 * preserved, and the result is capped before collision resolution.
 */
export const M0_REPEL_CONFIG: RepelConfig = {
  impulse: 11.5,
  tangentialPreservation: 0.9,
  outwardRadialPreservation: 0.65,
  recoveryTicks: 9,
  recoverySteeringAcceleration: 14,
  recoveryGravityScale: 0.65,
  maxResultingSpeed: 16.5,
  maxTranslationPerTick: 0.5,
};
