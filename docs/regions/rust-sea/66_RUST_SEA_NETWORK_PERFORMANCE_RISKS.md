# Rust Sea — Network, Performance and Technical Risk Specification

**Purpose:** Keep metallic-particulate spectacle compatible with Resonance's host-authoritative 60 fps architecture.

# Technical principle

Replicate **field state**, not particles.

Authoritative data:

- Particulate Field ID/state;
- moving Front ID/path/time;
- buried object reveal state;
- Flux target state;
- critical compacted surface state;
- boss Material Pool;
- transformation variant.

Client-only/mostly local presentation:

- dust grains;
- wakes;
- spark flecks;
- small debris;
- distant storms;
- most collapse particles.

# Authority matrix

| System | Authority | Client presentation |
|---|---|---|
| Flux state | server | priming/active/decay VFX |
| Front state | server parametric | local particle crest |
| Buried-object reveal | server | local lift-away VFX |
| Compacted surface | server | material/particle state |
| Dust Needle Current | server path/state | local needle swarm |
| Dredger hidden state | server | wake VFX |
| Cathedral Material Pool | server | local reconstruction particles |
| Cosmetic dust | local | local |

# Flux latency risk

Critical interaction:

Flux target → immediately Latch/Attract.

At 150 ms, player must not feel that Flux activation “didn't take.”

Mitigation:

- local priming prediction;
- stable TargetID;
- server validates short activation/use chain;
- small temporal grace when predicted activation and movement action are valid;
- clear rejection reason if target invalid.

# Moving front risk

Front is moving platform/force band.

Use:

- spline/path;
- server start time;
- speed profile;
- state revision.

Clients reproduce position.

Do not send transform for thousands of particles.

# Buried reveal risk

Client may see VFX before authoritative collision changes.

Rule:

1. server commits reveal state;
2. clients receive state;
3. transition animation plays;
4. collision changes at authored synchronization point;
5. state revision increments.

Never let visual exposure imply safe platform before collision is ready.

# GPU risk

Primary:

- particle overdraw;
- volumetric dust;
- transparent fronts;
- four-player Flux VFX;
- Cathedral collapse/rebuild.

Rules:

- density scales before gameplay cues;
- Medium disables expensive secondary dust layers;
- no per-particle shadowing;
- distant Sea uses density/material representation;
- critical silhouettes clear local particles.

# CPU risk

Avoid:

- per-particle collision;
- per-grain AI sensing;
- Blueprint Tick on every decorative field emitter;
- hundreds of hidden-object overlap checks.

Use:

- authored field volumes;
- event-driven reveal;
- spatial query for Flux candidates;
- pooled gameplay objects.

# Network risk register

## A — Flux activation/use correction

**Impact:** 5  
**Likelihood:** 3

Spike:

- midair Flux → Latch at 30/80/150/250 ms.

Pass:

- immediate client feedback;
- no frequent false activation;
- corrections remain visually manageable.

## B — Front position disagreement

**Impact:** 4  
**Likelihood:** 3

Spike:

- four clients ride same/parallel fronts with jitter/loss.

Pass:

- no player appears supported on empty space;
- landing outcomes broadly agree.

## C — Particle density obscures gameplay

**Impact:** 4  
**Likelihood:** 4

Pass:

- active anchors/hazards readable under worst four-player effects.

## D — Cathedral terrain state divergence

**Impact:** 5  
**Likelihood:** 3

Pass:

- all clients agree which ridges/body sections exist;
- wipe/reset restores identical arena.

## E — Transformation variant/save mismatch

**Impact:** 5  
**Likelihood:** 2

Pass:

- Excavation/Tides/Migration reload correctly;
- late join reconstructs exact region state.

# Dust Cathedral implementation rule

The boss uses:

- normalized Material Pool;
- state-driven structural variants;
- parametric front attacks;
- authored terrain allocation.

It does not use:

- granular body simulation;
- arbitrary pile physics;
- destructible particle collision as truth.

# Undertow implementation rule

Current fronts are:

- authored paths;
- normalized strength;
- replicated state/time.

Machine component motion is parametric.

# Flux candidate performance

Potential issue:

large rooms may contain many Flux-compatible targets.

Use:

- spatial partition;
- relevance range;
- screen/aim filtering;
- target-priority categories;
- dormant targets until discovered where appropriate.

Do not scan entire room every frame.

# Four-player stress scenario

Representative worst case:

- 4 players;
- 2 simultaneous Flux targets;
- 2 Links;
- 2 moving particle fronts;
- 10 enemies;
- 1 Burrow Relay;
- 1 Dust Needle Current;
- 20+ cosmetic/projectile elements.

Target:

- 60 fps Tier M/Medium;
- stable host game thread;
- no pathological replication burst.

# Automated tests

1. 100 Flux activate/expire cycles on same target.
2. Flux → Latch under latency.
3. 4 players Flux separate targets.
4. buried reveal + save/load.
5. moving front with 4 riders.
6. front + disconnect/reconnect.
7. Undertow reset.
8. Cathedral phase reset.
9. Cathedral Material Pool under 4P.
10. each Rust Sea afterstate late join.
11. Flux session-license guest.
12. old-region Flux gate compatibility.

# Save model

Persist:

- Rust regional outcome;
- permanent excavation state;
- shortcuts;
- one-time rewards;
- stable discovered markers where intended.

Do not persist:

- transient front position if room resets;
- cosmetic particle distribution;
- enemy dust wakes;
- boss midfight material arrangement.

# Accessibility/performance independence

Reducing visual particle density must not:

- change hazard timing;
- hide buried-object trace entirely;
- alter front collision;
- change Flux eligibility.

# Profiling telemetry

Capture:

- Niagara cost;
- overdraw;
- active particle systems;
- Flux target query time;
- replicated bytes;
- front corrections;
- Cathedral state bandwidth;
- four-player frame time.

# Acceptance criteria

- Flux remains responsive at 150 ms;
- particulate visuals can be scaled aggressively;
- no per-grain gameplay/network state exists;
- fronts are stable enough for precision movement;
- Cathedral terrain/material state is deterministic;
- late join/save reconstruct afterstates;
- four-player Medium holds performance target;
- old-region Flux backtracking does not require bespoke networking exceptions.
