# Iteration 4A — Browser-First Architecture Lock

**Status:** Canonical technical architecture locked  
**Date:** 2026-09-25

## Decision

Resonance moves from Unreal-native architecture to a browser-first TypeScript architecture.

## Canonical stack

| Layer | Choice |
|---|---|
| Language | TypeScript 7.0.2 strict |
| Rendering/game engine | Babylon.js 9.27.1 full engine |
| Graphics backend | WebGPU preferred, WebGL2 fallback |
| Visual scene authoring | Babylon.js Editor + Blender |
| Physics/collision | Rapier 3D deterministic WASM 0.20.0 |
| Player movement | custom deterministic kinematic controller |
| Online framework | Colyseus 0.18.x |
| Online authority | dedicated authoritative server |
| Launch transport | WSS via uWebSockets.js |
| Server runtime | Node.js 24 LTS |
| Server hosting | Colyseus Cloud multi-region |
| Web build | Vite 8.3.1 |
| Workspace | pnpm |
| UI | React 19.x DOM overlay |
| Auth | Supabase Auth |
| Durable data | PostgreSQL / Supabase |
| Static/CDN | Cloudflare Workers Static Assets + R2 |
| Browser cache | Service Worker + Cache Storage + IndexedDB |
| 3D runtime format | glTF 2.0 / GLB |
| Geometry compression | meshopt |
| Textures | KTX2/Basis Universal |
| Desktop/Steam | Electron stable + steamworks.js |
| Source control | Git + Git LFS |
| CI | GitHub Actions |
| Errors/telemetry | Sentry + OpenTelemetry-compatible metrics |

## Architectural rules

1. Gameplay simulation is independent from Babylon.
2. Client and server share the same TypeScript simulation packages.
3. Solo runs local authority for zero network latency.
4. Co-op runs dedicated regional server authority.
5. Campaign ownership remains with the host/player even though their machine is not the game server.
6. Gameplay sim is fixed 60 Hz.
7. Browser renderer may run above 60 fps.
8. WebGPU is preferred but no gameplay mechanic depends on it.
9. WebGL2 is a first-class fallback with reduced graphics quality.
10. Critical movement/boss machinery use authored deterministic motion, not uncontrolled rigid-body physics.
11. Browser client is untrusted during co-op.
12. Assets stream by room/region rather than requiring full-game initial download.
13. Browser and Electron use the same content, simulation and online servers.

## Why Babylon full

Babylon full is selected because Resonance needs premium rendering plus compatibility.

Babylon Lite is not selected because its WebGPU-only/narrower scope conflicts with seamless browser fallback.

Three.js is not selected because it would require significantly more custom game/editor infrastructure.

PlayCanvas remains a contingency option only if Babylon Editor/content throughput fails measured production tests.

## Why Rapier

Rapier provides fast WASM physics/collision and documented deterministic behavior under controlled inputs/order.

The player is still a custom kinematic controller.

Rapier is a substrate, not the source of game feel.

## Why dedicated multiplayer

A browser tab is not used as the co-op simulation server.

Dedicated regional authority provides:

- more predictable host quality;
- protection from browser background throttling;
- easier reconnect;
- cleaner anti-cheat/save authority;
- browser/Steam parity;
- party-optimal region placement.

## Why WebSocket launch transport

uWebSockets/WSS is mature and broadly compatible.

WebTransport is intentionally deferred until Colyseus support and browser behavior are sufficiently battle-tested and profiling shows a meaningful benefit.

## Graphics philosophy

Browser-first does not mean low-end art.

Target:

- premium stylized PBR;
- IBL;
- strong lighting composition;
- Node Materials;
- selective GPU particles;
- strict shadows/post budgets;
- KTX2;
- LOD/HLOD;
- instancing;
- dynamic resolution.

The goal is stable premium-looking 60 fps, not maximum theoretical GPU feature use.

## Superseded architecture

No longer canonical:

- Unreal Engine 5.8;
- C++/Blueprint foundation;
- UCharacterMovementComponent;
- Iris;
- peer/listen-server simulation;
- Steam Online Subsystem as the network foundation;
- Perforce/UGS/Horde.

Old documents remain historical context.

## Immediate next phase

M0/M1 implementation prototype:

M0:

- Babylon render foundation;
- Rapier collision;
- shared fixed-step simulation;
- Attract/Repel;
- representative premium test room.

M1:

- dedicated Colyseus 4P server;
- prediction/reconciliation;
- moving anchors;
- Link/rescue;
- multi-region selection;
- refresh/reconnect;
- 150 ms acceptance test.

## Lock rule

Do not reopen engine choice based on preference or familiarity.

Only revisit browser-first if measured M0/M1/M3 evidence shows an existential failure in:

- movement/network feel;
- target graphics/performance;
- browser compatibility;
- streaming/memory;
- content-authoring throughput.
