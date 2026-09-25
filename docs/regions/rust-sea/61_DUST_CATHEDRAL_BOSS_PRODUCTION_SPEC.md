# Dust Cathedral — Major Boss Production Specification

**Region:** Rust Sea  
**Encounter ID:** BOSS_RS_DUST_CATHEDRAL  
**Expected first-clear timing:** 4–8 attempts for target baseline player  
**Retry:** RS24 Relay directly outside basin  
**Primary tests:** Flux under pressure, terrain/boss resource tradeoff, particulate fronts, 1–4 player control-knot scaling

## Fiction

Dust Cathedral is a colony intelligence assembled from:

- old machine-city maintenance nodes;
- ferric particulate;
- buried control lattice;
- autonomous repair logic.

It is not literally a religious building.

Its towering “cathedral” shape emerges because the colony repeatedly uses the same efficient structural arches, ribs and vertical load paths when rebuilding itself.

Local salvagers named it after its silhouette.

The colony uses the surrounding particulate Sea as both:

- body material;
- armor;
- terrain;
- repair resource.

## Core encounter principle

> **Boss and arena share one material pool.**

When players strip particulate from the boss:

- boss weakens;
- more traversable/usable ground may appear.

When boss rebuilds:

- it consumes ground/field mass;
- terrain changes;
- routes can disappear.

Gameplay truth is a deterministic **Material Allocation State**, not granular simulation.

# Arena

Large basin with:

- central Cathedral body;
- left/right old-city towers;
- three buried Flux control knots;
- multiple particulate front lanes;
- two fixed high anchors;
- compacted safe ridges;
- lower emergency recovery path in early phases.

# Boss state

- Integrity;
- Cathedral Stability;
- Material Pool;
- 3–4 Control Knots by player count/phase;
- Terrain Allocation State;
- active particulate fronts;
- phase index.

# Phase 1 — Rising Nave

**Target duration:** 90–150 seconds.

## Goal

Teach that attacking body is less important than controlling material/Flux knots.

## Attacks

### Ferric Buttress

Cathedral raises a particulate wall.

Wall:

- blocks path;
- later compacts into temporary platform;
- can expose inert lattice seam.

### Needle Procession

Dust Needle Current sweeps one lane.

Can be redirected through Fluxed control rib.

### Falling Rib

Large machine rib emerges then falls.

It becomes:

- temporary cover;
- Flux-compatible anchor;
- potential projectile after component break.

### Material Draw

Boss pulls particulate from one arena zone to repair armor.

Telegraph shows terrain thinning.

## Vulnerability

A buried Control Knot must be:

1. revealed;
2. Fluxed;
3. manipulated with Attract/Repel/Link;
4. held through short window.

Successful knot destabilizes one body section.

### Solo

One knot at a time.

Echo can maintain one force/control if room requires.

### 2P

Two players can reveal/manipulate opposing sides.

### 3P

Third manages Needle Current / terrain route.

### 4P

Two paired knots may operate simultaneously.

## Transition

After sufficient Stability breaks, boss collapses upper shell and redistributes material across arena.

# Phase 2 — Walking Foundations

**Target duration:** 100–180 seconds.

The Cathedral reassembles into several connected moving structural masses rather than one tower.

Not humanoid.

Think:

- arches;
- buttresses;
- bridge-like limbs;
- moving foundation blocks.

## New mechanic — Material Choice

Players can direct stripped particulate toward:

### Ground

Creates/extends traversal ridge.

### Projectile Mass

Creates one heavy-light ferric block for attack.

### Knot Exposure

Clears buried region faster.

This choice is made through authored routing nodes, not free particle control.

## Attacks

### Foundation Sweep

Large structural arm crosses basin.

### Burial Front

Boss sends rising field that hides one route/control node.

### Ferric Rain

Localized falling particulate columns.

### Reclaim

Boss attempts to consume one player-created ground ridge to rebuild armor.

Players may interrupt through Fluxed reclaim node.

## Vulnerability

Two control knots must be destabilized during same broad state window.

### Solo

Echo holds one activated knot after setup while player completes second.

### 2P

One each.

### 3P

Two knot players + one terrain/reclaim controller.

### 4P

Two pairs operate knots/terrain in parallel.

Failure reduces damage window; no instant wipe.

# Phase 3 — Empty Choir

**Target duration:** 60–120 seconds.

Much of particulate armor is gone.

Exposed is the old distributed machine-city control lattice forming the colony's core network.

## Arena

More old city geometry becomes visible.

Remaining Sea circulates in fast authored fronts.

Players combine:

- Flux;
- front riding;
- Vector Shift;
- Orbit;
- Link rescue.

## Attacks

### Lattice Pulse

Unfluxed inert lattice becomes temporary hazard.

Fluxing correct section converts it into safe anchor path.

### Final Rebuild

Cathedral tries to pull all remaining field mass into one protective shell.

Players must interrupt several nodes before completion.

### Empty Arch

Boss raises a huge hollow structure whose interior becomes traversal lane.

### Signal Fracture

Short strange standing-wave pulse foreshadows Choir Array.

It uses visual + audio cue but no Phase requirement.

## Final objective

Expose central Control Nexus.

Nexus is initially inert.

Players must Flux it while stabilizing surrounding knots.

### Solo

Echo maintains one knot.

### 2P

one stabilizes / one Fluxes.

### 3P

third keeps front/rebuild pressure controlled.

### 4P

two stabilization lanes + one Flux/Nexus role + flex/rescue.

Roles are not hard-assigned; objective structure creates them.

# Finish

The Cathedral does not “die” like an animal.

Its distributed repair network loses cohesion.

Particulate falls away and old machine-city lattice remains exposed.

Some colony nodes may persist depending regional outcome, leaving room for later ecological/narrative consequences.

# Material Pool implementation

Use discrete/continuous normalized gameplay variable, not particle count.

Example:

- MaterialPool 0–100;
- body armor consumes X;
- ground ridge consumes Y;
- front attack temporarily allocates Z;
- stripped material returns to neutral pool or player-routed state.

Clients receive state/variant, then render local particles.

# Scaling

| Players | Structural adaptation |
|---:|---|
| 1 | one active knot at a time early; Echo assists later simultaneous state |
| 2 | opposing knot pair |
| 3 | knot pair + terrain/reclaim pressure |
| 4 | two paired lanes, more multi-target fronts, modest Integrity increase |

Prototype Integrity:

- 1P 1.00x
- 2P 1.40x
- 3P 1.70x
- 4P 1.95x

Material/knot structure does most scaling.

# Accessibility

Per-player assists may adjust:

- Flux target aim;
- buried-knot trace;
- particulate density;
- front-edge visibility;
- objective timing windows;
- incoming damage;
- camera shake;
- field distortion.

Do not auto-select correct knot/order.

# Network implementation

Server owns:

- Material Pool;
- body state;
- knot states;
- terrain allocation state;
- front state;
- phase.

Clients render:

- particles;
- dust collapse;
- small fragments;
- decorative rebuilding.

Major structural motion should be parametric/state-driven.

No networked granular body.

# Performance

At 4P:

- particle density scales before gameplay cues;
- front collision is simple authored volume;
- structural pieces use pooled/reused actors where possible;
- background dust does not cast expensive dynamic shadows on Medium;
- boss silhouette remains readable.

# Audio

Key cues:

- buried knot response;
- Flux activation;
- material draw;
- reclaim;
- front approach;
- nexus exposure.

Music:

- Phase 1: deep repeating architectural rhythm;
- Phase 2: fragmented moving percussion;
- Phase 3: sparse metallic resonance with first subtle harmonic language that points toward Choir Array.

# Narrative meaning

Dust Cathedral embodies a system that has made **ruin itself into a resource cycle**.

Excavating the city may destroy that emergent cycle.

Preserving the Sea leaves historic infrastructure buried.

Directed migration exports the consequences elsewhere.

The boss encounter demonstrates this materially before the player chooses.

# Telemetry

Track:

- attempts;
- phase time;
- deaths by front/fall/structure;
- Flux-knot failures;
- material routing choices;
- ground created vs projectile mass;
- Echo use;
- 4P lane participation;
- particle-density performance;
- abandon rate.

# Acceptance criteria

- players understand boss/terrain share a resource;
- Flux is central but not a one-button weak-point reveal;
- stripping boss changes traversal;
- boss rebuilding visibly consumes arena material;
- solo Echo remains manageable;
- 4P creates parallel knot/terrain jobs;
- Material Pool state never desyncs into impossible geometry;
- Phase 3 naturally foreshadows Choir without requiring Phase ability.
