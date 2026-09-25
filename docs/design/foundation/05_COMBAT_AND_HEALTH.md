# Combat and Health

## Combat goals

Combat should be:

- responsive;
- movement-driven;
- readable at 1–4 players;
- expressive without requiring long combo memorization;
- systemic enough that environment and Resonance matter;
- challenging because enemies create spatial problems, not because health pools are inflated.

## Weapon identity

The Wayfarer uses **Kinetic Gauntlets / Resonance Rig** rather than a sword-like primary weapon.

Visual attacks combine:

- short-range kinetic strikes;
- force-assisted hooks;
- palm bursts;
- charged directional blows;
- contextual grabs of Resonant components.

The weapon should support a distinct silhouette and animation language.

## Base attack kit

### Light strike

Fast, short recovery, chainable. Good for pressure and component damage.

### Directional light

Upward and airborne variants support juggling and anti-air.

### Heavy strike

Slower, high stagger, interacts strongly with momentum and movable objects.

### Aerial plunge

Transfers force downward and can activate certain mechanisms/plates. It is not a bounce-focused copy of another game's downward weapon attack; its identity is impact and field transfer.

### Evade / Phase

Early: evasive step with carefully tuned invulnerability or displacement. Later: Phase adds special interactions.

### Resonance actions

Attract/Repel remain available during most combat states. The player should not switch into a separate “magic mode.”

## Momentum damage

Selected attacks gain a capped modifier based on relative velocity.

Why:

- reward mastery of launches/orbits;
- unify traversal and combat;
- create spectacular co-op setup/payoff moments.

Why capped:

- avoid boss one-shot exploits;
- prevent optimal play from always being “leave arena and accelerate.”

## Stagger model

Enemies have:

- health;
- stability;
- component states where relevant.

Stability recovers quickly unless pressure continues. Breaking stability creates a short manipulation window.

This makes Attract/Repel strongest after players earn an opening rather than trivializing all enemies immediately.

## Fracture Health

Damage is divided into **stable loss** and **Fractured Health**.

Example: player takes 30 damage. A portion becomes temporary fractured health for ~4–6 seconds.

Fractured health can be recovered by skilled aggression:

- perfect projectile deflection;
- breaking armor/stability;
- landing a high-momentum strike;
- completing a team Resonance combo;
- rescuing a teammate under threat (small recovery/support reward).

If the window expires, unrecovered fracture becomes permanent loss.

### Intent

After getting hit, the player has a choice:

- disengage safely and accept the loss;
- stay engaged and attempt to earn some health back.

This supports aggressive play without requiring a conventional “stand still and heal using combat resource” loop.

## Permanent healing

Healing outside Fracture can come from:

- Relays/safe nodes;
- limited field repair charges replenished at Relays;
- support Core effects;
- rare consumable/environment interactions.

Healing should not pause online co-op combat.

## Death and recovery

At zero stable health:

### Solo

Brief destabilization animation, then respawn at Relay/local encounter checkpoint.

### Co-op

Player enters **Unstable** state for a short rescue window.

Teammates can:

- reach and stabilize them;
- use Link at range with reduced effectiveness;
- sacrifice some Fractured Health/Heat to speed rescue depending on equipped support modules.

If rescue fails, player reforms after a longer delay or at a safe rally point depending on encounter type.

During bosses, defeated players should not instantly rejoin at full health repeatedly; boss revive rules must preserve stakes.

## Co-op combat synergies

Examples:

### Opposing Tear

Two players Link opposite sides of a loosened boss component and pull/repel apart to break it.

### Relay Throw

Player A throws a Resonant object toward Player B; B catches and immediately redirects it with a damage multiplier based on timing.

### Crash

Two linked players accelerate toward one another and arm a collision burst. The burst damages enemies at the meeting point but does not hurt teammates.

### Pin

Players create a Link across a lane; light/medium enemies crossing it can be tripped or temporarily constrained if the team maintains tension.

### Rescue Counter

A teammate catches a player knocked toward a hazard; a correctly timed Repel returns the endangered player's momentum toward the attacker.

## Enemy roles

Encounters combine functions rather than simply adding more bodies:

- **Pressure:** forces movement.
- **Anchor denial:** occupies or disables useful movement points.
- **Ranged control:** creates trajectories to dodge or reflect.
- **Armor puzzle:** requires component manipulation.
- **Support:** buffs/repairs other enemies.
- **Disruptor:** interferes with Links/Echoes.
- **Heavy:** controls space and resists movement.

## Difficulty and scaling

Player-count scaling should change:

- enemy mix;
- simultaneous attacks;
- arena objectives;
- reinforcement timing;
- boss patterns;

Health scaling is secondary and modest.

Four players should not turn every enemy into a damage sponge.

## Build influence

Cores and Modules should change combat style, e.g.:

- stronger momentum conversion;
- longer Links;
- armor-break specialist;
- projectile manipulation specialist;
- fracture recovery specialist;
- Phase counterattacks;

No build should make baseline movement feel crippled.

## Combat readability rules

- Player attacks: distinct from enemy hazards in silhouette and VFX frequency.
- Enemy lethal telegraphs: high-contrast timing cues independent of color alone.
- Co-op effects: each player can have a subtle identifier, but force direction matters more than rainbow color coding.
- Large boss effects cannot obscure platform edges for long durations.
- Damage numbers are optional/off by default unless testing proves useful.

## Combat success criteria

The system is working when:

- players voluntarily use the environment rather than only basic attacks;
- repeated enemy types remain interesting in different room geometry;
- co-op players communicate about setup, not just focus-fire;
- solo players use Echo offensively without needing it in every encounter;
- skilled players can win faster through mastery while novices can win safely through readable fundamentals.
