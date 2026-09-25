# Ability and Progression Graph — Canonical

**Canonical status:** Iteration 3J consolidated source of truth  
**Supersedes:** earlier provisional wording in the original `23_ABILITY_AND_PROGRESSION_GRAPH.md`

## Progression rule

Every major ability must create value in at least four domains:

1. traversal;
2. combat;
3. puzzle/system interaction;
4. boss/encounter expression.

A major ability may not exist primarily as a colored key.

## Foundational toolkit

### Tier 0 — Opening

#### Run / Jump / Evade

Precision 2.5D controller baseline.

#### Kinetic Strikes

Light, directional and heavy attack language.

#### Attract

**Acquisition:** first 10 minutes.

Core identity:

- pull the player toward valid fixed/moving Resonant targets;
- pull selected light objects/components;
- create force relationships in combat and puzzles.

#### Repel

**Acquisition:** first 15 minutes.

Core identity:

- launch away from valid target/surface;
- redirect/throw selected objects;
- reflect/redirect selected projectiles.

Attract and Repel are the foundational movement/combat verbs and remain relevant through the finale.

### Tier 1 — Synchronization

#### Link

**Acquisition:** opening hour, before Gravity Orchard critical co-op mechanics.

Link creates a validated relationship with:

- teammate;
- selected object;
- selected system.

Uses:

- rescue/catch;
- force transfer;
- partner movement;
- simultaneous strain/control;
- co-op combat support.

Friendly force requires consent/armed cooperative state.

#### Echo

**Acquisition:** opening hour for solo.

Echo is the deterministic solo equivalent for required simultaneous-actor interactions.

Rules:

- semantic/kinematic replay;
- stable target references;
- no general AI;
- no whole-world deterministic simulation;
- one conceptual solution shared with multiplayer.

### Tier 2 — Anchor Control

#### Latch

**Acquisition:** Gravity Orchard.

Core role:

- tap-to-commit toward valid Resonant anchor;
- smoother anchor chaining;
- combat repositioning;
- anchor-based puzzle control.

#### Orbit

**Acquisition:** Gravity Orchard, after/through first Guardian progression.

Core role:

- maintain anchor/Link radius;
- swing around anchor/partner;
- convert angular movement into traversal/combat momentum.

### Tier 3 — Route Adaptation

#### Vector Shift

**Acquisition:** Solar Foundry.

Core role:

- one controlled airborne direction/target reassignment per reset condition;
- correct route after launch;
- redirect momentum into combat/puzzle line.

Vector Shift is a route-correction tool, not a generic double jump.

### Tier 4 — Eligibility / State / Relationship

#### Flux Field

**Acquisition:** Rust Sea.

Core rule:

> **Flux changes what can respond to Resonance.**

Uses:

- temporarily make tagged inert structures/objects Resonant;
- create temporary anchors;
- expose machinery/armor/environmental interactions.

Flux does not make arbitrary metal interactive.

#### Phase

**Acquisition:** Choir Array.

Core rule:

> **Phase changes which field-state the player occupies.**

Player states:

- Material;
- Resonant.

Uses:

- state-specific traversal;
- state-specific enemies/nodes;
- mixed-state puzzles;
- selected attack avoidance/counterplay.

Phase uses one world with StateMasks, not a duplicate shadow world.

Safe re-entry is mandatory.

#### Invert

**Acquisition:** Cloud Loom.

Core rule:

> **Invert reverses a selected authored relationship.**

Examples:

- attract ↔ repel;
- intake ↔ exhaust;
- current forward ↔ reverse;
- pull A→B ↔ pull B→A.

Invert does not:

- reverse time;
- globally flip gravity;
- swap the player's Attract/Repel buttons;
- invert arbitrary physics.

### Tier 5 — Mastery

#### Overdrive

Optional mastery state, not a new foundational control and not required for any standard ending.

Potential effects:

- cooling;
- advanced Link transfer;
- limited extra movement expression.

Exact trigger remains tunable during production.

# Locked dependency graph

```text
Run / Jump / Attack
      |
Attract + Repel
      |
 Link / Echo
      |
    Latch
      |
    Orbit
      |
 Vector Shift
      |
   Flux Field
      |
    Phase
      |
    Invert
      |
Broken Transit Crown: full-toolkit mastery
      |
Periapsis: configuration/recombination
      |
Overdrive: optional mastery only
```

## Region / ability mapping

| Region | Major progression role |
|---|---|
| Wayfarer Scar / Transit opening | Attract, Repel, Link/Echo |
| Gravity Orchard | Latch, Orbit |
| Solar Foundry | Vector Shift |
| Flooded Observatory | mastery/build depth; no foundational movement unlock |
| Rust Sea | Flux |
| Choir Array | Phase |
| Cloud Loom | Invert |
| Broken Transit Crown | mastery/convergence; no foundational unlock |
| Periapsis Core | final recombination/configuration; no foundational unlock |

## Progression timing targets

First-play planning targets, not promises:

- Attract: 5–10 min.
- Repel: 10–15 min.
- Link/Echo: 20–40 min.
- Latch: 1–2 h.
- Orbit: 2–4 h.
- Vector Shift: 5–7 h.
- Flux: 7–10 h.
- Phase: 10–14 h.
- Invert: 14–18 h.

Exploration and sequence breaks may shift these.

## Major interaction matrix

- Flux + Latch: activate inert anchor, then Latch.
- Flux + Phase: activate node, then occupy alternate-state function.
- Flux + Invert: activate inert relationship, then reverse it.
- Phase + Latch/Orbit: use Resonant-only anchor paths.
- Phase + Invert: enter state where relationship exists, then reverse it.
- Vector Shift + Phase: redirect into state-specific route.
- Vector Shift + Invert: correct trajectory into reversed current.
- Link + Invert: maintain player Link while reversing environmental relationship.
- Echo + Flux/Phase/Invert: replay supported semantic actions with stable IDs.

## Core families

All six are available by late game:

- Vector — momentum/mobility.
- Breaker — stability/armor.
- Weaver — Link/control.
- Conduit — projectile/energy.
- Mender — Fracture/support.
- Ghost — Phase/evasion/state play.

Any Wayfarer can equip any Core.

## Gate rules

Each major region should contain:

- first-visit gates using current toolkit;
- visible future-return opportunities;
- at least one skilled optional route/sequence break where safe;
- transformed-world routes created by regional decisions;
- no mandatory gate that can be invalidated by a legal host-world outcome.

## Multiplayer progression compatibility

Guests in later host worlds receive session licenses for required progression abilities they do not permanently own.

Guests with later personal abilities may be constrained only where a host's protected first-play gate would be invalidated.

No player is globally de-leveled.

## Canonical distinction summary

- Attract/Repel = apply force.
- Link/Echo = create simultaneous relationship.
- Latch/Orbit = commit to anchor relationship.
- Vector Shift = redirect route.
- Flux = change target eligibility.
- Phase = change player state occupancy.
- Invert = reverse relationship.
- Overdrive = optional mastery amplification.

This distinction should be used by design, engineering, UI and narrative terminology.
