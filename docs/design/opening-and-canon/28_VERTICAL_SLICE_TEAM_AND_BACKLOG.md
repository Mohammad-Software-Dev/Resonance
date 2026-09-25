# Vertical Slice Team and Backlog — Browser-First Production

## Team assumption

For the current target—browser-first 2.5D, named cast, challenging combat, full solo + 1–4 online co-op, PC/desktop focus—the recommended full-production core remains approximately **10–14 people**, plus contractors and expanded QA.

Browser-first changes the engineering mix more than the total creative workload.

## Core team shape

### Leadership / design

1. Creative/Game Director + Lead Systems Designer.
2. Producer / Project Manager.
3. World/Level Designer.
4. Combat/Boss/Systems Designer.
5. Narrative/Quest Designer or hybrid role as production grows.

### Engineering

6. Gameplay/Simulation Engineer.
7. Network/Backend Engineer.
8. Rendering/Tools/Performance Engineer.
9. UI/Platform Engineer recommended before production scale.

### Art

10. Art Director / Environment Artist.
11. Character Artist / Animator.
12. Technical Artist / VFX.
13. Additional Environment/Prop Artist or Animator as content volume grows.

### UX/audio

14. UI/UX specialist or hybrid artist-designer.

Audio/composer may remain external with close integration.

## Browser-specific engineering skills

At least one senior engineer must be comfortable with:

- TypeScript;
- real-time fixed-step simulation;
- WebGPU/WebGL;
- WASM;
- network prediction/reconciliation;
- browser profiling;
- asset streaming/cache;
- Node production services.

The project cannot be staffed as a normal web-app team.

## Vertical slice scope

Target:

**45–60 polished minutes.**

Content:

- Wayfarer Scar;
- early Transit Spine;
- Gravity Orchard;
- all four Wayfarers;
- solo Echo;
- 1–4 online;
- Attract/Repel/Link/Latch/Orbit subset;
- four standard enemies;
- one elite;
- two NPCs;
- map + Relay;
- one Core + selected Modules;
- one world transformation;
- The Pendulum;
- one Convergence Chamber.

## Foundation backlog

### Repository / build

- pnpm monorepo;
- TypeScript strict;
- Vite web client;
- Node server;
- Babylon.js client;
- Rapier shared simulation;
- Colyseus;
- Docker server image;
- Git LFS;
- GitHub Actions.

### Rendering

- WebGPU initialization;
- WebGL2 fallback;
- PBR pipeline;
- 2.5D camera;
- dynamic resolution;
- shader prewarm;
- GPU diagnostics;
- graphics presets.

### Movement

- custom kinematic controller;
- jump/coyote/buffer;
- evade;
- target acquisition;
- Attract;
- Repel;
- moving anchors;
- Latch;
- Orbit;
- local gravity frame.

### Multiplayer

- Colyseus room;
- uWebSockets;
- four-player room;
- local prediction;
- reconciliation;
- remote interpolation;
- region ping selection;
- join/reconnect;
- browser refresh recovery.

### Link

- teammate target;
- consent;
- rescue;
- force transfer;
- Link state replication;
- disconnect cleanup.

### Combat

- attacks;
- Health/Fracture/Stability/Heat;
- hit validation;
- armor/component states;
- projectile reflection;
- down/revive.

### Shared objects

- Interaction Token;
- authoritative object manipulation;
- predictive presentation;
- reset/recovery.

### Echo

- semantic recording;
- stable TargetID;
- playback;
- invalidation;
- solo puzzle;
- boss contribution.

### Persistence

- Supabase Auth;
- Postgres campaign/profile;
- IndexedDB local recovery;
- idempotent guest reward;
- session license;
- save migration.

### Content pipeline

- Blender source;
- Babylon Editor scene;
- GLB export;
- meshopt;
- KTX2;
- content manifest;
- room streaming;
- service-worker cache;
- Cloudflare/R2 preview deploy.

### Steam shell

- Electron stable;
- fullscreen/gamepad;
- WebGPU;
- secure preload bridge;
- steamworks.js spike.

## Tools backlog

- room manifest inspector;
- stable-ID validator;
- world-state variant editor/validator;
- encounter definition tool;
- save inspector;
- network diagnostics overlay;
- target debug overlay;
- latency simulator;
- performance HUD;
- asset budget report;
- content manifest generator.

## QA matrix

Every slice milestone includes:

- solo;
- 2P;
- 3P;
- 4P;
- Chrome;
- Edge;
- Firefox;
- Safari/macOS;
- Electron;
- WebGPU;
- WebGL2 fallback;
- 30/80/150/250 ms network presets.

## Slice exit

External testers can open a URL, create/join a party, complete the slice solo or 1–4 online, reconnect after refresh, reach Pendulum, make the first world-state choice, and reload the exact transformed state without staff intervention.
