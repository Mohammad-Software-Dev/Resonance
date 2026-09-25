# Choir Array — Enemy Package and Dissonant Pair

**Coverage:** Choir Array first visit  
**Standard archetypes:** 6  
**Elite:** Dissonant Pair  
**Design goal:** Make Phase, signal topology, state vulnerability and Link interaction matter in combat.

# 1. Tone Shade

**Role:** Phase attacker  
**Health:** H1–H2  
**Stability:** S1  
**Mass:** Light / state-dependent

Behavior:

- alternates Material and Resonant presence;
- attacks may originate in one state;
- vulnerability follows authored state pattern.

Counterplay:

- attack during Material window before Phase unlock;
- after Phase, follow into Resonant state;
- bait state transition.

Teaching:

Phase changes who/what you can affect.

# 2. Harmonic Knot

**Role:** support / shared Stability  
**Health:** H1  
**Stability:** S0  
**Mass:** Light/Anchored node

Behavior:

- links two enemies;
- shares or redistributes Stability;
- visible connection crosses arena.

Counterplay:

- destroy Knot;
- Phase to interact with Resonant connector;
- separate linked enemies where possible.

Multiplayer:

naturally creates split-target responsibility.

# 3. Pulse Cantor

**Role:** ranged / timing  
**Health:** H2  
**Stability:** S1  
**Mass:** Light-Medium

Attacks:

- expanding pulse;
- directional wave;
- state-specific pulse;
- delayed echo pulse.

Telegraph:

- visual ring;
- geometry animation;
- optional audio pitch.

No hearing requirement.

# 4. Null Listener

**Role:** disruptor  
**Health:** H2  
**Stability:** S1  
**Mass:** Medium

Behavior:

Creates a small field zone that temporarily suppresses:

- Link;
- or one selected Resonance relationship.

It never disables basic movement.

Counterplay:

- leave zone;
- Phase to alternate-state weak node;
- Flux inert grounding structure;
- destroy field component.

Purpose:

Prevents permanent reliance on one co-op trick.

# 5. Echo Husk

**Role:** mimic / behavior pressure  
**Health:** H2  
**Stability:** S1  
**Mass:** Light-Medium

Behavior:

Records one recent simplified player action.

Possible templates:

- jump;
- dash/evade line;
- Repel pulse;
- short attack;
- Phase shift;
- Latch path.

It replays after clear warning.

The Husk never copies:

- full combo string;
- arbitrary physics state;
- player build;
- accessibility behavior.

Counterplay:

- bait harmless action;
- change route;
- redirect copied action into another threat.

# 6. Chorus Bloom

**Role:** area control / topology  
**Health:** node-based  
**Stability:** S0–S1  
**Mass:** Anchored

Behavior:

Grows several signal nodes.

Nodes may:

- create Resonant platform;
- create Material obstacle;
- amplify Pulse Cantor;
- widen Null Listener zone.

Counterplay:

- Phase to reach root;
- reroute signal;
- destroy selected node;
- use Bloom geometry as route.

Teaching:

Enemy changes arena state rather than only dealing damage.

# Elite — Dissonant Pair

**Encounter ID:** ELITE_CA_DISSONANT_PAIR  
**Health:** H4 shared/paired  
**Stability:** S2 each  
**Mass:** Medium / semi-physical  
**Location:** CA17

## Fiction

Two long-lived field manifestations occupying complementary standing-wave states.

They may be:

- two individuals;
- two lobes of one distributed pattern;
- or a repeated paired behavior.

The game deliberately does not answer this yet.

## Silhouette

Pair A:

- narrow angular field form;
- Material-biased.

Pair B:

- broader ring-like form;
- Resonant-biased.

They must read as related but not mirrored humanoids.

## Core mechanic — Interference

Each entity emits one wave.

Where waves overlap, an **Interference Zone** forms.

Zone behavior depends on state:

- Material dangerous / Resonant safe;
- Resonant dangerous / Material safe;
- occasionally dual-state unstable.

Players manipulate Pair positions and Phase state to create openings.

## Phase A — Separation

Pair begins on opposite sides.

Attacks:

- crossing wave;
- state lunge;
- shared Stability pulse.

Goal:

damage/separate one entity enough to break synchronized pattern.

## Phase B — Coupling

Pair links.

Damage to one partially routes to other unless Harmonic connection is interrupted.

Player can:

- Phase to connection;
- Flux one inert relay;
- force positional separation.

## Phase C — Dissonance

Pair alternates states faster and creates moving Interference Zones.

Vulnerability increases.

## Solo

Pair attack concurrency lower.

Echo can hold one relay/control during Coupling.

## 2P

Natural target division.

## 3P

Two target Pair; third manages relay/interference/rescue.

## 4P

Two sub-pairs can manage each entity and crossing zone.

Pair gains broader multi-target patterns rather than large HP increase.

## Reward

- Array Key;
- Ghost Core access/progression;
- one Module/Bandwidth component;
- shortcut.

# Encounter combinations

## Early

Tone Shade + Pulse Cantor.

## Mid

Harmonic Knot + two simple enemies.

## Disruption

Null Listener + Tone Shade.

## Adaptive

Echo Husk + Pulse Cantor.

## Upper Array

Chorus Bloom + Harmonic Knot + Cantor.

## Pre-boss

Tone Shade + Null Listener + Chorus Bloom.

# Player-count guidance

## 1P

- fewer overlapping state-specific attacks;
- support enemies appear with clear focus windows.

## 2P

- paired state/target pressure.

## 3P

- support objective / cross-state role.

## 4P

- two lanes or network sectors;
- multi-target patterns;
- modest durability scaling.

# Technical notes

- Tone Shade uses StateMask, not duplicate actor.
- Harmonic Knot uses replicated relationship state.
- Cantor pulses are parametric wave events.
- Null Listener suppression uses explicit zone/state.
- Echo Husk uses authored action templates.
- Chorus Bloom topology nodes are explicit actors/states.
- Dissonant Pair interference derives from two parametric wave fields, not audio DSP.

# Readability

Must distinguish:

- Material attack;
- Resonant attack;
- Dual-state hazard;
- signal pulse;
- friendly Link signal;
- Phase-compatible enemy vulnerability.

Shape/pattern is required in addition to color.

# Acceptance criteria

- Phase matters in normal combat;
- no enemy requires hearing;
- Echo Husk feels clever rather than unfair;
- Null Listener disrupts without removing agency;
- Chorus Bloom changes topology legibly;
- Dissonant Pair prepares players for Choir Prime network/state thinking;
- four-player encounters distribute state/space responsibilities.
