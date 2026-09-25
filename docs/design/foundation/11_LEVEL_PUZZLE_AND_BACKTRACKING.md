# Level, Puzzle and Backtracking Design

## Level-design goal

Rooms should support three overlapping activities:

- navigation;
- combat;
- interpretation/manipulation.

Not every room needs all three, but regions should interleave them so the experience never becomes a corridor of identical combat arenas or a chain of switches.

## Room types

### Flow room

Primarily movement. Teaches or rewards route optimization.

### Combat geometry room

Enemy roles become interesting because of anchors, hazards and vertical structure.

### Resonance puzzle room

Mechanic understanding creates route/progression.

### Landmark room

Large visual orientation point; often connects multiple paths.

### Secret room

Optional payoff; may challenge advanced mechanics.

### Social/safe room

NPCs, settlement, Relay, narrative breath.

### Transformation room

Designed to be seen before and after a world-state change.

## Golden-path readability

The critical path should be discoverable through:

- architecture flow;
- lighting/value contrast;
- landmark alignment;
- NPC/environment cues;
- map topology.

Do not use constant objective arrows by default. Optional navigation assistance can exist.

## Gating categories

### Ability gate

Requires a learned verb (Phase, Flux, Vector Shift).

### Strength/Heat gate

Requires improved field capability but should feel like systemic limitation, not arbitrary color lock.

### World-state gate

Opens because an Anchor rotation/flood/power state changes.

### Knowledge gate

Player could pass earlier if they discover how. Good for sequence breaks.

### Cooperative expression gate

Requires two actors simultaneously but can be satisfied by Echo when solo.

## Puzzle design rules

1. Present components before the full puzzle.
2. Allow safe experimentation.
3. Use consistent physical rules.
4. Reset quickly.
5. Avoid solutions that depend on unpredictable object piles.
6. Keep Echo recordings short and readable.
7. Multiplayer solutions should involve cooperation, not one player waiting.
8. Optional puzzles can demand much higher execution than critical path.

## Puzzle archetypes

### Opposing force

Two actors/forces pull opposite directions.

### Relay

Move energy/object through multiple positions.

### Orbit timing

Use rotating anchor relationships to align route.

### Weight/mass exchange

Move a heavy object by anchoring against a larger structure or using multiple players.

### Signal path

Link nodes in correct spatial configuration.

### Dynamic bridge

Maintain force on a moving structure while traversing it.

### Phase choreography

One actor exists in alternate state to manipulate system while another moves normally.

### World-scale calibration

Late-game puzzles rotate region segments and affect multiple rooms.

## Convergence Chambers

Optional high-level challenge spaces focused on cooperation/Echo mastery.

Properties:

- clearly optional;
- self-contained reset;
- no major story lock;
- rewards advanced Modules, cosmetics, lore or challenge access;
- variants can scale meaningfully by player count.

Examples:

- two-route race where players manipulate each other's path;
- chain of launch/catch maneuvers;
- boss-like machinery requiring continuous Link relay;
- solo Echo choreography using multiple short recordings if upgraded.

## Backtracking philosophy

Returning is valuable when at least one of these changed:

- player capability;
- world geometry;
- ecology/enemies;
- NPC state;
- knowledge/context;
- available shortcut.

Avoid forcing long returns through rooms that are mechanically identical.

## World transformation checklist

For each major Anchor event, document:

- rooms rotated/reconnected;
- newly reachable spaces;
- newly blocked spaces (use sparingly);
- water/particle/weather changes;
- enemy migrations;
- NPC migrations;
- changed shortcuts;
- changed secrets;
- map update presentation;
- story consequences.

## Example transformed room

**Before:** vertical shaft filled with floating water globes. Player jumps between dry ledges and uses globes to slow momentum.

**After Observatory Anchor:** water falls into bottom reservoir. Shaft becomes a high-speed drop route with turbines; side labs previously underwater are now exposed while the bottom contains new aquatic threats.

Same coordinate in world, different play.

## Multiplayer level rules

- Narrow single-file corridors should be short.
- Arenas provide enough usable space for 4-player effects.
- Critical interactables cannot be permanently blocked by player bodies.
- Split routes rejoin frequently enough to maintain social connection.
- If split-screen/dynamic camera is used, rooms need safe transition zones.

## Secrets for teams

Some secrets should be discoverable socially:

- one player sees a suspicious structure while another is elsewhere;
- a player pings a hidden route;
- players discover a launch chain that bypasses intended route;
- simultaneous Resonance reveals a field pattern.

But no meaningful collectible should require online multiplayer; Echo or an alternate solo solution exists.

## Sequence breaks

Support intentional advanced skips when possible.

Rules:

- never corrupt quest state;
- major tutorials still accessible;
- dialogue should tolerate out-of-order region arrival;
- critical abilities cannot be permanently missed;
- speedrunners should be able to exploit mastery without depending on bugs.

## Navigation friction safeguards

- early fast travel;
- remembered inspected gates;
- optional “last unresolved route” map filter;
- multiple shortcuts per large region;
- no mandatory resource loss on death;
- boss retries from nearby checkpoint.
