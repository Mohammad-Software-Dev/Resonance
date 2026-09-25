# Co-op and Solo Echo Design

## Core rule

**Multiplayer and solo must both feel authored.** Neither is a fallback mode.

The campaign supports **1–4 players as a first-class launch target from the beginning of development**. Early prototypes may isolate subsystems with fewer connected clients for debugging, but architecture, encounter logic, networking, save state, camera assumptions and performance budgets must be designed and repeatedly tested at four-player load from the first production phase. There is no planned “2-player version first, 4-player retrofit later.”

## Drop-in / drop-out

A friend should be able to join an eligible session without restarting the chapter or returning to town.

Desired flow:

1. Host is playing.
2. Friend selects Join.
3. Game checks version, save compatibility and session permissions.
4. Joining player enters at a nearby safe position or materializes through the current Echo if narratively appropriate.
5. Camera and encounter rules adapt.
6. On departure, the session remains valid; solo Echo becomes available again.

Never require restarting the entire region because player count changed.

## Resonance Link between players

Link is the core cooperative verb.

Uses:

- swing/orbit around teammate;
- transmit force;
- rescue from falls;
- coordinate boss mechanics;
- perform launch setups;
- create temporary barriers/lines;
- share selected support effects.

Link must be consensual/intentional enough to prevent griefing.

## Cooperative traversal patterns

### Launch and catch

Player A repels B toward a distant area; B establishes an anchor and later pulls A across.

### Moving anchor

A moves through a safe route while B orbits A through a dangerous route.

### Split activation

Players travel on parallel routes, affecting each other's geometry.

### Force relay

A moves an object into B's range; B redirects it to a distant mechanism.

### Rescue traversal

A deliberately commits to a risky jump because B can catch them. Advanced secrets may reward this, but critical paths should offer safer alternatives.

## Cooperative puzzles

Mandatory co-op-style puzzles should test:

- timing;
- relative position;
- communication;
- interpreting different information;
- maintaining force relationships;
- simultaneous movement.

Avoid repetitive “stand on two buttons.”

### Information asymmetry

Occasionally Player A sees one layer of a system and B sees another, but use sparingly so online voice chat is not mandatory for every puzzle. Ping/visual communication must support solution discovery.

## Co-op combat

Team moves emerge from Resonance rather than scripted “press both buttons” cinematics.

Bosses can detect player count and add mechanical lanes/objectives. More players means more simultaneous responsibilities, not linearly larger HP.

## Rescue system

Exploration should generate heroic saves.

If a player falls toward a recoverable hazard:

- nearby linked teammates get a short rescue window;
- Attract can pull them toward safety;
- rescue targeting receives strong aim assistance;
- successful rescue grants a small temporary Resonance efficiency or Fracture recovery reward.

If rescue is missed, recovery is quick. Funny mistakes should not cost several minutes.

## Skill-gap support

Friends often have different platforming skill.

Optional assists:

- stronger rescue magnetism;
- “tether follow” where a lower-skill player can accept a guided pull through selected non-combat traversal;
- individual damage modifiers;
- individual timing-window assists;
- automatic regroup after repeated falls;
- player-specific aim assist.

These options should be per-player where possible so one person can use assistance without changing everyone else's experience.

# Solo Echo

## Design purpose

Echo solves multi-actor problems by letting a solo player cooperate with a deterministic recording of themselves.

It is not an autonomous companion and does not choose targets independently.

## Basic Echo loop

1. Hold Echo record.
2. Perform up to N seconds of actions.
3. Recording ends manually or at duration limit.
4. Trigger playback.
5. Echo repeats movement and supported actions relative to the recorded world state/reference frame.
6. Player acts simultaneously.

Initial prototype duration: 4–6 seconds. Later upgrades may extend or allow one additional stored segment if clarity remains high.

## Supported actions

Baseline:

- movement;
- jump;
- Attract/Repel;
- Link to designated targets;
- switch activation;
- attacks;
- selected interaction prompts.

Not supported:

- inventory/menu operations;
- dialogue choices;
- autonomous target selection not recorded;
- permanent pickups twice;
- exploits that duplicate unique objects.

## Echo puzzle example

A machine requires opposing force on two arms.

Solo:

- record pulling left arm;
- play Echo;
- pull right arm at matching timing.

Two-player:

- each player handles one arm.

Same conceptual mechanic, different execution.

## Echo combat

Echo should be optional in ordinary fights but powerful for mastery.

Examples:

- record a projectile reflection, then reposition enemy so replay hits it;
- record a launch to use the Echo as a moving anchor;
- set up a delayed pincer attack;
- maintain pressure on one component while player attacks another.

Bosses with mandatory dual actions should include clear Echo recording windows and reset states.

## Echo usability rules

- Preview path with a faint trajectory/ghost before replay where useful.
- Distinguish recorded Echo from current player strongly.
- One-button cancel.
- Fast re-record after failure.
- Puzzle objects reset predictably.
- Never require long recordings with dozens of precise steps.
- Echo duration should encourage choreography, not scripting.

## 3–4 player design

When more than two humans are present:

- puzzles may add optional simultaneous opportunities, but required states must scale cleanly;
- bosses add lanes/components rather than repeating identical tasks;
- camera and room width become critical;
- friendly interaction protections become stricter;
- revive economy prevents chain immortality.

Do not design a core campaign puzzle that only becomes enjoyable at one specific player count. Required content must scale deliberately across 1, 2, 3 and 4 players; four-player spectacle is encouraged, but it must transform responsibilities rather than merely multiply switches or enemies. Optional Convergence Chambers may exploit the full four-player ceiling more aggressively while retaining valid solo/Echo solutions.

## Shared vs independent exploration

Players may separate inside reasonable region bounds.

Rules:

- teammates visible on map;
- pings available;
- discoveries such as major shortcuts synchronize to host world state;
- personal pickups handled by progression rules in networking document;
- critical story transitions call a Gather prompt rather than teleporting without consent.

## Social fun beyond cooperation

Optional playful activities:

- launch-distance contests;
- parkour races;
- target-throw challenges;
- sparring arenas with non-lethal rules;
- creature-riding time trials;
- “who reaches the Relay first” route variants.

Rewards should be cosmetic, lore or minor collectibles—not required power.

## Co-op quality bar

Co-op is successful when:

- players naturally speak in verbs (“pull,” “catch,” “hold,” “launch”);
- mistakes often create recoverable comedy instead of resentment;
- one strong player can help a weaker player without doing everything for them;
- both players have meaningful tasks in bosses;
- adding a friend creates new tactics rather than merely reducing difficulty.


## Four-player-from-day-one production rule

Every multiplayer-facing feature must be reviewed against four-player conditions before it is considered foundational. This includes bandwidth, replication frequency, VFX density, enemy target selection, boss scripting, revive chains, camera framing, interaction ownership, UI readability, save credit and join/leave transitions. Internal milestone builds should include a recurring **4-client stress scene** even when the current design task focuses on solo or two-player feel.
