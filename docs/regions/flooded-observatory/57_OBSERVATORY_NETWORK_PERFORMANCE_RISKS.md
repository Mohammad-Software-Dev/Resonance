# Flooded Observatory — Network, Performance and Technical Risk Specification

**Purpose:** Prevent the region's water spectacle from violating Resonance's locked authority/performance architecture.

# Technical principle

Simulate **water state**, not water particles.

The authoritative game cares about:

- volume transform;
- shape parameters;
- flow profile;
- thermal/charge state;
- occupancy;
- reservoir state;
- boss/puzzle relationships.

Surface ripples, droplets, foam and most distortion are client-side presentation.

# Authority matrix

| System | Authority | Client presentation |
|---|---|---|
| Water volume state | server | interpolated boundary/render |
| Moving sphere path | server parametric state | local interpolation |
| Player WaterTransit movement | server validation + owning-client prediction | immediate predicted control |
| Reservoir fill state | server | local flow animation |
| Charge state | server | VFX/audio |
| Refraction gameplay node | server | local beam/projectile visual |
| Cosmetic droplets | local | local |
| Large boss water transition | server state/time | reconstructed visuals |

# Networked movement

WaterTransit must extend the same CharacterMovement prediction path.

Saved move data may need:

- active WaterVolumeID;
- boundary-cross event;
- flow profile revision;
- entry/exit action;
- Vector Shift action;
- local water-state revision.

Do not send raw water-surface mesh state.

# Boundary reconciliation risk

Highest player-feel risk:

host and client disagree on exact water entry/exit frame.

Mitigation:

- stable analytic sphere/ellipsoid boundary;
- movement prediction uses replicated volume transform;
- modest boundary hysteresis;
- local VFX boundary slightly thicker than mathematical plane;
- corrections smoothed where safe;
- telemetry records water-boundary corrections separately.

# Moving sphere risk

A moving water sphere combines:

- moving volume;
- changed movement rules;
- fast exit.

Mitigation:

- parametric paths;
- replicated server start time;
- no free physics drift for critical spheres;
- predict latest transform/velocity;
- do not require millisecond-perfect exits.

# Water occupancy

Do not replicate every internal splash or displacement.

Track only what gameplay needs:

- players inside;
- critical enemy/object inside;
- charge source;
- objective occupancy.

# Large-water visuals

## Surface

Use shader/material representation.

## Distortion

Scalable post/material effect.

## Particles

Local Niagara effects driven by replicated state.

## Internal debris

Mostly local deterministic/cosmetic loops.

Interactive debris should be sparse and separately authoritative.

# Performance budgets

Four-player worst case should include:

- 4 players in/around separate water volumes;
- 8–12 enemies;
- 12+ projectiles;
- 3 moving spheres;
- 1 charged sphere;
- Link effects;
- large background water visuals.

Target remains 60 fps on Tier M/Medium.

# GPU risks

Primary:

- translucent water overdraw;
- refraction;
- multiple overlapping spheres;
- particles;
- screen-space distortion;
- lighting through water.

Rules:

- cap overlapping full-screen transparent layers;
- use simpler Medium material;
- do not require real-time planar reflection;
- reduce secondary caustics before reducing gameplay boundary visibility;
- boss arena avoids four nested transparent volumes in same screen region.

# CPU risks

- repeated inside/outside checks;
- enemy pathing across media;
- target queries through moving volumes;
- boss multi-volume state;
- too many Blueprint ticks.

Use:

- volume enter/exit events;
- spatial partitioning;
- data-driven state;
- no per-droplet gameplay.

# Network risks

## Risk A — Boundary correction feels bad

**Impact:** 5  
**Likelihood:** 3

Spike:

- one moving sphere;
- repeated high-speed entry/exit;
- 30/80/150/250 ms presets.

Pass:

- no frequent visible snap;
- same broad landing result host/client.

## Risk B — Water-state desync

**Impact:** 5  
**Likelihood:** 2

Spike:

- move sphere;
- charge sphere;
- drain/fill transition;
- late join.

Pass:

- all clients agree on state revision;
- no client sees safe sphere while host sees charged.

## Risk C — Refraction destroys readability

**Impact:** 4  
**Likelihood:** 4

Pass:

- players identify real targets/hazards under four-player load;
- accessibility low-distortion mode remains visually coherent.

## Risk D — Transparency cost

**Impact:** 4  
**Likelihood:** 4

Pass:

- representative Observatory room and Leviathan phase meet 60 fps target at Medium.

## Risk E — Leviathan spans multiple volumes

**Impact:** 5  
**Likelihood:** 3

Mitigation:

- boss body is one authoritative actor/state machine;
- visible segments driven by phase/time;
- volumes reference boss sockets/state;
- do not physically simulate a long soft body.

# Leviathan implementation rule

The Leviathan should not be a networked spline-ragdoll.

Use:

- authored body pose states;
- IK/spline visual deformation from authoritative nodes;
- parametric transitions;
- explicit hit regions;
- replicated phase/subsystem state.

# Astrolabe implementation rule

Water shield rotation is parametric.

Replicate:

- orbit state;
- angle/time;
- active volume IDs;
- shell component state.

Not:

- arbitrary per-particle water orbit.

# Save/late join

Save stores:

- regional water outcome;
- persistent reservoir states;
- room state variant;
- permanent shortcut states.

It does not store:

- transient sphere ripples;
- enemy water displacement;
- boss mid-fight water layout.

Late join receives current active volumes and state revisions.

# Automated tests

Create Observatory-specific tests:

1. 100 repeated high-speed sphere boundary crossings.
2. 4 clients entering/exiting same moving sphere.
3. 4 clients in different spheres.
4. charge/ground transition under 150 ms + jitter.
5. room drain/fill transformation + save/load.
6. late join into each transformation state.
7. Astrolabe reset.
8. Leviathan phase reset.
9. boss wipe while players occupy separate volumes.
10. accessibility low-refraction visual smoke test.

# Content guardrails

Do not approve a room that requires:

- actual free-surface fluid solve;
- arbitrary mesh deformation as collision truth;
- dozens of replicated water objects;
- pixel-perfect sphere-exit timing;
- gameplay hidden by transparent overlap.

# Acceptance criteria

- WaterTransit stays on CharacterMovement prediction;
- all critical water volumes have stable IDs and authored shapes;
- late join reconstructs the correct state;
- 150 ms remains playable;
- four-player Medium preset sustains performance target;
- Leviathan does not require soft-body network physics;
- visual spectacle scales independently from gameplay truth.
