# M0.9 Browser Performance Pass

**Status:** Implementation complete; physical Tier M measurements still required for performance signoff  
**Milestone:** M0.9  
**Purpose:** Make browser rendering cost observable, controllable and reproducible before M0 replay/test-harness work.

## Implemented performance controls

### Instrumentation

The browser client now records Babylon scene/engine counters for:

- CPU frame time;
- scene render time;
- GPU frame time when the runtime exposes a supported timer;
- draw calls;
- active-mesh evaluation time;
- particle render time;
- runtime shader compilation time;
- Chromium JS heap usage when exposed.

GPU time and heap are capability-dependent. Unsupported browsers report them as unavailable rather than fabricating a value.

The engineering HUD refreshes at 4 Hz rather than rebuilding diagnostic text every render frame.

### Shader warmup

Before the movement course begins, every material/mesh binding in the representative room is explicitly compiled and the scene waits until ready.

The HUD separates:

- startup shader warmup duration; and
- shader compilation observed after the performance monitor starts.

The desired runtime compilation value during normal traversal and first Attract/Repel use is zero.

### Dynamic resolution

The M0 governor targets a 60 Hz frame budget with hysteresis.

Default policy:

- target: 16.67 ms;
- downscale evidence: EMA above 17.4 ms for 45 frames;
- upscale evidence: EMA below 14.2 ms for 180 frames;
- cooldown after a scale change: 120 frames;
- scale step: 0.05;
- minimum adaptive render scale: 0.60.

A graphics-preset change resets adaptation to that preset's authored base scale.

The R key toggles dynamic resolution for A/B testing.

Dynamic resolution changes presentation resolution only. It never changes:

- fixed simulation rate;
- collision;
- target selection;
- movement tuning;
- ability timing;
- enemy/boss timing.

### Static render-side optimization

The representative room now:

- disables Babylon pointer-move picking because M0 targeting uses the engine-independent target registry;
- marks presentation meshes non-pickable;
- freezes world matrices only for static backdrop/vista meshes;
- freezes immutable PBR materials;
- leaves the player, moving platform, moving anchor, Resonance Node Material and simulation-owned presentation transforms dynamic.

No active-mesh freeze or aggressive scene-performance mode is enabled because those optimizations can create correctness hazards for dynamic room state.

### Context recovery

The client observes graphics-context loss/restoration.

On loss it clears the fixed-step accumulator. On restoration it:

- resets render-frame timing;
- reapplies the active graphics preset;
- resets adaptive resolution to the preset base scale;
- exposes recovery state in diagnostics.

Babylon remains responsible for recreating tracked GPU resources.

## Local environment asset

M0.8 used a public Babylon CDN environment texture.

M0.9 replaces that dependency with:

`/assets/environment/resonance-m0-orbital.env`

The M0 asset is project-owned and procedurally generated for the representative room. It is intentionally small:

- Babylon ENV v2;
- 16 px cube-face base resolution;
- complete mip chain;
- PNG-packed RGBD-compatible faces;
- approximately 5 KB.

Its purpose is deterministic local IBL/bootstrap cost, not final environment art.

CI validates:

- ENV magic bytes;
- manifest version/width/type;
- mip count;
- contiguous payload offsets;
- complete payload length.

Production art will replace this fixture through the normal content pipeline without changing the runtime contract.

## JavaScript startup payload

The first M0.9 production build exposed an avoidable package-boundary problem: the browser entry was approximately **8.03 MB minified / 2.27 MB gzip**.

M0.9 replaced Babylon package-barrel imports with feature-level imports, lazy-loads the WebGPU engine behind the capability check, and loads the representative premium room as its own stage.

The resulting measured build entry is approximately **3.03 MB minified / 1.14 MB gzip**, with the representative-room chunk approximately **668 KB / 165 KB gzip** and the WebGPU-engine chunk approximately **249 KB / 62 KB gzip**.

This is a substantial M0 improvement, not the final shipping payload target.

CI now blocks regressions above:

- 3.5 MB raw entry;
- 1.3 MB gzip entry;
- 4.5 MB raw for any one JavaScript chunk;
- 1.6 MB gzip for any one JavaScript chunk.

Later content streaming and shell/menu work should continue reducing first-play transfer rather than treating these M0 ceilings as desirable targets.

## Provisional Tier M M0 budgets

These are **gates to measure**, not claims already achieved.

Reference capture conditions:

- physical Tier M machine recorded by exact CPU/GPU/RAM/OS/driver/browser;
- 1920x1080 display;
- Medium preset;
- WebGPU primary run;
- WebGL2 fallback run;
- 10 seconds discarded for startup/warmup;
- representative traversal includes jump, evade, moving anchor, Attract and Repel;
- at least 120 seconds per capture.

Target gates:

| Metric | M0 Tier M target |
| --- | ---: |
| Render cadence | sustained 60 fps |
| Frame p50 | <= 16.0 ms |
| Frame p95 | <= 16.7 ms |
| Frame p99 | <= 25 ms |
| Long hitch | no repeatable > 50 ms gameplay hitch |
| CPU frame p95 | <= 8 ms |
| GPU frame p95 | <= 13.5 ms when timer is available |
| Draw calls | <= 250 in representative room |
| Active meshes | <= 120 |
| Materials | <= 24 |
| Textures | <= 24 |
| Runtime shader compile | 0 ms during warmed representative traversal |
| Heap trend | no repeatable unbounded growth over a 5-minute loop |

If Medium requires sustained adaptive scaling below 0.75 on Tier M, treat that as a performance failure rather than a successful dynamic-resolution save.

## WebGL2 fallback gate

WebGL2 may start on Low and reduce:

- render scale;
- shadow resolution;
- particle density;
- glow/post cost;
- distant detail.

It may not change simulation or gameplay semantics.

The fallback passes M0 only if the entire movement/Attract/Repel course remains coherent and responsive.

## What CI proves

CI proves:

- strict TypeScript compatibility;
- dynamic-resolution policy tests;
- localized ENV structure;
- existing deterministic/gameplay tests;
- production bundle creation.

CI does **not** prove:

- physical GPU performance;
- visual readability;
- GPU timer availability;
- browser driver behavior;
- long-session heap stability.

## Physical signoff checklist

M0.9 is fully signed off only after recorded captures exist for:

1. Tier M Chrome/Edge WebGPU;
2. Tier M WebGL2 fallback;
3. one Firefox run;
4. Safari/macOS when reference hardware is available;
5. context-loss/recovery test where the browser exposes a practical test path;
6. 5-minute repeated movement loop for heap/GC observation.

Record the exact hardware/software matrix next to the capture results.

## Next milestone

Once physical M0.9 evidence passes, proceed to **M0.10 — Replay/Test Harness**.

If performance misses, optimize the measured bottleneck before adding content. The first response order remains:

1. render scale;
2. noncritical post/glow;
3. decorative particles;
4. shadow cost;
5. distant detail.

Gameplay timing is never a performance degradation lever.
