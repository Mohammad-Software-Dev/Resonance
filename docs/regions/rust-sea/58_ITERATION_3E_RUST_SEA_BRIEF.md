# Iteration 3E — Rust Sea Production Brief

**Status:** Production-specification pass  
**Scope:** Rust Sea gameplay, Flux Field acquisition, room flow, enemies, Undertow Engine, Dust Cathedral, particulate systems, regional narrative, transformation, assets, networking/performance and progression into Choir Array  
**Version 1 assumptions:** 2.5D, PC-first, solo + 1–4 online co-op, Unreal Engine 5.8.x, host-authoritative listen server

## Purpose

Rust Sea is the first region where the player changes the **Resonance eligibility of the world itself**.

Regional identity:

> **Flux changes what can respond.**

The Rust Sea looks like an ocean of metallic dust, scrap and machine fragments, but the game does not simulate every grain.

Gameplay is built from:

- deterministic particulate fronts;
- buried structures;
- inert lattice surfaces;
- sparse interactive masses;
- authored field states;
- reveal/expose transitions.

The spectacle may look fluid. The gameplay truth remains stable, testable and networkable.

## Canon carried forward

- Rust Sea covers an old machine-city.
- The “sea” is metallic particulate matter behaving like a granular fluid under Resonance fields.
- Flux Field is the major ability milestone.
- Flux temporarily makes designated inert lattices Resonant.
- Flux must matter in traversal, combat, puzzles, bosses and backtracking.
- Rust Sea enemies include Dredger, Cloudmouth, Ferric Hound, Burrow Relay, Dust Needle Current and Salvage Hermit.
- Undertow Engine is the regional elite.
- Dust Cathedral is the major Guardian.
- Regional transformation causes large particulate migration, exposing some city towers while burying previous surface routes.
- Choir Array / Phase follows in the broader progression.

## Regional fantasy

Rust Sea is a vast basin of metallic particulate matter created by centuries of:

- machinery erosion;
- failed fabrication;
- collapsed infrastructure;
- broken transit systems;
- magnetic sorting fields;
- discarded components.

Below the sea lies a machine-city whose structures were originally built from low-response industrial lattice.

To ordinary Resonance, much of that city is effectively inert.

Communities survive on:

- exposed tower crowns;
- salvage platforms;
- anchored ferries;
- field-stable ridges.

They read the movement of the Sea the way coastal cultures read tides.

## Visual identity

### Macro forms

- dunes/waves of metallic dust;
- half-buried machine towers;
- exposed bridge ribs;
- ferric cliffs;
- salvage rigs;
- huge buried conduits;
- rotating field beacons;
- moving “shorelines” of particles.

### Materials

- iron-black particulate;
- copper/brass oxidation;
- pale ceramic machine-city surfaces;
- dark inert lattice;
- bright Flux-activated lattice seams;
- compacted ferric plates.

### Motion

- broad particle fronts;
- surface ripples;
- localized avalanches;
- magnetic “currents” around active machinery;
- dust lifting away from newly Fluxed structures.

## Core regional systems

### 1. Flux Field

Flux temporarily changes a valid inert target from:

**Inert → Fluxed / Resonant**

While Fluxed, the object can participate in selected Resonance verbs.

Possible effects:

- becomes Attract/Latch anchor;
- can receive Repel;
- exposes component weak point;
- becomes Link-compatible;
- activates Resonant circuitry;
- changes surrounding particulate state.

Flux does not magnetize arbitrary world geometry.

### 2. Particulate Field States

The Sea uses authored states such as:

- Calm;
- Flowing;
- Rising;
- Receding;
- Compacted;
- Suspended;
- Excavated.

These states control:

- traversal surface;
- buried-object visibility;
- enemy behavior;
- selected hazards.

### 3. Buried Structure Reveal

Players locate hidden structures through:

- subtle field distortion;
- enemy behavior;
- map/lore clue;
- Flux response;
- partial geometry;
- particulate wake.

Flux can reveal/activate selected buried lattice without requiring the player to “vacuum up” grains manually.

### 4. Particle-Front Movement

Players can ride or launch from authored moving fronts.

The goal is to evoke surfing without creating a board/surf minigame.

Player remains the same Wayfarer controller.

### 5. Hidden Anchors

Some anchors are:

- physically buried;
- visible but inert;
- detectable only after Flux scan/response.

Flux creates temporary movement opportunities.

## Flux acquisition role

Flux should feel like the first ability that changes **world ontology** rather than only player movement.

Before:

> “That structure is not part of my movement system.”

After:

> “I can temporarily make it part of my movement system.”

This should create immediate backtracking desire.

## Region structure

### Act A — Ferric Shore

Teach:

- Sea state readability;
- buried structures;
- first Dredger/Cloudmouth;
- inert lattice frustration.

### Act B — Flux Works

Player acquires Flux Field.

Teach:

- inert → Resonant transition;
- Flux anchor traversal;
- Flux combat;
- Flux puzzle activation.

### Act C — Buried City

Combine:

- particle fronts;
- hidden anchors;
- buried towers;
- Undertow Engine;
- Flux under pressure.

### Act D — Cathedral Basin

Dust Cathedral uses the same particulate pool as arena/terrain/boss body.

After victory, the regional Anchor triggers large-scale Sea migration.

## Flux baseline behavior

Prototype:

- one target or small tagged cluster at a time;
- limited duration;
- moderate Heat cost;
- short re-use cadence rather than long cooldown;
- clear Fluxed state;
- target validation uses stable IDs/tags;
- no arbitrary physics-material conversion.

Flux duration and Heat are tuning values, not fixed lore.

## Regional decision

After Dust Cathedral, the party chooses how to set the basin's large-scale field circulation.

### Option A — City Excavation

Pull the Sea away from major historic machine-city structures.

Benefits:

- large old-city routes/services exposed;
- salvage/manufacturing resources increase;
- conventional traversal expands.

Costs:

- surface communities lose current ridges/platforms;
- particulate ecology/migratory enemies relocate;
- some previously accessible surface routes become buried under displaced Sea.

### Option B — Stable Tides

Preserve a controlled moving particulate Sea.

Benefits:

- existing salvage culture survives;
- dynamic “surf” routes remain;
- particulate ecology persists;
- less catastrophic relocation.

Costs:

- much of old city remains buried;
- heavy industrial infrastructure stays inaccessible;
- long-term maintenance burden persists.

### Option C — Directed Migration

Use the Anchor to move the Sea toward a selected failing/strategic region or containment basin.

Benefits:

- exposes selected Rust Sea structures;
- may shield, supply or enable another region.

Costs:

- destination gains metallic particulate hazards/ecological disruption;
- Rust Sea loses some current resources/routes;
- new threats may appear outside Rust Sea.

This option requires sufficient cross-region data and must not be a universal “best” path.

## Cross-region consequences

At minimum:

- Foundry power state influences how many dormant Rust systems are live on arrival.
- Observatory water outcome affects compacted particulate in one sub-region.
- Rust decision alters Transit and/or Foundry/Orchard state.
- Flux unlocks return paths in at least three previously visited regions.

## Co-op principles

Flux is personal but world state is authoritative.

Co-op opportunities:

- one player Fluxes a structure while another traverses it;
- two players Flux separate anchors for route relay;
- one Fluxes enemy armor while another strips/throws it;
- one controls particulate front while another rides it;
- four-player rooms divide into two active lanes.

Solo Echo may maintain:

- one Flux-compatible control;
- one force input;
- one temporary Link role.

Echo should not autonomously retarget Flux.

## Content targets

| Content | Target |
|---|---:|
| Rust Sea spaces | 26–32 |
| Standard enemy archetypes | 6 |
| Elite | 1 — Undertow Engine |
| Major boss | 1 — Dust Cathedral |
| Major ability | Flux Field |
| Convergence Chamber | 1 |
| Meaningful NPCs | 5–7 |
| Regional decision | 1 |
| Transformed critical rooms | 7–10 |
| Backtracking Flux gates in older regions | 6–10 authored examples |
| Cross-region consequence hooks | 3+ |

## Quality gates

### Flux

Within 15 minutes of acquisition, players should use Flux in:

- traversal;
- combat;
- puzzle/environment.

### Identity

Blind footage should read as:

> “the metallic particulate sea / buried machine-city region in the force co-op game”

—not simply “the desert level.”

### Performance

The Sea may look dense while gameplay uses sparse authoritative objects.

### Four-player

At least one:

- traversal sequence;
- excavation puzzle;
- Undertow Engine phase;
- Dust Cathedral phase

must create meaningful simultaneous work for four people.

### Backtracking

Flux should create at least three strong “I know exactly where I can use this now” memories from earlier regions.

## Exit criteria

Iteration 3E is complete when:

- Rust Sea is greybox-ready;
- Flux acquisition/tutorial is defined;
- Flux expands earlier abilities rather than replacing them;
- particulate systems are deterministic/networkable;
- Undertow and Dust Cathedral work for 1–4 players;
- regional transformation meaningfully buries/exposes spaces;
- prior world choices affect Rust Sea;
- Flux backtracking targets are specified;
- progression into Choir Array / Phase is coherent;
- no mechanic requires networked granular-fluid simulation.
