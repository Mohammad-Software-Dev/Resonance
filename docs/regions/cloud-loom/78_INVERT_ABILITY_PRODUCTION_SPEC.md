# Invert — Production Ability Specification

**Ability tier:** Late / Relationship Mastery  
**Acquisition region:** Cloud Loom  
**Primary purpose:** Temporarily reverse one authored field relationship.

## Core distinction

**Flux:** change whether a target participates.  
**Phase:** change which state the player occupies.  
**Invert:** reverse the relationship itself.

Invert must remain targeted, temporary and legible.

## Valid relationship categories

Examples:

- Attraction ↔ Repulsion;
- Intake ↔ Exhaust;
- Pull tether A→B ↔ B→A;
- Current Forward ↔ Reverse;
- selected pressure relationship;
- enemy field pulls projectile ↔ rejects projectile;
- moving platform relationship A→B ↔ B→A.

Not valid:

- global gravity;
- arbitrary physics;
- all forces in room;
- player controls;
- time reversal.

## Baseline control

1. target a valid Invert-compatible relationship;
2. activate Invert;
3. short clear transition;
4. relationship enters Inverted state;
5. remains for authored duration/event;
6. returns safely.

Use existing target-acquisition language where possible.

## Relationship component

Each valid system exposes:

- RelationshipID;
- SourceID;
- target/destination;
- NormalState;
- InvertedState;
- duration profile;
- Heat profile;
- multiplayer rules;
- reset policy;
- VFX/audio profile.

## State machine

- Normal;
- Priming;
- Inverted;
- Decaying;
- Recovery.

## Cost

Use existing Resonance Heat.

Prototype:

- moderate activation Heat;
- large/heavy systems cost more;
- no continuous stamina drain for ordinary use.

## Traversal

- reverse current;
- reverse pull anchor into launch lane;
- reverse tether;
- reverse moving route.

## Combat

- reverse enemy pull field;
- return selected guided projectile;
- reverse stabilization field to expose heavy target.

## Puzzle

- reverse conveyor/current;
- reverse pressure network;
- reverse tether pair;
- redirect large mechanism;
- flip input/output role.

## Boss

Loom Harvester uses intake/exhaust, kite tether direction, sail pressure and moving machinery.

## Multiplayer

World relationship state is server-authoritative.

When one player Inverts a valid shared relationship, all players experience it.

Some heavy systems may require:

- one Invert activation + teammate force;
- two simultaneous relationship changes;
- Link stabilization.

Avoid “one Invert stack per player.”

## Solo Echo

Echo may replay a recorded Invert event if the RelationshipID remains valid and the room permits it.

No dynamic retargeting.

## Interaction with earlier abilities

- Attract/Repel: Invert changes authored field relation, not button mapping.
- Link: Invert may reverse an environmental tether transfer direction.
- Latch/Orbit: inverted anchors create new trajectories.
- Vector Shift: retarget after Inverted launch.
- Flux: make inert relation system eligible, then Invert it.
- Phase: enter the state where a relationship exists, then Invert it.

## Safety

Return to Normal state must not crush the player, remove sole support without warning, or fling unpredictably.

Critical systems provide decay telegraph, recovery surface/grace and reset.

## Network

Client predicts target lock and priming presentation.

Server validates:

- ability ownership/session license;
- RelationshipID;
- current state;
- range;
- Heat;
- recovery.

Replicate:

- RelationshipID;
- state;
- server start time;
- duration;
- revision.

No raw force-field particles.

## CharacterMovement

Invert generally changes external field parameters, not the player's locomotion mode.

If a relationship affects player acceleration, saved move references the active relationship revision.

## Accessibility

Options may adjust:

- target cone;
- outline strength;
- duration;
- decay warning;
- Heat cost;
- direction indicators.

No auto-solve.

## Upgrade candidates

- **Selective Invert:** isolate one branch of a linked system.
- **Chain Invert:** propagate once through a valid graph.
- **Counter-Invert:** perfect timing against enemy field grants reward.
- **Persistent Invert:** longer duration at higher Heat.

## Backtracking examples

- Transit rail tug field;
- Orchard tagged gravity/irrigation machinery;
- Foundry shutter/mirror drive;
- Observatory pressure transfer;
- Rust Sea field-front control;
- Choir signal carrier gate.

## Telemetry

Track activation, invalid attempts, relationship category, movement follow-up, combat reversals, deaths during decay, co-op uses, Flux+Invert, Phase+Invert and Echo replay.

## Acceptance criteria

- fundamentally distinct from Flux and Phase;
- useful in traversal/combat/puzzle soon after unlock;
- never reads as global gravity/time reversal;
- creates shared co-op value;
- safe decay is reliable;
- 150 ms play remains viable;
- old-region returns are varied;
- no general physics-inversion system is required.
