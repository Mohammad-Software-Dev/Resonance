# M0 Simulation Tick and State Contract

**Status:** Canonical M0 simulation contract  
**Purpose:** Define the deterministic gameplay loop that both local solo and M1 dedicated server will execute.

## Fixed step

Canonical gameplay step:

**60 Hz**

```text
SIM_HZ = 60
DT = 1 / 60 seconds
```

Rendering is variable and may run above/below 60 fps.

Gameplay state advances only in fixed simulation ticks.

## Main interfaces

Conceptual API:

```ts
export interface SimInput {
  tick: Tick;
  moveX: QuantizedAxis;
  moveY: QuantizedAxis;
  jumpPressed: boolean;
  jumpHeld: boolean;
  evadePressed: boolean;
  attractPressed: boolean;
  repelPressed: boolean;
  targetId: TargetId | 0;
}

export interface Simulation {
  readonly tick: Tick;
  step(inputByEntity: ReadonlyMap<EntityId, SimInput>): SimStepResult;
  createSnapshot(): SimSnapshot;
  restoreSnapshot(snapshot: SimSnapshot): void;
}
```

M0 may optimize the representation later, but semantics remain.

## Input sampling

Browser samples raw devices every render frame.

Before a simulation tick:

- latest axes are quantized;
- edge-triggered buttons are latched until consumed;
- exactly one simulation input record is produced per player per fixed tick.

M1 uses the same `SimInput` as the network/prediction foundation.

## Quantization

Prediction-critical analog values are quantized before entering simulation.

Example starting point:

- signed movement axis: int8 or int16 normalized range;
- aim/target direction: discrete/quantized only when needed.

Do not let browser/gamepad floating-point noise become different simulation input across client/server.

## Tick order

Canonical per-tick high-level order:

1. apply queued room/system commands;
2. resolve entity inputs;
3. update timers/state transitions;
4. update target eligibility/revisions;
5. update deterministic moving anchors;
6. evaluate Wayfarer movement intent;
7. apply Resonance movement contribution;
8. resolve collision/grounding;
9. update final player state;
10. update gameplay objects;
11. emit semantic events;
12. finalize deterministic debug state/hash.

## State separation

### Authoritative simulation state

Contains gameplay-relevant state only:

- position;
- velocity;
- movement mode;
- grounded state;
- facing;
- current target;
- target/revision state;
- timers;
- authored moving-anchor phase.

### Presentation state

Not authoritative:

- animation blend;
- particles;
- camera shake;
- sound playback;
- trail positions;
- render interpolation;
- UI animation.

Presentation reacts to simulation state/events.

## M0 Wayfarer state

```ts
export interface WayfarerState {
  entityId: EntityId;
  position: Vec3;
  velocity: Vec3;
  up: Vec3Unit;
  facing: -1 | 1;

  movementMode:
    | "grounded"
    | "airborne"
    | "evade"
    | "attract"
    | "repelRecovery";

  grounded: boolean;
  groundEntityId: EntityId | 0;

  coyoteTicksRemaining: number;
  jumpBufferTicksRemaining: number;
  evadeTicksRemaining: number;
  attractTargetId: TargetId | 0;

  stateRevision: Revision;
}
```

Final representation may become more data-oriented, but behavior semantics stay stable.

## Deterministic time

Gameplay timing is expressed in ticks/integer counters.

Examples:

- coyote time;
- jump buffer;
- evade duration;
- repel recovery.

UI may convert ticks to seconds for display.

## RNG

Use one approved deterministic seeded PRNG.

RNG state is part of the simulation snapshot where gameplay uses it.

No direct `Math.random()` inside simulation packages.

## Math policy

Prediction-critical branches should prefer stable operations and replay-verified math.

Do not prematurely replace all floating-point math. Use cross-runtime replay/hash tests to identify real drift first.

## Snapshot

Snapshot must restore complete M0 gameplay state.

It supports:

- deterministic tests;
- future M1 reconciliation;
- Echo/debug tools;
- later save adapters.

It is not the same as the campaign save format.

## Hash

Produce a canonical debug hash from simulation state.

Exclude presentation data.

Use it for:

- replay comparisons;
- cross-browser checks;
- client/server drift diagnosis.

## Render interpolation

Maintain previous and current simulation state plus render alpha.

Presentation transform interpolates between fixed states.

Local predicted-player correction smoothing is added in M1.

## Slow-frame behavior

If browser stalls:

- catch up only to a configured maximum fixed-step count;
- do not run hundreds of ticks in one render frame.

Solo hidden tab:

- pause cleanly.

M1 co-op:

- server remains authoritative;
- client resync/reconnect policy handles long background intervals.

## M0 deterministic fixture

Required fixture:

- flat room;
- one static target;
- one moving parametric target;
- one wall;
- one slope;
- one ledge.

Recorded sequence:

- run;
- jump;
- Attract;
- release;
- Repel;
- land.

Run the same 10,000-tick trace in:

- Chrome;
- Firefox;
- Safari/macOS;
- Node.

Compare canonical state hashes at checkpoints.

## M0 acceptance

- gameplay is independent of render frame rate;
- one input record exists per player per fixed tick;
- snapshots restore cleanly;
- deterministic fixture matches across approved runtimes using the deterministic Rapier build;
- no Babylon types appear in simulation public APIs.
