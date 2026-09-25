# Broken Transit Crown — Network, Performance, Sequence-Break and Soft-Lock Audit

**Purpose:** Ensure the first full-toolkit region remains deterministic and recoverable across solo and 1–4 player online sessions.

# Technical principle

The Crown combines many existing systems.

The risk is not one new simulation.

The risk is **interaction density**.

Therefore:

- reuse established authority models;
- cap simultaneous high-complexity systems;
- validate state transitions;
- provide deterministic recovery.

# Concurrency budget

Normal critical room target:

- 1 moving-platform family;
- 1 state/Phase layer;
- 1 Flux/Invert relationship system;
- 1 active co-op relationship;
- 4–8 enemies.

Boss/setpiece may exceed, but must profile explicitly.

# Authority reuse

## Movement

Existing CharacterMovement prediction.

## Flux

Server target state.

## Phase

Server player state + collision mask.

## Invert

Server relationship state.

## Link

Server relationship.

## Echo

Recorded semantic/kinematic trace.

## Rails/platforms

Parametric server-time paths.

Do not invent Crown-specific authority exceptions.

# Link seizure networking

Server owns:

- seized Link ID;
- interceptor;
- start time;
- seizure mode;
- expiry.

Owning clients receive immediate warning.

No client may believe Link is safe while server applies redirected force without prior replicated warning state.

# Adaptive counter networking

Counter triggers derive from server-observed semantic events.

Replicate:

- counter PatternID;
- target category;
- telegraph start;
- active duration.

Do not replicate hidden “AI thought.”

# Room variant state

On room activation:

1. server resolves aggregate state;
2. selects VariantID set;
3. clients receive variant state;
4. collision/gameplay actors activate;
5. decorative presentation follows.

Variant selection must finish before players can commit to state-dependent traversal.

# Sequence-break risks

Full toolkit enables many unexpected routes.

Allow harmless skips.

Protect:

- Assembly Forum trigger;
- Meridian Custodian start;
- Shepherd optional branch ownership;
- Periapsis Gate snapshot;
- irreversible world-state updates.

Use trigger volumes plus authoritative quest-state validation, not invisible walls everywhere.

# Soft-lock categories

## A — Player stranded by Phase return

Use existing safe-return rules.

## B — Flux target expires during sole support

Critical target provides decay grace/recovery.

## C — Invert relation returns mid-platform ride

Platform has authored safe continuation/recovery.

## D — Suppressor removes only anchor

Forbidden by content validation.

## E — Link seizure during revive

Alternative revive path or cancel window required.

## F — world-state variant removes route

Automated critical-path validator.

## G — guest lacks late ability

Session license supplies required Flux/Phase/Invert.

## H — Echo TargetID invalid

Room resets supported interaction and reports invalid trace.

# Late join

Join-safe state includes:

- aggregate state groups;
- room VariantIDs;
- player Phase states;
- active Flux/Invert objects;
- Link states;
- countermeasure state;
- moving-platform server time;
- encounter phase.

Do not late-join a player directly into an unrecoverable aerial commit.

Spawn at nearest safe room/join anchor when necessary.

# Performance stress target

Representative Crown worst case:

- 4 players;
- 2 active Links;
- mixed Phase states;
- 2 Fluxed targets;
- 1 Inverted relationship;
- 3 moving rails;
- 8 Custodian enemies;
- 2 suppressors;
- exterior VFX;
- one prior-region state effect.

Target:

- 60 fps Tier M/Medium;
- stable host game thread;
- no replication burst;
- readable telegraphs.

# Meridian Custodian stress target

- 4 players;
- 4 sector states;
- 6 temporary anchors max;
- 2 Links;
- 1 Link seizure;
- mixed Phase;
- moving rails;
- current field;
- countermeasure event.

Explicit profiling capture required.

# GPU priority

Reduce in this order:

1. distant Crown debris;
2. background regional-state VFX;
3. cloud/particle density;
4. noncritical Tessel visuals;
5. secondary reflections.

Preserve:

- boss/counter cues;
- anchors;
- current direction;
- player state;
- Link.

# CPU priority

Avoid:

- Blueprint tick per counter object;
- full-room Flux candidate scans;
- per-frame route recomputation;
- expensive adaptive AI search.

Use:

- event-driven counters;
- spatial target filtering;
- parametric paths;
- authored decision tables.

# Automated tests

1. Every legal aggregate state loads BTC01–30.
2. Critical-route graph validator finds path in every state.
3. Flux expiry on critical anchor.
4. Invert decay on moving rail.
5. Phase blocked return.
6. Link seizure during revive.
7. 4P mixed-state late join.
8. Anchor suppression validation.
9. Anchor Knight reset.
10. Shepherd reset.
11. Meridian Custodian reset each phase.
12. session-license guest joins BTC.
13. host disconnect behavior follows existing session policy.
14. Periapsis snapshot save/load.
15. optional Shepherd completion toggles support without gating.
16. sequence-break attempt around Assembly Forum.
17. 4P Medium performance capture.

# Content validation tools

Recommended automated editor checks:

- critical gap has >=2 valid recovery/anchor paths;
- suppressor cannot target all required anchors;
- room variant includes critical route actor set;
- every Flux/Inverted critical object has reset behavior;
- state-specific collision has safe Phase re-entry;
- boss arena has enough same-state revive space.

# Save boundaries

Good save boundaries:

- Crown Refuge;
- post Anchor Knight;
- Assembly Lift;
- pre Custodian;
- post Custodian / State Concourse.

Avoid saving arbitrary transient boss or moving-platform relationships unless existing global save policy explicitly supports them.

# Acceptance criteria

- no legal campaign state soft-locks Crown;
- full toolkit does not create new authority model;
- late join is safe;
- sequence breaks cannot skip irreversible state commits;
- Custodian counters replicate consistently;
- 4P Medium performance remains credible;
- Periapsis snapshot is deterministic.
