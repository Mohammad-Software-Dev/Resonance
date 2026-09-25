# The Pendulum — Major Boss Production Specification

**Region:** Gravity Orchard    
**Encounter ID:** BOSS_GO_PENDULUM    
**Expected first-clear timing:** 4–8 attempts for target baseline player, with wide variance by action-game experience    
**Retry:** GO20 Relay directly outside arena    
**Primary tests:** Orbit/moving anchors, armor-as-platform, team role distribution, solo Echo parity

## Fiction

The Pendulum is an agricultural mass-balancing engine built to keep the Orchard's rotating habitat stable as water, crop mass, freight, and population shift around the cylinder.

It was not designed as a combat machine.

After repeated Anchor failures it enters an emergency correction cycle: moving huge counterweights faster and farther than the habitat was designed to tolerate. Its safety logic now interprets Wayfarer Resonance activity as additional uncontrolled mass displacement.

The boss is therefore fighting to “correct” the players.

## Visual silhouette

- Central suspended body resembling a large articulated counterweight assembly, not a humanoid.  
- Three major pivot arms.  
- Multiple removable ceramic/conductive armor plates.  
- One visible inertial core that changes orientation as mass shifts.  
- Large enough that parts of the boss function as temporary traversal surfaces.

Avoid insectoid, skeletal, masked, or knight-like boss language.

## Arena

### Shape

Wide circular agricultural balancing chamber presented in side view.

Gameplay plane contains:

- left fixed anchor mast;  
- right fixed anchor mast;  
- central lower service platform;  
- two retractable side platforms;  
- overhead Pendulum pivots;  
- breakable irrigation braces;  
- deep but recoverable lower hazard during Phase 1;  
- lethal fall only after Phase 2 transformation, with rescue windows in co-op.

### Camera

Solo/online clients use local cameras.

Camera widens during:

- full-arm sweep;  
- floor-collapse transition;  
- final dual-orbit pattern.

No shared-screen constraints.

## Boss state model

The Pendulum has:

- **Integrity** — conventional boss health.  
- **Balance Stability** — encounter-specific state that controls vulnerability windows.  
- **Three Armor Assemblies** — left arm, right arm, core skirt.  
- **Pivot State** — which pivots are currently usable as anchors.  
- **Correction Level** — escalates between phases.

Damage alone cannot brute-force the entire encounter. Players must create balance failures to expose vulnerable systems.

## Phase 1 — Correction Cycle

**Target duration on successful attempt:** 90–150 seconds.

### Player goal

Learn attack grammar, damage armor attachments, and use moving limbs as traversal anchors.

### Attacks

#### Counterweight Sweep

One arm rotates low across arena.

Telegraph:

- mechanical lock click;  
- visible pivot glow;  
- 550–800 ms windup target range.

Responses:

- jump;  
- Latch upward;  
- Attract to arm and ride above sweep;  
- Phase not yet available at this point in campaign.

#### Drop Correction

Boss lifts one mass and slams it onto a marked zone.

Creates:

- radial force pulse;  
- loose plate vulnerability if slam hits damaged brace.

#### Seed Discharge

Agricultural seed canisters rupture and launch light Resonant pods.

Players may:

- dodge;  
- Repel pods into boss;  
- use pods as temporary moving anchors.

#### Pivot Reversal

Boss changes arm rotation direction.

Purpose: teach players not to memorize one orbit direction.

### Vulnerability

Each arm has an armor attachment with two states:

1. intact;  
2. cracked after sufficient stability/attack pressure.

Once cracked, Attract can remove it.

Removed plate becomes a heavy-light traversal object:

- can be Repelled;  
- can absorb one boss projectile;  
- can act briefly as a low-friction platform;  
- cannot be permanently lost—arena reset nodes return it if out of bounds.

### Phase transition condition

Both arm plates removed OR boss Integrity reaches threshold with at least one plate removed.

On transition:

- Pendulum overcorrects;  
- lower service floor fractures;  
- safe arena changes fundamentally.

## Phase 2 — Broken Balance

**Target duration:** 90–180 seconds.

### Arena transformation

- Central floor mostly collapses.  
- Fixed side masts remain.  
- Pendulum arms and removed plates become major traversal anchors.  
- Falling players have a short rescue window before defeat.  
- Solo gets generous recovery ledges at bottom edge; they disappear on higher challenge settings only if specifically selected.

### New mechanic: Strain Nodes

Two opposing strain nodes appear on the boss chassis.

The boss becomes vulnerable only when sufficient opposing force is applied.

### Solo execution

Player records Echo applying force to Node A.

During playback, player reaches Node B and applies opposite force.

Timing window is generous enough that the puzzle is about choreography, not frame precision.

### Two players

One player per node.

### Three players

Two players handle nodes; third intercepts Seed Discharge / keeps a moving anchor available. Roles can rotate organically.

### Four players

Boss creates two linked strain pairs:

- Pair A affects left pivot;  
- Pair B affects right pivot.

All four can act simultaneously, but failure of one pair does not instantly wipe the team. It reduces the vulnerability duration.

### Attacks

#### Scissor Swing

Two arms cross, creating moving safe gap.

#### Mass Snap

Boss rapidly changes one pivot's anchor status. Targeting UI must warn before an active anchor becomes invalid.

#### Counterweight Ejection

Heavy mass launches across room, then becomes a temporary anchor if players destabilize it.

#### Correction Beam

Directional field that pushes players rather than directly damaging them; can force bad orbit angles.

### Vulnerability window

Successful strain causes chassis to split and exposes inertial core.

Players may:

- attack directly;  
- launch removed plate into core for large stability damage;  
- perform team Crash if positioned.

## Phase 3 — Free Inertia

**Target duration:** 60–120 seconds.

Boss abandons normal balancing.

### Arena

Only:

- two fixed side anchors;  
- boss pivots;  
- one or two remaining plate objects;  
- short-lived seed pods.

The fight becomes a controlled aerial duel.

### Core rule

The boss core is always damageable but difficult to reach safely.

Better play creates longer exposure windows by manipulating pivot timing.

### Attacks

#### Triple Arc

Three sequential arm arcs at different heights. Each arc leaves one brief anchor opportunity.

#### Inertia Burst

Radial Repel from core. Players who Attract to a stable side anchor can convert the burst into a fast orbit route.

#### Broken Harvest

Seed pod storm with predictable lanes. Skilled players can collect/redirect pods into core.

#### Final Correction

At low Integrity, boss locks one arm to each side and begins compressing the traversal space.

Players must create one final opposing-force break.

### Finish

The final break does not explode the boss.

The Pendulum powers down unevenly and hangs motionless, emphasizing that it is infrastructure, not an evil creature.

## Player-count scaling summary

| Count | Structural changes |  
|---|---|  
| Solo | Echo handles simultaneous strain; lower recovery safety; fewer concurrent projectiles |  
| 2P | Direct opposing-force duets; paired rescue opportunities; normal projectile density |  
| 3P | One flex role appears: defend anchors, redirect pods, rescue, add damage |  
| 4P | Two simultaneous strain pairs, wider target distribution, additional lane pressure, modest Integrity increase |

### Health scaling principle

Prototype starting point, subject to playtest:

- 1P Integrity: 1.00x  
- 2P: 1.45x  
- 3P: 1.75x  
- 4P: 2.00x

Stability objectives and vulnerability windows do more scaling work than health.

No final numbers are locked.

## Down/revive behavior

During boss:

- downed player enters Unstable state;  
- revive interaction has risk but can be performed through Link at reduced speed;  
- repeated downs increase temporary revive time slightly;  
- entire party down \= reset.

Solo defeat resets immediately after short animation.

## Accessibility hooks

Per-player options may modify:

- incoming damage;  
- telegraph contrast;  
- rescue aim assist;  
- Echo recording duration;  
- strain timing window;  
- camera shake;  
- projectile density via assist preset where feasible.

Do not remove core mechanics. For example, an assist can widen the strain window but should not auto-complete strain.

## Audio requirements

The boss should communicate mechanical timing through:

- pivot lock clacks;  
- rising motor whine;  
- counterweight impact;  
- tension tone during opposing force.

All critical timing also has visual cues.

Music:

- Phase 1: measured mechanical pulse.  
- Phase 2: rhythm destabilizes.  
- Phase 3: harmonic elements from Orchard culture enter as machinery loses control.

## VFX/readability rules

At four players:

- friendly Resonance trails are visually quieter than boss hazards;  
- boss anchor-validity state uses shape/pulse, not color only;  
- strain pair ownership appears as minimal endpoint glyphs;  
- removed plates never hide character silhouettes for long.

## Narrative integration

After victory, Sera Mol and Orchard technicians reveal that the Pendulum's instability was partly caused by generations of manual calibration to preserve the low-gravity agriculture.

The boss did not “malfunction” randomly.

It was trying to reconcile:

- original structural parameters;  
- later human adaptations;  
- the recent Wayfarer Scar realignment.

This leads directly to the Anchor-state decision.

## Telemetry

Track:

- deaths by attack;  
- fall deaths;  
- rescue success/failure;  
- time per phase;  
- number of armor removals;  
- percentage using removed plates offensively;  
- strain failures;  
- Echo re-record count;  
- four-player role participation;  
- attempts to first clear;  
- abandon rate after attempt N.

## Implementation dependencies

### Gameplay

- moving-anchor targeting;  
- anchor invalidation warnings;  
- removable armor state;  
- heavy-light plate physics;  
- stability/balance state machine;  
- boss phase scripting.

### Network

- authoritative pivot state;  
- synchronized plate ownership;  
- multi-player strain contributions;  
- reliable boss phase transitions;  
- rescue during moving-anchor traversal.

### Level

- destructible/transformed floor state;  
- safe recovery volumes;  
- boss reset restoring all critical objects.

### Animation

- large articulated arms;  
- pivot reversal;  
- plate detachment;  
- emergency correction state;  
- shutdown.

### QA

Test at:

- 1/2/3/4 players;  
- 30/80/150/250 ms RTT;  
- join disabled during unsafe transition but allowed pre-pull;  
- disconnect mid-phase;  
- reconnect at GO20;  
- all three accessibility timing configurations.

## Boss acceptance criteria

The Pendulum is approved when:

- players use its body as movement infrastructure, not merely a target;  
- all player counts have meaningful jobs;  
- solo Echo solution is understandable after one safe tutorial elsewhere;  
- average failed attempt yields visible progress/learning;  
- four-player readability remains acceptable;  
- no plate/pivot desync can soft-lock the fight;  
- players understand why defeating it creates a regional decision rather than a simple “area cleared” state.  
