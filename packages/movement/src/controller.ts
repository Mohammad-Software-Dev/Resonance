import {
  SIM_DT_SECONDS,
  type EntityId,
  type MovementConfig,
  type Vec3,
} from "@resonance/game-data";

export type MovementMode =
  | "grounded"
  | "airborne"
  | "evade"
  | "attract"
  | "repelRecovery";

export interface MovementState {
  position: Vec3;
  velocity: Vec3;
  up: Vec3;
  facing: -1 | 1;
  movementMode: MovementMode;
  grounded: boolean;
  groundEntityId: EntityId | 0;
  coyoteTicksRemaining: number;
  jumpBufferTicksRemaining: number;
  evadeTicksRemaining: number;
}

export interface MovementInput {
  readonly moveX: number;
  readonly jumpPressed: boolean;
  readonly jumpHeld: boolean;
  readonly evadePressed: boolean;
}

export interface MovementEnvironment {
  readonly grounded: boolean;
  readonly groundEntityId: EntityId | 0;
}

export interface MovementStepResult {
  readonly desiredTranslation: Vec3;
  readonly jumped: boolean;
  readonly startedEvade: boolean;
}

export function createInitialMovementState(): MovementState {
  return {
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    up: { x: 0, y: 1, z: 0 },
    facing: 1,
    movementMode: "airborne",
    grounded: false,
    groundEntityId: 0,
    coyoteTicksRemaining: 0,
    jumpBufferTicksRemaining: 0,
    evadeTicksRemaining: 0,
  };
}

function approach(current: number, target: number, maxDelta: number): number {
  if (current < target) return Math.min(current + maxDelta, target);
  if (current > target) return Math.max(current - maxDelta, target);
  return current;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function stepMovement(
  state: MovementState,
  input: MovementInput,
  environment: MovementEnvironment,
  config: MovementConfig,
): MovementStepResult {
  state.grounded = environment.grounded;
  state.groundEntityId = environment.grounded ? environment.groundEntityId : 0;

  if (state.grounded) {
    state.coyoteTicksRemaining = config.coyoteTicks;
  }

  if (input.jumpPressed) {
    state.jumpBufferTicksRemaining = config.jumpBufferTicks;
  }

  const moveX = clamp(input.moveX, -1, 1);
  if (moveX < 0) state.facing = -1;
  if (moveX > 0) state.facing = 1;

  let startedEvade = false;
  if (input.evadePressed && state.evadeTicksRemaining === 0) {
    state.evadeTicksRemaining = config.evadeDurationTicks;
    state.movementMode = "evade";
    startedEvade = true;
  }

  let jumped = false;

  if (state.evadeTicksRemaining > 0) {
    state.velocity.x = state.facing * config.evadeSpeed;
    state.evadeTicksRemaining -= 1;
  } else {
    const maxSpeed = state.grounded ? config.groundMaxSpeed : config.airMaxSpeed;
    const acceleration = state.grounded ? config.groundAcceleration : config.airAcceleration;
    const targetSpeed = moveX * maxSpeed;
    const rate = Math.abs(moveX) > 0 ? acceleration : config.deceleration;
    state.velocity.x = approach(state.velocity.x, targetSpeed, rate * SIM_DT_SECONDS);

    if (state.jumpBufferTicksRemaining > 0 && state.coyoteTicksRemaining > 0) {
      state.velocity.y = config.jumpVelocity;
      state.grounded = false;
      state.groundEntityId = 0;
      state.coyoteTicksRemaining = 0;
      state.jumpBufferTicksRemaining = 0;
      jumped = true;
    }

    if (!input.jumpHeld && state.velocity.y > config.jumpCutVelocity) {
      state.velocity.y = config.jumpCutVelocity;
    }
  }

  if (!jumped) {
    if (!state.grounded) {
      state.coyoteTicksRemaining = Math.max(0, state.coyoteTicksRemaining - 1);
    }
    state.jumpBufferTicksRemaining = Math.max(0, state.jumpBufferTicksRemaining - 1);
  }

  if (!state.grounded) {
    state.velocity.y = Math.max(
      state.velocity.y - config.gravity * SIM_DT_SECONDS,
      -config.maxFallSpeed,
    );
  } else if (state.velocity.y < 0) {
    state.velocity.y = 0;
  }

  if (state.evadeTicksRemaining > 0) {
    state.movementMode = "evade";
  } else {
    state.movementMode = state.grounded ? "grounded" : "airborne";
  }

  const desiredTranslation = {
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
  };

  return { desiredTranslation, jumped, startedEvade };
}

export interface MovementCollisionFeedback {
  readonly position: Vec3;
  readonly grounded: boolean;
  readonly groundEntityId: EntityId | 0;
  readonly blockedX: boolean;
  readonly hitCeiling: boolean;
}

export function applyMovementCollision(
  state: MovementState,
  feedback: MovementCollisionFeedback,
): void {
  state.position = { ...feedback.position };
  state.grounded = feedback.grounded;
  state.groundEntityId = feedback.grounded ? feedback.groundEntityId : 0;

  if (feedback.blockedX) state.velocity.x = 0;
  if (feedback.hitCeiling && state.velocity.y > 0) state.velocity.y = 0;
  if (feedback.grounded && state.velocity.y < 0) state.velocity.y = 0;

  if (state.evadeTicksRemaining === 0) {
    state.movementMode = feedback.grounded ? "grounded" : "airborne";
  }
}
