# M0 Rapier Collision and Wayfarer Controller Specification

**Status:** Canonical M0 movement implementation spec  
**Physics package:** deterministic Rapier 3D WASM build

## Representation

Wayfarer uses:

- capsule collider;
- kinematic representation;
- authored movement velocity/state;
- custom gameplay controller;
- Rapier collision/query adapter.

The player is not a free dynamic rigid body.

## Why not rely entirely on the generic Rapier controller

Rapier's built-in character controller is useful and may be used as a collision-resolution primitive during M0, but Resonance has game-specific requirements:

- 2.5D plane constraint;
- arbitrary authored up/gravity frames later;
- Attract/Repel;
- Latch/Orbit;
- moving anchors;
- prediction/replay;
- strict control over grounding/coyote/velocity.

Therefore Resonance owns the high-level controller.

## Physics world adapter

Domain code should not leak Rapier types everywhere.

Conceptual API:

```ts
export interface PhysicsQuery {
  moveCapsule(
    colliderId: PhysicsColliderId,
    desired: Vec3,
    up: Vec3Unit
  ): MovementCollisionResult;

  castCapsule(...args: unknown[]): ShapeCastHit | null;
  raycast(...args: unknown[]): RayHit | null;

  getPlatformMotion(
    entityId: EntityId,
    tick: Tick
  ): PlatformFrame;
}
```

## Deterministic construction

To preserve reproducibility:

- room colliders load in stable sorted ID order;
- entity colliders spawn from deterministic events;
- removals occur in deterministic order;
- moving platform definitions are data-driven;
- content validation rejects duplicate/unstable IDs.

## 2.5D constraint

Authoritative position is 3D.

M0 defaults to:

- gameplay horizontal X;
- vertical Y;
- depth Z constrained to the authored gameplay lane.

Do not collapse physics to 2D because later rooms and authored orientation systems require true 3D collision.

## Grounding

Ground state uses:

- capsule/contact query;
- authored up vector;
- slope threshold;
- ground normal;
- ground entity ID.

Store the ground entity when standing on a moving platform.

## Moving platforms

Critical traversal platforms use deterministic parametric motion.

```ts
interface ParametricMotion {
  pathId: PathId;
  startTick: Tick;
  phaseTicks: number;
}
```

Transform at a tick is computed from authored data.

Do not use arbitrary dynamic rigid-body motion for traversal-critical platforms.

## Horizontal locomotion

Data-driven tuning:

- ground acceleration;
- ground maximum speed;
- air acceleration;
- air maximum speed;
- deceleration;
- turn response.

No magic constants in renderer code.

## Jump

Data:

- jump velocity/impulse;
- coyote ticks;
- buffer ticks;
- variable hold/cut behavior.

Jump result must be identical at 30 and 144 render fps.

## Evade

M0 evade:

- fixed tick duration;
- authored velocity profile;
- normal collision resolution.

Combat invulnerability may remain stubbed until M2.

## Gravity

M0 uses one authored up vector.

Controller API still receives `up` so later rotated/orientation regions do not force a rewrite.

## External movement composition

Starting order:

1. locomotion intent;
2. jump/evade state;
3. gravity;
4. Resonance contribution;
5. moving-platform frame contribution;
6. design safety clamps;
7. collision resolution.

After feel testing locks the order, it becomes part of the network prediction contract.

## Safety caps

Define explicit maximum:

- normal movement speed;
- Attract speed;
- Repel impulse;
- downward speed;
- per-tick translation.

M1 server validation uses the same limits.

## Recovery

M0 includes a safe recovery volume.

If the player exits valid room bounds:

- reset to last safe marker;
- clear transient movement state deterministically.

## Snapshot/debug

M0 deterministic testing records:

- canonical Wayfarer state;
- critical target/platform state;
- Rapier deterministic world/snapshot hash where useful.

A divergence tool should identify the first mismatching tick.

## Telemetry

Record:

- grounded percentage;
- coyote jumps;
- buffered jumps;
- collision iterations;
- maximum movement correction;
- platform-relative error;
- target changes;
- Attract cancellation reasons;
- Repel speed/landing results.

## M0 acceptance

- no tunneling at approved speed caps;
- stable slopes/ledges;
- moving-platform carry is stable;
- Attract/Repel never bypass collision unpredictably;
- controller replay is stable across approved runtimes;
- movement feels authored and precise rather than floaty rigid-body physics.
