# Iteration 3G — Cloud Loom Production Brief

**Status:** Production-specification pass  
**Scope:** Cloud Loom gameplay, Invert acquisition, room flow, atmospheric-current systems, enemies, Storm Binder, Loom Harvester, narrative, transformation, assets, multiplayer, networking/performance, and progression into Broken Transit Crown / Periapsis  
**Version 1 assumptions:** 2.5D, PC-first, solo + 1–4 online co-op, Unreal Engine 5.8.x, host-authoritative listen server

## Purpose

Cloud Loom is the final major ability-acquisition region before the late-game convergence.

Its core promise is:

> **Invert reverses a selected field relationship.**

Cloud Loom must not become a generic wind level and must not rely on free-form fluid simulation.

The player remains the same precision Resonance character. The region introduces large exterior movement spaces whose “wind” is represented by authored current lanes, pressure relationships, tether fields, harvesting machinery, and moving kite structures.

## Canon carried forward

- Cloud Loom extends toward the gas giant.
- Invert is the major ability milestone.
- Loom Harvester is the regional Guardian.
- Storm Binder is the regional elite.
- Enemy family: Sail Raptor, Harvester Kite, Pressure Bell, Threader, Gas Manta, Loom Sentinel.
- Long launch/catch sequences are a signature.
- Enemy machinery doubles as traversal infrastructure.
- Invert must work in traversal, combat, puzzles and bosses.
- Region outcome alters external current/weather/energy behavior.
- Broken Transit Crown and Periapsis follow.

## Regional fantasy

Cloud Loom is a vast atmospheric-harvesting system suspended beneath the Meridian.

It uses tethered kites, pressure sails, gas scoops, field vanes, orbital counterweights, long intake trunks and atmospheric transfer lines.

After the fracture:

- current lanes drifted;
- harvest lines became dangerous;
- some worker habitats migrated onto kite structures;
- atmospheric machinery began self-routing around broken infrastructure;
- prior Anchor decisions changed how much power, water, signal and mass the Loom receives.

The player sees the Meridian's orbital crisis directly.

## Visual identity

**Macro:** enormous kites and sails, long suspended harvesting lines, gas giant filling much of the background, storm bands below, broken orbital rings above, drifting harvester machinery, cables spanning impossible distances.

**Materials:** high-tension fabric/composite sails, ceramic pressure ribs, conductive tether cables, lightweight trusses, cloud-scrubbed metal, frost/condensate.

**Motion:** sail flex, current-lane particles, pressure pulses, huge slow kite arcs, sudden tether snaps, atmospheric streamers, moving collector arrays.

## Core systems

### Invert

Invert reverses one authored relationship.

Examples:

- Attract lane ↔ Repel lane;
- intake ↔ exhaust;
- tether pull direction;
- current direction;
- selected enemy field;
- moving platform relationship.

Invert does not reverse the whole room.

### Atmospheric Current Lanes

Currents are deterministic field volumes with direction, strength, path, state, Invert compatibility and timing profile.

They affect player movement through authored acceleration, not fluid simulation.

### Kite / Sail Platforms

Large moving platforms follow parametric paths.

They can be normal traversal, enemy machinery, boss components and co-op handoff points.

### Long Launch / Catch

The region emphasizes long-distance movement using Repel, Latch, Orbit, Vector Shift, Flux, Phase, Invert and Link rescue.

Failure recovery uses nearby catch nets, lower platforms, return gusts or checkpoint relays.

### Pressure / Harvest Flow

Pressure is represented as discrete field relationships.

Players redirect gas intake, venting, sail load, pressure gates and tether balance.

No CFD simulation is required.

## Invert acquisition role

Invert is the culmination of the major Resonance toolkit.

Before Invert:

> “I can interact with the relationship as it exists.”

After Invert:

> “I can temporarily reverse the relationship itself.”

## Region structure

### Act A — Upper Moorings

Teach current-lane readability, kite traversal, recovery routes and early enemies.

### Act B — Reversal Works

Acquire Invert and teach current, tether, enemy-field and mechanism reversal.

### Act C — Harvester Expanse

Combine large launch/catch, Storm Binder, moving kite lanes and long-range rescue.

### Act D — Loom Harvester

The Guardian becomes a moving multi-kite chase/boss encounter.

After victory, the party chooses how Cloud Loom should operate.

## Duration target

- critical route: 3–4 hours;
- exploratory route: 4.5–6 hours.

## Regional output decision

### Option A — Maximum Harvest

Restore high-output atmospheric harvesting.

Benefits:

- major station power/resource gain;
- more late infrastructure active;
- Broken Transit Crown has stronger conventional support.

Costs:

- higher current intensity;
- more aggressive atmospheric machinery;
- greater stress on habitat/tethers;
- more extraction from the gas-giant atmosphere.

### Option B — Stable Envelope

Reduce throughput and prioritize orbital stability/safe worker routes.

Benefits:

- safer exterior traversal;
- lower mechanical stress;
- more worker habitats remain viable;
- fewer catastrophic current events.

Costs:

- less energy/resource throughput;
- some late systems stay underpowered;
- Periapsis solutions have less conventional reserve.

### Option C — Distributed Lift

Requires optional routing work.

Use Loom output to support multiple transformed regions and orbital stabilization nodes rather than maximize one harvest trunk.

Benefits:

- selected regions gain current/energy support;
- late-game traversal network improves;
- can reduce one specific prior-region crisis.

Costs:

- Cloud Loom remains complex and maintenance-heavy;
- peak harvest never returns;
- some current lanes stay unstable;
- no single system gets maximum capacity.

## Cross-region consequences

At minimum:

- Broken Transit Crown exterior currents differ.
- Transit/Relay power changes.
- one earlier exterior region receives or loses wind/current support.
- Tessel/Choir carrier propagation changes.
- Periapsis final configuration receives different energy/stability budget.

## Co-op principles

Cloud Loom should showcase cooperative movement without requiring voice.

Examples:

- one player catches/Links another after long launch;
- two players occupy separate kite lanes;
- one Inverts current while another rides it;
- one stabilizes tether while another tears component;
- four players split into two aerial pairs.

No player becomes permanent switch operator.

## Solo Echo

Echo may maintain one control, hold one tether relationship, repeat one Invert-compatible action if recorded/validated, or provide one Link endpoint.

Solo routes should remain choreographic rather than requiring long automation scripts.

## Content targets

| Content | Target |
|---|---:|
| Cloud Loom spaces | 28–34 |
| Standard enemy archetypes | 6 |
| Elite | 1 — Storm Binder |
| Major boss | 1 — Loom Harvester |
| Major ability | Invert |
| Convergence Chamber | 1 |
| Meaningful NPCs | 5–7 |
| Regional decision | 1 |
| Transformed critical rooms | 7–10 |
| Invert return routes in older regions | 6–10 |
| Cross-region hooks | 4+ |

## Quality gates

- Invert is used in traversal, combat, puzzle/mechanism and co-op/Echo-supported interaction within 20 minutes.
- Long-range traversal is thrilling without repeated long recovery time.
- Four-player current direction, own target, teammate state and lethal hazard remain readable.
- Blind footage reads as the gas-giant atmospheric harvesting / kite traversal region, not a generic sky level.

## Exit criteria

Iteration 3G is complete when:

- Cloud Loom is greybox-ready;
- Invert has a safe acquisition sequence;
- atmospheric currents are deterministic/networkable;
- Storm Binder and Loom Harvester work for 1–4 players;
- all major abilities compose without contradiction;
- regional outcome changes late-game spaces;
- Invert creates compelling backtracking;
- no current or sail mechanic requires general fluid simulation;
- Broken Transit Crown / Periapsis progression is coherent.
