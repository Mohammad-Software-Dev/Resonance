# Flooded Observatory — Enemy Package and Astrolabe Shell

**Coverage:** Flooded Observatory first visit  
**Standard archetypes:** 6  
**Elite:** Astrolabe Shell  
**Design goal:** Make water boundaries, charge, refraction and volume movement matter in combat.

# 1. Bubble Ray

**Role:** aquatic mobility pressure  
**Health:** H1–H2  
**Stability:** S1  
**Mass:** Light

Behavior:

- moves only inside a water volume;
- circles boundary;
- dives along predicted player line.

Resonance:

- moving its sphere changes its combat space;
- Repel at boundary can alter route;
- outside water it becomes vulnerable/immobile briefly if displaced.

Teaching purpose:

Water volume itself can be enemy arena.

# 2. Lens Crab

**Role:** armored reflector  
**Health:** H2  
**Stability:** S2  
**Mass:** Medium

Shell:

- refracts/redirects selected projectile;
- protects frontal body;
- cracked lens can be pulled off.

Detached lens:

- projectile redirector;
- temporary shield;
- puzzle object.

Teaching purpose:

Refraction appears first as readable armor interaction.

# 3. Pressure Eel

**Role:** hazard / water charge  
**Health:** H1–H2  
**Stability:** S1  
**Mass:** Light

Behavior:

- swims inside sphere;
- charges water after visible windup;
- moves toward conductive node.

Counterplay:

- kill/intercept;
- redirect grounding;
- move sphere;
- leave before pulse.

Multiplayer:

Different players may manage charge and combat.

# 4. Drowned Surveyor

**Role:** ranged  
**Health:** H2  
**Stability:** S1  
**Mass:** Light-Medium

Fiction:

Old autonomous research platform adapted to flooded geometry.

Attacks:

- slow dry shot;
- faster/different-angle water shot;
- marked refracted shot through lens node.

Teaching:

Projectile timing changes across media but remains predictable.

# 5. Siphon Colony

**Role:** support / water relocation  
**Health:** distributed node state  
**Stability:** S0/S1  
**Mass:** mixed

Behavior:

- transfers water between two authored volumes/reservoirs;
- can shrink one combat space while growing another;
- may heal/protect aquatic enemies by restoring their volume.

Counterplay:

- destroy transfer node;
- redirect destination;
- exploit transfer to open route.

Networking:

Replicate transfer state, not water particles.

# 6. Orbital Pike

**Role:** predator / boundary strike  
**Health:** H2  
**Stability:** S1  
**Mass:** Medium

Behavior:

- circles outside/inside a sphere on authored route;
- attacks across membrane;
- commits to long strike line.

Counterplay:

- Attract/Repel off path;
- boundary timing;
- use Link rescue;
- bait into Lens Crab shell or structure.

# Elite — Astrolabe Shell

**Encounter ID:** ELITE_FO_ASTROLABE  
**Health:** H4  
**Stability:** S3 shell / S2 core  
**Mass:** Heavy/Anchored central body  
**Location:** FO16

## Fiction

A research organism/construct hybrid that grew around an old astrolabe calibration machine.

It uses several small water volumes as:

- rotating cover;
- sensory lenses;
- projectile channels;
- movement habitat.

## Silhouette

- central asymmetrical shell;
- rotating astrolabe rings;
- three small orbiting water globes;
- exposed biological/field tendrils connecting shell to volumes.

Avoid turtle/crab giant-monster cliché.

## Core mechanic

Three water globes orbit the elite.

Each globe can be:

- Neutral;
- Charged;
- Displaced;
- Drained.

The shell rotates protection to keep a globe between player and vulnerable core.

Player goal:

1. alter globe state;
2. create gap in orbit;
3. attack exposed core;
4. adapt as orbit speed/profile changes.

## Phase A — Calibration

Attacks:

- globe sweep;
- lens shot;
- shell shove;
- one charged globe.

Player learns to use water cover against the elite.

## Phase B — Misalignment

After first shell break:

- orbit becomes eccentric;
- one globe can be displaced to another socket;
- elite gains cross-boundary strike.

## Phase C — Bare Core

After enough globe/shell manipulation:

- central core exposed;
- orbit speed rises;
- vulnerability longer;
- arena more mobile.

## Solo

No required Echo.

Echo may hold one pressure control to simplify globe displacement.

## 2P

One manipulates globe while one attacks core.

## 3P

Third handles charge/Surveyor support.

## 4P

Two globe relationships can be manipulated in parallel.

Additional support pressure replaces large HP increase.

## Reward

- Deep Lens authorization;
- capacity/Module progression;
- Observatory research clue;
- shortcut.

# Encounter combinations

## Early

Bubble Ray + dry platform threat.

## Mid

Pressure Eel + Lens Crab.

## Lab

Drowned Surveyor + movable sphere.

## Upper

Orbital Pike + Siphon Colony.

## Pre-boss

Bubble Ray + Surveyor + Eel across two volumes.

# Player-count guidance

## 1P

- one dominant sphere threat at a time;
- charged water not stacked with hardest tracking attack on first introduction.

## 2P

- split dry/wet pressure.

## 3P

- support or charge role appears.

## 4P

- two water lanes;
- multiple target selection;
- modest durability increase;
- avoid everyone fighting in one sphere.

# Technical notes

- Bubble Ray path is authored within WaterVolume.
- Lens Crab shell uses explicit component state.
- Pressure Eel charge is volume state, not radial particle simulation.
- Surveyor trajectory uses deterministic projectile profile.
- Siphon transfer is discrete/parametric reservoir state.
- Pike route is authored spline/path.
- Astrolabe water globes move parametrically.

# Readability

Must distinguish:

- water boundary;
- charged boundary;
- enemy projectile;
- refracted projectile;
- friendly reflected projectile;
- harmless internal bubbles.

# Acceptance criteria

- Bubble Ray teaches “move the arena” idea;
- Lens Crab makes refraction readable;
- Pressure Eel makes charge actionable, not arbitrary;
- Siphon changes room state visibly;
- Pike rewards boundary timing;
- Astrolabe prepares Leviathan multi-volume thinking;
- 4P combat distributes players across space.
