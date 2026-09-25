# ADR-0001 — Browser-First TypeScript Architecture and Repository Authority

**Status:** Accepted  
**Date:** 2026-09-26

## Context

Resonance was originally designed around a native Unreal Engine implementation, then re-evaluated for browser-first delivery.

The canonical technical architecture is now:

- TypeScript-first monorepo;
- Babylon.js full engine;
- WebGPU primary, WebGL2 fallback;
- Rapier 3D WASM;
- custom deterministic kinematic Wayfarer controller;
- engine-independent shared gameplay simulation;
- Colyseus dedicated authoritative online servers;
- Node.js 24 LTS server runtime;
- uWebSockets/WSS production transport;
- Vite + pnpm;
- React DOM UI;
- Supabase Auth + PostgreSQL;
- Cloudflare static/content delivery;
- Electron + steamworks.js for Steam.

The design corpus previously lived primarily in Google Drive.

## Decision

### 1. This GitHub repository is the canonical implementation workspace

From this ADR onward:

- code changes happen in this repository;
- implementation documentation is maintained in this repository;
- design documents may still be mirrored/exported elsewhere, but GitHub is the working source of truth for development;
- conflicting historical copies outside the repository do not override canonical files here.

### 2. Browser-first remains the implementation baseline

Do not reopen the engine/runtime decision based on familiarity or preference.

The browser-first architecture may only be reconsidered if measured M0/M1/M3 evidence shows an unresolved existential failure in:

- movement/network feel;
- rendering/performance;
- browser compatibility;
- content streaming/memory;
- content-authoring throughput.

### 3. Shared simulation is engine independent

Babylon.js owns presentation, not gameplay authority.

Packages under the shared simulation layer must not depend on:

- Babylon.js;
- React;
- DOM APIs;
- Electron;
- browser-only globals.

This preserves deterministic reuse between:

- local solo authority;
- predicted browser clients;
- dedicated Node game servers;
- replay/testing tools.

### 4. Online co-op uses dedicated authority

The campaign owner is not the network simulation host.

Dedicated servers own online simulation.

Clients predict local movement and reconcile against server authority.

### 5. Repository structure

Canonical layout:

```text
apps/
  web-client/
  game-server/
  desktop/
  ops-tools/

packages/
  simulation/
  movement/
  resonance/
  combat/
  echo/
  physics/
  net-protocol/
  content-schema/
  game-data/
  save-schema/
  ui/
  telemetry/
  test-fixtures/

content/
docs/
infra/
tools/
```

### 6. Documentation precedence

When documents conflict:

1. accepted ADRs;
2. current canonical architecture and M0 files;
3. canonical Iteration 3J production/design files;
4. detailed region production specs;
5. older historical documents.

Use `docs/production-and-canon/109_SUPERSESSION_AND_DEPRECATION_REGISTER.md` for known replacements.

## Consequences

### Positive

- one language across gameplay, server and tools;
- instant browser testing;
- one core client for web and Steam/Electron;
- shared deterministic client/server simulation;
- simpler four-player test distribution;
- fewer engine-license/platform dependencies.

### Costs

- browser GPU/runtime variance must be tested continuously;
- dedicated co-op servers create hosting cost;
- movement prediction/reconciliation must be engineered explicitly;
- content streaming and memory budgets are stricter than native installs;
- Babylon Editor/content workflow must prove sufficient during M0–M5.

## Next implementation step

Follow:

- `docs/technology/m0/119_M0_REPOSITORY_AND_PACKAGE_ARCHITECTURE.md`;
- `docs/technology/m0/120_M0_SIMULATION_TICK_AND_STATE_CONTRACT.md`;
- `docs/technology/m0/121_M0_BABYLON_BOOTSTRAP_RENDERING_SPEC.md`;
- `docs/technology/m0/122_M0_RAPIER_AND_WAYFARER_CONTROLLER_SPEC.md`;
- `docs/technology/m0/123_M0_TARGETID_ATTRACT_REPEL_SPEC.md`;
- `docs/technology/m0/124_M0_TEST_DIAGNOSTICS_AND_ACCEPTANCE.md`;
- `docs/technology/m0/125_M0_IMPLEMENTATION_BACKLOG_AND_SEQUENCE.md`.

The next work should be implementation, not another architecture survey.
