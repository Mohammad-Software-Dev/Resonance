# Iteration 3A — Production Brief

**Status:** Production-specification pass    
**Scope:** Opening three regions, first major boss, early combat/progression, and 1–4 player execution rules    
**Version 1 assumptions:** 2.5D, PC-first, solo + 1–4 online co-op, named cast, challenging baseline with granular assists

## Purpose

Iteration 3A turns the current game-design bible into material a real development team can prototype and estimate. The target is not to finish every region in the game. It is to take the opening slice far enough that gameplay, content, networking, art, narrative, and QA teams can build the same experience without repeatedly returning to unresolved design questions.

The pass covers:

- Wayfarer Scar in production detail;  
- the early Transit Spine;  
- Gravity Orchard through The Pendulum;  
- room-level traversal/combat/puzzle intent;  
- the first major boss as a production spec;  
- the first ten enemy archetypes used by the slice;  
- early Cores and Modules;  
- player-count scaling from solo through four online players;  
- join/leave and progression rules relevant to the opening;  
- vertical-slice implementation tasks and acceptance criteria.

## Canon carried forward

The following are locked and should not be reopened casually during this pass.

### Product

- Premium 2.5D action-Metroidvania.  
- PC first.  
- One local human per running game client.  
- Solo plus 1–4 player online co-op.  
- No split-screen or shared-machine multiplayer in Version 1.  
- Four named Wayfarers: Mara Venn, Ily Sare, Jun Vale, and Oren Kade.  
- Challenging baseline with granular, preferably per-player accessibility assists.  
- Moderate character-driven story plus environmental storytelling.

### Core interaction

- Attract and Repel are universal verbs.  
- Link makes another player part of the movement/combat system.  
- Echo supplies deterministic multi-actor possibilities in solo.  
- Movement quality has priority over content quantity.  
- Backtracking should reveal changed geography, ecology, NPC state, or new mechanics.  
- Additional players change encounter responsibilities more than enemy health.

### Opening narrative

- A Mass Anchor failure damages the Transit Spine.  
- The Wayfarers survive and establish contact at Wayfarer Scar.  
- The first repair visibly improves one location while harming another.  
- Gravity Orchard is the first major proof that “repair” and “restore” are not morally identical.

## Iteration 3A deliverables

### 1. Opening-region room specification

Each room/space receives:

- stable ID;  
- purpose;  
- entry/exit relationships;  
- mechanic being taught or tested;  
- enemy/puzzle contents;  
- 1/2/3/4-player changes where material;  
- solo Echo behavior where material;  
- reward or information payoff;  
- transformed-state note if the room changes later.

The target is enough detail for greybox implementation, not final decoration.

### 2. The Pendulum boss specification

The boss document must define:

- arena topology;  
- three-phase structure;  
- attack grammar;  
- vulnerability rules;  
- Resonance interactions;  
- solo Echo behavior;  
- explicit 2/3/4-player adaptation;  
- checkpoint/retry;  
- accessibility hooks;  
- telemetry;  
- implementation dependencies.

### 3. Early enemy and progression package

Define the first ten enemies used between Wayfarer Scar and Gravity Orchard, including:

- combat role;  
- mass class;  
- stability class;  
- attack set;  
- Resonance affordances;  
- multiplayer behavior;  
- tutorial purpose.

Define the first three Core families and an initial Module set sufficient to make build choice meaningful without overwhelming the first 3–4 hours.

### 4. Player-count execution matrix

For representative rooms and encounters, document exactly what changes at:

- solo;  
- two players;  
- three players;  
- four players.

Rules must avoid:

- extra players waiting beside two-person puzzles;  
- four-player health sponges;  
- mandatory human cooperation in solo;  
- mechanics that become unreadable at four-player VFX density.

### 5. Vertical-slice implementation specification

Translate the design into discipline-specific backlog:

- gameplay engineering;  
- network engineering;  
- tools;  
- level design;  
- enemies/boss;  
- 2.5D art;  
- animation;  
- VFX;  
- audio;  
- UI/UX;  
- narrative;  
- QA/telemetry.

## Slice boundary

The production slice begins during the Transit failure and ends after the player defeats **The Pendulum** and resolves Gravity Orchard's first Anchor-state decision.

Expected first-play duration for the production-complete slice:

- critical route: approximately 2.5–3.5 hours;  
- exploratory route: approximately 3.5–5 hours.

The public demo, if later derived from this material, can be shorter. The production slice is intentionally larger than a marketing demo because it must prove progression, backtracking, transformation, boss scaling, online join/leave, and Echo parity.

## Design questions this pass must answer

By the end of Iteration 3A, the team should not need to ask:

- What does the player do in the first rooms?  
- When are Attract, Repel, Link/Echo, Latch, and Orbit introduced?  
- What is each opening encounter trying to teach?  
- What does a third or fourth player do in co-op traversal puzzles?  
- How does solo solve the same conceptual problem?  
- What are the first build choices?  
- How does The Pendulum differ with player count?  
- What content must exist to validate the 2.5D art pipeline?  
- What network interactions must survive 150 ms RTT?  
- Which opening rooms change after the first regional Anchor decision?

## Non-goals

Iteration 3A does not lock:

- final numeric balance;  
- final voice casting;  
- final character facial designs;  
- final names of every incidental NPC;  
- the complete late-game economy;  
- console platform requirements;  
- final marketing release date.

Numbers used in this pass are prototype targets and should be stored as tunable data.

## Content budgets for the opening slice

Planning targets:

| Content type | Target |  
|---|---:|  
| Wayfarer Scar spaces | 12–16 |  
| Early Transit Spine spaces | 8–12 |  
| Gravity Orchard spaces before/around Guardian | 22–30 |  
| Standard enemy archetypes available | 8–10 |  
| Elites/mini-bosses | 2–3 |  
| Major boss | 1 |  
| Core families available | 3 |  
| Modules available | 8–12 |  
| Convergence Chamber | 1 |  
| Meaningful NPCs | 5–7 |  
| Major world transformation | 1 regional + opening alignment event |

## Quality gates

### Movement

The opening is not accepted unless testers voluntarily replay at least one traversal room for speed/style after they already know the solution.

### Solo Echo

A solo player must solve at least one genuine dual-actor interaction through Echo without feeling that they are programming an AI.

### Four-player co-op

Four players must have simultaneous meaningful responsibility in at least:

- one traversal room;  
- one combat encounter;  
- one puzzle;  
- The Pendulum.

### Network

Representative Link, rescue, throwable-object, moving-anchor, boss, and world-state interactions remain understandable and playable at simulated 150 ms RTT.

### Identity

Blind footage of the slice should be describable as “the force/co-op orbital Metroidvania” without requiring reference to another game.

## Exit criteria

Iteration 3A is complete when the new room, boss, early-system, multiplayer, and backlog specifications are internally consistent and a multidisciplinary team could begin the opening greybox without inventing missing rules.

The next pass after 3A should extend the same level of detail into **Solar Foundry**, then use observed prototype results to revise world-wide content assumptions before every remaining region receives room-by-room specification.  
