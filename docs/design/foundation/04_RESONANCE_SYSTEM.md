# Resonance System

## Purpose

Resonance is the game's unifying ruleset. It should reduce design complexity by allowing many objects to participate in the same interactions while increasing player creativity.

The system models a stylized force, not literal real-world magnetism. Physical consistency matters more than scientific accuracy.

## Core concepts

### Resonant state

An object may be:

- **Fixed Resonant:** acts as an anchor; world geometry does not move.
- **Mobile Resonant:** can be pulled/pushed within authored limits.
- **Conditional Resonant:** becomes active after damage, power, Flux or puzzle state.
- **Inert:** does not respond until transformed by a later ability.
- **Living Resonant:** creature with biologically or technologically Resonant components.

### Mass class

Mass determines what moves when force is applied.

- Feather: fragments, tiny projectiles.
- Light: small enemies, plates, small props.
- Medium: common armored enemies, puzzle machinery.
- Heavy: large enemies, platforms, boss components.
- Anchored: world fixtures.

If a player Attracts a light object, the object moves more than the player. If they Attract an anchored object, the player moves.

### Charge / polarity language

The system should avoid requiring players to memorize red/blue polarity in every scene. Attract and Repel are player verbs. Selected late mechanics can introduce true polarity inversion, but the baseline stays readable.

## Abilities

### 1. Attract

Applies inward force between player and target.

Applications:

- move player to anchor;
- pull light object/enemy to player;
- stabilize a moving object;
- catch projectiles;
- rescue linked teammate;
- retrieve armor component.

### 2. Repel

Applies outward force.

Applications:

- movement launch;
- knockback;
- projectile reflection;
- object acceleration;
- environmental activation;
- create spacing in combat.

### 3. Link

Creates a temporary energy relationship between actors or compatible objects.

Capabilities unlocked over game:

- player-player tether;
- player-object tether;
- transfer Resonance through link;
- preserve distance for swing/orbit;
- share/redirect force;
- create a temporary trip-line against selected enemies;
- conduct energy between nodes.

A Link is visible and readable. Limit simultaneous active links to protect clarity and networking.

### 4. Echo

Solo-specific multi-actor tool described fully in `06_COOP_AND_SOLO_ECHO.md`.

Resonance principle: an Echo can repeat force actions and act as a valid Link/anchor proxy where authored.

### 5. Flux

Temporarily induces Resonance into marked inert materials.

Examples:

- turn a stone wall's embedded lattice into an anchor;
- magnetize a falling platform;
- reveal hidden structural pathways;
- activate a disabled machine long enough to traverse it.

Flux creates temporary opportunities rather than permanent “unlock all blue doors.”

### 6. Phase

Allows short interaction with a different Resonance state.

Examples:

- pass through energy barriers;
- enter a boss's field during a vulnerable phase;
- avoid certain projectiles;
- coexist briefly with Echo trajectory without collision constraints.

### 7. Invert

Late-game mastery tool. Reverses selected field relationships or object behavior temporarily.

Used sparingly because it increases cognitive load.

## Targeting

Target acquisition is crucial.

Rules:

- directional aim biases strongly toward the player's intended vector;
- nearby interactable candidates receive subtle outlines/field arcs;
- target lock persists briefly through fast motion;
- priority changes by context: rescue teammate > lethal projectile > selected anchor if emergency assistance is enabled;
- right stick/fine aim overrides automation;
- accessibility option can increase cone width or slow time slightly while selecting in solo only.

## Energy/resource model

Basic Attract/Repel traversal should not consume a conventional mana bar. Movement is the game and should not be rationed constantly.

Instead use **Resonance Heat** for high-power actions:

- sustained force on heavy targets;
- repeated projectile reflection;
- advanced Link techniques;
- certain Core skills.

Heat rises during high-output actions and falls rapidly when pressure is reduced. Overheating temporarily limits high-output actions but never removes basic movement.

This creates rhythm without forcing players to farm resource pickups.

## Environmental material language

Art must communicate interaction categories:

- Resonant conductive structures: consistent edge pattern/material shimmer.
- Fixed anchors: strong geometric “node” shape.
- Mobile objects: visible suspension seams / articulated mounting.
- Flux-capable inert surfaces: faint embedded lattice visible at close range or scanner cue.
- Non-interactive metal-like decoration must be visually differentiated to avoid false affordances.

## Combat interactions

### Armor stripping

Some enemies have Resonant armor.

Flow:

1. conventional attacks crack attachments;
2. attachment enters “loose” state;
3. Attract removes it;
4. armor becomes world object/projectile;
5. enemy behavior changes while exposed.

### Projectile manipulation

Projectile classes:

- light reflectable;
- catchable then throwable;
- heavy deflectable but not catchable;
- non-Resonant requiring dodge/Phase.

### Enemy positioning

Small enemies can be thrown. Medium enemies can be staggered or shifted. Heavy enemies resist direct movement but can be manipulated through components or environment.

## Puzzle interactions

Good Resonance puzzles test understanding rather than obscure rules.

Common verbs:

- hold;
- pull;
- push;
- orbit;
- transfer;
- synchronize;
- invert;
- redirect flow;
- use one moving object as anchor for another action.

Avoid single-solution physics chaos. Important puzzle objects reset cleanly and quickly.

## Boss interactions

Bosses should expose components that obey player-understood rules.

Examples:

- pull armor from multiple mounts;
- oppose two forces to split a joint;
- redirect boss projectile into machinery;
- use boss limb as moving anchor;
- transfer charge through a player Link;
- invert arena field rather than directly damaging boss.

Boss mechanics may extend the system but should rarely break it.

## System safety / anti-grief rules

- Teammates cannot permanently trap each other.
- Friendly force requires Link or clear cooperative state.
- Critical puzzle objects have reset conditions.
- Objects cannot be launched irretrievably out of required spaces.
- Network authority must prevent two clients from disagreeing about critical object state.
- Camera/physics interactions are bounded to avoid nausea and unpredictable teleport corrections.

## Emergence test

A Resonance mechanic is strong if designers can ask “what if I combine this with X?” and the result is sensible without a bespoke exception.

A mechanic is weak if it only opens one authored door and never becomes meaningful again.
