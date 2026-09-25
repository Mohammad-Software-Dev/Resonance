# M0 TargetID, Attract and Repel Specification

**Status:** Canonical first Resonance implementation  
**Purpose:** Define the mechanic that must feel distinctive before broader production.

## Target identity

Every Resonance target has a stable runtime `TargetId`.

Persistent authored target:

- editor/content GUID;
- maps to runtime compact TargetId on room activation.

Target identity is independent from Babylon mesh/node names.

## Target data

Conceptual M0 structure:

```ts
interface ResonanceTargetState {
  id: TargetId;
  entityId: EntityId;
  position: Vec3;
  velocity: Vec3;
  active: boolean;
  attractable: boolean;
  repelable: boolean;
  anchored: boolean;
  massClass: MassClass;
  revision: Revision;
}
```

Future fields may include Flux eligibility, Phase mask and relationship IDs. M0 should not add them unless needed.

## Target acquisition

Candidates come from a room/spatial target registry.

Hard filters:

- active;
- allowed by the requested ability;
- within max range;
- within gameplay-plane/depth rules;
- passes obstruction/visibility rule when required.

Scoring considers:

- angle to input/aim;
- distance;
- previous-target stickiness;
- trajectory relevance;
- target priority;
- designer bias.

## Stickiness

Target selection must not flicker between nearby anchors.

Use:

- acquire threshold;
- retain threshold;
- hysteresis;
- minimum score improvement before switching.

Debug overlay shows every candidate and score.

## Input

M0 supports:

- gamepad;
- keyboard/mouse.

The game must not require pixel-perfect cursor targeting during high-speed movement.

## Attract design contract

Attract is **not a grapple rope**.

When active on a valid target:

- player enters Attract movement mode;
- authored acceleration moves toward target;
- selected tangential steering remains;
- maximum Attract speed is clamped;
- cancel occurs only through explicit rules.

Starting conceptual behavior:

```text
desiredAcceleration =
  normalize(targetPosition - playerPosition)
  * attractAcceleration(distance/profile)
```

Use a simple piecewise/table profile rather than a physically exact spring.

## Attract feel goals

- immediate;
- predictable;
- allows route shaping;
- visually reads as field/magnetic movement;
- avoids uncontrolled oscillation;
- preserves momentum expression.

## Arrival experiments

M0 compares:

A. pass through with preserved momentum;  
B. soft capture/release;  
C. arrival radius with authored radial/tangential handling.

Choose the option that creates the best movement flow.

Avoid hard stopping unless a specific target type requires it.

## Repel design contract

Repel is a target-relative authored impulse.

Conceptually:

```text
repelDirection = normalize(playerPosition - targetPosition)
velocity = applyRepelProfile(currentVelocity, repelDirection, config)
```

Repel may:

- preserve tangential momentum;
- replace radial inward velocity;
- add a bounded outward impulse.

It should feel like controlled launch, not chaotic physics.

## Repel without explicit target

M0 may test contextual near-surface Repel.

Do not accidentally turn Repel into a free omnidirectional air dash; Vector Shift owns later route reassignment.

## Moving targets

Attract/Repel use the target's fixed-tick simulation transform, never the Babylon interpolated render transform.

## Collision

Resonance movement does not bypass collision.

If movement hits geometry:

- controller resolves the movement;
- Attract remains active only if still meaningful;
- cancellation rule is explicit;
- no tunneling through thin geometry.

## M1 prediction contract

Wire input needs semantic intent:

- Attract held/pressed;
- Repel pressed;
- selected TargetId;
- movement axes.

Client never sends desired final position or force result as authority.

Server recomputes with the same simulation code.

## Invalid target

If a target revision becomes invalid:

- action cancels deterministically;
- emit a semantic cancel reason;
- presentation updates;
- server never silently retargets to a different anchor.

## Tunable M0 data

### Acquisition

- range;
- cone;
- retain cone;
- distance weight;
- angle weight;
- stickiness;
- switch threshold.

### Attract

- acceleration profile;
- max speed;
- tangential steering;
- arrival radius;
- release momentum;
- collision behavior.

### Repel

- impulse;
- tangential preservation;
- recovery ticks;
- max resulting speed.

## Prototype course

Required:

1. static-anchor pull;
2. pull around obstruction;
3. moving anchor;
4. jump → Attract → release;
5. Attract → Repel;
6. Repel from a low target to gain height;
7. target-choice fork;
8. recovery after a miss.

## Success metric

After a short tutorial, testers should voluntarily combine jump, Attract, release and Repel without a scripted prompt.

The mechanic should remain fun enough to repeat in an otherwise empty room.

## Telemetry

Track:

- target switches/sec;
- invalid action attempts;
- Attract duration;
- Attract cancel reason;
- Repel use;
- route completion;
- recovery events;
- voluntary replay count.

## M0 rejection criteria

Do not advance to full network production if:

- target selection feels unreliable;
- Attract feels like a generic grapple;
- Repel launches feel inconsistent;
- camera/targeting fights the player;
- movement is only fun after enemies/content are added.
