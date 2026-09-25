# Leviathan of the Flood — Major Boss Production Specification

**Region:** Flooded Observatory  
**Encounter ID:** BOSS_FO_LEVIATHAN  
**Expected first-clear timing:** 4–8 attempts for target baseline player  
**Retry:** FO21 Relay / FO22 threshold, under 20 seconds  
**Primary tests:** inside/outside water combat, multi-volume state, momentum routing, 1–4 player coordination

## Fiction

Leviathan is a large organism that evolved across several isolated free-floating water volumes after the Observatory fractured.

It is not an ancient guardian machine.

It is a living consequence of the new environment.

Over generations, its body adapted to:

- crossing pressure membranes;
- anchoring between spheres;
- sensing Resonance disturbances;
- moving water through muscular/field organs.

Recent orbital instability has compressed its habitat and driven it into Observatory control systems.

The Wayfarers need access to the hydrology Anchor, but the Leviathan's body physically binds several critical water masses.

## Silhouette

- long non-serpentine segmented body with broad fins/membranes;
- multiple water-adapted anchor organs;
- visible pressure bladders;
- no dragon/sea-serpent fantasy silhouette;
- body passes through several spheres so only portions are visible at once.

The boss is one authoritative actor/state machine, not networked soft-body physics.

# Arena

The arena is a chain of three major water volumes around dry Observatory structures.

Zones:

- Left Sphere;
- Central Sphere;
- Right Sphere;
- upper dry anchor gantry;
- lower emergency ledges;
- two pressure-control nodes;
- central hydrology lens.

Each sphere has independent:

- flow profile;
- charge state;
- position state.

# Boss state

- Integrity;
- Pressure Stability;
- 3 Body Segments / exposure nodes;
- 3 WaterVolume states;
- active sphere;
- tether state;
- phase index.

Players create exposure windows by manipulating water relationships.

# Phase 1 — Territorial Circuit

**Target duration:** 90–150 seconds.

## Goal

Learn:

- attack inside/outside water;
- use water as brake/launch medium;
- manipulate boss path by moving a sphere.

## Attacks

### Boundary Lunge

Leviathan crosses sphere boundary along a telegraphed line.

Counter:

- leave sphere;
- Vector Shift;
- Repel from nearby anchor;
- use boundary drag to alter timing.

### Pressure Fan

Fin strike creates directional current inside one sphere.

Flow is authored, clearly visualized.

### Bubble Burst

Boss launches pressure bubbles through boundary.

Selected bubbles become temporary momentum brakes or hazards depending state.

### Anchor Bite

Boss attaches to one containment collar, preventing sphere movement.

Players damage/pull exposed anchor organ.

## Exposure rule

Move/rotate the target sphere so Leviathan's pressure organ crosses an Observatory lens field.

This destabilizes organ and creates attack window.

### Solo

One sphere-control action at a time.

### 2P

One manipulates sphere while one pressures exposed organ.

### 3P

Third handles Bubble Burst / rescue.

### 4P

Two spheres can be prepared in parallel, shortening exposure cycle rather than multiplying health.

## Transition

After two organ exposures, Leviathan links all three spheres with its body.

# Phase 2 — The Connected Flood

**Target duration:** 100–180 seconds.

## Arena change

Leviathan creates pressure connections between spheres.

Players may now travel through short boss-created water bridges at authored moments.

## New mechanic — Pressure Balance

Two spheres become High Pressure / Low Pressure.

Players must equalize or deliberately invert the difference to expose a body segment.

Mechanisms:

- pressure gate;
- sphere relocation;
- grounding/charge node;
- boss attack bait.

## Attacks

### Cross-Sphere Rush

Boss travels through two volumes in sequence.

### Charged Wake

Boss disturbs a Pressure Eel-like charge source, energizing one sphere.

### Compression

Sphere temporarily shrinks its safe radius.

Gameplay boundary changes by authored state, not fluid deformation.

### Tail Gate

One body segment blocks a dry connector and must be displaced through opposing force.

## Player count

### Solo

Echo holds one pressure control while player manipulates second.

### 2P

Direct pressure pair.

### 3P

Third handles charge/rescue.

### 4P

Two pressure pairs operate on separate sphere relationships.

Failure reduces exposure quality; it does not instantly wipe party.

## Exposure

Correct pressure relationship forces mid-body segment into dry lens corridor.

Damage window occurs outside water, giving contrast.

# Phase 3 — Open Basin

**Target duration:** 60–120 seconds.

Hydrology systems fail open.

One major water sphere begins moving between arena positions.

## Movement identity

Fast loop:

- enter moving sphere to brake;
- ride flow;
- exit at angle;
- Vector Shift;
- catch dry anchor;
- attack exposed segment.

## Attacks

### Basin Sweep

Large body sweep displaces the moving sphere along authored path.

### Pressure Collapse

Warning marks one sphere becoming temporarily unsafe.

### Echoing Wake

Boss leaves delayed pressure pulse along previous route.

### Final Mooring

At low Integrity, Leviathan anchors simultaneously to two pressure collars.

Players must release both.

### Solo

Echo holds one release control.

### 2P

One each.

### 3P

Pair releases while third manages boss pressure/rescue.

### 4P

Two pairs release plus coordinated final launch opportunity.

# Finish

Leviathan retreats into whichever water habitat remains safest rather than dying in an explosive spectacle.

Possible presentation:

- wounded body releases control collar;
- surviving sphere carries it away;
- research staff note it can survive under some regional outcomes.

Boss defeat grants access to hydrology control.

The regional decision may later determine where the species can persist.

# Scaling

| Players | Structural adaptation |
|---:|---|
| 1 | Echo handles one simultaneous control; fewer concurrent sphere hazards |
| 2 | direct water-control pair |
| 3 | flex role for charge/rescue/pressure |
| 4 | two parallel sphere relationships and multi-target attacks |

Prototype Integrity:

- 1P 1.00x
- 2P 1.40x
- 3P 1.70x
- 4P 1.95x

Pressure mechanics do more scaling work.

# Down/revive

A downed player inside a sphere:

- remains visible/readable;
- drifts only through authored minimal motion;
- can be revived normally;
- may be Link-pulled toward safe boundary if valid.

No current should carry downed player irretrievably away.

# Accessibility

Per-player options may adjust:

- incoming damage;
- water-boundary outline;
- flow visualization;
- refraction strength;
- exit prediction assist;
- Vector Shift aim assist;
- pressure timing window;
- charged-water contrast;
- camera shake.

# Network implementation

## Leviathan body

Server owns:

- phase;
- body-node states;
- active attack;
- exposure nodes;
- water relationships.

Visual body spline/IK follows authoritative control points.

Do not network a soft-body simulation.

## Water volumes

Server owns:

- state;
- transform/path;
- pressure;
- charge.

Clients reconstruct presentation.

## Sphere shape changes

Use discrete/parametric radius states.

No arbitrary surface solve.

# Performance

At 4P:

- avoid overlapping transparent spheres in same screen area;
- boss body silhouettes must remain readable through water;
- cosmetic bubbles/droplets are local;
- refraction quality scales;
- background fluid activity never competes with lethal cues.

# Audio

Critical cues:

- membrane breach;
- pressure rise;
- charged-water pulse;
- body crossing boundary;
- pressure-control lock.

Music:

- Phase 1: spacious low pulse, sparse organic calls;
- Phase 2: interlocking rhythms representing multiple spheres;
- Phase 3: faster movement motif with broad sustained harmonic layer.

Inside-sphere mix is muffled/filtered but never hides critical telegraphs.

# Narrative meaning

Leviathan makes the regional choice concrete.

It exists because the Observatory remained fractured.

Historic drainage may harm its habitat.

Suspended stabilization preserves it but may deny water elsewhere.

Relief diversion may save people elsewhere while shrinking the ecosystem.

The boss itself is not framed as villain or moral verdict.

# Telemetry

Track:

- attempts;
- phase duration;
- deaths by boundary/charge/boss/fall;
- sphere-control failures;
- Echo re-records;
- water-exit correction count;
- Link rescues across boundary;
- time spent grouped in same sphere;
- 4P role distribution;
- abandon rate.

# Acceptance criteria

- boss is understandable without simulating fluid;
- inside/outside transitions are central;
- moving water masses matter tactically;
- solo Echo is reliable;
- 4P creates separate sphere responsibilities;
- body/water state cannot desync into soft-lock;
- failed attempts teach pressure and momentum rules;
- outcome leads naturally into hydrology decision.
