import type { SimSnapshot, WayfarerSnapshot } from "./state";

const FNV_OFFSET = 0x811c9dc5;
const FNV_PRIME = 0x01000193;
const FLOAT_SCALE = 1_000_000;

function mix(hash: number, value: number): number {
  let next = hash >>> 0;
  let data = value | 0;
  for (let i = 0; i < 4; i += 1) {
    next ^= data & 0xff;
    next = Math.imul(next, FNV_PRIME) >>> 0;
    data >>= 8;
  }
  return next;
}

function q(value: number): number {
  return Math.round(value * FLOAT_SCALE);
}

function modeCode(state: WayfarerSnapshot): number {
  switch (state.movementMode) {
    case "grounded": return 1;
    case "airborne": return 2;
    case "evade": return 3;
    case "attract": return 4;
    case "repelRecovery": return 5;
  }
}

export function hashSimulationSnapshot(snapshot: SimSnapshot): string {
  let hash = mix(FNV_OFFSET, Number(snapshot.tick));
  const ordered = [...snapshot.wayfarers].sort((a, b) => Number(a.entityId) - Number(b.entityId));

  for (const state of ordered) {
    const values = [
      Number(state.entityId),
      q(state.position.x), q(state.position.y), q(state.position.z),
      q(state.velocity.x), q(state.velocity.y), q(state.velocity.z),
      q(state.up.x), q(state.up.y), q(state.up.z),
      state.facing,
      modeCode(state),
      state.grounded ? 1 : 0,
      Number(state.groundEntityId),
      state.coyoteTicksRemaining,
      state.jumpBufferTicksRemaining,
      state.evadeTicksRemaining,
      state.repelRecoveryTicksRemaining,
      Number(state.attractTargetId),
      Number(state.stateRevision),
    ];
    for (const value of values) hash = mix(hash, value);
  }

  return hash.toString(16).padStart(8, "0");
}
