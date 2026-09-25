# M0 Babylon Bootstrap and Rendering Specification

**Status:** Canonical M0 presentation spec  
**Purpose:** Define how the browser client boots Babylon, selects a backend, runs the fixed simulation and presents a premium 2.5D test room.

## Backend selection

Startup order:

1. collect platform/GPU diagnostics;
2. attempt Babylon `WebGPUEngine`;
3. initialize WebGPU;
4. if unsupported or initialization fails, create the WebGL engine;
5. create scene only after backend selection;
6. choose a graphics preset compatible with the backend.

No scene or GPU resource should be created before backend selection.

## Engine adapter

```ts
export interface RenderRuntime {
  backend: "webgpu" | "webgl2";
  start(): void;
  stop(): void;
  resize(): void;
  dispose(): void;
}
```

Simulation packages never receive this interface.

## Client frame loop

Conceptual flow:

```ts
engine.runRenderLoop(() => {
  frameClock.update(performance.now());

  input.sampleDevices();

  for (const step of fixedStepClock.consumeSteps()) {
    const simInput = input.buildFixedStepInput(step.tick);
    simulation.step(new Map([[localPlayerId, simInput]]));
  }

  presentation.sync(
    simulation.previousState,
    simulation.currentState,
    fixedStepClock.alpha
  );

  camera.update();
  scene.render();
});
```

Do not call the simulation with raw render delta.

## M0 representative room

Build one visually representative test room, not only a white box.

Required:

- 2.5D industrial/orbital environment;
- PBR materials;
- image-based/environment lighting;
- one primary shadowed light;
- emissive machinery;
- fog/depth atmosphere;
- one stylized Resonance Node Material;
- representative particles;
- moving anchor;
- placeholder gas-giant vista;
- simple character proxy with production-like silhouette.

This is not final art. It exists to test realistic browser rendering cost.

## 2.5D camera test

M0 compares:

A. perspective camera with narrow FOV;  
B. orthographic camera with authored depth/parallax.

Lock one only after movement and art-direction testing.

Camera rules:

- gameplay plane remains readable;
- target visibility has priority;
- no camera rotation that changes gameplay interpretation;
- background depth may be cinematic without changing collision.

## Graphics presets

### Medium

Primary production target.

- stable 60 fps on Tier M;
- conservative shadows;
- limited expensive post;
- moderate particles;
- dynamic resolution allowed.

### High

- better shadow quality;
- more particles;
- higher render scale;
- stronger reflections/AO if measured safe.

### Ultra

Optional high-cost presentation features.

Never required for the canonical look or gameplay readability.

### WebGL2 fallback

Use a compatible Medium/Low path.

It may reduce:

- shadow quality;
- particles;
- reflections;
- AO/post effects;
- render scale.

It may not change collision, timings, targets or boss mechanics.

## Dynamic resolution

Degradation order:

1. render scale;
2. noncritical post;
3. decorative particle density;
4. shadow resolution/cost;
5. distant detail.

Use hysteresis so the render scale does not oscillate every frame.

## Material policy

Prefer:

- Babylon PBR;
- Node Material where it materially creates visual identity;
- shared material instances;
- compressed textures.

Track:

- material count;
- draw calls;
- shader variants;
- texture memory.

## Shader warmup

Before the player gains control:

- compile critical room materials;
- warm character/anchor materials;
- warm Attract/Repel VFX variants.

There should be no first-use hitch when Resonance is triggered.

## Engineering overlay

Toggleable HUD shows:

- backend;
- FPS;
- frame time;
- GPU time when available;
- simulation tick;
- simulation steps this frame;
- render scale;
- draw calls;
- active meshes;
- target ID;
- player position/velocity;
- deterministic state hash;
- build ID.

## WebGPU failure behavior

If WebGPU initialization/device creation fails:

- record diagnostics;
- offer/reload into WebGL2 safe path;
- never leave the user on a blank canvas.

## Hidden-tab behavior

Solo:

- pause simulation cleanly;
- resume without an accumulator explosion.

M1 co-op:

- dedicated server continues;
- client reconnect/resync rules take over.

## M0 rendering acceptance

- WebGPU presentation is strong enough for a premium commercial game;
- Medium holds target performance on Tier M;
- WebGL2 remains fully playable and coherent;
- first Attract/Repel use causes no shader hitch;
- gameplay state is identical across rendering backends;
- fullscreen, resize and gamepad changes do not corrupt input or canvas state.
