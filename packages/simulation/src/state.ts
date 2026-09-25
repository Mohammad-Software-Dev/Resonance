import {
  asRevision,
  type EntityId,
  type Revision,
  type TargetId,
  type Tick,
  type Vec3,
} from "@resonance/game-data";

export type MovementMode =
  | "grounded"
  | "airborne"
  | "evade"
  | "attract"
  | "repelRecovery";

export interface WayfarerState {
  readonly entityId: EntityId;
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
  attractTargetId: TargetId | 0;
  stateRevision: Revision;
}

export interface WayfarerSnapshot {
  readonly entityId: EntityId;
  readonly position: Vec3;
  readonly velocity: Vec3;
  readonly up: Vec3;
  readonly facing: -1 | 1;
  readonly movementMode: MovementMode;
  readonly grounded: boolean;
  readonly groundEntityId: EntityId | 0;
  readonly coyoteTicksRemaining: number;
  readonly jumpBufferTicksRemaining: number;
  readonly evadeTicksRemaining: number;
  readonly attractTargetId: TargetId | 0;
  readonly stateRevision: Revision;
}

export interface SimSnapshot {
  readonly tick: Tick;
  readonly wayfarers: readonly WayfarerSnapshot[];
}

export function createInitialWayfarerState(entityId: EntityId): WayfarerState {
  return {
    entityId,
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
    attractTargetId: 0,
    stateRevision: asRevision(0),
  };
}

export function cloneWayfarer(state: WayfarerState | WayfarerSnapshot): WayfarerSnapshot {
  return {
    ...state,
    position: { ...state.position },
    velocity: { ...state.velocity },
    up: { ...state.up },
  };
}
