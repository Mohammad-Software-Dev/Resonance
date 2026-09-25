# Solar Foundry — Enemy Package and Kiln Marshal

**Coverage:** Solar Foundry first visit  
**Standard archetypes:** 6  
**Elite:** Kiln Marshal  
**Design goal:** Make energy routing, Heat and temporary glass geometry matter in combat.

# Tuning framework

Reuse global classes.

## Health

- H1 Fragile
- H2 Standard
- H3 Durable
- H4 Elite

## Stability

- S0 None
- S1 Light
- S2 Standard
- S3 Heavy

## Mass

- Feather
- Light
- Medium
- Heavy
- Anchored

# 1. Glazier

**Role:** melee / temporary defense  
**Health:** H2  
**Stability:** S1–S2  
**Mass:** Medium

## Attacks

- glass-edge swipe;
- short shoulder rush;
- shield-forming action;
- later variant throws cracked shield.

## Shield states

- forming;
- solid;
- cracked;
- loose.

Counterplay:

- attack attachment;
- redirect beam into side/back;
- Attract loose shield;
- use shield as cover/projectile.

## Teaching purpose

Enemy armor can become temporary world geometry.

## Multiplayer

At 3–4P:

- rotates threat rather than permanently facing host;
- shield can orient toward highest pressure;
- natural flanking remains valid.

# 2. Prism Drone

**Role:** ranged / beam-routing tool  
**Health:** H1  
**Stability:** S0  
**Mass:** Feather/Light

## Attacks

- slow beam bolt;
- charged line shot;
- later split-angle shot.

## Resonance

Selected projectiles are:

- reflectable;
- mirror-routable;
- capable of powering receivers;
- capable of cracking specific glass attachments.

## Teaching purpose

Enemy fire can be useful infrastructure.

## Multiplayer

At 4P, drones distribute marks across lanes rather than focus one player.

# 3. Furnace Ram

**Role:** heavy lane control  
**Health:** H3  
**Stability:** S3  
**Mass:** Heavy

## Attacks

- telegraphed rail charge;
- heat exhaust;
- close stomp;
- later emergency reverse.

## Resonance

Direct Repel does not stop it.

Manipulation occurs through:

- track switch;
- mirror gate;
- detached brake plate;
- collision with machinery.

## Teaching purpose

“Heavy” means use systems, not spam force.

## Multiplayer

One player may manage route machinery while others pressure/support.

# 4. Shard Choir

**Role:** projectile pattern / area denial  
**Health:** pattern-state rather than normal HP  
**Mass:** Feather aggregate

## Fiction

Autonomous micro-fabricators controlling glass fragments.

## Patterns

- fan;
- spiral;
- crossing lane;
- orbiting shield.

## Networking

Do not replicate every shard.

Authority replicates:

- pattern ID;
- pattern phase/time;
- large interactive shard IDs.

Small shards reconstruct locally.

## Resonance

Only marked large fragments are catchable/reflectable.

# 5. Heat Leech

**Role:** support / Heat pressure  
**Health:** H1  
**Stability:** S0  
**Mass:** Light

## Behavior

Attempts to attach to:

- player rig;
- moving Resonant object;
- heated glass plate.

## Attached to player

- increases Heat generation;
- slightly reduces cooling;
- strong UI/VFX feedback.

## Attached to object

- overheats mirror/plate faster;
- can sometimes help anneal an object.

## Removal

- attack;
- close Attract;
- teammate Link pull;
- cooling vent.

## Multiplayer

Creates rescue/support moments without hard class roles.

# 6. Mirror Stalker

**Role:** ambush / perception pressure  
**Health:** H2  
**Stability:** S1  
**Mass:** Light-Medium

## Behavior

Uses reflective surfaces to create false depth images.

Rules:

- illusions are visual-only;
- real body has valid TargetID;
- reticle, shadow/contact and audio remain truthful.

## Attacks

- authored mirror-node relocation;
- lunge;
- reflected feint;
- shard flick.

## Resonance

Attract/Repel targeting exposes the valid body.

No random clone guessing.

## Accessibility

Option increases real-body contrast/outline.

# Elite — Kiln Marshal

**Encounter ID:** ELITE_SF_KILN_MARSHAL  
**Health:** H4  
**Stability:** S3 shell / S2 body  
**Mass:** Heavy  
**Location:** SF14

## Fiction

Mobile industrial safety/quality-control machine.

Its historical job:

- inspect optical assemblies;
- reject warped glass;
- rotate mirror shielding;
- remove heat-contaminated material.

It treats active Wayfarer force manipulation as uncontrolled fabrication.

## Silhouette

- broad carrier frame;
- rotating circular mirror armor;
- three inspection arms;
- wheel/rail lower assembly.

Avoid humanoid knight silhouette despite the “Marshal” title.

## Core mechanic

Three rotating mirror plates.

Each plate has:

- reflective front;
- ceramic heat-dissipating back;
- weak side attachment.

Player flow:

1. force/bait correct orientation;
2. crack side attachment;
3. route beam/projectile into exposed joint;
4. remove plate;
5. adapt as Marshal becomes faster but less protected.

## Phase A — Inspection

Attacks:

- mirror shove;
- rail charge;
- inspection beam;
- plate rotation.

One plate becomes removable.

## Phase B — Rejection

After first plate:

- speed increases;
- heat exhaust widens;
- remaining plates rotate more often;
- detached plate becomes mirror/cover.

## Phase C — Open Kiln

After second/third plate:

- core vulnerable;
- larger damage windows;
- faster lane control.

## Solo

No mandatory Echo.

Echo may optionally:

- hold one mirror orientation;
- occupy side sensor.

Direct solo solution always remains valid.

## 2P

Natural opposite-angle flanking.

## 3P

Third player:

- redirects Prism support fire;
- manages detached plate;
- rescues.

## 4P

Marshal activates two mirror lanes + support drones.

Players split between:

- plate pressure;
- routing;
- defense.

Do not inflate HP heavily.

## Reward

- Foundry Grid Key;
- capacity/Core progression component;
- lore about Regent safety logic.

# Encounter combinations

## Early

Glazier + Prism Drone.

## Mid

Furnace Ram + Heat Leech.

## Upper

Mirror Stalker + Shard Choir.

## Pre-boss

Glazier + Prism Drone + Heat Leech + environmental mirror.

# Player-count guidance

## 1P

- fewer simultaneous tracking threats;
- Heat Leech avoids first-use overlap with hardest traversal.

## 2P

- paired flank/routing pressure.

## 3P

- second lane/support responsibility.

## 4P

- multiple lanes;
- more support interactions;
- selected multi-target patterns;
- modest durability increase only.

# Technical notes

- Shard Choir uses pattern replication.
- Mirror Stalker illusions are local presentation.
- Furnace Ram track state is server-authoritative/parametric.
- Heat Leech attachment is compact replicated relationship.
- Glazier shield is explicit state machine.
- Kiln Marshal plates use parametric/quantized rotation, not uncontrolled physics.

# Readability

Foundry visuals must distinguish:

- lethal enemy beam;
- useful reflectable projectile;
- friendly redirected projectile;
- environmental power beam;
- cosmetic light.

Hue alone is insufficient.

# Acceptance criteria

- players intentionally use Prism fire against enemies/mechanisms;
- Glazier shield becomes a world tool;
- Furnace Ram is solved through systems;
- Heat Leech creates urgency without making Heat a constant stamina tax;
- Mirror Stalker feels fair;
- Kiln Marshal teaches angle manipulation before Glass Regent;
- four-player fights split attention across lanes rather than one target pile.
