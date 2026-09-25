# Balance, Playtesting and Telemetry

## Testing philosophy

Resonance has unusual interaction complexity. Testing must begin before content scale.

The most important questions are behavioral:

- What do players try without prompting?
- Where do two players naturally cooperate?
- Does the force system behave as expected?
- Is solo Echo empowering or cognitively expensive?
- Does multiplayer latency change what strategies are viable?

## Test cohorts

Recruit separately:

- Metroidvania experts;
- action-platformer players;
- co-op couples/friends;
- players with limited genre experience;
- high-skill speedrunners;
- accessibility testers;
- online players at different latency regions.

Do not rely entirely on expert players; they can hide onboarding problems.

## Movement metrics

Track where appropriate and privacy-compliantly:

- traversal failure locations;
- time to learn first Attract/Repel crossing;
- optional advanced-route discovery;
- number of retries per movement challenge;
- percentage of players using advanced combinations;
- time spent moving in safe rooms (proxy for “movement as toy”).

## Combat metrics

- damage sources;
- Fracture recovery percentage;
- enemy time-to-kill;
- stability breaks per encounter;
- use of Resonance vs basic attacks;
- death/retry frequency;
- loadout distribution.

Danger sign: players ignore systemic mechanics and win most content through one safe basic attack.

## Boss metrics

Per boss:

- attempt count distribution;
- phase reached per attempt;
- death source;
- average fight duration;
- solo vs co-op win rate;
- Echo usage;
- revive count;
- quit/session-end after failure;
- time from death to next meaningful input.

Difficulty target varies, but repeated deaths should still show learning progression.

## Co-op metrics

- session length;
- distance/separation patterns;
- Link usage;
- rescue attempts/successes;
- team moves used;
- Gather frequency;
- disconnect/reconnect success;
- one player doing disproportionate objective work;
- accidental friendly launch/grief attempts.

Qualitative observation matters more than raw Link count. Players may cooperate verbally without using a specific mechanic.

## Echo metrics

- record attempts per puzzle;
- average recording duration;
- cancel/re-record rate;
- failure causes;
- combat usage frequency;
- whether players understand relative timing;
- whether Echo is perceived as fun choreography or mandatory setup work.

If critical-path Echo puzzles require many recordings, simplify them.

## Difficulty curve

Desired progression:

### Opening

Teach one system at a time; low punishment.

### Early-mid

Combine movement + basic combat.

### Mid

Enemy compositions demand target prioritization; optional chambers introduce advanced coordination.

### Late

Challenges assume fluent use of multiple Resonance verbs but should still telegraph clearly.

### Optional endgame

May require advanced movement, build optimization and precise team/Echo execution.

## Player-count balance matrix

Every major boss/critical challenge tested at:

- 1 player;
- 2 players;
- 3 players;
- 4 players;

And at different skill mixes:

- equal novice;
- equal expert;
- expert + novice;
- 3 experienced + 1 novice.

## Network simulation matrix

Minimum test conditions:

| Latency | Jitter | Packet loss | Purpose |
|---:|---:|---:|---|
| 30 ms | low | 0% | ideal |
| 80 ms | moderate | 0% | common regional |
| 150 ms | moderate | 1% | cross-region target |
| 250 ms | high | 2–3% | stress / graceful degradation |

Test launch/catch, boss hazards, projectiles, puzzle objects, revive, join/leave.

## A/B questions

Examples:

- Is Fracture timer 4s or 6s more engaging?
- Should rescue automatically prioritize teammate or require explicit Link?
- Should inspected blocked routes auto-update on map after ability unlock?
- How much camera zoom is acceptable before readability suffers?

Use controlled builds rather than debating endlessly from intuition.

## Playtest interview prompts

Ask without leading:

- What did you think the game was asking you to learn?
- Tell me about one moment you felt clever.
- Tell me about one death that felt unfair.
- When did you need your partner?
- When did your partner get in your way?
- What would you show a friend in a clip?
- Which location do you remember without looking at the map?
- What did you think changed after the Anchor event?

## Quality gates

### Movement gate

At least a strong majority of testers describe movement positively before art polish.

### Co-op gate

Teams spontaneously use verbal coordination and at least one emergent technique.

### Echo gate

Solo players solve representative dual-actor puzzle without external explanation after initial tutorial.

### Network gate

At 150 ms, cooperative movement remains predictable enough that players blame timing, not desync.

### Identity gate

Blind viewers can describe the Resonance mechanic and setting without primarily labeling it as a copy of another game.
