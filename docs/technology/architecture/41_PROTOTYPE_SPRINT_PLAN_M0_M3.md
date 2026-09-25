# Browser-First Prototype Plan — M0 to M3

**Purpose:** Prove browser-first Resonance before scaling content.

# M0 — Browser controller and rendering foundation

## Repository

Create pnpm monorepo:

- web-client;
- game-server;
- shared simulation packages;
- tests;
- desktop placeholder.

Pin:

- Node 24 LTS;
- TypeScript 7.0.2;
- Babylon.js 9.27.1;
- Rapier;
- Vite 8.3.1;
- React 19.x;
- Colyseus 0.18.x.

## M0 rendering

Build:

- Babylon WebGPU path;
- automatic WebGL2 fallback;
- 2.5D camera;
- basic PBR test room;
- one moving light/shadow setup;
- GPU/backend diagnostics.

## M0 movement

Build shared deterministic simulation:

- Run;
- Jump;
- Evade;
- Attract;
- Repel;
- fixed target;
- moving target;
- collision proxy;
- target scoring.

## M0 tests

- 60 Hz fixed step;
- variable render 30–144 fps;
- Chrome/Edge/Firefox/Safari smoke;
- controller/Gamepad;
- WebGPU vs WebGL gameplay parity;
- deterministic 10k-tick replay.

## M0 gate

Pass when:

- movement is fun in grey room;
- WebGPU 60 fps Tier M;
- WebGL fallback functional;
- no visual-frame-rate effect on gameplay.

# M1 — Dedicated authoritative 4P networking

## Server

Build:

- Colyseus authoritative room;
- Node 24;
- uWebSockets transport;
- 60 Hz server sim;
- shared movement code;
- input sequence/reconciliation.

## Client

Build:

- client prediction;
- authoritative reconciliation;
- remote interpolation;
- latency graph;
- correction diagnostics.

## Four players

From first network milestone:

- 4 client slots;
- reconnect;
- join snapshot;
- party identity;
- no 2P-only code.

## Link

Add:

- target teammate;
- consent/arming;
- Link state;
- rescue catch;
- basic force transfer;
- disconnect cleanup.

## M1 network matrix

Test:

- 0 ms;
- 30 ms;
- 80 ms;
- 150 ms;
- 250 ms;
- packet loss;
- jitter.

## M1 gate

At 150 ms:

- local player feels immediate;
- moving anchor remains predictable;
- Link/rescue understandable;
- corrections small;
- 4P room stable.

# M2 — Combat, shared objects, persistence

## Combat

Add:

- basic attack;
- Health;
- Fracture;
- Stability;
- Heat;
- projectile;
- armor/component.

## Shared object authority

Add:

- Interaction Token;
- one throwable component;
- authoritative pickup/throw;
- predicted presentation.

## Persistence

Add:

- Supabase dev project;
- guest/login identity;
- campaign profile;
- local IndexedDB recovery;
- co-op server save;
- idempotent reward.

## Deployment

Add:

- Cloudflare preview build;
- R2 sample content bundle;
- Colyseus Cloud test regions.

## M2 gate

- shared object cannot duplicate/desync;
- save survives refresh;
- co-op checkpoint durable;
- browser preview playable from URL.

# M3 — Echo and browser production proof

## Echo

Build:

- record;
- playback;
- stable TargetID;
- simultaneous mechanism;
- movement interaction;
- invalidation/re-record.

## Solo/co-op authority transition

At Relay:

- local solo snapshot;
- allocate remote room;
- server loads snapshot;
- handoff;
- guests join.

Return to solo only at supported checkpoint.

## Asset streaming

Add:

- GLB room package;
- KTX2 texture;
- meshopt;
- manifest;
- next-room prefetch;
- service-worker cache.

## Steam shell spike

Package same client in Electron.

Validate:

- WebGPU;
- controller;
- fullscreen;
- Steamworks placeholder/bridge;
- save/account linking approach.

## M3 gate

- Echo reliable;
- opening room streams without hitch;
- browser refresh/reconnect works;
- Electron and browser use same simulation/build assets;
- team can confidently proceed to M4 opening greybox.

# Prototype rejection criteria

Do not continue browser-first blindly if after focused iteration:

- 150 ms prediction remains visibly unstable;
- required visual target cannot hold 60 fps on Tier M;
- WebGL fallback becomes unmaintainable;
- Babylon asset/editor workflow blocks content throughput;
- browser memory/streaming cannot support representative region.

If a gate fails, first simplify:

- visual cost;
- simulation dependency;
- shared rigid-body use;
- asset residency.

Only reconsider engine after measured evidence.
