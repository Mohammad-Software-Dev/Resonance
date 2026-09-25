# Player Movement and Controls

## Movement philosophy

The controller should feel responsive enough that a missed action is usually understood as a decision or timing error, not a fight with animation. The visual character can be expressive, but animation must follow input—not delay it unnecessarily.

The character is an agile **Wayfarer** wearing a Resonance rig. Movement combines conventional platforming with force manipulation.

## Baseline movement kit

Available very early:

- Run.
- Variable-height jump.
- Drop through compatible platforms.
- Short evasive step/air redirect.
- Ledge grace: brief forgiveness when nearly clearing an edge; no automated climbing on every surface.
- Basic wall contact: controlled slide; wall jump unlocked early or available from start depending on prototype feel.
- Attract.
- Repel.

## Suggested controller layout

Controller-first mapping; keyboard/mouse fully remappable.

| Input | Action |
|---|---|
| Left stick / D-pad | Move / aim contextually |
| A / Cross | Jump |
| X / Square | Light attack |
| Y / Triangle | Heavy/context attack |
| B / Circle | Evade / Phase when unlocked |
| LT / L2 | Attract |
| RT / R2 | Repel |
| LB / L1 | Resonance Link / Echo control |
| RB / R1 | Core technique / contextual secondary |
| Right stick | Fine targeting/ping when needed |
| D-pad up | Heal/repair action if equipped |
| D-pad left/right | Quick module utility / emote/ping context |
| View/Touchpad | Map |

The exact layout must be validated through controller tests; Attract/Repel should remain simultaneously accessible during jumping and attacking.

## Feel targets

Initial prototype ranges—not final tuning:

- Ground acceleration: quick enough to reverse direction responsively.
- Air control: strong but not identical to ground; preserve commitment.
- Coyote time: ~80–120 ms range for testing.
- Jump buffer: ~100–150 ms range.
- Input buffering for attacks: short and predictable.
- Landing recovery: minimal for ordinary jumps; heavier only for intentional slam actions.
- Camera lead: subtle in movement direction; must not cause motion sickness.

## Resonance locomotion

### Attract

Hold toward a valid Resonant target to generate acceleration toward it.

Variables:

- distance falloff;
- target mass;
- player's field strength;
- obstruction;
- current momentum;
- whether the target is fixed or movable.

Attract should feel like controlled acceleration, not an instant teleport.

### Repel

Generates force away from a target or field origin.

Primary uses:

- launch from conductive surfaces;
- push movable objects;
- redirect midair;
- deflect projectiles;
- create separation from enemies/teammates.

Repel should preserve pre-existing momentum where possible so skilled chaining feels physical.

### Latch

Early upgrade. A short tap on a valid anchor commits a temporary tethered pull without requiring continuous aim.

Purpose:

- simplify basic traversal;
- allow players to attack while moving toward an anchor;
- form the foundation of Orbit.

### Orbit

Allows a player to preserve tether length and swing around a fixed Resonance anchor or another linked player.

Core expression:

- speed entering orbit affects exit speed;
- release angle matters;
- Repel at release increases launch;
- advanced players can switch anchor mid-arc.

### Vector Shift

Mid-game upgrade enabling one deliberate retarget during specific airborne Resonance states.

It should expand routes without becoming unlimited air steering.

### Flux Field

Temporarily induces Resonance in normally inert designated materials. This is a systemic “make this usable” ability rather than a simple key.

### Phase

Late-mid-game defensive/traversal verb. Short-duration phase movement through specific energy barriers, hazards and certain enemy attacks. It is not universal invulnerability.

## Advanced movement techniques

These should emerge from standard inputs:

- **Snap Launch:** Repel within a timing window at maximum attraction speed.
- **Orbit Cancel:** release an orbit into attack/evade to redirect momentum.
- **Partner Sling:** orbit a linked teammate and release at speed.
- **Catch Turn:** Attract a falling teammate and redirect their momentum laterally.
- **Plate Surf:** stand/attach briefly to a moving Resonant object and launch from it.
- **Enemy Vault:** use Repel on a sufficiently massive enemy to gain height while displacing it minimally.
- **Echo Relay:** solo player uses a recorded Echo as a moving anchor.

Advanced techniques should shorten routes and enable secrets, but critical-path platforming should not require frame-perfect variants.

## Momentum and combat

Movement velocity contributes to selected attacks.

Examples:

- a launch strike scales modestly with approach speed;
- a downward strike can transfer force to a movable object;
- collision between mutually attracted players can trigger a Resonance Crash if both deliberately arm the move;
- heavy attacks may redirect momentum rather than cancel it.

The game should avoid turning all combat into speed math; velocity bonuses are a layer, not the only valid strategy.

## Multiplayer movement rules

- Players never physically body-block each other during ordinary movement unless a mechanic explicitly requires collision.
- Resonance interaction between players requires intent/Link to prevent griefing.
- Rescue Attract is context-sensitive and biased toward saving rather than pulling a friend into hazards.
- Friendly launching requires either Link or explicit accept/armed state in accessibility settings.
- Players separated by camera bounds receive readable edge indicators.

## Camera principles

The camera must support speed without hiding hazards.

Every online player has an **independent local camera** on their own PC.

- moderate look-ahead;
- vertical framing expands when falling or ascending quickly;
- boss cameras can widen;
- off-screen teammate indicators show relevant party direction/state;
- critical boss/story transitions use Gather/readiness boundaries rather than shared-camera constraints.

There is no split-screen/shared-camera multiplayer requirement in Version 1.

## Traversal onboarding

Teach through environment sequence:

1. Safe conventional jump.
2. Visible anchor over harmless gap.
3. Attract while airborne.
4. Surface behind player encourages Repel launch.
5. Enemy/projectile demonstrates same rule.
6. Optional secret rewards combining both.

Do not explain each with long text. Use one-line prompts initially and retire them quickly.

## Movement quality bar

The movement prototype is not approved until:

- novice players can cross tutorial gaps reliably;
- skilled players discover faster lines without instruction;
- players enjoy replaying a traversal room voluntarily;
- latency in online 2-player does not make launches feel unreliable;
- animation and VFX clarify force direction without obscuring hazards.


## Iteration 3B controller implementation lock

The Wayfarer uses ACharacter + a custom UCharacterMovementComponent in Unreal Engine 5.8.x. Attract/Latch/Orbit are implemented as predicted authored movement modes/forces rather than making the player a freely simulated Chaos rigid body. Resonance targets use stable IDs and discrete mass classes so the server can reproduce and validate player movement under latency.
