# Iteration 3C — Solar Foundry Production Brief

**Status:** Production-specification pass  
**Scope:** Solar Foundry gameplay, room flow, Glass Regent, Kiln Marshal, Foundry systems, narrative, transformation, and early-campaign progression  
**Version 1 assumptions:** 2.5D, PC-first, solo + 1–4 online co-op, Unreal Engine 5.8.x, host-authoritative listen server

## Purpose

Iteration 3C takes **Solar Foundry** to the same production depth already established for Gravity Orchard.

The Foundry must prove that Resonance can support a second regional language without becoming a disconnected minigame.

Regional identity:

> **Light is infrastructure. Heat is pressure. Glass is temporary geometry.**

Mirrors, beams, glass armor, thermal machinery, projectiles, traversal anchors, puzzles and bosses all use the same Resonance rules.

## Canon carried forward

- Attract / Repel / Link / Echo / Latch are established.
- Orbit follows the first major Guardian.
- Solar Foundry emphasizes projectile redirection, Heat management and directional force.
- Glass Regent is the major regional boss.
- Kiln Marshal is the regional elite.
- Additional players add responsibilities more than HP.
- Host owns irreversible world decisions.
- Foundry restoration changes infrastructure outside the region.

## Regional fantasy

Solar Foundry is a network of heliostats, glass channels, furnace halls and fabrication towers that once converted solar input into power, structural glass and Resonant components for the Meridian.

After the Meridian fractured:

- mirrors drifted from historical alignment;
- lower districts adapted to distributed output;
- glass ecosystems formed around warm channels;
- technicians developed manual mirror-routing traditions;
- dormant automation still attempts to restore original peak output.

The Foundry is therefore not “broken machinery waiting to be fixed.” It is a functioning adapted society sitting on top of an older high-output system.

## Visual identity

**Geometry:** parabolic reflectors, angled lens corridors, rotating shutters, vertical glass channels, ceramic heat baffles, suspended mirror gantries.

**Materials:** ceramic shielding, dark conductive frames, metallic mirror backs, translucent glass, molten glass, heat-stained composites.

**Motion:** slow mirror rotation, shutters snapping between angles, glass ribbons forming/hardening, thermal vents cycling, light paths sweeping across architecture.

**Atmosphere:** hard directional light, heat shimmer, glass dust, long shadows, high-contrast silhouettes.

## Astronomical production assumption

Iteration 3C uses the **gas-giant orbital habitat** as the working production assumption.

This remains reopenable before final art lock, but Foundry content assumes:

- the gas giant is a permanent exterior landmark;
- heliostats harvest direct stellar light while the planet dominates the sky;
- orbital shadow cycles create natural Foundry timing;
- Cloud Loom later reaches into the gas giant's upper atmosphere.

## Core regional systems

### Beam routing

Energy travels through authored:

- emitters;
- mirrors;
- splitters;
- shutters;
- receivers;
- temporary glass reflectors.

The beam network is deterministic gameplay logic, not real-time optical ray tracing.

### Thermal pressure

The Foundry uses the player's existing **Resonance Heat**.

Environmental states modify:

- Heat generation;
- cooling rate;
- safe exposure;
- mirror/glass behavior.

No second player heat meter is introduced.

### Brittle glass geometry

Glass states:

- Molten;
- Forming;
- Solid;
- Cracked;
- Shattered.

Glass can become:

- cover;
- mirror;
- temporary platform;
- throwable shard;
- beam blocker.

Critical glass objects always reset safely.

### Vector Shift

Solar Foundry is the intended acquisition region for **Vector Shift**.

Vector Shift gives one deliberate airborne redirection during valid Resonance movement.

It must:

- extend Latch/Orbit rather than replace them;
- preserve momentum skill;
- support traversal, combat, puzzles and boss mechanics;
- remain predictable through CharacterMovement networking.

## Campaign position

Solar Foundry outskirts may be visited before Gravity Orchard is fully resolved.

Before Latch/Orbit:

- early threshold rooms are accessible;
- one side reward is available;
- deeper upper routes are visible but not practical.

After Latch/Orbit:

- the full critical route opens.

This preserves early choice without breaking onboarding.

## Regional structure

### Act A — Foundry Threshold

Teach:

- beam readability;
- heat zones;
- Glazier / Prism Drone;
- safe projectile redirection.

### Act B — Manual Works

Teach:

- glass states;
- worker culture;
- routing under combat pressure;
- Foundry's power-distribution conflict.

### Act C — Upper Heliostat

Acquire **Vector Shift**.

Then combine:

- Vector Shift;
- mirrors;
- moving anchors;
- stronger beam routing;
- Kiln Marshal.

### Act D — Regent Crown

Glass Regent tests the full regional grammar, then the player chooses how the recovered solar network should distribute power.

## Regional decision

### Option A — Historical Grid Alignment

Restore the original central high-output grid.

**Benefits**

- maximum infrastructure power;
- more Transit systems activate;
- high-tier manufacturing becomes available sooner.

**Costs**

- old security/industrial systems reactivate;
- adapted low-output districts suffer;
- more powered enemies appear elsewhere.

### Option B — Distributed Civic Routing

Prioritize settlements, Relays and safe regional infrastructure.

**Benefits**

- safer worker districts;
- stronger Relay/service access;
- several settlements improve.

**Costs**

- heavy industrial systems stay underpowered;
- some historical routes/services remain offline;
- later engineering tasks may require manual alternatives.

### Option C — Fractured Spectrum Calibration

Unlocked through optional Foundry research.

The heliostat remains deliberately multi-path and lower-output.

**Benefits**

- preserves adapted glass ecology/culture;
- creates advanced light/traversal routes;
- reduces catastrophic local thermal load.

**Costs**

- full industrial capacity never returns;
- spectral leakage energizes unexpected Resonant systems;
- Custodian systems classify the Foundry as noncompliant.

It is not a consequence-free “best” option.

## Cross-region consequences

At least three external states must change.

Candidates:

- Transit Spine lifts/doors power on;
- Wayfarer Scar gains fabrication capability;
- Gravity Orchard irrigation machinery changes behavior;
- Rust Sea dormant relays/threats activate;
- Fractured Spectrum creates early Choir/Tessel foreshadowing.

## Regional co-op rule

Do not turn every puzzle into “one mirror per player.”

Scaling priority:

1. preserve one conceptual routing problem;
2. add simultaneous lanes;
3. add defense/relay/carry responsibilities;
4. increase enemy cross-lane pressure;
5. use modest durability scaling last.

Solo Echo may:

- hold one mirror orientation;
- maintain one force input;
- occupy one receiver/sensor;
- provide one Link/anchor proxy.

Echo should not solve continuously changing free-form optics.

## Content targets

| Content | Target |
|---|---:|
| Foundry spaces | 22–28 |
| Standard Foundry enemies | 6 |
| Elite | 1 — Kiln Marshal |
| Major boss | 1 — Glass Regent |
| New major ability | Vector Shift |
| Convergence Chamber | 1 |
| Meaningful NPCs | 5–7 |
| Major regional decision | 1 |
| Transformed critical rooms | 5–8 |
| Cross-region consequence hooks | 3+ |

## Duration target

- critical route: 2.5–3.5 hours;
- exploratory route: 4–5 hours;
- early pre-Orchard visit: roughly 20–40 minutes of accessible content.

## Quality gates

### Identity

Blind footage should read as the **solar mirror / glass-forging region in the force co-op game**, not merely “the fire level.”

### Movement

Vector Shift creates new lines without invalidating Latch/Orbit mastery.

### Combat

Players meaningfully redirect enemy projectiles and glass components.

### Solo

At least one real beam-routing problem feels elegant with Echo.

### Four-player

All four players have active work in:

- one traversal room;
- one routing puzzle;
- Kiln Marshal;
- Glass Regent.

### Transformation

A consequence is visible outside the Foundry soon after the regional decision.

## Iteration 3C exit criteria

Iteration 3C is complete when:

- Solar Foundry is greybox-ready;
- Vector Shift has a safe acquisition/tutorial path;
- all signature mechanics fit the Iteration 3B architecture;
- Glass Regent has valid 1/2/3/4P structures;
- Foundry's power decision changes local and external states;
- Orchard + Foundry progression is coherent;
- no new system requires rewriting movement, networking or saves.
