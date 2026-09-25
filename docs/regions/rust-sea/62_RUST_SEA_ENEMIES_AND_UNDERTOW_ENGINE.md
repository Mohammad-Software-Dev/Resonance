# Rust Sea — Enemy Package and Undertow Engine

**Coverage:** Rust Sea first visit  
**Standard archetypes:** 6  
**Elite:** Undertow Engine  
**Design goal:** Make Flux, buried-state reading and particulate fronts matter in combat.

# 1. Dredger

**Role:** ambush / wake-reading  
**Health:** H2  
**Stability:** S1  
**Mass:** Medium

Behavior:

- travels below shallow particulate band along authored path;
- wake reveals location;
- bursts upward to strike.

Counterplay:

- dodge by wake;
- Flux buried lattice to force exposure;
- Attract/Repel after emergence.

Teaching:

Read the Sea, not just enemy model.

# 2. Cloudmouth

**Role:** defensive armor assembler  
**Health:** H2–H3  
**Stability:** S2  
**Mass:** Medium

Behavior:

- pulls nearby particulate into shell;
- periodically repairs shell if field resource remains.

Flux:

- exposed inert lattice component becomes Flux-compatible;
- Flux allows armor/core manipulation.

If nearby field is Excavated, armor rebuild weakens.

Teaching:

Enemy defense depends on environment state.

# 3. Ferric Hound

**Role:** pursuit / Resonance tracker  
**Health:** H2  
**Stability:** S1–S2  
**Mass:** Medium

Behavior:

- tracks recent high-output Resonance/Flux;
- uses moving fronts efficiently;
- lunges toward active anchor routes.

Counterplay:

- bait toward hazard/current;
- switch route;
- Flux buried obstacle into path.

Teaching:

Your Resonance activity changes aggro.

# 4. Burrow Relay

**Role:** support / hidden objective  
**Health:** H1–H2 core  
**Stability:** S0  
**Mass:** Anchored while buried

Behavior:

- powers nearby enemies;
- may spawn/activate Dredger nodes;
- remains partly hidden.

Reveal:

- wake;
- field pulse;
- Flux trace.

Counterplay:

- expose control lattice;
- Flux;
- pull/break core.

Teaching:

Flux reveals support structure.

# 5. Dust Needle Current

**Role:** moving hazard / enemy-like field  
**Health:** state-based  
**Mass:** Feather aggregate

Behavior:

- travels along authored front;
- damages/knocks back;
- may split at control node.

Resonance:

- Flux a control rib;
- Attract/Repel shifts path temporarily.

Networking:

Replicate path/state, not needles.

# 6. Salvage Hermit

**Role:** ranged / neutral-variable scavenger  
**Health:** H2  
**Stability:** S1  
**Mass:** Medium

Fiction:

Independent scavenger/creature using shell of old machine parts.

Behavior:

- some neutral;
- some territorial;
- uses scrap shell as ranged/defensive tool.

Flux:

- shell component becomes temporarily manipulable;
- can strip without necessarily killing if encounter supports.

Purpose:

Rust Sea inhabitants are not all simple hostiles.

# Elite — Undertow Engine

**Encounter ID:** ELITE_RS_UNDERTOW  
**Health:** H4  
**Stability:** S3 frame / S2 exposed nodes  
**Mass:** Heavy/Anchored  
**Location:** RS17

## Fiction

An old city field-control machine whose job was to move industrial particulate between fabrication districts.

It now creates local “currents” in the Rust Sea.

Not a creature.

## Silhouette

- low massive machine frame;
- three field vanes;
- buried lower body;
- rotating conveyor/field ribs;
- no humanoid posture.

## Core mechanic

Undertow Engine controls three **Current Nodes**.

Each node changes:

- particulate front direction;
- arena safe ridge;
- buried/exposed status of one component.

Before Flux, nodes are inert.

After Flux:

- player can temporarily seize a node;
- redirect current;
- expose Engine component.

## Phase A — Draw

Attacks:

- inward drag front;
- vane sweep;
- buried debris launch;
- Ferric Hound support at higher player counts.

Goal:

Flux one node and create safe/exposure lane.

## Phase B — Crosscurrent

After first component break:

- two fronts cross;
- Engine shifts buried depth;
- current nodes decay faster.

Players must reposition quickly.

## Phase C — Undertow

Engine creates strong outward/inward alternating fronts.

Core becomes damageable after two node states align.

## Solo

Echo may maintain one Flux/control input later in fight.

## 2P

One manipulates current, one attacks/exposes.

## 3P

Third handles support/front rescue.

## 4P

Two Current Nodes active simultaneously with two broad lanes.

No huge HP scaling.

## Reward

- city survey key;
- Bandwidth/Module progression;
- Dust Cathedral field map fragment;
- permanent shortcut.

# Encounter combinations

## Early

Dredger + Ferric Hound.

## Mid

Cloudmouth + Burrow Relay.

## Front combat

Dust Needle Current + Ferric Hound.

## Buried City

Dredger + Relay + Cloudmouth.

## Pre-boss

Cloudmouth + Needle Current + Relay.

# Player-count guidance

## 1P

- one hidden support priority at a time;
- fronts do not overlap hardest tracking attacks on introduction.

## 2P

- split reveal/pressure roles.

## 3P

- support objective or second lane.

## 4P

- two buried/support lanes;
- multi-target Hound behavior;
- modest durability scaling.

# Technical notes

- Dredger route is authored under-surface spline/state.
- Cloudmouth armor amount is normalized state, not particle count.
- Ferric Hound tracks gameplay events, not actual particle disturbance.
- Burrow Relay has explicit hidden/revealed states.
- Needle Current is parametric hazard front.
- Salvage Hermit shell uses component state.
- Undertow fronts/nodes are server-authoritative state.

# Readability

Must distinguish:

- harmless dust;
- moving front;
- Dust Needle Current;
- hidden-object trace;
- Fluxed lattice;
- enemy wake;
- background particulate.

# Acceptance criteria

- Dredger ambush feels telegraphed;
- Cloudmouth makes Flux combat useful;
- Ferric Hound turns player activity into tactical consideration;
- Burrow Relay makes excavation/reveal meaningful;
- Needle Current is readable at 4P;
- Undertow teaches current manipulation before Dust Cathedral;
- no enemy requires per-particle networking.
