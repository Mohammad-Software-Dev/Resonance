import {
  SIM_DT_SECONDS,
  type AttractConfig,
  type ResonanceTargetState,
  type Revision,
  type TargetId,
  type Vec3,
} from "@resonance/game-data";
import type { MovementState } from "./controller";

export type AttractCancelReason =
  | "released"
  | "target-missing"
  | "target-invalid"
  | "target-revision"
  | "blocked";

export type AttractSemanticEvent =
  | { readonly type: "started"; readonly targetId: TargetId }
  | { readonly type: "arrived"; readonly targetId: TargetId }
  | { readonly type: "cancelled"; readonly targetId: TargetId; readonly reason: AttractCancelReason };

export interface AttractRuntimeState {
  targetId: TargetId | 0;
  targetRevision: Revision | 0;
  ticksActive: number;
  blockedTicks: number;
  arrived: boolean;
  requiresRelease: boolean;
}

export interface AttractStepResult {
  readonly desiredTranslation: Vec3;
  readonly distance: number;
  readonly radialAcceleration: number;
  readonly event: AttractSemanticEvent | null;
}

export function createAttractRuntimeState(): AttractRuntimeState {
  return {
    targetId: 0,
    targetRevision: 0,
    ticksActive: 0,
    blockedTicks: 0,
    arrived: false,
    requiresRelease: false,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function length2(x: number, y: number): number {
  return Math.hypot(x, y);
}

function sampleAcceleration(distance: number, config: AttractConfig): number {
  const profile = config.accelerationProfile;
  if (profile.length === 0) return 0;

  const first = profile[0];
  if (!first) return 0;
  if (distance <= first.distance) return first.acceleration;

  for (let index = 1; index < profile.length; index += 1) {
    const upper = profile[index];
    const lower = profile[index - 1];
    if (!upper || !lower) continue;
    if (distance <= upper.distance) {
      const span = upper.distance - lower.distance;
      const alpha = span <= 1e-8 ? 1 : (distance - lower.distance) / span;
      return lower.acceleration + (upper.acceleration - lower.acceleration) * alpha;
    }
  }

  return profile[profile.length - 1]?.acceleration ?? 0;
}

function cancel(
  runtime: AttractRuntimeState,
  reason: AttractCancelReason,
): AttractSemanticEvent | null {
  if (reason === "released") runtime.requiresRelease = false;
  if (runtime.targetId === 0) return null;
  const targetId = runtime.targetId;
  runtime.targetId = 0;
  runtime.targetRevision = 0;
  runtime.ticksActive = 0;
  runtime.blockedTicks = 0;
  runtime.arrived = false;
  runtime.requiresRelease = reason !== "released";
  return { type: "cancelled", targetId, reason };
}

export function cancelAttract(
  state: MovementState,
  runtime: AttractRuntimeState,
  reason: AttractCancelReason,
): AttractSemanticEvent | null {
  const event = cancel(runtime, reason);
  if (state.movementMode === "attract") {
    state.movementMode = state.grounded ? "grounded" : "airborne";
  }
  return event;
}

export function stepAttract(
  state: MovementState,
  runtime: AttractRuntimeState,
  target: ResonanceTargetState | undefined,
  tangentialInput: number,
  config: AttractConfig,
): AttractStepResult {
  if (runtime.requiresRelease) {
    return {
      desiredTranslation: { x: 0, y: 0, z: 0 },
      distance: 0,
      radialAcceleration: 0,
      event: null,
    };
  }

  if (!target) {
    return {
      desiredTranslation: { x: 0, y: 0, z: 0 },
      distance: 0,
      radialAcceleration: 0,
      event: cancelAttract(state, runtime, "target-missing"),
    };
  }

  if (!target.active || !target.attractable) {
    return {
      desiredTranslation: { x: 0, y: 0, z: 0 },
      distance: 0,
      radialAcceleration: 0,
      event: cancelAttract(state, runtime, "target-invalid"),
    };
  }

  let event: AttractSemanticEvent | null = null;
  if (runtime.targetId === 0) {
    runtime.targetId = target.id;
    runtime.targetRevision = target.revision;
    runtime.ticksActive = 0;
    runtime.blockedTicks = 0;
    runtime.arrived = false;
    event = { type: "started", targetId: target.id };
  } else if (runtime.targetId !== target.id) {
    return {
      desiredTranslation: { x: 0, y: 0, z: 0 },
      distance: 0,
      radialAcceleration: 0,
      event: cancelAttract(state, runtime, "target-invalid"),
    };
  } else if (runtime.targetRevision !== target.revision) {
    return {
      desiredTranslation: { x: 0, y: 0, z: 0 },
      distance: 0,
      radialAcceleration: 0,
      event: cancelAttract(state, runtime, "target-revision"),
    };
  }

  const dx = target.position.x - state.position.x;
  const dy = target.position.y - state.position.y;
  const distance = length2(dx, dy);
  const invDistance = distance > 1e-8 ? 1 / distance : 0;
  const radialX = dx * invDistance;
  const radialY = dy * invDistance;
  const tangentX = -radialY;
  const tangentY = radialX;
  const steer = clamp(tangentialInput, -1, 1);

  let radialAcceleration = sampleAcceleration(distance, config);
  if (config.arrivalMode === "radiusBlend" && distance < config.arrivalRadius) {
    radialAcceleration *= clamp(distance / config.arrivalRadius, 0, 1);
  }

  state.velocity.x += (
    radialX * radialAcceleration
    + tangentX * steer * config.tangentialSteeringAcceleration
  ) * SIM_DT_SECONDS;
  state.velocity.y += (
    radialY * radialAcceleration
    + tangentY * steer * config.tangentialSteeringAcceleration
  ) * SIM_DT_SECONDS;

  if (config.arrivalMode === "softCapture" && distance < config.arrivalRadius) {
    const radialSpeed = state.velocity.x * radialX + state.velocity.y * radialY;
    if (Math.abs(radialSpeed) > config.softCaptureRadialSpeed) {
      const desiredRadialSpeed = Math.sign(radialSpeed) * config.softCaptureRadialSpeed;
      const correction = desiredRadialSpeed - radialSpeed;
      state.velocity.x += radialX * correction;
      state.velocity.y += radialY * correction;
    }
  }

  const speed = length2(state.velocity.x, state.velocity.y);
  if (speed > config.maxSpeed) {
    const scale = config.maxSpeed / speed;
    state.velocity.x *= scale;
    state.velocity.y *= scale;
  }

  runtime.ticksActive += 1;
  state.movementMode = "attract";
  state.grounded = false;
  state.groundEntityId = 0;

  if (!runtime.arrived && distance <= config.arrivalRadius) {
    runtime.arrived = true;
    event = { type: "arrived", targetId: target.id };
  } else if (distance > config.arrivalRadius * 1.25) {
    runtime.arrived = false;
  }

  return {
    desiredTranslation: {
      x: clamp(
        state.velocity.x * SIM_DT_SECONDS,
        -config.maxTranslationPerTick,
        config.maxTranslationPerTick,
      ),
      y: clamp(
        state.velocity.y * SIM_DT_SECONDS,
        -config.maxTranslationPerTick,
        config.maxTranslationPerTick,
      ),
      z: 0,
    },
    distance,
    radialAcceleration,
    event,
  };
}

export function recordAttractCollision(
  state: MovementState,
  runtime: AttractRuntimeState,
  blocked: boolean,
  config: AttractConfig,
): AttractSemanticEvent | null {
  if (runtime.targetId === 0) return null;
  runtime.blockedTicks = blocked ? runtime.blockedTicks + 1 : 0;
  if (runtime.blockedTicks < config.collisionCancelTicks) return null;
  return cancelAttract(state, runtime, "blocked");
}
