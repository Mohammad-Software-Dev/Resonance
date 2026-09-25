# Content Dependency Matrix

**Purpose:** Show which reusable systems must exist before regions, rooms and bosses can be produced efficiently.

# System foundation dependencies

| Content/system | Depends on | Unblocks |
|---|---|---|
| Basic room greybox | controller | all regions |
| Resonance anchor encounter | Attract/Repel + target system | opening onward |
| Co-op traversal room | Link + 4P session | all co-op content |
| Solo dual-actor room | Echo | all solo parity content |
| Moving-anchor room | moving-platform prediction | Pendulum, Loom, Crown |
| World transformation | state/save framework | all regional afterstates |
| Regional decision UI | host choice ledger + guest vote | all Anchor decisions |
| Session ability compatibility | session licenses | late-world guest joins |
| Boss production template | encounter state + retry + scaling | all major bosses |

# Region dependency matrix

## Wayfarer Scar / Transit opening

Requires:

- controller;
- Attract/Repel;
- base combat;
- Relay;
- Link/Echo;
- Alignment Hound template.

Unblocks:

- Gravity Orchard;
- production slice pipeline.

## Gravity Orchard

Requires:

- Latch;
- Orbit;
- moving anchors;
- Echo strain;
- world transformation.

Boss:

The Pendulum.

Unblocks:

- first full regional-decision production pattern.

## Solar Foundry

Requires:

- Vector Shift;
- Heat;
- deterministic beams/mirrors;
- reflective surface readability.

Boss:

The Glass Regent.

Shared frameworks:

- beam routing;
- moving shell/component logic.

## Flooded Observatory

Requires:

- water-sphere boundary framework;
- momentum transition;
- moving sphere path;
- charged/grounding state.

Boss:

Leviathan of the Flood.

Does not require a new foundational movement ability.

## Rust Sea

Requires:

- Flux;
- target eligibility;
- scalable particulate presentation;
- authored front/current volumes.

Boss:

Dust Cathedral.

Unblocks:

- Flux backtracking across earlier regions.

## Choir Array

Requires:

- Phase;
- StateMask collision;
- deterministic signal graph;
- visual timing parity;
- mixed-state 4P.

Boss:

Choir Prime.

Unblocks:

- Tessel as explicit late-game actor;
- Phase backtracking.

## Cloud Loom

Requires:

- Invert;
- deterministic current volumes;
- parametric kite platforms;
- long-range Link catch;
- exterior streaming.

Boss:

Loom Harvester.

Unblocks:

- final major toolkit;
- Crown atmospheric state.

## Broken Transit Crown

Requires:

- full toolkit;
- Custodian counter framework;
- aggregate campaign state;
- transformed Transit asset kit.

Elite:

Anchor Knight.

Boss:

Meridian Custodian.

Optional:

Astral Shepherd.

Unblocks:

- Periapsis.

## Periapsis Core

Requires:

- aggregate state snapshot;
- authored orientation system;
- all ability systems;
- final commit transaction;
- branch-state save.

Boss:

Anchor Zero.

Finale:

four configuration encounter variants.

# Shared content frameworks

## Enemy framework

Needed features:

- Health/Stability;
- Resonance target interfaces;
- mass class;
- threat targeting;
- player-count pattern variants;
- state/Phase tags;
- optional Flux/Invert interfaces.

## Boss framework

Needed features:

- phase/state graph;
- retry;
- player-count variants;
- late join boundary;
- telegraph accessibility;
- objective/subsystem components;
- save-safe defeat state.

## Room framework

Needed features:

- stable RoomID;
- encounter state;
- reset;
- join markers;
- VariantID groups;
- transformed state;
- accessibility metadata;
- telemetry hooks.

# Art dependencies

Reusable art kits should precede full room production:

- Transit base;
- Orchard;
- Foundry;
- Observatory;
- Rust;
- Choir;
- Loom;
- Custodian;
- Periapsis.

Each kit includes:

- gameplay-readable collision modules;
- background modules;
- hazard language;
- Resonance target language;
- state variants;
- LOD/HLOD plan.

# VFX dependency order

1. Attract/Repel target/force.
2. Link/rescue.
3. enemy projectile/armor.
4. Latch/Orbit.
5. Vector Shift.
6. Flux state language.
7. Phase Material/Resonant language.
8. Invert relationship language.
9. Custodian counter language.
10. finale configuration language.

Do not wait until late production to test four-player density.

# Audio dependency order

Critical gameplay audio always has visual parity.

Reusable systems:

- target lock;
- force;
- Link;
- Heat/Stability;
- Flux;
- Phase;
- Invert;
- system warning.

Regional ambience/music layers are built on top.

# UI dependency order

- target feedback;
- health/Fracture/Stability/Heat;
- party/Link;
- Echo controls;
- Relay/loadout;
- map/markers;
- regional choice vote;
- session-license notice;
- late-game world-state diagnostics;
- Configuration Forum.

# Narrative dependency order

Narrative implementation depends on stable:

- region outcomes;
- named NPCs;
- host/guest ownership rules;
- faction/Tessel state;
- final configurations.

Avoid recording final VO for branches before canonical state tags are locked.

# QA dependency order

Automation must grow with systems.

Earliest:

- movement;
- network correction;
- save.

Then:

- room reset;
- Echo;
- transformations;
- regional outcomes;
- late join;
- finale state.

# Production principle

If a content team needs a system that has not passed its proof gate:

- build only disposable greybox/spike content;
- do not scale production-quality assets around an unproven dependency.
