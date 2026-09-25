# Broken Transit Crown — World-State Aggregation and Transformation Specification

**Purpose:** Convert the campaign's regional decisions into a manageable set of Crown variants without combinatorial content explosion.

## Principle

The Crown should visibly reflect the entire campaign.

It should **not** create one handcrafted Crown for every combination of regional choices.

Instead, authoritative world choices derive a small set of aggregate state groups.

These groups drive room variants, hazards, support, traversal options and narrative reactions.

# Aggregate state groups

## 1. Power Reserve

Primary inputs:

- Solar Foundry outcome;
- Cloud Loom outcome;
- selected support quests.

Suggested derived values:

- Low;
- Medium;
- High.

Effects:

- powered rails;
- active Custodian systems;
- emergency lighting;
- shortcut availability;
- enemy machine density.

### Low

- more Flux/manual routes;
- fewer powered hazards;
- fewer conventional shortcuts.

### Medium

- mixed powered/manual state.

### High

- more powered infrastructure;
- more dangerous active systems;
- faster conventional routes.

## 2. Water / Thermal Stability

Primary inputs:

- Gravity Orchard;
- Flooded Observatory;
- Solar Foundry.

Suggested values:

- Fragile;
- Managed;
- Stable.

Effects:

- coolant availability;
- flooded/dry service routes;
- heat hazard intensity;
- worker refuge condition.

## 3. Structural Access

Primary inputs:

- Rust Sea outcome;
- optional excavation/salvage quests;
- Astral Shepherd completion.

Suggested values:

- Buried;
- Partial;
- Open.

Effects:

- exposed old rail structures;
- alternate physical routes;
- available heavy machinery;
- Crown repair materials.

## 4. Field Communication

Primary input:

- Choir Array outcome.

Values:

- Locked;
- Open;
- Partitioned.

Effects:

- Tessel visibility;
- Relay clarity;
- Phase route density;
- interference hazards;
- Custodian countermeasure behavior.

## 5. Atmospheric Support

Primary input:

- Cloud Loom outcome.

Values:

- Maximum;
- Stable;
- Distributed.

Effects:

- current strength;
- exterior traversal speed;
- recovery current;
- kite support;
- Crown exterior hazards.

## 6. Habitat / Adaptation Support

Primary inputs:

- Orchard;
- Observatory;
- Rust Sea;
- selected community quests.

Suggested values:

- Restoration-Leaning;
- Mixed;
- Adaptation-Leaning.

This is **not** a morality score.

It is a production-facing state used to determine:

- which displaced communities appear;
- which regional support NPCs arrive;
- which ecological/adapted phenomena remain visible.

Do not expose it as a hidden moral meter.

# Derivation rules

Derived state should be recalculated from authoritative world tags on load.

Avoid permanently saving redundant aggregate values unless profiling shows it is useful.

Example pseudologic:

`PowerReserve = f(FoundryOutcome, LoomOutcome, SupportFlags)`

The exact formula can be data-driven.

# Critical-path guarantee

Every legal aggregate combination must support:

- BTC01 → BTC30 critical route;
- required boss states;
- a valid Periapsis Gate state.

State may alter:

- route length;
- hazard type;
- shortcut;
- optional room;
- support.

It may not remove the only route.

# Room variant model

Each stateful Crown room can expose modular variant components.

Example:

`BTC10_FoundryPowerJunction`

Components:

- PowerVariant;
- FieldCommVariant;
- SupportNPCVariant;
- EnemyVariant.

Do not duplicate the whole room unless topology truly changes.

# Required stateful rooms

At minimum:

- BTC04 — Atmospheric Support;
- BTC08 — Field Communication;
- BTC09 — Water/Thermal;
- BTC10 — Power Reserve;
- BTC11 — Structural Access;
- BTC17 — Custodian evidence changes based on support/history;
- BTC19 — multi-state Assembly Lift;
- BTC20 — Atmospheric + Field Communication;
- BTC29 — all state groups represented;
- BTC30 — Periapsis snapshot.

# World-space communication

State should be visible before UI.

Examples:

## High Power Reserve

- rail motors move;
- lights/system hum;
- heavy Custodian devices active.

## Low Power

- manual braces;
- Flux-inert dead systems;
- temporary worker lighting.

## Open Field Communication

- Phase silhouettes;
- Tessel patterns;
- signal overlays.

## Carrier Lock

- clean Relay signage;
- fewer anomalies.

## Structural Open

- exposed old machine-city materials integrated into repairs.

## Structural Buried

- salvage braces / limited heavy access.

# NPC/support aggregation

Support NPC appearances should derive from region outcomes and quest flags.

Examples:

- Foundry technicians assist powered junction.
- Observatory hydrologists manage coolant.
- Rust salvagers reinforce rail section.
- Choir residents/field mediators appear if communication is open/partitioned.
- Loom route crews support exterior traversal.

Do not require all to appear at once.

Target:

- 2–4 visible regional-support groups per playthrough;
- additional references through radio/logistics.

# Custodian response to state

Custodian dialogue and tactics may reference aggregates.

Examples:

- High Power Reserve: “You restored capacity beyond safe dispatch limits.”
- Open Field Communication: extra containment protocols.
- Low reserve: Assembly argues the party's regional choices weakened central options.

These are factual/in-world positions, not authorial verdicts.

# Astral Shepherd state

Shepherd completion sets:

`World.Crown.ShepherdAligned = true`

Effects:

- alternate BTC24→25 path;
- Periapsis Alignment Reserve;
- one reduced alignment hazard later;
- optional Custodian dialogue.

Does not change regional outcome tags.

# Save/load

Save stores authoritative regional choices and permanent Crown changes.

On load:

1. reconstruct aggregate states;
2. select room variants;
3. apply permanent shortcuts;
4. spawn relevant support;
5. verify critical route.

# Late join

Joining client receives:

- aggregate state snapshot;
- active room variant IDs;
- permanent Crown state;
- boss/encounter phase if join-safe.

# QA matrix

Do not test all theoretical combinations manually.

Use:

- pairwise/orthogonal coverage of aggregate states;
- automated critical-route validation;
- targeted extreme states.

Extreme test examples:

### Conventional maximum

- High Power;
- Stable Water/Thermal;
- Open Structural Access;
- Carrier Lock;
- Maximum Atmospheric Support.

### Adapted/distributed

- Medium/Low Power;
- Managed Water;
- Partial Structural;
- Open Chorus;
- Distributed Lift.

### Low-resource stress

- Low Power;
- Fragile Thermal;
- Buried Structural;
- Carrier Lock;
- Stable Envelope.

All must complete.

# Acceptance criteria

- prior decisions are visibly present;
- room authoring remains modular;
- no hidden morality score is implied;
- critical route is invariant in availability;
- support/hazards change meaningfully;
- late join/save reconstruct correctly;
- Periapsis receives a clean state snapshot.
