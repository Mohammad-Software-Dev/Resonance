# Solar Foundry — Heat, Beam, Mirror and Glass Systems

**Purpose:** Define reusable Foundry systems without creating a separate minigame architecture.

## Principle

Players still use the existing Resonance verbs:

- Attract;
- Repel;
- Link;
- Echo;
- Latch;
- Orbit;
- Vector Shift.

The Foundry adds objects and states, not a new control scheme.

# Beam system

## Beam graph

A beam is an authored graph of:

- Emitter;
- Mirror;
- Splitter;
- Shutter;
- Receiver;
- Absorber;
- Temporary Glass Reflector;
- Enemy Beam Source.

The server evaluates active routes.

Clients render beam VFX from compact replicated state.

## Why graph-based

- deterministic;
- network-friendly;
- easy to reset/test;
- no real-time ray-tracing dependency;
- stable across room transformations.

## Mirror orientation

Prefer authored orientation slots.

Example:

- Left;
- UpLeft;
- UpRight;
- Right;
- DownRight.

Visual interpolation may be smooth, but gameplay evaluates quantized states.

## Manipulation

Attract/Repel/Link accumulate force toward orientation thresholds.

This gives physical feel without raw rotational physics.

# Projectile categories

## Reflectable Bolt

Repel redirects.

## Mirror-Routable Bolt

Can bounce from tagged mirror after authoritative validation.

## Catchable Shard

Can be held briefly and thrown.

## Thermal Core

Cannot be safely reflected; dodge/block.

## Environmental Beam

Continuous authored hazard/energy route.

Categories use shape, timing and audio, not color alone.

# Heat integration

The existing **Resonance Heat** remains the only player Heat meter.

Foundry environmental zones modify it.

## Normal

Standard Heat behavior.

## Hot

- high-output actions generate more Heat;
- cooling slows.

## Quench

- cooling accelerates;
- selected hot objects cool.

## Solar Focus

- strong periodic Heat gain while exposed;
- cover/routing required.

Basic traversal must not become stamina-gated.

# Object thermal states

Only authored gameplay objects need thermal state:

- Cool;
- Warm;
- Hot;
- Annealed;
- Molten.

Transitions come from:

- beams;
- furnace;
- coolant;
- Heat Leech;
- boss attacks;
- scripted world states.

# Glass system

## Molten

Hazard/flow state. Not a rigid object.

## Forming

Transitional state manipulated through machinery/force node.

## Solid

Platform/cover/mirror depending asset.

## Cracked

Detachable and fragile.

## Shattered

Gameplay object removed; cosmetic fragments local.

Critical glass always has reset/respawn/out-of-bounds recovery.

# Temporary geometry

Use authored behavior:

- rail slide;
- hinge rotation;
- field track;
- defined socket formation;
- timed break.

Do not require stacking unstable rigid-body glass for critical traversal.

# Vector Shift

## Fantasy

One intentional change of line while already committed to Resonance movement.

## Valid states

- Attract travel;
- Latch travel;
- Orbit release;
- external launch;
- selected airborne momentum state.

## Result

Direction changes while preserving a defined fraction of speed.

It is not:

- double jump;
- teleport;
- unlimited air dash;
- free repeated 180° reversal.

## Reset

Prototype reset on:

- stable ground;
- authored reset anchor;
- Relay/safe platform.

## Network

Runs through custom CharacterMovement prediction.

Saved move includes:

- activation;
- target/direction quantization;
- sequence;
- charge state.

Server validates ability, charge and movement state.

# Echo

Echo can record:

- mirror force input;
- shutter action;
- receiver occupation;
- selected supported projectile/force event.

Echo does not:

- solve arbitrary continuous mirror networks;
- retarget if original ID invalid;
- depend on original physical shard positions.

# Link

Link can:

- stabilize mirror;
- transfer force contribution;
- rescue during beam traversal;
- coordinate temporary glass carry.

Existing friendly-force consent remains.

# Puzzle grammar

## Redirect

Source → mirror → receiver.

## Occlude

Block beam long enough to cross.

## Split

One source / two responsibilities.

## Relay

Projectile becomes temporary source.

## Thermal

Heat/cool object to correct state.

## Moving Route

Mirror/receiver moves along deterministic path.

## Multi-actor

One actor maintains state while another traverses/operates.

Solo uses Echo.

# Design rules

- introduce one variable at a time;
- beam path visually traceable;
- receiver state obvious;
- common reset <3 seconds;
- timing windows tolerate network jitter;
- no pixel-perfect mirror angle;
- 4P adds parallel jobs, not fourfold setup.

# Combat integration

Examples:

- Prism bolt cracks Glazier joint;
- glass blocks Furnace Ram lane;
- detached shield becomes mirror;
- Kiln Marshal plate is overheated;
- Heat Leech can accidentally help anneal an object.

# World-state integration

## Historical Grid

- higher power;
- more automated routes;
- more hostile machinery.

## Distributed Civic

- lower power;
- safer settlement routing;
- more manual systems.

## Fractured Spectrum

- many lower-power paths;
- more optional traversal;
- unusual field interactions.

Late join receives final state directly.

# Authority

Server owns:

- beam network state;
- mirror orientation;
- receiver state;
- critical glass state;
- thermal state;
- Vector Shift validation;
- puzzle completion.

Client predicts/presents:

- targeting;
- force VFX;
- mirror anticipation;
- beam interpolation;
- cosmetic glass.

# Performance

Avoid:

- hardware ray-tracing dependency;
- many dynamic lights;
- networked fragment particles;
- per-frame full graph rebuild.

Prefer:

- emissive tricks;
- pooled beam VFX;
- instanced background mirrors;
- event-driven graph updates;
- local shatter;
- scalable heat shimmer.

# Four-player readability priority

1. lethal enemy beam;
2. own target/force;
3. critical receiver/mirror state;
4. rescue request;
5. friendly beam history/decorative trail.

# Accessibility

Options:

- beam contrast;
- mirror-face pattern emphasis;
- Heat warning strength;
- reduced shimmer/flash;
- Vector Shift aim assist;
- longer routing windows;
- stronger receiver outline.

# Telemetry

Track:

- routing failures;
- time to first redirect;
- mirror retarget count;
- reflected projectiles;
- Heat overcap events;
- Heat deaths;
- temporary glass use;
- Vector Shift activations/deaths/corrections;
- Echo re-records;
- 4P role participation.

# Acceptance criteria

- beam paths are understood after early rooms;
- enemy fire redirection feels intentional;
- Heat creates pressure, not waiting;
- temporary glass is precision-friendly;
- Vector Shift extends momentum;
- solo and 4P share one conceptual language;
- save/reset/join remain deterministic;
- presentation works without Lumen or hardware RT.
