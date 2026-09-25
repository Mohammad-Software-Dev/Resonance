# Solar Foundry — Narrative, Transformation, Art, Audio and Asset Requirements

**Purpose:** Give Solar Foundry a lived culture and production identity rather than treating it as only a mechanics region.

# Narrative function

Gravity Orchard establishes that repairing infrastructure can damage a society that adapted to failure.

Solar Foundry develops the idea:

> A system can be technically correct and socially wrong because its operating assumptions changed.

The regional conflict is about **power distribution**.

# Foundry society

The surviving Foundry community is highly technical.

They have spent generations maintaining a lower-output, distributed system because the original peak-output configuration became dangerous after the Meridian fractured.

Cultural traits:

- prestige around mirror alignment;
- apprenticeship traditions;
- reused glass pieces with family/workshop history;
- manual shadow schedules;
- workers understand light timing like sailors understand tides;
- old automation is respected but not blindly obeyed.

# Primary NPCs

## Nera Sol — Master Mirrorwright

Regional practical leader.

Traits:

- direct;
- meticulous;
- protective of apprentices;
- skeptical of “restore defaults” logic.

Function:

- explains why mirrors were deliberately misaligned;
- key voice for Civic/Spectrum options.

## Vey Ardan — Furnace Archivist

Historian of original Foundry operation.

Traits:

- fascinated by historical engineering;
- believes lost capacity matters;
- not a simple Restorationist caricature.

Function:

- explains what full output could restore;
- reveals old emergency load plans.

## Pell Rusk — Shift Supervisor

Worker-focused quest voice.

Traits:

- tired;
- practical;
- uninterested in abstract ideology.

Function:

- makes thermal/shadow consequences personal;
- supports evacuation/redistribution side quest.

## Senn Vale — Lens Technician

Young maintenance technician.

Function:

- connects Vector Shift to historic inspection work;
- provides movement-oriented tutorial fiction;
- adds warmth without constant quipping.

## Regent Diagnostic Voice

After defeat, Glass Regent remains partially functional.

It provides:

- historical load assumptions;
- projected consequences;
- system interpretation.

It never tells the player which choice is morally correct.

# Wayfarer perspectives

## Mara

Tempted by the elegance of historical restoration.

Learns that a technically correct model may solve the wrong requirements.

## Ily

Initially favors preserving adapted Foundry ecology and culture.

Complication:

- low output may be starving other settlements of critical power.

This challenges automatic preservation.

## Jun

Connects strongly to worker routes and inspection movement traditions.

Vector Shift has narrative resonance without mechanical exclusivity.

## Oren

Recognizes Custodian standards in Regent logic.

Can reveal:

- why peak output was once mandatory;
- how Custodians previously overrode local objections.

# Quest structure

## Main quest

1. Reach Kiln Quarter.
2. Learn misalignment is intentional.
3. Restore enough lower routing to access Upper Heliostat.
4. Acquire Vector Shift.
5. Defeat Kiln Marshal.
6. Recover historical load data.
7. Confront Glass Regent.
8. Choose distribution mode.

## Optional — The Shadow Ledger

Recover several generations of manual shutter schedules.

Reveals:

- lower districts survived because workers reduced peak exposure;
- “efficiency loss” was deliberate safety;
- Fractured Spectrum becomes technically possible.

## Optional — Power Debt

Identify external systems failing for lack of Foundry power.

Examples:

- Wayfarer Scar fabrication;
- Transit emergency systems;
- Orchard water pump.

Makes full restoration attractive for real reasons.

## Optional — Glass Garden

Investigate adapted mineral/biological growth in warm channels.

Provides:

- cultural/ecological consequence;
- Spectrum calibration data.

Do not frame it as automatically outweighing human infrastructure needs.

# Decision presentation

Before the final choice, UI summarizes known factual consequences.

Do not label options:

- good;
- bad;
- selfish;
- optimal.

Guests submit advisory votes.

Host confirms.

# Transformation consequences

## Historical Grid

Local:

- mirror arrays align;
- heavy production starts;
- shadow zones shrink;
- some workers relocate;
- adapted glass habitat diminishes.

External:

- more Transit machinery activates;
- Wayfarer Scar fabrication improves;
- dormant security enemies wake;
- some Custodian systems recognize compliance.

## Distributed Civic

Local:

- worker districts stabilize;
- safe routes/services expand;
- automation remains partially manual.

External:

- Relay/support infrastructure improves;
- some heavy systems remain offline;
- fewer dormant threats activate.

## Fractured Spectrum

Local:

- multi-path alignment remains;
- Glass Garden survives;
- advanced traversal routes remain;
- full industrial output stays unavailable.

External:

- Resonant leakage appears in selected regions;
- Choir/Tessel foreshadowing strengthens;
- Custodian systems flag noncompliance.

# Required world-state tags

Examples:

- World.Anchor.Foundry.Historical
- World.Anchor.Foundry.Civic
- World.Anchor.Foundry.Spectrum

Update at least:

- Transit vista/state;
- Wayfarer Scar service state;
- one Gravity Orchard system;
- one Rust Sea future flag.

# Art kit

## Architecture

- parabolic mirror segments;
- reflector trusses;
- ceramic heat walls;
- furnace arches;
- glass channels;
- shutters;
- inspection rails;
- receiver pylons;
- cooling ducts;
- suspended bridges.

## Props

- alignment tools;
- mirror covers;
- glass molds;
- discarded plates;
- heat-warning markers;
- shade structures;
- calibration gauges;
- coolant canisters.

## Glass material family

Readable variants:

- decorative;
- gameplay-solid;
- cracked;
- reflective;
- molten;
- hot/annealed.

Gameplay glass must not resemble ordinary background window material.

## Landmark

**The Solar Crown**

A ring of enormous heliostat petals visible from multiple Foundry rooms and selected Transit vistas.

Glass Regent occupies its control chamber.

# Lighting

Rules:

- playable surfaces readable in shadow;
- lethal beam distinct from decorative sunlight;
- critical state never depends on HDR brightness;
- colorblind-safe shape/pattern support;
- Medium preset remains mechanically readable without Lumen.

# VFX

Required:

- beam source;
- active receiver;
- mirror lock;
- mirror overheat;
- glass forming;
- glass crack;
- anneal state;
- Heat Leech attachment;
- Vector Shift direction;
- Regent shell instability.

Four-player density variants required.

# Animation

Environmental:

- mirror servos;
- shutters;
- glass-forming arms;
- cooling vents;
- furnace gates;
- heliostat petals.

Enemy telegraphs must remain readable on reflective materials.

# Audio

Regional layers:

- furnace rumble;
- mirror servos;
- coolant hiss;
- glass stress pings;
- structural resonance;
- periodic deep alignment tone.

System sounds:

- receiver lock;
- mirror detent;
- glass crack;
- Heat warning;
- Vector Shift snap.

Vector Shift must sound distinct from Repel.

# Music

Regional palette:

- struck glass/percussive tones;
- low mechanical pulse;
- restrained acoustic strings/winds for human craft culture;
- processed sustained tones for solar machinery.

Avoid generic “fire dungeon” bombast.

# Dialogue density

Critical route before Regent:

- roughly 2–4 minutes of mandatory dialogue if player skips optional conversation.

Optional conversations provide depth.

No long exposition after every mechanical room.

# Co-op narrative

- important scenes recognize all active Wayfarers;
- guest votes appear at final decision;
- character-specific lines are flavor;
- no critical clue depends on banter.

# Production constraints

- background heliostats use instancing/low-cost parametric animation;
- heat shimmer scales;
- glass fragments are local cosmetic;
- no hardware RT dependency;
- mirror reflection can use authored material tricks.

# Asset priority

## P0

- gameplay mirrors;
- beam VFX;
- glass states;
- heat/quench zones;
- modular Foundry kit;
- six enemy silhouettes;
- Kiln Marshal;
- Regent;
- Vector Shift VFX.

## P1

- Solar Crown vistas;
- worker settlement kit;
- Glass Garden;
- state-specific aftereffects.

## P2

- decorative glass variants;
- secondary skyline animation;
- minor workshop props.

# Acceptance criteria

Players should be able to explain:

- why workers misaligned the grid;
- what full power would help;
- what full power would damage;
- why Regent thinks restoration is correct;
- what their selected distribution changed.

The region should support reasonable disagreement without implying one morally correct answer.
