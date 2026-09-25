# M0 Test, Diagnostics and Acceptance Plan

**Status:** M0 go/no-go definition  
**Purpose:** Prevent subjective “looks good” approval from replacing evidence.

## Test categories

### Simulation correctness

Automated checks:

- fixed tick count;
- input latching;
- coyote/buffer timing;
- snapshot restore;
- seeded RNG;
- deterministic target selection;
- deterministic moving path;
- Attract/Repel route.

### Cross-runtime determinism

Run identical fixture in:

- Node 24;
- Chrome;
- Firefox;
- Safari/macOS.

Compare canonical hashes at known ticks.

If a hash differs:

- find first divergent tick;
- dump input/state/physics summary;
- block milestone until understood or explicitly excluded from the prediction contract.

### Render-frame independence

Run the same input trace at simulated/render caps:

- 30 fps;
- 45 fps;
- 60 fps;
- 90 fps;
- 120 fps;
- 144 fps.

Simulation end state must match.

### Browser graphics

Test:

- WebGPU Chrome/Edge;
- WebGPU Firefox/Safari where supported;
- WebGL2 fallback;
- device-loss/error path;
- fullscreen;
- resize;
- gamepad connect/disconnect.

### Performance

Representative M0 room captures:

- CPU frame;
- GPU frame;
- simulation cost;
- draw calls;
- active meshes;
- texture-memory estimate;
- GC pauses;
- shader compilation.

### Gameplay feel

Blind tester tasks:

- basic traversal;
- moving anchor;
- Attract/Repel chain;
- target-choice fork;
- recovery.

Collect:

- success;
- retries;
- voluntary replay;
- perceived responsiveness;
- targeting confusion.

## Diagnostics overlay

Engineering HUD displays:

- BuildID;
- backend;
- GPU adapter string where safe;
- browser/runtime;
- FPS;
- CPU frame;
- GPU frame;
- fixed simulation tick;
- simulation steps this render;
- accumulator;
- player position/velocity;
- movement mode;
- grounded state;
- TargetId;
- target score;
- target revision;
- collision count;
- render scale;
- deterministic state hash.

## Replay artifact

A test session can export:

- build/version;
- content fixture version;
- initial seed;
- fixed-step inputs;
- checkpoint hashes;
- key telemetry.

This becomes the basis of M1 desync bug reports.

## Reference hardware

Before M0 signoff define real physical reference devices:

- Tier L;
- Tier M;
- Tier H.

M0 approval is primarily based on Tier M.

Record exact:

- CPU;
- GPU;
- RAM;
- OS;
- driver;
- browser version.

Do not define tiers only as vague “low/mid/high.”

## Hard acceptance

All required:

1. clean install/build works;
2. WebGPU client runs;
3. WebGL2 fallback runs;
4. fixed 60 Hz simulation works;
5. replay is independent of render FPS;
6. deterministic fixture matches across approved runtimes or every divergence is understood;
7. static/moving TargetID selection is stable;
8. Attract feels immediate;
9. Repel launch is predictable;
10. moving-anchor collision is stable;
11. no first-use Resonance shader hitch;
12. Tier M representative room holds agreed 60-fps budget;
13. at least five blind testers complete the M0 course;
14. majority voluntarily replay at least one movement challenge;
15. no Babylon types appear inside simulation public APIs.

## Soft goals

Not hard M0 blockers:

- final art;
- final animation;
- final audio;
- final UI;
- online multiplayer.

Those are later milestones.

## Failure response

### Movement is not fun

Do not add more content.

Tune:

- acceleration;
- target selection;
- Attract profile;
- Repel profile;
- camera;
- input response.

### Graphics are too slow

Reduce:

- shadow cost;
- render scale;
- material complexity;
- particles;
- overdraw;
- distant detail.

Do not change gameplay timing.

### Determinism drifts

Investigate:

- wrong Rapier build;
- construction order;
- math;
- iteration order;
- RNG;
- input normalization.

### Babylon authoring workflow is slow

Test a Blender → glTF + typed manifest pipeline before replacing Babylon runtime.

## M0 decision

Only after the hard acceptance list passes do we start **M1 dedicated four-player netcode**.
