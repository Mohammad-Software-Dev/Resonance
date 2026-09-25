# Browser Performance, Source Control and CI

## Performance targets

### Tier M / Medium desktop

Primary production target.

- 60 fps gameplay;
- 16.67 ms frame budget;
- 60 Hz fixed simulation;
- 1080p-class output with dynamic resolution allowed;
- four-player local scene visibility;
- representative combat/VFX.

### High/Ultra

- higher render resolution;
- higher shadow quality;
- more particles;
- better AO/reflections/post;
- optional >60 fps render.

### WebGL2 fallback

Must remain:

- fully playable;
- visually coherent;
- 60 fps on supported Medium-class target where reasonable.

It may reduce:

- shadows;
- particles;
- post;
- reflection quality;
- resolution.

It may not change:

- collision;
- hazard timing;
- target visibility;
- boss mechanics.

## Frame budget

Target Tier M:

- shared simulation: <2 ms average;
- scene/game presentation update: <2 ms;
- rendering CPU submission: <4 ms;
- GPU: <13 ms target with headroom;
- UI: <1 ms average;
- network processing: <0.5 ms average.

Budgets overlap depending platform but provide ownership targets.

## Dynamic resolution

Use Babylon hardware scaling/render scaling policy.

If GPU frame time exceeds target:

1. lower resolution within allowed range;
2. reduce expensive optional post;
3. reduce noncritical particles;
4. reduce shadow quality;
5. reduce distant detail.

Never slow gameplay simulation to recover renderer frame rate.

## Shader policy

- prefer Babylon PBR/Node Material;
- keep WebGPU and WebGL2 compatibility;
- prewarm critical shader variants before combat;
- cache/precompile where runtime permits;
- do not introduce mid-boss shader compilation hitches.

## Asset memory

Use KTX2 and LODs.

Room/region streaming enforces memory budget.

Large neighboring regions are not kept resident because they might be visited later.

## JS/WASM GC policy

Latency-critical gameplay avoids per-frame allocations.

Rules:

- object pools for hot gameplay objects;
- typed arrays/data-oriented structures where helpful;
- reuse vectors/quaternions in hot loops;
- no React allocation churn from per-frame world state;
- no large JSON stringify/parse in gameplay loop.

## Main thread policy

Version 1 keeps movement simulation on main thread unless profiling proves otherwise.

Offload:

- compression/decompression where supported;
- noncritical analytics batching;
- heavy offline tooling;
- optional asset preprocessing.

Do not add worker synchronization complexity speculatively.

## Source control

Use Git.

Recommended hosting:

- GitHub private organization repository.

Use Git LFS for:

- `.blend`;
- Substance project files;
- large source audio;
- source cinematic assets;
- other non-diffable DCC files.

Do not put generated runtime asset packs into Git when CI/CD artifact storage is more appropriate.

## Monorepo

pnpm workspaces.

One lockfile.

Strict package boundaries.

No duplicate runtime versions of simulation dependencies between client/server.

## CI

GitHub Actions baseline.

Required pipelines:

### Pull request

- TypeScript compile;
- ESLint;
- unit tests;
- simulation deterministic tests;
- server tests;
- content-schema validation;
- web build;
- WebGL smoke test;
- Chromium WebGPU smoke test where runner supports it.

### Main branch

Additionally:

- production web bundle;
- Docker game-server image;
- content manifest;
- asset validation;
- Playwright critical flow;
- save migration corpus;
- protocol compatibility test.

### Nightly

- 4-client synthetic session;
- latency simulation 30/80/150/250 ms;
- packet-loss test;
- deterministic replay suite;
- memory/leak run;
- browser matrix;
- performance capture on dedicated GPU runners.

## Test browsers

At minimum:

- Chrome stable;
- Edge stable;
- Firefox stable;
- Safari stable on macOS.

Electron stable build receives its own regression pass.

## Observability

### Client

Sentry:

- JS exceptions;
- WASM failures;
- GPU/backend info;
- navigation/build version;
- performance breadcrumbs;
- disconnect reason.

### Server

OpenTelemetry-compatible metrics/logs:

- tick duration;
- event-loop delay;
- room count;
- players;
- bytes/sec;
- reconciliation error;
- disconnect/reconnect;
- save latency;
- DB errors.

Sentry may capture server exceptions.

## Release versions

Every deploy has:

- BuildID;
- Git commit;
- content manifest;
- protocol version;
- save schema version.

Client diagnostics screen exposes them.

## Rollout

Web release supports staged rollout:

- internal;
- QA;
- preview;
- production.

Static client assets are immutable by hash.

A rollback changes the active manifest/app pointer rather than mutating cached files.

## Performance acceptance

Do not call a region production-ready until representative worst case passes:

- Tier M Medium;
- 4 players;
- target browser;
- target RTT;
- target VFX;
- no shader/asset hitch during critical encounter.

## Production rule

A visually impressive effect that causes unpredictable frame spikes is not production quality.

Prefer stable 60 fps + strong art direction over unstable “Ultra” rendering.
