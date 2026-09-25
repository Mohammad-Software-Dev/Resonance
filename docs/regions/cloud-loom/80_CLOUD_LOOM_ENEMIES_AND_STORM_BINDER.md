# Cloud Loom — Enemy Package and Storm Binder

**Coverage:** Cloud Loom first visit  
**Standard archetypes:** 6  
**Elite:** Storm Binder  
**Design goal:** Make currents, tethers, moving platforms and Invert matter in combat.

# 1. Sail Raptor

**Role:** aerial mobility pressure  
**Health:** H2  
**Stability:** S1  
**Mass:** Light-Medium

Behavior:

- rides current lanes;
- dives across player route;
- after stagger becomes temporary moving anchor.

Invert:

- reverse local lane to force path change.

# 2. Harvester Kite

**Role:** ranged platform / traversal object  
**Health:** H2–H3  
**Stability:** S2  
**Mass:** Medium

Behavior:

- fires from moving kite;
- follows parametric route.

After disable:

- remains usable as temporary platform/anchor.

Invert:

- reverse drive/current to alter route.

# 3. Pressure Bell

**Role:** hazard/support  
**Health:** H1–H2  
**Stability:** S1  
**Mass:** Anchored/Light mechanism

Behavior:

- charges pressure pulse;
- knocks players/objects along current.

Counterplay:

- break;
- Phase selected pulse;
- Invert pressure direction.

# 4. Threader

**Role:** tether control  
**Health:** H2  
**Stability:** S1  
**Mass:** Light-Medium

Behavior:

- creates damaging tether between nodes/objects;
- moves endpoints.

Invert:

- turns pull/control relationship against Threader or hazards.

# 5. Gas Manta

**Role:** large fauna / current shaper  
**Health:** H3  
**Stability:** S2  
**Mass:** Heavy

Behavior:

- glides through exterior lanes;
- fin nodes displace currents;
- body creates moving safe/unsafe wake.

Flux:

- fin node can become Resonant.

Invert:

- reverse selected fin-current relation.

# 6. Loom Sentinel

**Role:** heavy field-control enemy  
**Health:** H3  
**Stability:** S3  
**Mass:** Heavy

Behavior:

- creates local attraction/repulsion zones;
- protects machinery.

Invert:

- reverse selected field zone;
- use it against Sentinel/projectiles.

Teaching:

Invert applies to field relationships in combat.

# Elite — Storm Binder

**Encounter ID:** ELITE_CL_STORM_BINDER  
**Health:** H4  
**Stability:** S2–S3  
**Mass:** Medium central controller  
**Location:** CL17

## Fiction

Storm Binder is a mobile kite-control machine that coordinates several harvesting kites during dangerous current conditions.

It has continued operating without regard to human route safety.

## Silhouette

- central compact controller;
- three tether drums;
- several kite lines;
- pressure vanes;
- no humanoid body.

## Core mechanic

Storm Binder controls three kites.

Each kite relationship can be:

- Pull;
- Neutral;
- Push/Inverted.

The Binder uses these to reposition itself, create line hazards, move platforms and attack players.

Players seize relationships through Invert.

## Phase A — Bound Flight

One active kite relation at a time.

Attacks:

- tether sweep;
- kite dive;
- pressure pulse.

Player Inverts one relationship to expose controller.

## Phase B — Crosswind

Two kites operate simultaneously.

One may become temporary player platform after disable.

## Phase C — Storm Knot

All three relationships cycle.

Goal:

align two Inverted kite relationships long enough to overload Binder controller.

## Solo

Echo may hold one kite control.

## 2P

One kite relation each.

## 3P

Third manages controller/rescue.

## 4P

Two paired kite lanes.

## Reward

- Harvester authority key;
- Bandwidth/Module reward;
- shortcut;
- Loom control data.

# Encounter combinations

Early:

- Sail Raptor + Pressure Bell.

Mid:

- Harvester Kite + Threader.

Exterior:

- Gas Manta + Sail Raptor.

Heavy:

- Loom Sentinel + Pressure Bell.

Pre-boss:

- Harvester Kite + Threader + Sentinel.

# Player-count guidance

## 1P

Fewer simultaneous aerial tracking threats.

## 2P

Split current/tether pressure.

## 3P

Second lane/support objective.

## 4P

Two current lanes, multi-target patterns, modest durability increase.

# Technical notes

- Raptor current route is parametric.
- Kite platform path is server-authoritative time/path.
- Bell pulse is authored field event.
- Threader uses explicit tether relation.
- Gas Manta current influence is authored volume, not fluid.
- Sentinel uses relationship-state fields.
- Storm Binder kites use parametric path/tether states.

# Readability

Must distinguish:

- ambient current;
- lethal pressure pulse;
- friendly/usable current;
- Inverted relationship;
- enemy tether;
- Link tether;
- moving platform route.

# Acceptance criteria

- enemies teach Invert without making it mandatory for every kill;
- disabled Harvester Kite becomes meaningful traversal;
- Threader creates positional decisions;
- Gas Manta feels like fauna, not machine clone;
- Storm Binder prepares Loom Harvester multi-kite control;
- 4P remains readable.
