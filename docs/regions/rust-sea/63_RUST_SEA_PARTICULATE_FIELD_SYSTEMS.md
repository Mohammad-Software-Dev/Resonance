# Rust Sea — Particulate Field, Excavation, Hidden Anchor and Wave Systems

**Purpose:** Define the metallic “sea” as deterministic gameplay rather than granular-fluid simulation.

# Core principle

The Sea is visually made of billions of particles.

Gameplay is not.

Authoritative systems operate on:

- Particulate Field Regions;
- fronts/lanes;
- depth bands;
- reveal states;
- compacted surfaces;
- sparse interactive masses;
- hidden structure state.

# Particulate Field Region

Each gameplay field has:

- FieldID;
- RoomID;
- surface profile;
- depth band;
- active state;
- flow/front profile;
- buried-object list;
- compacted zones;
- hazard profile;
- transformation variant;
- reset policy.

# Field states

## Calm

Stable surface with small visual motion.

## Flowing

Directional front modifies movement/contact.

## Rising

Buried geometry becomes less accessible.

## Receding

Structures emerge.

## Compacted

Surface acts as more stable traversable plate.

## Suspended

Particles lift, exposing hidden structures but creating hazard/visibility changes.

## Excavated

Persistent local post-puzzle state.

# Surface movement

The player does not sink through simulated grains.

Use authored collision/surface logic.

Possible effects:

- reduced traction;
- moving-surface velocity;
- short drag zone;
- launch lip;
- collapse trigger.

# Particle fronts / “surfing”

## Goal

Create the fantasy of riding a metallic wave while preserving the standard controller.

A front is an authored moving surface/force band.

Player may:

- run on compacted crest;
- Latch/Attract to nearby anchors;
- Repel for speed;
- Vector Shift between fronts;
- Flux hidden structure mid-ride.

No board, stance or separate surf controls.

## Front data

- FrontID;
- spline/path;
- speed profile;
- width;
- crest collision;
- force contribution;
- lifetime/state;
- visual particle profile.

Server replicates parametric state/time.

Clients render dense particles locally.

# Buried structures

Buried objects have:

- PersistentObjectID if permanent;
- BurialDepth state;
- Flux compatibility;
- reveal cue;
- excavation result;
- transformation behavior.

States:

- Hidden;
- Trace;
- Exposed;
- Active;
- Reburied.

# Reveal cues

Do not rely mainly on hidden-object detector UI.

Use multiple cues:

- dust disturbance;
- geometric edge;
- Ferric Hound behavior;
- resonance audio;
- old map clue;
- field ripple;
- Flux target response.

Optional accessibility can strengthen trace visualization.

# Flux reveal

Flux may:

- wake buried lattice;
- cause particles to lift away locally;
- reveal TargetID/socket;
- expose a route for limited duration.

The lifted particle VFX is cosmetic.

Gameplay truth is reveal state.

# Excavation

Player does not manually shovel particles.

Excavation is performed by:

- Fluxing structural grid;
- activating old field machinery;
- redirecting Undertow-like current;
- using Siphon/pressure consequences from prior regions where authored;
- defeating support enemies controlling a field.

# Hidden anchors

Types:

## Visible inert anchor

Geometry visible, not Resonant until Flux.

## Buried anchor

Trace cue → Flux reveals → Resonant.

## Conditional anchor

Only exists in specific field state.

## Enemy-carried anchor

Component becomes usable after Flux/armor break.

# Dense dust visibility

Rust Sea must avoid visual noise.

Gameplay priority:

1. player;
2. lethal attack;
3. active/Fluxed anchor;
4. objective;
5. major field front;
6. decorative particles.

Particles locally thin around critical silhouettes.

# Particulate hazards

## Dust Needle Current

A school/front of sharp metallic fragments.

Gameplay represented by:

- path;
- state;
- hazard band.

Attract/Repel/Flux may alter direction temporarily through control node.

Do not simulate individual needles.

## Ferric Storm

Rare large-scale room event.

Uses:

- reduced visibility;
- moving safe bands;
- revealed anchor pulses.

Must not become random damage.

# Combat integration

Examples:

- expose Burrow Relay by Fluxing buried support lattice;
- strip Cloudmouth armor so particles fall away;
- redirect Dust Needle Current;
- reveal Dredger through wake disturbance;
- use compacted crest as elevated attack route.

# Transformation

Regional Anchor reassigns field circulation.

Use state swaps and parametric fronts.

Do not physically relocate every particle.

Persistent world truth stores:

- region outcome;
- field variant;
- buried/exposed structure state;
- shortcut state.

# Multiplayer

Server owns:

- field state;
- front state;
- hidden-object reveal;
- critical compacted surface state;
- hazard bands.

Clients render:

- particles;
- dust wakes;
- small debris;
- trails.

## 4P rule

Avoid all players occupying one narrow “surf” crest.

Use:

- parallel fronts;
- staggered lanes;
- paired anchor relays;
- wide rescue opportunities.

# Echo

Echo records:

- traversal path;
- Flux event;
- valid control-node interaction.

Echo does not record particle simulation.

# Performance

GPU risks:

- transparency;
- overdraw;
- huge Niagara counts;
- shadows on particles.

Prefer:

- GPU particle simulation for cosmetics;
- impostor/density fields at distance;
- event-driven local bursts;
- no per-particle dynamic shadows on Medium.

CPU/network:

- no per-grain collision;
- no replicated particle actors;
- field state updates only on event/change.

# Accessibility

Options:

- reduce particle density;
- strengthen buried trace cues;
- increase active-anchor outline;
- reduce storm distortion;
- clearer front crest;
- stronger hazard-band edge.

Gameplay collision/state is unchanged.

# Telemetry

Track:

- front falls;
- hidden-anchor discovery time;
- Flux reveal failures;
- sequence-break attempts;
- field-state puzzle retries;
- particulate visibility deaths;
- 4P lane occupancy;
- performance in maximum-density rooms.

# Acceptance criteria

- Sea appears dynamic without granular simulation;
- players read fronts and buried structures;
- Flux reveal feels systemic;
- particle surfing uses existing movement;
- four-player state remains readable;
- transformed field states save/load deterministically;
- Medium preset can reduce visual density without hiding gameplay.
