# Resonance Movement, Physics and Echo — Browser Architecture

**Status:** Canonical shared-simulation specification  
**Supersedes:** Unreal CharacterMovement-specific implementation

## Principle

Movement feel is authored gameplay, not emergent rigid-body physics.

Rapier provides:

- collision world;
- shape casts;
- ray casts;
- contact queries;
- selected rigid bodies/joints.

The Wayfarer controller provides:

- acceleration;
- jump;
- evade;
- Attract;
- Repel;
- Latch;
- Orbit;
- Vector Shift;
- external current response;
- local gravity frame;
- recovery.

## Simulation ownership

Canonical gameplay code lives in engine-independent TypeScript packages.

Both:

- local client prediction;
- authoritative Node game server

execute the same core functions.

## Fixed simulation

Use:

- 60 Hz fixed gameplay step;
- accumulator on render client;
- interpolation for presentation;
- deterministic input command per tick.

Never tie game feel to browser `requestAnimationFrame()` delta directly.

## Kinematic player

The Wayfarer is represented by a kinematic collider/capsule.

Pipeline per simulation tick:

1. read normalized input command;
2. update movement state;
3. calculate desired motion;
4. apply authored Resonance/external-field contribution;
5. query/cast against Rapier world;
6. resolve safe translation;
7. update velocity/state;
8. emit semantic gameplay events.

Do not use a free dynamic rigid body for the player.

## Discrete mass model

Keep design mass classes:

- Feather;
- Light;
- Medium;
- Heavy;
- Anchored.

Gameplay response comes from authored data, not arbitrary kilograms.

## Stable IDs

Gameplay interactions use stable identifiers:

- TargetID;
- RelationshipID;
- ObjectID;
- RoomID;
- StateRevision.

Render mesh/node identity is never persistent gameplay truth.

## Attract

Input references a valid TargetID.

Simulation derives:

- direction;
- force/acceleration profile;
- max speed;
- cancellation;
- target mobility;
- local gravity interaction.

Client predicts using the same target data revision as server.

## Repel

Usually an impulse/action layered onto current movement.

Input includes:

- TargetID;
- action sequence;
- optional charge/profile.

Server validates target and state.

## Latch

Latch commits toward target using an authored state machine.

No spring-joint gameplay dependency.

## Orbit

Orbit maintains authored radius and tangential movement around a valid target.

Critical orbit movement uses deterministic math/data.

## Vector Shift

Consumes an authored airborne reassignment opportunity.

It changes intended velocity/route without reintroducing general free physics.

## Flux / Phase / Invert

The shared simulation owns their semantic state:

- Flux -> TargetEligibilityRevision;
- Phase -> PlayerStateMask;
- Invert -> RelationshipRevision.

Babylon merely presents the result.

## Moving anchors

Critical moving anchors follow deterministic parametric paths.

Replicate:

- PathID;
- server start tick;
- phase/time;
- state revision.

Do not replicate raw transform every frame as the primary truth.

## Dynamic shared objects

Only use dynamic rigid-body simulation where gameplay materially benefits.

Examples:

- selected projectile;
- small throwable component;
- debris with bounded importance.

High-precision traversal surfaces and boss machinery should use authored/parametric motion.

## Rapier determinism rules

Resonance uses Rapier's explicit deterministic WASM build for prediction-critical physics. Cross-platform reproducibility still requires the same Rapier version, identical initial conditions, deterministic construction/removal order and deterministic prediction inputs.

Therefore simulation code must also avoid nondeterministic inputs.

Rules:

- fixed creation/destruction order;
- stable IDs;
- stable iteration order;
- seeded RNG;
- no wall-clock gameplay decisions;
- avoid cross-platform-sensitive transcendental math in authoritative deterministic branches where possible;
- version-lock Rapier between client/server.

A client and server with different Rapier/simulation versions may not share a room.

## Prediction

Local client keeps:

- input history;
- predicted state history;
- acknowledged server tick.

On authoritative snapshot:

1. compare acknowledged state;
2. if outside tolerance, restore authoritative state;
3. replay unacknowledged input;
4. presentation smooths small visual correction.

Do not smooth gameplay collision state itself over long periods.

## Echo

Echo records:

- tick-relative input;
- semantic action;
- TargetID;
- RelationshipID where relevant;
- validated state references.

It does not record rendered transforms as the primary behavior.

Playback runs through the same simulation functions.

This supports:

- deterministic solo puzzle actions;
- boss interactions;
- robust save/reload;
- network spectator/debug replay.

## Echo invalidation

If a required target/state revision becomes invalid:

- Echo reports explicit invalid trace;
- room/mechanic returns to safe setup state;
- player can re-record quickly.

No silent wrong-target retargeting.

## Solo vs co-op

Solo:

- local authoritative simulation;
- Echo is local deterministic actor.

Co-op:

- dedicated server authority;
- human players replace required simultaneous Echo roles where designed;
- server validates Echo playback if host/session uses Echo.

## Physics workers

Version 1 baseline:

- gameplay simulation remains on main thread in browser;
- server simulation runs in Node event loop/process;
- heavy asset/data work may use Web Workers.

Do not introduce SharedArrayBuffer/worker-simulation complexity before profiling proves it necessary.

This avoids an extra synchronization layer in the latency-critical controller.

## Performance budget

Simulation target on Tier M client:

- average gameplay simulation <2 ms/frame;
- p99 <4 ms in normal rooms.

Server room target:

- 60 Hz tick;
- enough headroom for 4 players + encounter actors;
- no long GC pauses.

## Testing

Required deterministic/replay tests:

- 10,000 tick movement trace client/server;
- Attract/Repel route hash;
- moving anchor route;
- Link catch;
- Flux -> Latch;
- Phase re-entry;
- Invert current launch;
- Echo replay 100 cycles;
- boss subsystem reset.

## Acceptance

Movement architecture passes when:

- empty-room controller feels excellent;
- local prediction hides normal RTT;
- 150 ms session remains controllable;
- corrections are small/infrequent;
- Echo replay remains semantically deterministic;
- critical gameplay never depends on visual-frame rate.
