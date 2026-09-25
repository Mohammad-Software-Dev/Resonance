# Resonance

**Resonance** is a browser-first 2.5D precision action-exploration Metroidvania designed for solo and **1–4 player online co-op**.

This repository is the canonical home for the game design, technical architecture, production specifications, and implementation.

## Current implementation architecture

- **TypeScript-first monorepo**
- **Babylon.js** full engine
- **WebGPU** primary, **WebGL2** fallback
- **Rapier 3D deterministic WASM**
- custom kinematic Wayfarer controller
- shared engine-independent client/server simulation
- **Colyseus** dedicated authoritative co-op servers
- Node.js server runtime
- browser-first client
- same web client packaged through Electron for Steam

## Start here

1. [Documentation index](docs/00_INDEX.md)
2. [Canonical campaign flow](docs/production-and-canon/108_CANONICAL_CAMPAIGN_FLOW.md)
3. [Browser-first architecture lock](docs/technology/architecture/118_ITERATION_4A_BROWSER_FIRST_ARCHITECTURE_LOCK.md)
4. [M0 repository/package architecture](docs/technology/m0/119_M0_REPOSITORY_AND_PACKAGE_ARCHITECTURE.md)
5. [M0 implementation backlog and sequence](docs/technology/m0/125_M0_IMPLEMENTATION_BACKLOG_AND_SEQUENCE.md)

## Repository layout

```text
apps/
  web-client/       Babylon browser client
  game-server/      Dedicated authoritative Colyseus server
  desktop/          Electron / Steam shell
  ops-tools/        Internal operations tooling

packages/
  simulation/       Fixed-tick deterministic simulation
  movement/         Wayfarer movement
  resonance/        Targeting, Attract, Repel, relationships
  combat/           Combat
  echo/             Solo Echo
  physics/          Rapier abstraction
  net-protocol/     Network schemas
  content-schema/   Room/content schemas
  game-data/        Deterministic tuning data
  save-schema/      Save/profile schemas and migrations
  ui/               Reusable React UI/view models
  telemetry/        Diagnostics/telemetry contracts
  test-fixtures/    Deterministic test/replay fixtures

content/            Runtime manifests, schemas and source metadata
tools/              Asset, validation, replay and performance tools
infra/              Docker, Cloudflare, Colyseus and GitHub infrastructure
docs/               Canonical design/tech/production documentation
```

## Documentation authority

When documents conflict, follow:

[109_SUPERSESSION_AND_DEPRECATION_REGISTER.md](docs/production-and-canon/109_SUPERSESSION_AND_DEPRECATION_REGISTER.md)

The old Drive duplicate archive is preserved under:

`docs/archive/superseded-duplicates/`

It is historical only and is **not implementation authority**.

## Current development phase

The project is entering **M0 browser technical implementation**.

M0 proves:

- premium browser rendering;
- fixed-step deterministic simulation;
- Rapier collision;
- Wayfarer controller;
- TargetID;
- Attract;
- Repel;
- moving targets;
- deterministic replay;
- diagnostics/performance baseline.

M1 then proves dedicated **4-player** prediction/reconciliation and Link at the 150 ms target.

Do not scale production content before the engineering proof gates pass.
