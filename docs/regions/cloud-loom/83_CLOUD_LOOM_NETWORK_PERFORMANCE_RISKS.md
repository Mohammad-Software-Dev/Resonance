# Cloud Loom — Network, Performance and Technical Risk Specification

**Purpose:** Keep large exterior current/kite traversal stable under 1–4 player online play at 60 fps.

# Technical principle

Replicate relationships and paths, not weather.

Authoritative gameplay state:

- CurrentID/state;
- KiteID/path/time;
- Tether relationship;
- Pressure relationship;
- Invert state;
- recovery volume state;
- boss/elite states.

Local presentation:

- cloud layers;
- cloth secondary motion;
- streamers;
- small debris;
- atmospheric particles.

# Authority matrix

| System | Authority | Client presentation |
|---|---|---|
| current state | server | local VFX |
| kite path | server parametric | interpolation |
| tether relation | server | cable animation |
| pressure relation | server | intake/exhaust VFX |
| Invert state | server | priming/active visuals |
| recovery | server | local transition |
| cloth | local/cosmetic | local |
| cloud/storm | local | local |

# Invert latency risk

Critical chain:

Invert current → launch → Latch/kite catch.

At 150 ms:

- target feedback must be immediate;
- server validates relationship state;
- saved movement references current revision.

# Moving kite risk

Kites are moving platforms across large distances.

Use path ID, server start time, speed/orientation profile and state revision.

Avoid free network physics.

# Long-distance streaming risk

Large exterior spaces can tempt huge simultaneous load.

Use:

- room/cluster streaming;
- destination prefetch;
- distant low-detail vista geometry;
- constrained playable depth.

# Recovery risk

Falling players must not desync across enormous distances.

Recovery volume:

- server chooses recovery point;
- client transitions quickly;
- boss state unaffected unless actual wipe.

# GPU risks

- cloud overdraw;
- volumetrics;
- cloth;
- current particles;
- gas-giant background;
- four-player effects.

Rules:

- no gameplay dependence on volumetric quality;
- Medium uses simplified cloud layers;
- current direction retains high priority;
- kite cloth LOD;
- distant storm no expensive dynamic shadows.

# CPU risks

- many moving platforms;
- tether endpoints;
- target queries;
- AI on moving kites;
- Blueprint Tick.

Use event/state-driven systems and C++ movement foundations.

# Network risks

## A — Invert/current disagreement

**Impact:** 5  
**Likelihood:** 3

Pass:

player and server agree on launch direction/outcome under 150 ms.

## B — Kite platform correction

**Impact:** 5  
**Likelihood:** 3

Pass:

remote players remain visually attached; no repeated platform snapping.

## C — Link catch latency

**Impact:** 5  
**Likelihood:** 3

Pass:

catch intent remains responsive and server-valid.

## D — Exterior readability

**Impact:** 4  
**Likelihood:** 4

Pass:

4P player can identify own lane, next anchor, lethal current and teammate rescue.

## E — Streaming hitch

**Impact:** 4  
**Likelihood:** 3

Pass:

long launch does not hitch when destination enters detail range.

# Loom Harvester implementation

Use:

- authoritative phase/state;
- parametric body/kite paths;
- discrete intake/exhaust states;
- explicit sail components.

Do not use:

- free-flight rigid-body boss;
- fluid simulation;
- full cloth gameplay collision.

# Storm Binder implementation

Kite relations are stateful parametric relationships.

Tether animation follows endpoints.

# Four-player stress scenario

- 4 players;
- 4 moving kites;
- 2 active Links;
- 3 current lanes;
- 2 Inverted relationships;
- 8 enemies;
- pressure pulse;
- large background storm.

Target:

- 60 fps Tier M/Medium;
- stable host frame;
- predictable network corrections.

# Automated tests

1. Invert current 100 cycles.
2. Invert → launch → Latch at latency.
3. 4 players on one/multiple kites.
4. Link catch under 150 ms.
5. recovery volume from long fall.
6. Storm Binder reset.
7. Loom Harvester phase reset.
8. late join in exterior room.
9. all three Loom afterstates.
10. Invert session-license guest.
11. old-region Invert gate save/load.
12. destination streaming during high-speed launch.

# Save model

Persist:

- Loom outcome;
- permanent route/shortcut state;
- Invert ownership;
- quest flags;
- one-time rewards.

Do not persist:

- transient current phase;
- kite exact position if room resets;
- boss midfight state;
- cosmetic weather.

# Accessibility/performance independence

Reducing cloud density, cloth quality, particle count or background storm must not change current direction, collision, Invert eligibility, kite path or hazard timing.

# Telemetry

Capture:

- current corrections;
- moving-platform corrections;
- long-fall recoveries;
- Link catch success;
- stream hitch/frame spikes;
- current VFX GPU cost;
- active kite count;
- Invert latency failures.

# Acceptance criteria

- Invert/current chains work at 150 ms;
- kite motion is stable;
- recovery is fast;
- 4P exterior remains readable;
- Medium hits 60 fps target;
- large launches stream cleanly;
- no fluid/free-flight physics architecture is introduced.
