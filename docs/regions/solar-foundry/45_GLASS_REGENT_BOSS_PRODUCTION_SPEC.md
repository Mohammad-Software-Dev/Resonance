# The Glass Regent — Major Boss Production Specification

**Region:** Solar Foundry  
**Encounter ID:** BOSS_SF_GLASS_REGENT  
**Expected first-clear timing:** 4–8 attempts for target baseline action-game player  
**Retry:** SF21 Relay directly outside arena  
**Primary tests:** beam routing, mirror shell manipulation, Vector Shift, projectile redirection, 1–4 player responsibility scaling

## Fiction

The Glass Regent is the Foundry's autonomous fabrication and optical-alignment intelligence.

It was built to:

- maintain mirror geometry;
- protect heliostat surfaces;
- control furnace output;
- manufacture structural glass;
- reject optical contamination.

After the Meridian fractured, workers deliberately disabled parts of its command network because historical peak output became dangerous to adapted settlements.

The Regent interprets those interventions as progressive system degradation.

It is not evil. It is attempting to restore the Foundry to the configuration it was designed to maintain.

## Visual silhouette

The Regent is non-humanoid:

- suspended central fabrication core;
- three rotating mirrored shell rings;
- four articulated glass-forming arms;
- internal furnace lens;
- detachable reflector petals;
- long light channels through the body.

Readability:

- reflective face versus ceramic backing is obvious;
- weak attachments use shape/pulse, not color alone;
- shell angle reads from silhouette;
- core orientation remains legible under four-player VFX.

Avoid knight, crown-head, insect-shell, or masked visual language.

## Arena

Wide circular heliostat-control chamber in side view.

Gameplay plane includes:

- left fixed anchor tower;
- right fixed anchor tower;
- two lower glass-forming channels;
- upper mirror rail;
- central Regent suspension axis;
- four receiver pylons;
- retractable ceramic shade plates.

Background reflector petals move at massive scale but are non-interactive unless explicitly tagged.

## Boss state

- Integrity;
- Optical Stability;
- 3 Shell Rings;
- 4 Reflector Petals;
- Furnace Load;
- Beam Routing State;
- phase index.

Damage alone cannot efficiently brute-force the encounter.

# Phase 1 — Alignment Protocol

**Target duration:** 90–150 seconds.

## Goal

Teach:

- shell orientation;
- beam redirection;
- projectile reuse;
- mirror cover.

## Attacks

### Sweep Line

A beam locks one lane, then sweeps.

Telegraph:

- ring locks;
- receiver flashes;
- 650–900 ms directional windup.

Responses:

- move;
- Latch above;
- use glass cover;
- redirect if positioned.

### Prism Volley

Slow optical bolts.

Mix:

- reflectable;
- mirror-routable;
- non-reflectable thermal cores.

Shape/motion distinguishes categories.

### Glass Press

Forming arms create temporary glass wall.

Wall can:

- block;
- crack;
- detach;
- become cover/projectile.

### Mirror Snap

One shell ring rotates after clear servo telegraph.

Prevents static solutions.

## Vulnerability

Each shell sector has two receiver angles.

To destabilize:

1. route valid beam into first receiver;
2. route second angle within generous window;
3. shell cracks;
4. Attract removes segment.

Detached shell becomes:

- cover;
- temporary mirror;
- projectile;
- short-lived platform.

## Player count

### Solo

Echo maintains one mirror orientation while player completes second route.

### 2P

One player per side.

### 3P

Two route; third manages Prism pressure / movable plate.

### 4P

Two routing pairs can destabilize two shell sectors in parallel.

Scaling adds beam responsibility and target coverage more than HP.

## Phase transition

After required shell break + Integrity threshold, Regent opens furnace chamber.

# Phase 2 — Molten Geometry

**Target duration:** 90–180 seconds.

## Arena change

Lower channels activate.

Temporary glass geometry forms and melts.

Movement uses:

- fixed towers;
- formed glass;
- detached petals;
- Regent arms.

## New mechanic — Thermal Anneal

Detached mirror pieces can be heated.

Annealed piece:

- reflects higher-output beam;
- becomes more fragile;
- can route a core-breaking beam.

Too much heat shatters it.

Critical reset nodes issue replacement pieces.

## Attacks

### Furnace Breath

Directional thermal field.

Primarily raises player Heat and controls space.

### Shard Cascade

Predictable lanes of glass fragments.

Selected large shards are interactive.

### Petal Guillotine

Reflector petal sweeps arena.

Hazard + moving anchor.

### Thermal Lock

Overheats one active mirror/anchor after warning.

Forces route adaptation.

## Optical break

Route one high-output beam through:

1. active mirror;
2. annealed glass;
3. core receiver.

### Solo

Echo holds mirror/force node.

Player manages annealed piece and final path.

### 2P

Mirror / plate split.

### 3P

Third controls shards, rescue or petal.

### 4P

Two independent beam chains.

Completing both within broad overlap increases vulnerability duration. Missing one never wipes the party.

## Damage window

Players may:

- attack core;
- throw annealed plate;
- redirect Prism bolt;
- use coordinated Link attack.

# Phase 3 — Solar Focus

**Target duration:** 60–120 seconds.

Regent abandons normal fabrication limits and aligns directly with upper heliostat.

## Arena

Most lower glass floor melts.

Remaining movement:

- two fixed towers;
- moving reflector petals;
- short-lived glass sheets;
- Regent arms.

This becomes a fast aerial fight using Orbit + Vector Shift.

## Core rule

Core is frequently vulnerable but shielded by rotating optical layers.

Better routing creates safer and longer damage windows.

## Attacks

### Triple Focus

Three sequential beam lines at different heights.

Each leaves one moving-anchor opportunity.

### Solar Recoil

Radial force burst.

Players may:

- brace on fixed anchor;
- Link rescue;
- convert recoil into Vector Shift route.

### False Reflection

Several background mirror images appear.

Only one has valid Resonance TargetID.

Targeting/audio/shadow expose the real actor.

### Final Anneal

At low Integrity, Regent fuses remaining glass into a protective lens.

Players must break alignment.

### Solo

Echo holds one regulator while player Vector Shifts to opposing control.

### 2P

Direct opposing routing.

### 3P

Pair routes; third handles petal/rescue.

### 4P

Two regulator pairs operate simultaneously.

# Finish

Regent powers down rather than explodes.

- mirror rings slow;
- shutters close;
- shell hangs asymmetrically;
- system voice changes from command to diagnostic state.

Surviving diagnostics present the three Foundry power configurations.

This leads directly to SF23.

# Scaling

| Players | Structure |
|---:|---|
| 1 | Echo supplies one simultaneous actor; fewer beam lanes |
| 2 | direct split-side routing |
| 3 | one flex role for shards/petals/rescue |
| 4 | two simultaneous routing pairs + wider target distribution |

Prototype Integrity:

- 1P 1.00x
- 2P 1.40x
- 3P 1.70x
- 4P 1.95x

Optical responsibilities do more work than health scaling.

# Down/revive

Standard boss rules:

- downed player becomes Unstable;
- teammates may revive;
- Link-assisted revive valid;
- all players down = reset.

Molten-floor sequences must not make revive impossible without warning.

# Accessibility

Per-player options may affect:

- incoming damage;
- beam contrast;
- Heat accumulation rate;
- Vector Shift aim cone;
- mirror target stickiness;
- Echo duration;
- routing overlap window;
- camera shake;
- glass transparency.

Assists widen timing; they do not auto-complete routing.

# Network implementation

## Beam graph

Server owns:

- emitter state;
- mirror orientation;
- receiver state;
- shell stability;
- glass thermal state.

Clients render VFX from compact replicated state.

No continuous beam particles are networked.

## Mirror state

Use discrete/quantized orientations.

Do not accept arbitrary client mirror transforms.

## Detached plates

Server-authoritative interactive reconstructable objects using Interaction Token.

## Boss motion

Ring/petal motion should be parametric from:

- phase;
- state;
- server time;
- authored angular profile.

Prefer this over raw physics replication.

# Performance

At four players:

- friendly reflected beams are quieter than lethal boss beam;
- heat shimmer cannot distort hitbox readability;
- background heliostats use instancing/parametric animation;
- glass fragments become local cosmetic after authoritative shatter event;
- no hardware ray tracing dependency.

# Audio

Critical cues:

- shell lock;
- mirror servo;
- furnace charge;
- glass stress;
- receiver activation.

Music:

- Phase 1: precise mechanical meter;
- Phase 2: unstable glass/percussive layers;
- Phase 3: long solar harmonic tone + rapid machinery pulse.

All critical timing has visual equivalent.

# Narrative meaning

The Regent expresses the theme:

> A system can be functioning correctly according to its design and still be harmful when its operating assumptions no longer match reality.

Post-fight diagnostics reveal:

- workers deliberately reduced alignment;
- peak output would restore major infrastructure;
- current low-output adaptation preserves local life and culture;
- neither state is simply “broken.”

# Telemetry

Track:

- attempts;
- phase time;
- deaths by beam/shard/fall/Heat;
- routing failures;
- enemy projectile redirects;
- detached plate use;
- Vector Shift deaths/corrections;
- Echo re-records;
- 3P flex activity;
- 4P lane participation;
- abandon rate.

# Acceptance criteria

- shell-facing rules are understood;
- detached glass is used as tool, not only damage;
- Vector Shift matters without dominating every second;
- solo Echo feels choreographic;
- four-player roles are parallel and readable;
- no beam/mirror desync can soft-lock;
- failed attempts teach visible progress;
- boss fiction naturally creates the regional choice.
