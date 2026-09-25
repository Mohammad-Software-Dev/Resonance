# Flux Field — Production Ability Specification

**Ability tier:** Tier 3 — Adaptation  
**Acquisition region:** Rust Sea  
**Primary purpose:** Temporarily make designated inert structures participate in Resonance.

# Player-facing fantasy

Before Flux:

> Some structures do not answer the rig at all.

After Flux:

> You can temporarily induce a Resonant response in selected inert lattice.

Flux is not “magnetize everything.”

It is a targeted, readable state change.

# Baseline control

Prototype interaction:

1. player targets a valid Flux-compatible object;
2. presses/holds Flux action;
3. short activation pulse;
4. target becomes **Fluxed** for duration;
5. target exposes its allowed Resonance verbs;
6. state expires or is canceled.

Input may become contextual with existing targeting depending controller budget.

Do not add a radial-menu burden during precision movement.

# Valid target classes

Examples:

- inert lattice anchor;
- buried structural rib;
- enemy armor component;
- dormant mechanism;
- selected projectile casing;
- particulate control node;
- puzzle conductor.

Not valid:

- arbitrary wall;
- decorative metal;
- every enemy;
- every dust particle;
- background geometry.

# Flux-compatible component

Recommended gameplay component/data:

- stable TargetID;
- FluxEligibility;
- FluxState;
- allowed verbs while Fluxed;
- duration profile;
- Heat profile;
- multiplayer contribution rules;
- save persistence policy;
- VFX/audio profile.

# State machine

## Inert

No normal Resonance response.

## Priming

Short activation windup.

## Fluxed

Valid for defined verbs.

## Decaying

Clear visual/audio warning.

## Cooldown/Recovery

Optional per-target lockout if needed.

Target can return to Inert.

# Heat

Flux should use existing Resonance Heat.

Prototype principle:

- initial activation creates moderate Heat;
- sustaining selected heavy targets may create additional Heat;
- ordinary short traversal Flux should not force waiting.

No separate Flux meter.

# Duration

Prototype target:

- enough for one meaningful traversal/interaction;
- short enough that reapplication matters;
- long enough to tolerate network latency and accessibility adjustments.

Exact seconds remain tunable.

# Traversal

## Temporary anchor

Flux inert lattice → Attract/Latch/Orbit valid.

## Mid-route activation

Advanced play may:

- launch;
- Vector Shift;
- Flux target;
- Latch/Attract;
- continue route.

This is a high-skill expression goal.

## Hidden anchor reveal

Some buried/inert targets become visible or targetable after Flux pulse.

Do not rely only on pixel hunting.

# Combat

## Flux armor

Enemy component becomes:

- pullable;
- throwable;
- vulnerable to Breaker interaction.

## Flux weapon/projectile

Selected inert projectile casing becomes redirectable.

## Flux environment

Activate:

- dormant crusher;
- old rail;
- conductive debris;
- field gate.

Combat should reward creativity without every room becoming environmental one-shot puzzle.

# Puzzle

Examples:

- Flux bridge lattice;
- Flux mechanism in timed chain;
- Flux one side while Echo/human operates another;
- Flux buried node to redirect particulate field;
- Flux temporary path through old machinery.

# Boss

Dust Cathedral uses Flux to expose control knots.

Future bosses may use Flux differently.

No boss should reduce Flux to “press button when weak point turns gray.”

# Backtracking

Flux must intentionally recontextualize old regions.

Examples:

## Wayfarer Scar / Transit

- inert maintenance lattice becomes shortcut anchor;
- dormant rail mechanism opens old service room.

## Gravity Orchard

- inert agricultural brace becomes temporary anchor;
- machine buried under growth exposes optional route.

## Solar Foundry

- dead mirror support becomes Resonant;
- inert shutter mechanism allows alternate route.

## Flooded Observatory

- dry structural rib becomes temporary anchor between water states;
- dormant pressure lattice activates optional chamber.

At least 6–10 concrete Flux returns should exist across previous content.

# Multiplayer

Flux state is server-authoritative.

Each player may own a personal activation intent, but the world target has one authoritative Flux state.

## Shared benefit

When Player A Fluxes a target, all players may use its newly valid Resonance behavior unless a specific mechanic says otherwise.

This encourages cooperation without requiring duplicate activation.

## Multiple targets

Baseline allows each player to contribute to separate targets if target/state rules permit.

Four-player rooms may support two simultaneous Flux lanes.

Avoid unlimited stacking that trivializes puzzles.

# Solo Echo

Echo may replay a recorded Flux activation if:

- target ID is valid;
- room explicitly allows;
- target state is compatible.

Echo does not select a new target dynamically.

# Prediction/network

## Client

- local target acquisition;
- immediate priming VFX;
- predicted “about to Flux” feedback.

## Server

Validates:

- ability unlocked/session-licensed;
- target eligibility;
- range;
- line/interaction rules;
- Heat/state;
- target not blocked.

Then server commits FluxState.

## Replication

Replicate semantic state:

- target ID;
- Flux state;
- start server time;
- duration;
- owner/source if needed;
- state revision.

Do not replicate decorative field particles.

# CharacterMovement integration

Flux is not itself a movement mode.

It changes target eligibility.

If player begins Attract/Latch immediately after Flux:

- saved movement input references TargetID;
- server verifies target FluxState at that move time;
- latency margin may accept activation/use within authored tolerance.

This interaction must be tested at 150 ms.

# Accessibility

Options may modify:

- target aim cone;
- Flux-compatible outline strength;
- decay warning;
- duration bonus;
- reduced Heat cost;
- target stickiness.

Assists must not auto-solve target order.

# Upgrade candidates

## Wide Flux

Can prime a small authored cluster / larger target.

Costs more Heat.

## Persistent Flux

Longer duration on one selected target.

## Relay Flux

A linked teammate can extend or inherit one Flux state.

## Combat Flux

Stability break can briefly auto-prime a compatible exposed component.

These are later upgrades, not baseline.

# Anti-grief/co-op

A player cannot Flux a shared object into a state that invalidates teammate safety without:

- authored puzzle rule;
- warning;
- reversible/reset state.

Critical route objects recover automatically.

# VFX language

Inert:

- matte/no response.

Priming:

- localized lattice lines wake inward.

Fluxed:

- clear Resonant pattern along eligible structure.

Decaying:

- pattern fractures/fades in readable pulse.

Avoid simply changing color.

# Audio

- activation pulse;
- stable Flux hum;
- decay tick/texture;
- failed-target sound distinct from overheat.

Critical timing has visual equivalent.

# Telemetry

Track:

- activations;
- invalid target attempts;
- Flux → Resonance follow-up rate;
- expirations before use;
- midair Flux use;
- combat component Flux;
- Echo Flux replay;
- four-player concurrent Flux targets;
- Heat overcap after Flux.

# Acceptance criteria

Flux is approved when:

- players understand why some metal is Flux-compatible and some is not;
- it matters in traversal, combat and puzzles shortly after acquisition;
- earlier-region returns feel obvious and rewarding;
- it does not replace Latch/Orbit/Vector Shift;
- 150 ms target activation/use remains playable;
- shared state creates co-op value;
- no system requires arbitrary material conversion or granular simulation.
