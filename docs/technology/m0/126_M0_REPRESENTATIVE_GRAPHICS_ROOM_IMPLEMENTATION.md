# M0.8 Representative Graphics Room Implementation

**Status:** Implemented candidate; visual/performance signoff requires physical browser testing  
**Milestone:** M0.8  
**Purpose:** Record the representative rendering slice used to decide whether the browser client can carry Resonance's intended premium 2.5D presentation.

## What M0.8 now proves in code

The playable M0 movement fixture is wrapped in a deliberately more expensive presentation layer without changing collision, target IDs, fixed-step timing, Attract or Repel semantics.

The room contains:

- layered industrial/orbital background machinery;
- metallic/roughness PBR materials for structural surfaces;
- image-based environment lighting;
- one primary shadow-casting directional light;
- exponential depth fog;
- emissive machinery strips;
- a Babylon Node Material assigned to Resonance anchors;
- additive Resonance field particles;
- a glow layer;
- a large gas-giant exterior vista;
- a multi-part Wayfarer proxy silhouette;
- the existing moving anchor and complete Attract/Repel movement course.

All added room geometry is presentation-only unless it corresponds to an existing Rapier collider.

## Graphics presets

The room exposes four explicit presentation tiers.

| Preset | Render scale | Shadow map | Particle rate | Distant detail |
| --- | ---: | ---: | ---: | --- |
| Low | 0.72 | 512 | 28 | off |
| Medium | 0.85 | 1024 | 55 | on |
| High | 1.00 | 1536 | 85 | on |
| Ultra | 1.00 | 2048 | 120 | on |

WebGPU starts on **Medium**. WebGL2 starts on **Low**.

The G key cycles presets at runtime. Presets are presentation-only and must never alter gameplay state.

## Camera comparison

The C key switches between:

- narrow-FOV perspective; and
- authored orthographic framing.

The comparison is intentionally kept live through M0 so movement readability and art direction can be judged in the same room before one camera model is locked.

## Diagnostics added

The M0 engineering overlay now includes:

- backend;
- FPS;
- camera mode;
- graphics preset;
- render scale;
- active/total mesh count;
- total vertices;
- active particles;
- material count;
- texture count;
- existing simulation/target/collision/hash diagnostics.

M0.9 will add proper draw-call, CPU-frame, GPU-frame, shader compilation and allocation instrumentation.

## Temporary environment asset

The M0.8 room currently references Babylon's public prefiltered environment asset to establish IBL quickly.

This is **not** the intended shipping dependency.

M0.9 must replace it with a project-owned/local compressed environment asset so:

- first load is controlled by Resonance deployment;
- caching is deterministic;
- offline/PWA behavior is testable;
- CDN availability cannot alter the room;
- texture transfer and memory are measurable.

## M0.8 acceptance procedure

The code milestone is complete when CI passes.

The visual milestone is complete only after the room is opened on physical reference browsers/hardware and reviewed for:

1. premium-enough 2.5D silhouette/readability;
2. clear separation of player, targets and background;
3. coherent WebGL2 fallback;
4. no gameplay-state differences between presets;
5. useful perspective-vs-orthographic comparison;
6. representative enough rendering load to make M0.9 optimization meaningful.

Do not claim Tier M 60 fps from CI. That is an M0.9 physical-hardware measurement.

## Next milestone

Proceed to **M0.9 — Performance Pass** after the M0.8 code candidate is merged.

M0.9 owns:

- shader warmup;
- Scene/Engine instrumentation;
- CPU/GPU frame capture;
- draw-call audit;
- texture/mesh budget;
- allocation/GC profiling;
- dynamic resolution with hysteresis;
- WebGL2 tuning;
- local compressed environment assets;
- device-loss/error path;
- physical Tier M 60-fps evidence.
