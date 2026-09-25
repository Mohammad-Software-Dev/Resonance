export interface MovementConfig {
  readonly groundAcceleration: number;
  readonly groundMaxSpeed: number;
  readonly airAcceleration: number;
  readonly airMaxSpeed: number;
  readonly deceleration: number;
  readonly gravity: number;
  readonly jumpVelocity: number;
  readonly jumpCutVelocity: number;
  readonly coyoteTicks: number;
  readonly jumpBufferTicks: number;
  readonly evadeDurationTicks: number;
  readonly evadeSpeed: number;
  readonly maxFallSpeed: number;
  readonly maxTranslationPerTick: number;
}

/**
 * Provisional M0 feel values. These are intentionally centralized so blind
 * movement testing can tune them without changing controller code.
 */
export const M0_MOVEMENT_CONFIG: MovementConfig = {
  groundAcceleration: 48,
  groundMaxSpeed: 7,
  airAcceleration: 30,
  airMaxSpeed: 7,
  deceleration: 56,
  gravity: 30,
  jumpVelocity: 10.5,
  jumpCutVelocity: 4.5,
  coyoteTicks: 6,
  jumpBufferTicks: 6,
  evadeDurationTicks: 10,
  evadeSpeed: 12,
  maxFallSpeed: 18,
  maxTranslationPerTick: 0.5,
};
