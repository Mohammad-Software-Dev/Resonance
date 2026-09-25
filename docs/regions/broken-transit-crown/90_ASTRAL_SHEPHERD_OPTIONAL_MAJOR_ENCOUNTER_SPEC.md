# Astral Shepherd — Optional Major Encounter Production Specification

**Region:** Broken Transit Crown — Outer Alignment Ring  
**Encounter ID:** BOSS_OPT_BTC_ASTRAL_SHEPHERD  
**Type:** Optional major mastery boss  
**Recommended timing:** before Meridian Custodian or immediately after Crown midpoint  
**Retry:** dedicated nearby Relay  
**Primary tests:** opposing force, articulated infrastructure, aerial Link/Echo, full movement mastery

## Pacing role

Astral Shepherd is deliberately **optional**.

It exists for players who want:

- another major mechanical test;
- high-tier reward;
- Periapsis stabilization advantage;
- deeper Anchor Zero context.

It does not gate the finale.

## Fiction

Astral Shepherd is a station-scale alignment guardian.

Its purpose:

- keep large Transit/Crown structural arms aligned;
- move detached infrastructure into safe orbital orientation;
- oppose uncontrolled mass movement.

After the Meridian fracture, it continued correcting geometry according to old target states.

Its “body” is a central alignment hub with several enormous articulated structural arms.

## Visual identity

Not humanoid.

Components:

- central gyroscopic hub;
- four articulated alignment arms;
- counterweights;
- anchor sockets;
- rotating structural ring;
- cable/field braces.

It should read like orbital machinery that happens to fight through its alignment logic.

# Arena

Outer Crown ring with:

- four major arm lanes;
- central rotating hub;
- detachable floor sections;
- fixed rescue anchors;
- open exterior background.

The arena progressively loses stable floor.

# Core mechanic — Opposing Force

Each arm joint has an alignment lock.

To loosen:

1. expose joint;
2. apply force from correct opposing sides;
3. destabilize brace;
4. reconfigure or break joint.

The goal is not raw damage.

## Solo

Echo supplies the opposing force on authored joints.

## 2P

Direct opposite forces.

## 3P

Pair handles joint; third stabilizes hub/current/rescue.

## 4P

Two paired joints can be handled simultaneously.

# Phase 1 — Four Arms

**Target:** 100–180 seconds.

Attacks:

- alignment sweep;
- arm slam;
- rotating anchor arc;
- counterweight launch.

Objective:

loosen two arm joints.

Each arm creates movement infrastructure while active.

# Phase 2 — Unmoored Ring

Floor sections detach.

Movement becomes:

- Latch;
- Orbit;
- Vector Shift;
- Link rescue;
- current support.

New attacks:

- arm capture;
- brace pulse;
- rotating debris lane.

Objective:

reconfigure two remaining arms.

# Phase 3 — Shepherd Without Ground

Stable floor largely gone.

Players move among:

- arm anchors;
- counterweights;
- fixed ring nodes.

The hub attempts to restore original alignment.

Players must apply opposing force to final two stabilization braces during broad timing window.

No new mechanic appears.

# Flux / Phase / Invert use

Flux:

- activates inert emergency anchor or joint.

Phase:

- passes through selected alignment field / reaches alternate brace.

Invert:

- reverses one counterweight/tether relationship.

These deepen the fight without making it a checklist.

# Reward

Required reward package:

- **Periapsis Alignment Reserve** world/support flag;
- unique high-tier Module or cosmetic-tech reward;
- alternate BTC24 → BTC25 Crown route;
- Anchor Zero diagnostic.

Alignment Reserve may:

- reduce one Periapsis hazard;
- add one stabilization option;
- improve recovery margin.

It never chooses an ending.

# Difficulty

Harder mechanically than a normal critical-path boss.

Optional target:

- 6–12 attempts for median late-game action player;
- still accessibility-compatible.

# Failure recovery

Falling from arena:

- fast recovery until team wipe;
- limited health/fracture cost;
- no long reset.

# Network

Server owns:

- arm state;
- joint state;
- hub phase;
- floor/platform state;
- counterweight relations.

Major arm motion is parametric.

No physics-ragdoll station arms.

# Performance

- arm motion uses authored transforms;
- distant Crown geometry simplified;
- debris mostly cosmetic/local;
- open-space VFX reduce before anchor readability.

# Narrative value

Shepherd shows why Custodians fear unvalidated Anchor states.

Its old alignment target is wrong for the current Meridian, but its correction forces are genuinely capable of catastrophic movement.

The optional diagnostic reveals that Periapsis was designed to accept multiple alignment modes, although only some were historically approved.

This supports finale complexity without revealing a “correct ending.”

# Telemetry

Track:

- attempts;
- joint failures;
- opposing-force timing;
- Echo retries;
- Link rescues;
- falls;
- 4P joint participation;
- completion rate.

# Acceptance criteria

- optional status does not make encounter feel disposable;
- opposing-force mechanic scales cleanly;
- floor-loss section is readable;
- solo Echo works reliably;
- 4P uses two active pairs;
- reward matters in Periapsis but is not mandatory;
- boss does not overshadow Meridian Custodian narratively.
