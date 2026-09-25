# Iteration 4A — Browser-First Technical Architecture Decision

**Status:** Canonical architecture lock  
**Research snapshot:** 2026-09-25  
**Supersedes:** Unreal Engine 5.8.x as the primary implementation path in the previous Iteration 3B technical architecture

## Decision summary

Resonance will be built **browser-first** using a TypeScript-first architecture.

Canonical stack:

- **Language:** TypeScript 7.0.2, strict mode;
- **Web runtime:** modern desktop browsers;
- **Rendering / game engine:** Babylon.js 9.27.1 full engine, pinned to a tested patch per milestone;
- **Graphics backend:** WebGPU preferred, WebGL2 fallback;
- **Scene/content editor:** Babylon.js Editor 5.x;
- **Physics/collision:** Rapier 3D deterministic WASM 0.20.0;
- **Player movement:** custom deterministic kinematic Wayfarer controller using Rapier queries/collision resolution;
- **Online game server:** Colyseus 0.18.x;
- **Production network transport:** uWebSockets/WebSocket;
- **Server runtime:** Node.js 24 LTS;
- **Game-server hosting:** Colyseus Cloud multi-region;
- **Web app build:** Vite 8.3.1;
- **Workspace/package management:** pnpm workspaces;
- **HUD/menu UI:** React 19.x DOM overlay; no React work in the per-frame gameplay loop;
- **Identity + durable persistence:** Supabase Auth + PostgreSQL;
- **Web/static delivery:** Cloudflare Workers Static Assets + Cloudflare R2;
- **Browser installability/cache:** PWA + service worker + Cache Storage/IndexedDB;
- **Steam/desktop packaging:** Electron stable channel using the same built web client;
- **Steam integration:** steamworks.js behind a secure Electron main/preload bridge;
- **3D asset format:** glTF 2.0 / GLB;
- **Geometry compression:** EXT_meshopt_compression by default; Draco only where measurements justify it;
- **Texture format:** KTX2/Basis Universal;
- **Source DCC:** Blender;
- **Texture authoring:** Adobe Substance 3D Painter where appropriate;
- **Source control:** Git + Git LFS;
- **CI:** GitHub Actions;
- **Client/server error monitoring:** Sentry;
- **Server/runtime metrics:** OpenTelemetry-compatible metrics/logging.

## Core architecture principle

The rendering engine is **not** the game simulation.

The project is separated into:

1. deterministic/shared gameplay simulation;
2. browser renderer/presentation;
3. authoritative online session server;
4. persistent account/campaign services;
5. content pipeline.

This is the key decision that keeps browser-first viable.

## Why Babylon.js full engine

Babylon.js is selected over Three.js, PlayCanvas, Babylon Lite, Unity Web and Godot Web.

### Reasons

- high-end PBR rendering;
- mature WebGPU implementation;
- WebGL2 fallback;
- Node Material and frame-graph rendering;
- animation, particles, audio and scene graph included;
- broad glTF support;
- strong TypeScript ecosystem;
- open Apache-2.0 license;
- desktop visual editor;
- no engine royalty;
- direct control over browser delivery.

### Why not Babylon Lite

Babylon Lite is attractive for raw browser performance and bundle size, but is WebGPU-only and intentionally narrower.

Resonance prioritizes:

- seamless browser compatibility;
- mature feature coverage;
- predictable fallback;
- lower production risk.

Full Babylon.js therefore remains canonical.

### Why not Three.js

Three.js is an excellent renderer but would require the team to build substantially more engine/editor infrastructure.

The project already has unusual gameplay technology. It should not also become a custom-engine project unnecessarily.

### Why not PlayCanvas

PlayCanvas remains a credible fallback if Babylon.js Editor proves inadequate.

Babylon wins because:

- the rendering/runtime API gives us more direct control;
- the engine has broader built-in systems;
- our architecture does not depend on a hosted editor;
- the shared simulation remains engine-independent.

## Browser target

Version 1 browser support:

- latest two stable major versions of Chrome;
- latest two stable major versions of Edge;
- latest two stable major versions of Firefox;
- latest two stable major versions of Safari on macOS.

Primary gameplay target:

- desktop/laptop browser;
- keyboard/mouse;
- gamepad.

Mobile touch gameplay is **not** a Version 1 target.

## WebGPU policy

WebGPU is the preferred path.

Use it for:

- primary high/ultra quality rendering;
- modern shader path;
- GPU-heavy particles/effects where cross-backend equivalents exist.

However:

> No critical gameplay behavior may depend on WebGPU-only functionality.

If WebGPU initialization fails:

- automatically create WebGL2 backend;
- select compatible graphics preset;
- preserve identical collision, timing and gameplay state.

## Rendering target

Baseline:

- 60 fps gameplay;
- fixed 60 Hz gameplay simulation.

Optional:

- 90/120/144 fps rendering on capable displays;
- simulation stays fixed-step.

Quality tiers:

- Low;
- Medium;
- High;
- Ultra.

Dynamic resolution may reduce render resolution before gameplay logic is degraded.

## Online authority

Co-op uses a **dedicated authoritative server**.

The browser is never the authoritative host for a multiplayer session.

Reason:

- browsers can throttle/background tabs;
- client code is inspectable/modifiable;
- dedicated authority simplifies migration between browser and Electron;
- server region can be chosen for all party members.

## Solo authority

Solo uses the same shared simulation locally.

This permits:

- zero network latency for movement;
- optional offline-capable solo after content is cached;
- deterministic Echo;
- identical gameplay rules.

Joining co-op occurs through a Relay/safe transition:

1. durable campaign snapshot validated;
2. dedicated room allocated;
3. authoritative server loads snapshot;
4. local authority hands over;
5. guests join.

Returning to solo occurs at a safe checkpoint.

## No-zero-bug promise

No architecture can guarantee zero bugs, zero latency or zero frame drops.

The production objective is instead:

- remove preventable sources of nondeterminism;
- keep gameplay authority simple;
- minimize network distance;
- use client prediction;
- keep renderer independent from simulation;
- set hard budgets;
- automate state/replay tests;
- provide graceful fallbacks.

## Monorepo

Recommended root:

```text
/apps
  /web-client
  /game-server
  /desktop
  /ops-tools

/packages
  /simulation
  /movement
  /resonance
  /combat
  /echo
  /net-protocol
  /content-schema
  /save-schema
  /game-data
  /ui
  /telemetry
  /test-fixtures
```

Rules:

- `simulation` cannot import Babylon, React, DOM, Electron or Colyseus client UI code;
- server and client import the same gameplay functions;
- presentation never becomes authoritative;
- persistent IDs are semantic and engine-independent.

## Dependency rule

The browser engine may be replaceable without rewriting the authoritative gameplay model.

Babylon-specific code lives in presentation/adapters.

This reduces long-term engine lock-in.

## Version policy

At the start of each milestone:

- freeze Babylon patch;
- freeze Rapier version;
- freeze Colyseus patch;
- freeze Node LTS patch;
- freeze Electron stable patch;
- commit lockfile;
- upgrade only for a measured blocker, security issue or platform requirement.

Do not chase weekly engine releases mid-milestone.

## Architecture acceptance

Architecture remains locked if M0/M1 proves:

- 60 fps at target browser preset;
- Attract/Repel movement feels excellent;
- 4-player authoritative session is responsive at 150 ms RTT;
- moving anchors reconcile cleanly;
- Link remains understandable under latency;
- browser reload/reconnect is recoverable;
- WebGL2 fallback remains visually acceptable;
- asset streaming does not stall gameplay.

If one fails, simplify the failing subsystem before abandoning browser-first.
