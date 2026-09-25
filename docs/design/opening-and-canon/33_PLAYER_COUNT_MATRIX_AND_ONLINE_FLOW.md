# Player-Count Matrix and Online Session Flow

**Scope:** Opening slice and reusable Version 1 rules    
**Modes:** Solo, 2-player, 3-player, 4-player online    
**Local multiplayer:** Out of scope

## Design objective

The game must not have four separate campaigns.

A room has one conceptual problem and adapts responsibility, pressure, timing, and available collaboration based on active player count.

The adaptation hierarchy is:

1. preserve the same mechanic;  
2. add or remove simultaneous responsibilities;  
3. adjust enemy role composition;  
4. adjust timing windows where needed;  
5. use modest health/stability scaling last.

## Session rules

### One human per client

Every running game instance owns one local human player.

A session has:

- host world;  
- 1–4 active player profiles;  
- one active named Wayfarer per player;  
- independent camera per client.

### Session privacy

Version 1 target:

- Invite Only.  
- Friends.  
- Public/Matchmaking may be added if moderation/discovery work is justified, but the campaign must not depend on public matchmaking.

The vertical slice only needs Invite/Friends.

## Character selection

Campaign party normally uses unique named Wayfarers.

When joining:

1. client receives active party roster;  
2. available Wayfarers are shown;  
3. joining player selects an unused Wayfarer;  
4. their account/profile loadout is mapped to host-world eligibility.

If all four Wayfarers are already present, no fifth player can join.

Challenge modes may later allow duplicate characters, but story campaign does not need that complexity.

## Join-in-progress

### Allowed

- ordinary exploration;  
- settlements;  
- safe Relay rooms;  
- non-critical combat if synchronization snapshot is stable.

### Delayed join

During:

- boss phase transition;  
- irreversible world transformation;  
- cinematic state that changes quest topology.

Joining player remains in loading/spectator state until next safe synchronization boundary, usually seconds rather than minutes.

### Spawn location

Priority:

1. safe point near active party;  
2. nearest recently passed Relay;  
3. authored region join marker.

Never spawn directly inside active hazard.

## Leave/disconnect

### Voluntary leave

- personal progression commits;  
- temporary owned objects return to world authority;  
- encounter scales at next safe transition;  
- remaining players continue.

### Unexpected disconnect

Grace window preserves slot briefly for reconnect.

If not recovered:

- character fades/reforms out;  
- critical Link/object ownership releases;  
- boss does not immediately rewrite the attack already in progress;  
- scaling updates at next phase/encounter boundary.

## Solo transition

If last guest leaves and host is alone:

- Echo becomes available outside unsafe state;  
- current multi-actor puzzle returns to valid solo configuration;  
- room reset is permitted if necessary, but never more than current puzzle/encounter.

No campaign restart.

# Progression ownership

## Host owns

- world transformations;  
- main quest state;  
- faction choices;  
- shortcut state;  
- NPC positions;  
- region Anchor decisions;  
- boss world defeat state.

## Guest owns permanently

- account/profile accessibility settings;  
- cosmetics;  
- personal challenge records;  
- eligible Modules/Cores;  
- Salvage and personal rewards;  
- boss participation credit;  
- discovered lore/codex where appropriate.

## Ability eligibility

A guest entering a host world with later abilities receives one of two states:

### Their profile already owns ability

They may use it unless the host world explicitly has not unlocked the systemic prerequisite and allowing it would break critical progression.

Preferred design: most traversal ability ownership is profile-level but host-world critical gates can temporarily constrain sequence-breaking in first play.

### Their profile does not own ability but host has it

For co-op viability, guest receives a **session license** for required movement abilities currently active in the host campaign.

The session license:

- works only in that host session;  
- does not permanently grant the progression reward;  
- prevents guest from becoming dead weight.

When guest reaches that milestone in their own campaign later, permanent unlock occurs normally.

This rule should be validated carefully because ability mismatch is one of the most dangerous co-op Metroidvania progression problems.

# World decisions

Host confirms irreversible campaign decisions.

Recommended UI:

1. decision appears to all players;  
2. each guest can vote/preference-select;  
3. host sees vote summary;  
4. host confirms final choice.

No majority vote can overwrite the host's campaign save.

Shared-campaign mode can be considered later.

# Party separation

Players may occupy different nearby rooms in same region.

Rules:

- each client simulates/render local area;  
- server/host maintains active encounter bubbles;  
- critical bosses and transformations require Gather;  
- fast travel either moves party together after confirmation or permits independent Relay arrival when safe.

## Gather

Host or any player at a critical gate can request Gather.

Other players receive:

- destination;  
- reason (“Boss arena”, “Story transition”, “Fast travel”);  
- Accept / Finish current action.

After a short maximum grace period, host may cancel rather than forcibly teleport active players.

For boss pull, all players must be inside readiness boundary.

# Death and revive

## Exploration

At zero health:

1. player becomes Unstable;  
2. nearby teammates have rescue/revive window;  
3. if revived, returns with partial stable health;  
4. if not revived, reforms at nearby Relay/local checkpoint;  
5. party can continue; no full-team reset unless encounter explicitly requires it.

A reformed player can regroup through safe transit rules rather than walking ten minutes.

## Boss

Downed players remain in arena as Unstable.

Revive is possible but costs team attention.

Suggested prototype:

- first down: 3-second effective stabilization channel;  
- subsequent downs during same attempt add small temporary penalty;  
- all players down \= boss reset.

Numbers are tunable.

# Player-count room matrix

## Safe traversal room

### Solo

Full platforming problem.

### 2P

Players may assist via Link/rescue but each can traverse independently.

### 3P

Same; optional group technique may create faster route.

### 4P

Same; avoid forced single-file bottlenecks.

No artificial extra hazards solely because more players joined a non-combat traversal room.

---

## Dual-actor force puzzle

### Solo

Echo supplies second actor.

### 2P

One responsibility each.

### 3P

Third player gets moving obstruction, relay, defense, or route-optimization role.

### 4P

Two simultaneous sub-pairs OR two force actors + two dynamic support roles.

Never add two decorative switches.

---

## Standard combat room

### Solo

Threat concurrency tuned around one camera/player.

### 2P

More paired roles and target switching.

### 3P

Add support/control enemy or second vertical lane.

### 4P

Multiple lanes/objectives; modest HP scaling; enemy AI distributes threat.

---

## Elite encounter

### Solo

One major mechanic at a time.

### 2P

Parallel opportunities.

### 3P

Flex/support responsibility appears.

### 4P

Two simultaneous mechanic lanes plus increased attack coverage.

---

## Boss

Scaling occurs at authored phase boundaries.

Priority order:

- simultaneous objective count;  
- attack target count;  
- arena lane usage;  
- add/support enemy behavior;  
- vulnerability duration;  
- modest Integrity/stability scaling.

# Opening-room player-count examples

## WS07 Split Bridge

| Count | Responsibility |  
|---:|---|  
| 1 | Echo holds Arm A; player manipulates B |  
| 2 | one arm per player |  
| 3 | two arms + debris defense |  
| 4 | two pairs: force + defense/alternation |

## Alignment Hound

| Count | Responsibility |  
|---:|---|  
| 1 | one clamp focus + Echo timing |  
| 2 | two simultaneous clamps |  
| 3 | two clamps + projectile node |  
| 4 | paired clamp windows + wider attack coverage |

## GO17 Irrigation Ring

| Count | Responsibility |  
|---:|---|  
| 1 | Echo on Gate A; player on Gate B |  
| 2 | one gate each |  
| 3 | two gates + Seed Swarm clearing |  
| 4 | two pairs: force holder + obstruction control |

## The Pendulum

| Count | Responsibility |  
|---:|---|  
| 1 | Echo strain + safer projectile concurrency |  
| 2 | direct strain duet |  
| 3 | two strain players + flex defender/rescuer |  
| 4 | two paired strain lanes simultaneously |

# Co-op communication

Must support gameplay without voice chat.

Quick commands:

- Here.  
- Wait.  
- Help.  
- Pull.  
- Repel.  
- Link me.  
- Launch me.  
- Hold.  
- Ready.  
- Secret?  
- Boss/Threat.

Context pinging an anchor can display an anchor-specific symbol.

## Ping rate limits

Prevent visual spam, especially with four players.

Repeated identical ping collapses/refreshes rather than stacking.

# Rescue consent and anti-grief

Friendly Resonance force requires:

- active cooperative Link;  
- explicit rescue state;  
- armed team technique.

A player cannot freely Repel another player into hazards just because they are nearby.

Optional private-session setting may allow “Full Friendly Physics” for groups who want chaos, but it is not the balanced default.

# Latency-aware timing rules

No required co-op mechanic should require simultaneous inputs tighter than normal network conditions support.

Prototype targets:

- 150 ms RTT remains fully playable;  
- Link acquisition predicts locally;  
- rescue windows include latency margin;  
- strain contributions accumulate over a short window rather than exact same frame;  
- projectile reflections validate host-side but play immediate local feedback.

# Four-player readability

Each client sees:

- their own character highest friendly emphasis;  
- party members moderate emphasis;  
- enemy lethal hazards highest combat priority;  
- teammate Link effects visually quieter than boss hazards.

Player identity can use pattern + accent + UI marker, not color alone.

# Save/quit edge cases

Must test:

- guest unlocks Module then host quits immediately;  
- host transforms region while guest disconnects;  
- guest rejoins after boss kill;  
- player changes character at Relay then disconnects;  
- session license ability expires cleanly on leave;  
- guest with later personal progression joins earlier host world;  
- host with later world state invites new profile;  
- full party quits during Anchor-choice screen.

# Acceptance criteria

The scaling model is working when:

- no player count feels like the “real” version and others feel compromised;  
- third/fourth players rarely wait for two people to solve the actual puzzle;  
- solo Echo requires thought but not tedious scripting;  
- enemy HP does not dominate scaling;  
- guests can meaningfully participate regardless of campaign mismatch;  
- host retains world ownership without guests feeling unrewarded;  
- disconnect never permanently soft-locks a room;  
- voice chat improves cooperation but is not mandatory.  
