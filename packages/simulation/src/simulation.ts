import { asRevision, asTick, type EntityId, type Tick } from "@resonance/game-data";
import { dequantizeAxis, type SimInput } from "./input";
import { hashSimulationSnapshot } from "./hash";
import {
  cloneWayfarer,
  createInitialWayfarerState,
  type SimSnapshot,
  type WayfarerState,
} from "./state";

export class Simulation {
  private tickValue = 0;
  private readonly wayfarers = new Map<EntityId, WayfarerState>();

  get tick(): Tick { return asTick(this.tickValue); }

  addWayfarer(entityId: EntityId): WayfarerState {
    if (this.wayfarers.has(entityId)) throw new Error(`Wayfarer ${Number(entityId)} already exists.`);
    const state = createInitialWayfarerState(entityId);
    this.wayfarers.set(entityId, state);
    return state;
  }

  getWayfarer(entityId: EntityId): WayfarerState | undefined {
    return this.wayfarers.get(entityId);
  }

  step(inputByEntity: ReadonlyMap<EntityId, SimInput>): void {
    const nextTick = this.tickValue + 1;

    for (const [entityId, input] of [...inputByEntity].sort(([a], [b]) => Number(a) - Number(b))) {
      if (Number(input.tick) !== nextTick) {
        throw new Error(`Input tick ${Number(input.tick)} does not match simulation tick ${nextTick}.`);
      }

      const state = this.wayfarers.get(entityId);
      if (!state) continue;

      const moveX = dequantizeAxis(input.moveX);
      const nextFacing: -1 | 1 = moveX < 0 ? -1 : moveX > 0 ? 1 : state.facing;
      const nextMode = input.attractPressed && input.targetId !== 0
        ? "attract"
        : state.movementMode === "attract"
          ? (state.grounded ? "grounded" : "airborne")
          : state.movementMode;
      const nextTarget = input.attractPressed ? input.targetId : 0;

      if (nextFacing !== state.facing || nextMode !== state.movementMode || nextTarget !== state.attractTargetId) {
        state.stateRevision = asRevision(Number(state.stateRevision) + 1);
      }

      state.facing = nextFacing;
      state.movementMode = nextMode;
      state.attractTargetId = nextTarget;
    }

    this.tickValue = nextTick;
  }

  createSnapshot(): SimSnapshot {
    return {
      tick: this.tick,
      wayfarers: [...this.wayfarers.values()]
        .sort((a, b) => Number(a.entityId) - Number(b.entityId))
        .map(cloneWayfarer),
    };
  }

  restoreSnapshot(snapshot: SimSnapshot): void {
    this.tickValue = Number(snapshot.tick);
    this.wayfarers.clear();
    for (const saved of [...snapshot.wayfarers].sort((a, b) => Number(a.entityId) - Number(b.entityId))) {
      this.wayfarers.set(saved.entityId, {
        ...saved,
        position: { ...saved.position },
        velocity: { ...saved.velocity },
        up: { ...saved.up },
      });
    }
  }

  stateHash(): string {
    return hashSimulationSnapshot(this.createSnapshot());
  }
}
