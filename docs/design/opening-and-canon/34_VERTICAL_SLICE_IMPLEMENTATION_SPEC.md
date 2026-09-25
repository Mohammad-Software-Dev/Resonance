# Vertical Slice Implementation Specification — Browser First

## Objective

Produce a 45–60 minute representative slice proving:

- browser-first visual quality;
- precision movement;
- solo Echo;
- 1–4 dedicated-server co-op;
- world transformation;
- save correctness;
- production art/audio/UI pipeline.

## Slice route

Wayfarer Scar → early Transit Spine → Gravity Orchard → The Pendulum → first Anchor-state transformation.

## Technical stack

- TypeScript 6.x;
- Babylon.js full engine;
- WebGPU + WebGL2 fallback;
- Rapier 3D WASM;
- Colyseus 0.18;
- Node 24 LTS;
- uWebSockets;
- Vite;
- React UI;
- Supabase/PostgreSQL;
- Cloudflare/R2;
- Electron spike.

## Implementation stages

### Stage 1 — Movement foundation

Deliver Run, Jump, Evade, target acquisition, Attract, Repel, fixed/moving anchors and deterministic 60 Hz simulation.

Exit: movement remains consistent from 30–144 fps render rate.

### Stage 2 — Four-player authority

Deliver dedicated Colyseus room, 4 slots, prediction, reconciliation, interpolation, Link, rescue, reconnect and diagnostics.

Exit: 150 ms session is controllable.

### Stage 3 — Combat/shared state

Deliver attacks, enemy state, projectiles, Health/Fracture/Stability/Heat, authoritative shared object and revive.

Exit: 4P encounter stable under loss/jitter.

### Stage 4 — Echo

Deliver record/playback, stable TargetIDs, co-op-equivalent solo puzzle and boss interaction.

Exit: 100-repeat semantic replay test passes.

### Stage 5 — Content streaming/save

Deliver GLB/KTX2 room packages, prefetch, R2/Cloudflare, service-worker cache, Supabase profile, campaign save and IndexedDB recovery.

Exit: page refresh/reload preserves or reconnects expected state.

### Stage 6 — Opening content

Greybox Wayfarer Scar, early Transit Spine, Gravity Orchard, Convergence Chamber, Alignment Hound, Crown Grazer and Pendulum.

Detailed room files remain authoritative.

### Stage 7 — Production art/audio/UI

Replace representative greybox with shipping-target quality.

Demonstrate PBR, stylized materials, character silhouettes, GPU particles, 4P readability, representative audio and polished HUD/map/settings.

### Stage 8 — Browser/Steam packaging

Deliver Chrome/Edge/Firefox/Safari build, installable PWA, Electron package, gamepad/fullscreen and Steam identity/invite bridge spike.

### Stage 9 — External validation

External testers complete solo, 2P, 3P and 4P without staff guidance.

## Performance gate

Representative Pendulum fight at 4P must hit target on Tier M Medium:

- 60 fps;
- stable 60 Hz simulation;
- no shader compilation hitch;
- no asset streaming hitch;
- no repeated large network correction;
- readable target/Link/hazard state.

## Slice success questions

1. Does it look like a premium game despite running in browser?
2. Does movement feel immediate?
3. Does multiplayer still feel immediate at 150 ms?
4. Does Echo feel intentional?
5. Does browser loading feel fast enough?
6. Do rooms stream without visible interruption?
7. Can the art team produce content efficiently?
8. Does the Electron build feel indistinguishable from the browser game in control response?
9. Can a tester identify Resonance from a short clip?

## Scope rule

If the slice fails performance/quality, cut visual/content excess before weakening movement, Link, Echo, 4P or save correctness.

If browser architecture itself fails measured gates after focused optimization, revisit the engine decision with recorded evidence.
