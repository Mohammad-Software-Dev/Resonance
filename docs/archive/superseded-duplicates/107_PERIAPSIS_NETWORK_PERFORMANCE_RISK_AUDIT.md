# Periapsis — Network, Performance and Finale Risk Audit

**Purpose:** Bound the technical risk of Anchor Zero and the four Final Configuration encounters under solo and 1–4 online co-op.

# Core principle

Periapsis combines existing systems.

It must not introduce a new simulation architecture.

Reuse:

- CharacterMovement prediction;
- server-authoritative Link;
- deterministic Echo;
- Flux TargetID state;
- Phase StateMask/collision rules;
- Invert RelationshipID state;
- parametric moving rings/platforms;
- aggregate world-state variants.

# Periapsis authority matrix

| System | Authority | Client presentation |
|---|---|---|
| orientation ring state | server | interpolated ring motion |
| player Phase state | server/predicted owner | local Phase VFX |
| Flux state | server | activation/decay VFX |
| Invert relationship | server | directional field VFX |
| Link | server | line/tension presentation |
| Echo semantic actions | server-validated playback | trace rendering |
| subsystem completion | server | local feedback |
| final configuration selection | host/server | party UI |
| Tessel Signal Tokens | server | signal/wave VFX |
| support NPC effect | server state | local presentation |

# Anchor Zero risk register

## A — Orientation correction under latency

**Impact:** 5  
**Likelihood:** 3

Risk:

client/player movement disagrees with server orientation transition.

Mitigation:

- authored orientation states;
- transition timestamp replication;
- short pre-transition telegraph;
- no instantaneous 180° lethal swap;
- movement prediction references OrientationRevision.

Pass:

at 150 ms, player lands on broadly expected surface without frequent hard snaps.

## B — Mixed-state subsystem overload

**Impact:** 4  
**Likelihood:** 3

Risk:

Flux, Phase, Invert and moving geometry create too many simultaneous state changes.

Mitigation:

- activate only the 2 selected subsystem modules in Phase 2;
- cap critical stateful actors;
- event-driven activation.

## C — Echo invalidation

**Impact:** 5  
**Likelihood:** 2

Risk:

orientation or relationship revision invalidates Echo TargetID mid-solution.

Mitigation:

- supported Echo actions bind to stable semantic target;
- clear invalid-trace result;
- fast room/phase reset;
- no critical solution relies on free physics replay.

# Final Configuration branch risks

## Historical Continuity

Primary technical risk:

large number of containment/spillover nodes.

Constraint:

keep active network small and reuse Signal graph framework.

## Distributed Meridian

Primary technical risk:

simultaneous regional subsystem states.

Constraint:

represent remote regional support as summarized state/nodes, not live simulation of six regions.

## Open Resonance

Primary technical risk:

Tessel pattern density + mixed Phase topology.

Constraint:

validated PatternIDs only; no generated gameplay logic; cap active manifestations.

## Bounded Accord

Primary technical risk:

partition graph complexity.

Constraint:

three fixed partition groups with authored bridge rules, not arbitrary dynamic network partitioning.

# Four-player stress scenario

Representative worst case:

- 4 players;
- mixed Phase states;
- 2 active Links;
- 2 Fluxed targets;
- 1–2 Inverted relationships;
- 3 moving orientation/platform actors;
- 2 Signal Tokens;
- 8–10 hostile/hazard actors;
- regional-support VFX;
- Periapsis background machinery.

Target:

- 60 fps Tier M/Medium;
- stable host game thread;
- no replication burst;
- critical cues readable.

# VFX priority order

Preserve:

1. player safety/hazards;
2. valid anchors/targets;
3. Phase state;
4. Link;
5. active final objective;
6. configuration-specific signal.

Reduce first:

- distant Periapsis traffic;
- background ring particles;
- noncritical Tessel manifestations;
- decorative regional-support VFX;
- reflections/secondary lighting.

# GPU risks

- multiple translucent Phase layers;
- large rotating geometry;
- Tessel signal VFX;
- four-player ability effects;
- gas-giant/background orbital view.

Rules:

- no full duplicate-state rendering;
- Phase uses selective materials/components;
- distant machinery uses HLOD/impostors;
- final commit cinematic effects are not active during precision gameplay.

# CPU risks

- target queries across dense Anchor Zero geometry;
- state graph updates;
- multiple support systems;
- Blueprint tick.

Use:

- spatial target filtering;
- dormant inactive petals;
- C++ state machine;
- event-based support actors;
- fixed-size network graphs.

# Network bandwidth risks

Avoid replicating:

- decorative ring particles;
- full world-state diagnostics every frame;
- remote-region state actors;
- raw Tessel waveform;
- cloth/debris.

Replicate semantic state/revisions only.

# Final choice transaction risk

**Impact:** 5  
**Likelihood:** 2

Potential failures:

- double commit;
- guest race;
- disconnect between commit and save;
- completion record without active branch state.

Mitigation:

- host-authoritative atomic transaction;
- monotonically increasing ConfigurationCommitRevision;
- PendingConfiguration separated from CompletedConfiguration;
- pre-commit save guaranteed;
- idempotent completion write.

# Join/disconnect policy

## Guest late join

Safe only at authored join anchors or encounter phase boundaries.

## Guest disconnect

Adapt responsibility at safe boundary.

Avoid live mid-frame mechanic reassignment.

## Host disconnect

No host migration Version 1.

Return party/session gracefully.

Host save remains last committed safe state.

# World-state snapshot validation

Before PC01:

- schema version valid;
- aggregate states derivable;
- regional tags noncontradictory;
- required ability/session licenses available.

Before PC16:

- configuration prerequisites recomputed.

Before final commit:

- selected configuration still valid;
- snapshot hash/revision checked.

# Automated finale tests

1. Anchor Zero orientation loop x100.
2. Anchor Zero 1P/2P/3P/4P.
3. Phase return during ring transition.
4. Flux expiry on moving/rotating target.
5. Invert decay during platform relationship.
6. Echo playback across orientation revision.
7. final configuration preview switching repeatedly.
8. guest advisory vote replication.
9. double-click/duplicate final commit.
10. guest disconnect after commit.
11. host disconnect before/after commit.
12. crash during each final encounter.
13. replay from pre-commit save.
14. all four completion records.
15. all aggregate-state extreme test profiles.
16. Medium 4P performance capture for Anchor Zero.
17. Medium 4P performance capture for each final branch.

# Performance acceptance

Anchor Zero and each final encounter must:

- sustain target 60 fps on Tier M/Medium;
- avoid visible repeated movement correction under target latency;
- preserve critical VFX readability at 4P;
- recover deterministically after wipe;
- not leak transient branch state into pre-commit save.

# Production risk conclusion

The finale is technically viable **only if it reuses proven systems**.

Any proposal for Periapsis that requires:

- general local gravity simulation;
- arbitrary dynamic network partitioning;
- procedural Tessel puzzle generation;
- replicated remote-region simulation;

should be rejected or simplified.

The finale's novelty should come from configuration and consequence, not new foundational technology.
