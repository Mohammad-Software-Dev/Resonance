# Cloud Loom — Atmospheric Current, Kite and Long-Range Co-op Systems

**Purpose:** Define large exterior movement as deterministic field/path systems rather than wind simulation.

# Atmospheric Current Volume

Each current has:

- CurrentID;
- path/shape;
- direction;
- strength profile;
- state;
- Invert compatibility;
- start/server time;
- visual profile;
- reset policy.

# Current types

- Linear lane;
- Curved spline lane;
- Radial intake;
- Radial exhaust;
- Shear band;
- Pulsed current;
- Moving current attached to machinery.

# Player response

Currents apply authored acceleration.

CharacterMovement remains authoritative/predicted.

Player can still steer, Repel, Latch, Orbit, Vector Shift and Phase where allowed.

# Invert current

Invert changes CurrentState:

- Forward → Reverse;
- Intake → Exhaust;
- Clockwise → Counterclockwise where authored.

The VFX changes immediately and clearly.

# Kite platforms

Kites are parametric moving platforms.

Data:

- KiteID;
- path;
- orientation profile;
- attachment points;
- tether relationships;
- state;
- current dependency;
- enemy/platform status.

Avoid free rigid-body flight for critical gameplay.

# Sail behavior

Visual cloth may simulate locally, but gameplay collision/anchor sockets are stable authored components.

Do not use cloth surface as precision collision truth.

# Long launch / catch

## Launch

May be generated from:

- Repel;
- Inverted current;
- Harvester exhaust;
- tether release;
- kite sling.

## Catch

Valid recovery targets:

- fixed anchor;
- moving kite;
- teammate Link;
- emergency recovery lane;
- Phase anchor.

# Long-range co-op

## Teammate catch

Player A exposes Link/catch endpoint.

Player B enters valid range/trajectory.

Catch:

- reduces catastrophic miss;
- can preserve some momentum;
- remains consent/readability-safe.

## Four players

Prefer:

- two paired lanes;
- rotating partners;
- cross-lane handoff.

Avoid one leader carrying everyone.

# Solo Echo

Echo can:

- hold a current vane;
- expose one Link endpoint;
- operate kite control;
- replay one Invert event.

Critical solo timing windows remain broad.

# Failure recovery

The biggest design danger is long fall punishment.

Rules:

- falling below active route enters recovery volume;
- player returns to recent recovery platform/kite;
- small Health/Fracture consequence may apply;
- no long death runback unless a lethal hazard was clearly telegraphed.

Boss arenas use even faster recovery.

# Current visibility

Current direction shown through:

- streamers;
- particles;
- sail orientation;
- repeated arrow-like environmental motifs;
- moving debris;
- optional accessibility direction lines.

No color-only direction.

# Pressure relationship system

Pressure mechanisms use discrete states:

- Intake;
- Neutral;
- Exhaust.

Connections may affect current, platform, door, sail or enemy field.

# Tether relationship system

Tether states:

- Pull A→B;
- Pull B→A;
- Neutral;
- Locked.

Invert swaps valid pull direction.

# Link vs environmental tether

Visual language must distinguish:

- player Link;
- Threader tether;
- machinery tether;
- boss tether.

# Player-count adaptation

## 1P

One moving lane/control at a time.

## 2P

Direct control/rider split.

## 3P

Third player handles rescue or secondary platform.

## 4P

Two simultaneous lanes/pairs.

# Network

Server owns:

- current state;
- kite path state;
- tether relation;
- pressure relation;
- recovery state.

Clients render:

- wind/cloud particles;
- cloth;
- streamers;
- small debris.

# Camera

Exterior movement needs:

- larger look-ahead;
- speed-based framing expansion;
- clear destination hints;
- minimal camera roll;
- teammate offscreen indicators.

Camera should not mimic flying-game banking.

# Accessibility

Options:

- stronger current direction;
- launch prediction arc;
- larger catch assist;
- reduced background cloud speed;
- reduced camera shake;
- longer Invert duration;
- stronger kite anchor outline.

# Telemetry

Track:

- long launches;
- catch success;
- Link rescues;
- recovery-volume use;
- missed kite landings;
- current-direction errors;
- 4P lane congestion;
- correction events.

# Acceptance criteria

- currents feel powerful but predictable;
- kites remain stable under latency;
- long traversal failures recover fast;
- 4P uses paired lanes rather than crowding;
- cloth/wind spectacle never becomes gameplay truth;
- Invert direction changes are immediately readable.
