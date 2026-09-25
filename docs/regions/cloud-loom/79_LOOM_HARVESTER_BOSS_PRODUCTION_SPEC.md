# Loom Harvester — Major Boss Production Specification

**Region:** Cloud Loom  
**Encounter ID:** BOSS_CL_LOOM_HARVESTER  
**Expected first-clear timing:** 4–8 attempts  
**Retry:** CL25 Relay directly before encounter  
**Primary tests:** moving multi-kite combat, long launch/catch, Invert under pressure, 1–4 player lane scaling

## Fiction

Loom Harvester is an atmospheric extraction construct built to move between kite arrays and maintain gas intake.

It is enormous but not humanoid.

Its structure includes:

- central collector body;
- multiple intake sails;
- articulated kite clusters;
- tether drums;
- pressure vanes;
- exhaust trunks.

After the fracture, its control logic has prioritized harvest continuity over worker safety and orbital stress.

## Encounter structure

The fight moves across several connected kite/platform lanes.

It is part chase, part boss.

The Harvester itself is moving infrastructure.

# Phase 1 — Catch the Machine

**Target:** 90–150 seconds.

Player chases Harvester across moving kites.

## Attacks

### Intake Sweep

Harvester opens intake field.

Normal relationship pulls players/objects toward collector.

Invert turns intake into exhaust for a short window.

### Tether Snap

One kite tether changes direction/position.

### Pressure Wash

Directional current blast.

### Sail Fold

Temporary platform retracts after telegraph.

## Objective

Reach two sail-control assemblies.

Each assembly:

1. Fluxes/activates if needed;
2. Inverts pressure relationship;
3. exposes sail joint;
4. joint can be torn with Attract/Repel/Link.

### Solo

Sequential assemblies; Echo may hold one control.

### 2P

One per side.

### 3P

Two sail roles + rescue/current role.

### 4P

Two paired lanes.

Transition when two sails are torn.

# Phase 2 — Crosswind Engine

**Target:** 100–180 seconds.

Harvester changes current lanes and releases more kite machinery.

Arena becomes multiple moving platforms.

## New mechanic — Intake / Exhaust Cycling

Harvester alternates:

- Intake;
- Neutral;
- Exhaust.

Player can Invert selected local fields to create routes or weaponize flow.

## Attacks

### Harvester Kite Launch

Deploys enemy/platform kite.

Disable it to ride/use anchor.

### Gas Compression

Pressure Bell-like radial pulse.

### Threaded Line

Tether hazard between moving kites.

### Collector Mouth

Large intake consumes loose objects/plates.

Invert can eject them back.

## Vulnerability

Player must reverse two pressure vanes so Harvester's own flow exposes central collector.

### Solo

Echo holds one vane after setup.

### 2P

One vane each.

### 3P

Third controls kite/rescue.

### 4P

Two paired vane/kite lanes.

# Phase 3 — Stormline Descent

**Target:** 60–120 seconds.

Harvester descends toward denser atmosphere.

Background speed and storm scale increase while gameplay remains readable.

## Arena

- three major kite platforms;
- moving Harvester body;
- long current lanes;
- intermittent Phase membrane;
- Flux-compatible emergency anchors.

## Attacks

### Downwell Pull

Strong authored current toward lower lane.

### Reverse Shear

Harvester flips current direction after telegraph.

Player may counter-Invert.

### Sail Shred

Fragments create temporary moving anchors/projectiles.

### Final Intake

Harvester attempts maximum extraction.

If completed, it creates a huge pressure pulse and resets the vulnerability cycle rather than causing an instant wipe.

## Final objective

Players:

1. use Invert to reverse intake;
2. use Link/forces to tear final pressure sail;
3. ride exhaust path to central control;
4. disable/stabilize collector.

### Solo

Echo supports one tear/control.

### 2P

Direct opposing sail roles.

### 3P

Pair tears; third stabilizes route.

### 4P

Two simultaneous sail operations then converge on core.

# Finish

Harvester remains physically intact enough to be reconfigured.

It powers down into governance mode.

This enables regional output choice.

# Scaling

| Players | Structural adaptation |
|---:|---|
| 1 | sequential controls + Echo overlap |
| 2 | paired lanes |
| 3 | pair + rescue/kite role |
| 4 | two paired aerial lanes |

Prototype Integrity:

- 1P 1.00x
- 2P 1.35x
- 3P 1.65x
- 4P 1.90x

Movement/objective scaling matters more than HP.

# Down/revive

Downed player on exterior platform:

- cannot fall indefinitely;
- tether/recovery net catches or relocates to nearest valid platform state;
- Link revive remains useful.

No long fall punishment.

# Accessibility

Per-player assists:

- current direction visualization;
- launch prediction;
- Invert target assist;
- longer control windows;
- incoming damage;
- reduced camera shake;
- reduced background storm density.

# Network

Server owns:

- boss phase;
- kite paths;
- current field states;
- tether states;
- sail component state;
- Invert relationship state.

Clients render:

- atmospheric particles;
- sail cloth secondary motion;
- storm effects;
- exhaust visuals.

Major kite motion is parametric.

# Performance

At 4P:

- distant cloud layers simplify;
- kite cloth uses bounded simulation/cached behavior;
- current visuals scale;
- no fluid simulation;
- lethal field boundaries remain visible.

# Audio

Critical cues:

- intake/exhaust switch;
- tether snap;
- sail tear;
- pressure charge;
- final intake.

Visual equivalents mandatory.

# Narrative meaning

The Harvester represents infrastructure that is still doing its intended job while the context has become unsafe.

The fight is about taking control, not killing a creature.

The regional decision determines what the machine should optimize for now.

# Telemetry

Track:

- attempts;
- falls/recoveries;
- Invert failures;
- missed catches;
- Link rescues;
- sail tears;
- 4P lane participation;
- current-state corrections;
- abandon rate.

# Acceptance criteria

- boss feels like moving infrastructure;
- Invert is essential but not one-button weakness;
- long launch/catch remains fun under latency;
- 4P splits into active lanes;
- no current/kite desync soft-locks;
- failure recovery is fast;
- outcome naturally leads to regional governance choice.
