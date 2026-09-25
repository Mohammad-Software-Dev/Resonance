# Iteration 3D — Flooded Observatory Production Brief

**Status:** Production-specification pass  
**Scope:** Flooded Observatory gameplay, water-volume systems, room flow, enemies, Astrolabe Shell, Leviathan of the Flood, regional narrative, transformation, assets, and progression into Rust Sea  
**Version 1 assumptions:** 2.5D, PC-first, solo + 1–4 online co-op, Unreal Engine 5.8.x, host-authoritative listen server

## Purpose

Flooded Observatory is the third major production-detailed region.

Its job is to prove that Resonance can radically change movement feel without replacing the precision controller.

Regional identity:

> **Water is a moving volume that changes momentum.**

The player does not enter a separate free-swimming game.

Instead, water spheres alter:

- acceleration;
- drag;
- momentum preservation;
- launch strength;
- projectile travel;
- visibility/refraction;
- object mass response.

The same Resonance verbs remain central.

## Canon carried forward

- free-floating water spheres surround rotated research architecture;
- entering/exiting water changes momentum;
- water masses can be moved through fields;
- visibility/refraction matters;
- aquatic predators inhabit isolated volumes;
- Leviathan of the Flood is the major Guardian;
- Astrolabe Shell is the regional elite;
- regional transformation either drains water into historic channels, preserves suspended water, or redirects water to a failing settlement;
- transformation changes multiple rooms and NPC routes;
- Flux Field remains a **Rust Sea** milestone.

## Campaign role

Gravity Orchard teaches:

> move relationships.

Solar Foundry teaches:

> route systems.

Flooded Observatory teaches:

> **carry momentum through changing media.**

The player arrives with:

- Attract;
- Repel;
- Link/Echo;
- Latch;
- Orbit;
- Vector Shift.

The Observatory combines them in a new environmental state rather than adding another major traversal button.

## Regional fantasy

The Observatory was once a research and navigation complex built around enormous telescope assemblies, calibration pools and fluid laboratories.

After the fracture:

- basins lost stable gravity;
- water escaped into floating globes;
- research towers rotated away from original floors;
- aquatic life expanded into isolated sphere ecologies;
- lower residential/research districts adapted around suspended water;
- old historic channels remain dry but structurally intact.

Some inhabitants now depend on suspended water routes.

Others need that water redirected elsewhere.

## Visual identity

### Geometry

- rotated observatory towers;
- circular lens chambers;
- telescope trusses;
- dry canals;
- suspended bridges;
- ring-shaped fluid laboratories;
- pressure gates;
- articulated astrolabe machinery.

### Materials

- pale ceramic;
- dark optical metal;
- transparent pressure glass;
- oxidized copper/brass details;
- water-scarred stone/composite;
- luminous scientific markers.

### Motion

- drifting water spheres;
- slow telescope rotation;
- rippling lens membranes;
- floating debris inside globes;
- water volumes moving along authored field rails;
- refraction bending silhouettes.

### Atmosphere

- quiet suspended droplets;
- distant whale-like structural groans;
- muffled audio inside spheres;
- strong parallax from water lenses;
- calm beauty interrupted by violent momentum changes.

## Core regional systems

### 1. Water Volume State

A water sphere is an authored gameplay volume, not simulated fluid.

Each sphere has:

- stable WaterVolumeID;
- transform;
- radius/ellipsoid parameters;
- movement path or anchor relationship;
- flow vector/profile;
- momentum transfer profile;
- optical/refraction profile;
- occupancy;
- state variant.

### 2. Boundary Momentum Transfer

Crossing a water boundary changes movement.

Entry:

- preserves a tuned fraction of velocity;
- increases drag;
- can bend trajectory based on local flow.

Exit:

- converts stored velocity into an authored launch;
- may amplify or damp momentum by sphere state.

The key skill is reading entry angle and exit line.

### 3. Water-Mass Repositioning

Selected spheres can be moved between authored sockets/rails through Resonance.

Players manipulate:

- whole sphere center;
- pressure gate;
- flow direction;
- connected reservoir state.

The game does not simulate arbitrary fluid pouring.

### 4. Refraction Gameplay

Refraction affects:

- visual path;
- projectile path in specific authored cases;
- enemy telegraphs;
- hidden route readability.

Rules must remain fair:

- valid Resonance target always remains truthful;
- hitboxes do not secretly differ from readable path;
- accessibility can reduce distortion.

### 5. Pressure/Charge

Some enemies or machinery electrically/Resonantly charge a water volume.

Charged water becomes a temporary hazard.

Players may:

- redirect grounding;
- move sphere;
- exit before discharge;
- use the charge against enemies.

## No new major movement ability

Flooded Observatory deliberately does **not** add another major movement verb.

Reason:

- Vector Shift is still fresh;
- the Observatory can deepen movement through media changes;
- Flux Field belongs to Rust Sea;
- pacing benefits from a mastery region between major ability unlocks.

## Build-system progression

The region is a good point to introduce or deepen the **Mender Core** family.

Identity:

- Fracture recovery;
- rescue;
- controlled survivability;
- co-op stabilization.

It must remain useful solo.

## Regional structure

### Act A — Dry Periphery

Teach:

- first water sphere;
- boundary entry/exit;
- projectile refraction;
- basic aquatic enemy behavior.

### Act B — Suspended Labs

Teach:

- moving spheres;
- charged water;
- multi-volume traversal;
- Observatory society and water conflict.

### Act C — Deep Lens Array

Combine:

- Vector Shift;
- sphere-to-sphere momentum;
- water-mass routing;
- Astrolabe Shell;
- harder refraction.

### Act D — Leviathan Basin

Leviathan tests:

- inside/outside sphere combat;
- moving water masses;
- multi-volume coordination;
- momentum-based exposure windows.

## Duration target

- critical route: 2.5–3.5 hours;
- exploratory route: 4–5 hours.

## Region decision

### Option A — Historic Channel Restoration

Drain major suspended volumes into original canals/reservoirs.

Benefits:

- conventional infrastructure returns;
- dry upper research routes become active;
- some water delivery becomes predictable;
- certain historic systems stabilize.

Costs:

- suspended ecosystems collapse/relocate;
- sphere-based local routes disappear;
- lower channels flood;
- aquatic predators migrate.

### Option B — Suspended Basin Stabilization

Keep most major spheres aloft but stabilize their positions and pressure.

Benefits:

- current Observatory culture/ecology preserved;
- advanced sphere traversal remains;
- local displacement minimized.

Costs:

- historic canal infrastructure remains mostly dry;
- external water shortages receive little relief;
- continued technical maintenance burden.

### Option C — Relief Diversion

Redirect a major share of Observatory water to a failing settlement/system.

Benefits:

- saves/improves an external population or critical agriculture;
- creates meaningful cross-region support;
- may strengthen alliance/service state.

Costs:

- Observatory loses water volume and routes;
- some research/ecology is sacrificed;
- historic restoration remains incomplete.

This option should require prior knowledge of the external need rather than appear as an abstract moral button.

## Cross-region consequences

At minimum affect:

- Gravity Orchard irrigation;
- Transit Spine water/pressure infrastructure;
- Wayfarer Scar services or population state;
- Rust Sea access/support condition.

The Observatory is the first region where the player can cause a dramatic **resource transfer** rather than only local reconfiguration.

## Co-op principles

Water volumes create natural simultaneous roles.

Examples:

- one player moves a sphere while another rides/exits it;
- one grounds a charged sphere while another fights inside;
- one creates a Link rescue point outside a volume;
- two players occupy different volumes and coordinate pressure.

Solo Echo may:

- hold a pressure control;
- maintain one Resonance force;
- occupy a sensor;
- provide one timed Link point.

Echo never simulates fluid.

## Content targets

| Content | Target |
|---|---:|
| Observatory spaces | 24–30 |
| Standard enemy archetypes | 6 |
| Elite | 1 — Astrolabe Shell |
| Major boss | 1 — Leviathan of the Flood |
| New major movement ability | None |
| Core/build milestone | Mender family introduction/deepening |
| Convergence Chamber | 1 |
| Meaningful NPCs | 5–7 |
| Regional decision | 1 |
| Transformed critical rooms | 6–9 |
| Cross-region hooks | 3+ |

## Quality gates

### Movement

Players should enjoy deliberately entering and exiting spheres for speed/position even when no puzzle requires it.

### Readability

Players must understand:

- sphere boundary;
- flow;
- charge;
- exit direction;
- valid targets.

### Solo

Echo solutions must feel like timing/choreography, not programming.

### Four-player

Four-player rooms should use separate volumes/roles rather than put all four inside one visual soup.

### Transformation

After the regional decision, old rooms must visibly become new traversal spaces.

## Exit criteria

Iteration 3D is complete when:

- Observatory is greybox-ready;
- water-volume rules are deterministic and networkable;
- Leviathan works conceptually for 1–4 players;
- Astrolabe Shell teaches boss-adjacent water manipulation;
- three regional outcomes materially alter rooms and NPC movement;
- cross-region water effects are specified;
- Flux remains cleanly staged for Rust Sea;
- no mechanic requires real fluid simulation or a separate swimming controller.
