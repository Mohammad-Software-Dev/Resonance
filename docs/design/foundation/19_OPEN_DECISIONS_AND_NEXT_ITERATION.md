# Owner Decisions and Next Phase

**Status:** Browser-first architecture and M0 implementation blueprint are locked.

## Product decisions locked

- Browser-first desktop runtime.
- Steam/Electron build from the same client.
- 2.5D.
- solo + 1–4 online co-op.
- one human per client.
- no couch/split-screen V1.
- named Wayfarers.
- challenging baseline + granular accessibility.
- moderate character-driven story.
- host/campaign owner controls irreversible world choices.
- dedicated server controls online simulation.
- guests retain eligible personal progression.
- gas-giant Meridian setting.

## Technical architecture locked

- TypeScript 7.0.2 strict.
- Babylon.js full engine.
- WebGPU preferred, WebGL2 fallback.
- Rapier 3D deterministic WASM 0.20.0.
- custom deterministic kinematic movement.
- shared client/server simulation packages.
- Colyseus 0.18.x dedicated servers.
- uWebSockets/WSS launch transport.
- Node 24 LTS.
- Colyseus Cloud multi-region.
- Vite + pnpm.
- React DOM UI.
- Supabase Auth + PostgreSQL.
- Cloudflare Workers Static Assets + R2.
- PWA/service worker/IndexedDB.
- GLB + meshopt + KTX2.
- Blender + Babylon Editor.
- Electron + steamworks.js.
- Git/Git LFS + GitHub Actions.
- Sentry + OpenTelemetry-compatible observability.

Do not reopen this stack based on familiarity or preference. Revisit only if measured prototype gates fail after focused optimization.

## Gameplay decisions locked

Foundational toolkit:

Attract, Repel, Link/Echo, Latch, Orbit, Vector Shift, Flux, Phase, Invert.

No new foundational critical-path movement ability after Invert.

## Genuine remaining owner decisions

### Final product title

`Resonance` remains the working title.

Requires trademark/SEO/domain/store-name clearance before public lock.

### Final public names for finale configurations

Current working names:

- Historical Continuity;
- Distributed Meridian;
- Open Resonance;
- Bounded Accord.

Mechanics and costs are locked; naming can still be polished.

### Obsolete Anchor Prototype name

Only required if the optional encounter survives scope.

### Public matchmaking

Invite/private party is the V1 baseline.

Public matchmaking remains an evidence-based later decision.

### Exact optional boss count

Decide after content throughput is known.

### Bounded Accord contingency

Current target: ship it.

If its extra prerequisite/QA load threatens foundational quality, it is the first finale branch eligible for deferral.

## Immediate next phase — M0 code bootstrap

Build the browser technical foundation:

- pnpm monorepo;
- Vite app;
- Babylon WebGPU/WebGL backend selection;
- representative premium PBR test room;
- Rapier world;
- 60 Hz shared simulation;
- custom Wayfarer controller;
- Attract;
- Repel;
- target acquisition;
- moving target;
- deterministic replay;
- gamepad;
- performance diagnostics.

### M0 pass questions

1. Is movement fun in an empty browser room?
2. Does the game hold its target frame rate?
3. Does gameplay remain identical across render FPS?
4. Is WebGPU visual quality strong enough for the product?
5. Is WebGL2 fallback acceptable?
6. Is the Babylon/Blender content workflow productive?

## M1

Build the real online foundation:

- Colyseus authoritative room;
- Node 24;
- uWebSockets/WSS;
- four players;
- local prediction;
- server reconciliation;
- remote interpolation;
- moving-anchor prediction;
- Link;
- rescue;
- multi-region RTT selection;
- browser refresh/reconnect.

### M1 pass questions

1. Is movement still responsive at 150 ms?
2. Are corrections small/infrequent?
3. Does Link feel immediate?
4. Can four players play without architectural special cases?
5. Does the dedicated room have CPU/network headroom?
6. Can refresh/disconnect recover safely?

## After M1

M2:

- combat;
- shared objects;
- durable profile/save;
- CDN preview deployment.

M3:

- Echo;
- content streaming/cache;
- local-solo ↔ co-op handoff;
- Electron/Steam bridge spike.

Then:

M4 opening greybox → M5 production-quality vertical slice.

## Architecture kill criteria

Only reconsider browser-first if prototype evidence demonstrates an unresolved existential failure in:

- networked movement;
- graphics/performance;
- browser compatibility;
- streaming/memory;
- content-authoring throughput.

A feature being easier in a native engine is not, by itself, a reason to switch.


## M0 implementation blueprint now complete

Canonical M0 implementation references:

- `119_M0_REPOSITORY_AND_PACKAGE_ARCHITECTURE.md`
- `120_M0_SIMULATION_TICK_AND_STATE_CONTRACT.md`
- `121_M0_BABYLON_BOOTSTRAP_RENDERING_SPEC.md`
- `122_M0_RAPIER_AND_WAYFARER_CONTROLLER_SPEC.md`
- `123_M0_TARGETID_ATTRACT_REPEL_SPEC.md`
- `124_M0_TEST_DIAGNOSTICS_AND_ACCEPTANCE.md`
- `125_M0_IMPLEMENTATION_BACKLOG_AND_SEQUENCE.md`

The next concrete action is to create the Git repository/monorepo and implement Epics M0.0–M0.3 before movement tuning begins.
