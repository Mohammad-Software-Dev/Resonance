# Broken Transit Crown — Custodian Enemy Package and Anchor Knight

**Coverage:** Broken Transit Crown  
**Standard Custodian archetypes:** 6  
**Elite:** Anchor Knight  
**Design goal:** Make late-game enemies respond to known player habits without disabling the Resonance toolkit.

# General Custodian rules

Custodian combat should feel:

- trained;
- coordinated;
- technically literate;
- defensive/containment-oriented.

It should not feel psychic.

Counters are driven by visible systems, timers and authored response rules.

# 1. Route Surveyor

**Role:** observation / route marking  
**Health:** H2  
**Stability:** S1  
**Mass:** Light-Medium

Behavior:

- scans recently used anchor categories;
- marks one route for allied countermeasures;
- fires low-damage tracking probe.

Counterplay:

- change route;
- break line;
- destroy probe;
- Phase through marked barrier where valid.

Purpose:

Introduces the idea that Custodians observe behavior before countering it.

# 2. Anchor Suppressor

**Role:** traversal denial / support  
**Health:** H2  
**Stability:** S1  
**Mass:** Medium

Behavior:

Deploys a suppressor field on a tagged anchor/socket.

Field:

- disables that anchor category locally;
- has clear generator;
- expires.

Rules:

- never disables every safe anchor;
- never suppresses an untelegraphed landing target mid-commit without grace.

Counterplay:

- destroy generator;
- Flux alternate anchor;
- Phase route;
- use moving rail.

# 3. Link Interceptor

**Role:** co-op disruption  
**Health:** H2  
**Stability:** S1–S2  
**Mass:** Medium

Behavior:

- detects active Link;
- launches seizure tether;
- may add tension or redirect environmental force.

Counterplay:

- break Link intentionally;
- kill/intercept projectile;
- route through Relay;
- Phase endpoint;
- Invert environmental tether where authored.

Solo:

Targets Echo relationship/control instead of relying on human Link.

# 4. Field Marshal Drone

**Role:** formation / projectile control  
**Health:** H2–H3  
**Stability:** S2  
**Mass:** Medium

Behavior:

- deploys temporary anchors;
- routes allied projectiles;
- repositions cover/platform panel.

Counterplay:

- steal temporary anchor;
- reflect projectile;
- Invert panel relation;
- Flux control node.

Purpose:

Makes Custodian infrastructure useful to the player.

# 5. Phase Warden

**Role:** state control  
**Health:** H2  
**Stability:** S2  
**Mass:** Medium

Behavior:

Creates a local state seal that:

- blocks one Phase route;
- reveals a Resonant-only weak node;
- alternates after clear telegraph.

Counterplay:

- attack in correct state;
- disable projector;
- choose Material route.

No full Phase shutdown.

# 6. Stabilizer

**Role:** heavy force-resistant unit  
**Health:** H3  
**Stability:** S3  
**Mass:** Heavy

Behavior:

- braces against Attract/Repel;
- anchors nearby Custodian unit;
- creates temporary stability field.

Counterplay:

- Invert brace relation;
- Flux foundation;
- Breaker damage;
- attack from changed angle.

Purpose:

Tests mature force use rather than spam.

# Elite — Anchor Knight

**Encounter ID:** ELITE_BTC_ANCHOR_KNIGHT  
**Role:** elite Custodian mobility/control operator  
**Location:** BTC13  
**Health:** H4  
**Stability:** S3 armored / S2 exposed  
**Mass:** Medium-Heavy

## Fiction

“Anchor Knight” is a field nickname for a Custodian assault operator wearing an infrastructure-coupling rig.

It is not medieval.

The rig carries:

- anchor projectors;
- field braces;
- route clamps;
- Link-interception spool.

Visual language should remain technical, industrial and human.

## Silhouette

- asymmetrical heavy rig;
- backpack projector frame;
- two deployable anchor arms;
- cable spool;
- ceramic/conductive plating.

Avoid sword/shield knight silhouette.

## Core mechanic

Anchor Knight creates and controls the arena's movement network.

Player can exploit the same network.

Three control resources:

- temporary anchor set;
- brace field;
- route clamp.

## Phase A — Establish

Knight deploys 3–4 temporary anchors.

Attacks:

- force-assisted lunge;
- anchor-line sweep;
- short projectile burst;
- brace.

Player learns anchors are usable.

## Phase B — Deny

Knight suppresses recently repeated anchor.

Adds:

- Link Intercept;
- moving platform clamp;
- Phase seal.

Counterplay stays available.

## Phase C — Break Formation

Knight loses brace armor.

Temporary anchors become unstable/more useful.

Players can:

- Invert anchor relation;
- Flux brace mount;
- launch Knight into own field;
- use Link to tear armor.

## Solo

Echo may hold one clamp/control but fight never requires permanent multi-actor state.

## 2P

One pressures Knight, one uses deployed network.

## 3P

Third handles suppressor/intercept.

## 4P

Knight creates two anchor lanes and a second support drone.

HP scaling remains modest.

## Reward

- Crown authorization key;
- high-tier Module/Bandwidth reward;
- countermeasure codex entry;
- permanent shortcut.

# Encounter compositions

Early:

- Route Surveyor + Anchor Suppressor.

Mid:

- Link Interceptor + Field Marshal Drone.

State:

- Phase Warden + Surveyor.

Heavy:

- Stabilizer + Marshal Drone.

Pre-boss:

- Surveyor + Interceptor + Stabilizer.

# Anti-frustration rules

Custodian packs may counter:

- one repeated traversal habit;
- one active relationship;
- one state route.

They may not simultaneously suppress:

- Phase;
- Flux;
- all anchors;
- Link;
- ordinary ground route.

At least one clear agency path remains.

# Player-count scaling

## 1P

- fewer simultaneous counter systems;
- Echo-specific equivalents.

## 2P

- paired pressure/counter roles.

## 3P

- support counter + primary pair.

## 4P

- two counter lanes;
- multi-target suppressors;
- modest durability increase.

# Technical notes

- Route Surveyor tracks semantic events, not camera/input.
- Anchor Suppressor affects tagged TargetIDs/categories.
- Link Interceptor uses explicit Link relationship.
- Marshal anchors are server-authoritative temporary targets.
- Phase Warden uses state masks.
- Stabilizer uses explicit brace relation.
- Anchor Knight uses authored counter tables.

# Readability

Distinct presentation required for:

- player Link;
- enemy seizure tether;
- suppressed anchor;
- temporary usable Custodian anchor;
- Phase seal;
- Inverted relation.

# Acceptance criteria

- Custodians feel intelligent without cheating;
- enemy infrastructure is exploitable;
- counters promote route variety;
- solo receives equivalent pressure;
- four-player combat distributes counters;
- Anchor Knight prepares Meridian Custodian mechanics.
