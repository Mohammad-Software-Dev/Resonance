import {
  SIM_DT_SECONDS,
  type MovementConfig,
  type RepelConfig,
  type ResonanceTargetState,
  type TargetId,
  type Vec3,
} from "@resonance/game-data";
import type { MovementState } from "./controller";

export type RepelRejectReason =
  | "target-missing"
  | "target-invalid"
  | "target-overlap"
  | "recovery-active";

export type RepelSemanticEvent =
  | { readonly type: "repelled"; readonly targetId: TargetId }
  | { readonly type: "rejected"; readonly targetId: TargetId | 0; readonly reason: RepelRejectReason }
  | { readonly type: "recovery-ended"; readonly targetId: TargetId };

export interface RepelRuntimeState {
  lastTargetId: TargetId | 0;
  uses: number;
}

export interface RepelStepResult {
  readonly applied: boolean;
  readonly desiredTranslation: Vec3;
  readonly outwardDirection: Vec3;
  readonly radialSpeedBefore: number;
  readonly radialSpeedAfter: number;
  readonly event: RepelSemanticEvent;
}

export interface RepelRecoveryStepResult {
  readonly desiredTranslation: Vec3;
  readonly event: RepelSemanticEvent | null;
}

export function createRepelRuntimeState(): RepelRuntimeState {
  return { lastTargetId: 0, uses: 0 };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function clampVelocity(state: MovementState, maxSpeed: number): void {
  const speed = Math.hypot(state.velocity.x, state.velocity.y);
  if (speed <= maxSpeed || speed <= 1e-8) return;
  const scale = maxSpeed / speed;
  state.velocity.x *= scale;
  state.velocity.y *= scale;
}

function translation(state: MovementState, maxPerTick: number): Vec3 {
  return {
    x: clamp(state.velocity.x * SIM_DT_SECONDS, -maxPerTick, maxPerTick),
    y: clamp(state.velocity.y * SIM_DT_SECONDS, -maxPerTick, maxPerTick),
    z: 0,
  };
}

function rejected(
  targetId: TargetId | 0,
  reason: RepelRejectReason,
): RepelStepResult {
  return {
    applied: false,
    desiredTranslation: { x: 0, y: 0, z: 0 },
    outwardDirection: { x: 0, y: 0, z: 0 },
    radialSpeedBefore: 0,
    radialSpeedAfter: 0,
    event: { type: "rejected", targetId, reason },
  };
}

export function stepRepel(
  state: MovementState,
  runtime: RepelRuntimeState,
  target: ResonanceTargetState | undefined,
  config: RepelConfig,
): RepelStepResult {
  if (state.repelRecoveryTicksRemaining > 0) {
    return rejected(target?.id ?? 0, "recovery-active");
  }
  if (!target) return rejected(0, "target-missing");
  if (!target.active || !target.repelable) return rejected(target.id, "target-invalid");

  const dx = state.position.x - target.position.x;
  const dy = state.position.y - target.position.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= 1e-6) return rejected(target.id, "target-overlap");

  const outwardX = dx / distance;
  const outwardY = dy / distance;
  const tangentX = -outwardY;
  const tangentY = outwardX;

  const radialBefore = state.velocity.x * outwardX + state.velocity.y * outwardY;
  const tangentialBefore = state.velocity.x * tangentX + state.velocity.y * tangentY;

  const preservedOutward = Math.max(0, radialBefore) * config.outwardRadialPreservation;
  const radialAfter = preservedOutward + config.impulse;
  const tangentialAfter = tangentialBefore * config.tangentialPreservation;

  state.velocity.x = outwardX * radialAfter + tangentX * tangentialAfter;
  state.velocity.y = outwardY * radialAfter + tangentY * tangentialAfter;
  clampVelocity(state, config.maxResultingSpeed);

  state.grounded = false;
  state.groundEntityId = 0;
  state.coyoteTicksRemaining = 0;
  state.jumpBufferTicksRemaining = 0;
  state.evadeTicksRemaining = 0;
  state.repelRecoveryTicksRemaining = config.recoveryTicks;
  state.movementMode = "repelRecovery";

  runtime.lastTargetId = target.id;
  runtime.uses += 1;

  const actualRadialAfter =
    state.velocity.x * outwardX + state.velocity.y * outwardY;

  return {
    applied: true,
    desiredTranslation: translation(state, config.maxTranslationPerTick),
    outwardDirection: { x: outwardX, y: outwardY, z: 0 },
    radialSpeedBefore: radialBefore,
    radialSpeedAfter: actualRadialAfter,
    event: { type: "repelled", targetId: target.id },
  };
}

export function stepRepelRecovery(
  state: MovementState,
  runtime: RepelRuntimeState,
  moveX: number,
  movementConfig: MovementConfig,
  repelConfig: RepelConfig,
): RepelRecoveryStepResult {
  if (state.repelRecoveryTicksRemaining <= 0) {
    state.repelRecoveryTicksRemaining = 0;
    if (state.movementMode === "repelRecovery") {
      state.movementMode = state.grounded ? "grounded" : "airborne";
    }
    return {
      desiredTranslation: translation(state, repelConfig.maxTranslationPerTick),
      event: null,
    };
  }

  const steer = clamp(moveX, -1, 1);
  state.velocity.x +=
    steer * repelConfig.recoverySteeringAcceleration * SIM_DT_SECONDS;
  state.velocity.y = Math.max(
    state.velocity.y
      - movementConfig.gravity * repelConfig.recoveryGravityScale * SIM_DT_SECONDS,
    -movementConfig.maxFallSpeed,
  );
  clampVelocity(state, repelConfig.maxResultingSpeed);

  state.repelRecoveryTicksRemaining -= 1;
  state.movementMode = state.repelRecoveryTicksRemaining > 0
    ? "repelRecovery"
    : state.grounded
      ? "grounded"
      : "airborne";

  const ended = state.repelRecoveryTicksRemaining === 0 && runtime.lastTargetId !== 0;
  return {
    desiredTranslation: translation(state, repelConfig.maxTranslationPerTick),
    event: ended
      ? { type: "recovery-ended", targetId: runtime.lastTargetId }
      : null,
  };
}
