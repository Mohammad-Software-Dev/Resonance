# Flooded Observatory — Water Sphere, Momentum and Refraction Systems

**Purpose:** Define Observatory mechanics as authored gameplay systems compatible with the locked movement/network architecture.

## Core rule

A water sphere is **not a fluid simulation**.

It is a gameplay volume with deterministic movement and authored physical effects.

The player remains on the same precision CharacterMovement foundation.

# WaterVolume definition

Each gameplay water mass has:

- WaterVolumeID;
- RoomID;
- shape type;
- center/transform;
- radius or ellipsoid axes;
- state;
- movement profile;
- flow profile;
- momentum profile;
- optical profile;
- charge state;
- occupancy state;
- reset policy;
- persistent-state key if needed.

## Shape types

Version 1 should prefer:

- sphere;
- ellipsoid;
- authored connected-lobe shape only if technically justified.

Avoid arbitrary deformable fluid meshes as gameplay truth.

# Player movement inside water

The player does not switch to free 360-degree swimming.

Inside a water volume:

- gameplay plane remains active;
- gravity influence reduces or changes by profile;
- acceleration changes;
- drag increases;
- vertical response changes;
- Resonance force response changes;
- jump may become a short kick/impulse presentation using the same input.

The exact feel must remain tunable through CharacterMovement.

## Water movement mode

Recommended custom state:

- Resonance_WaterTransit

It stores:

- active WaterVolumeID;
- entry velocity;
- current flow vector;
- drag profile;
- buoyancy/gravity modifier;
- exit-assist state.

This is still deterministic authored movement.

# Boundary crossing

## Entry

At boundary:

1. detect authoritative volume;
2. capture incoming velocity;
3. transform velocity by entry profile;
4. apply local flow;
5. enter WaterTransit state.

Prototype equation concept:

`V_water = V_in × EntryRetention + FlowContribution`

## Exit

At boundary:

1. sample current velocity;
2. apply exit multiplier;
3. add local boundary normal contribution if designed;
4. return to normal airborne Resonance mode.

Concept:

`V_out = V_water × ExitRetention + ExitImpulse`

Profiles vary by sphere type.

## Design target

Good players use entry angle and exit point intentionally.

Water should feel like a momentum lens.

# Flow

A sphere can have one authored internal flow field.

Start simple:

- none;
- constant vector;
- radial inward/outward;
- rotational/orbital;
- spline-guided.

Do not build general computational fluid dynamics.

Flow visualization:

- suspended particles;
- plant/debris direction;
- subtle line distortion;
- audio movement.

# Moving water masses

Selected spheres can move.

Motion types:

- socket-to-socket;
- rail/spline;
- orbit around node;
- fixed-state relocation after puzzle;
- slow continuous drift with authored bounds.

Server owns motion state.

Clients reproduce parametric path from:

- WaterVolumeID;
- path ID;
- state;
- server start time;
- normalized progress.

# Repositioning through Resonance

Players do not push thousands of liters directly as a rigid body.

Instead they apply force to:

- containment nodes;
- pressure collars;
- field anchors;
- reservoir gates.

Force contribution advances an authored relocation state.

This preserves the fantasy of moving water with Resonance without unstable physics.

# Water-to-water transfer

Critical transfers use discrete states.

Example:

- Reservoir A: Full / Partial / Empty.
- Sphere B: Absent / Forming / Stable.
- Channel C: Dry / Flowing / Flooded.

Visual water animation bridges between states.

Gameplay/save truth remains state-based.

# Projectile behavior

Projectile types may have WaterProfile.

Possible effects:

- speed reduction;
- trajectory bend;
- charge propagation;
- reflection/refraction;
- bubble trail.

Only selected projectiles need complex behavior.

Server validates impact/trajectory state.

Clients render local distortion/trails.

# Refraction

## Visual refraction

Used for identity but must not make platforming dishonest.

Rules:

- gameplay collision is never intentionally displaced from readable silhouette;
- target reticle resolves actual actor;
- strong distortion reduces near critical hazards;
- accessibility can lower/disable distortion.

## Gameplay refraction

Selected lens-water combinations can alter projectile direction.

Do not refract arbitrary attacks through arbitrary curved surfaces.

Use authored refraction nodes/planes.

# Charged water

Charge states:

- Neutral;
- Primed;
- Charged;
- Discharging.

A charged volume may:

- damage over time;
- create periodic pulses;
- alter projectile behavior;
- energize machinery.

Players can manipulate grounding paths.

## Grounding

Grounding objects have stable TargetIDs.

A valid path can be created through:

- moving conductive probe;
- redirecting Pressure Eel charge;
- Link/force mechanism;
- opening drain/ground gate.

# Breath / drowning

Recommendation: **do not use a conventional oxygen meter** for ordinary water spheres.

Reasons:

- would create a second resource tax;
- conflicts with momentum-focused identity;
- encourages waiting rather than skill;
- adds little to co-op.

Very long/deep special volumes may use localized pressure/air fiction, but not as constant regional timer.

# Combat inside water

Inside water:

- attacks remain familiar;
- startup/recovery may receive small authored modifiers;
- projectiles change by profile;
- Resonance forces change in strength;
- enemy movement families exploit volume boundaries.

Do not create a full separate underwater moveset.

# Link inside/across water

Link may cross a water boundary.

Rules:

- tension uses world distance, not optical path;
- water may damp force transfer by profile;
- rescue remains available;
- visual spline bends/distorts locally for presentation only.

# Echo

Echo recording stores:

- WaterVolumeID transitions;
- transform/velocity samples;
- supported action events.

Playback follows recorded path.

Echo does not recalculate free fluid response.

If required WaterVolumeID/state is invalid, Echo reports failed trace and puzzle resets.

# Water puzzle grammar

## Type A — Boundary Launch

Use sphere exit to reach distant anchor.

## Type B — Brake

Enter water to reduce dangerous launch speed.

## Type C — Relay

Move sphere into position, then use it as traversal medium.

## Type D — Charge

Ground or redirect charged water.

## Type E — Split Volume

Coordinate actions across separate spheres.

## Type F — Drain/Fill State

Move water between authored reservoirs.

## Type G — Refraction

Use water/lens node to redirect a selected projectile or signal.

# Player-count adaptation

## Solo

Echo handles one simultaneous control.

## 2P

One player manipulates water state while one traverses/fights.

## 3P

Third controls charge, enemy pressure or rescue.

## 4P

Prefer two parallel sphere lanes or two paired responsibilities.

Avoid four players crowded into one small volume during precision action.

# Camera

Inside water:

- camera does not become floaty;
- look-ahead remains movement-based;
- distortion is post/presentation only;
- boundary is always visible.

Fast exits can trigger brief framing expansion.

# Accessibility

Per-player options:

- lower refraction distortion;
- stronger boundary outline;
- stronger flow particles;
- momentum-exit prediction line;
- charged-water contrast;
- reduced screen wobble;
- wider Vector Shift assist;
- extended puzzle timing.

# Telemetry

Track:

- water entry/exit count;
- deaths within 1 second of boundary crossing;
- average exit speed;
- boundary misread;
- sphere movement retries;
- charged-water deaths;
- refraction projectile failures;
- Link rescue across boundary;
- Echo re-records;
- 4P occupancy density.

# Acceptance criteria

- water feels different without becoming a separate game;
- player can predict exit direction after short onboarding;
- skilled players intentionally use water for momentum;
- no required puzzle depends on arbitrary fluid behavior;
- multiplayer clients agree on volume state;
- Echo replay is stable;
- visual refraction never overrides gameplay truth;
- the same system supports traversal, combat, puzzles and Leviathan.
