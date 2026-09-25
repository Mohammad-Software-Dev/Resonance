# M0 Repository and Package Architecture

**Status:** Implementation-ready M0 blueprint  
**Purpose:** Define the monorepo, package boundaries, dependency rules, pinned kickoff versions, scripts and ownership before code begins.

## Kickoff toolchain pins

Pin exact versions for the M0 milestone, then upgrade only between milestones unless a security/blocker issue requires otherwise.

Initial M0 pins:

- Node.js: **24.21.x LTS**
- TypeScript: **7.0.2**
- Babylon.js core packages: **9.27.1**
- Rapier deterministic build: **0.20.0**
- Vite: **8.3.1**
- React / React DOM: **19.3.0**
- pnpm: **12.6.x**
- Colyseus: **0.18.x** for M1 onward

Do not use `latest` ranges in production package manifests.

## Rapier package choice

Canonical gameplay physics package:

`@dimforge/rapier3d-deterministic`

For environments/bundlers where direct WASM loading becomes problematic, use:

`@dimforge/rapier3d-deterministic-compat`

Do not silently swap to the standard or SIMD build because M0/M1 prediction tests depend on cross-platform deterministic behavior.

## Monorepo

```text
resonance/
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
    manifests/
    schemas/
    source-meta/

  tools/
    asset-pipeline/
    validation/
    replay-cli/
    perf-cli/

  infra/
    docker/
    cloudflare/
    colyseus/
    github/

  docs/
    adr/

  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
  eslint.config.js
  prettier.config.js
  vitest.workspace.ts
```

## Application responsibilities

### `apps/web-client`

May import simulation-facing packages, Babylon adapters, React UI and browser platform services.

Must not contain authoritative gameplay formulas that do not also exist in shared packages.

### `apps/game-server`

M1+.

May import shared simulation, physics, Colyseus adapters and persistence adapters.

Must not import Babylon, React, DOM or Electron.

### `apps/desktop`

Electron shell only.

Responsibilities:

- create secure BrowserWindow;
- load built web-client;
- Steam main-process integration;
- deep links/invites;
- approved platform hooks.

No separate gameplay implementation.

### `apps/ops-tools`

Internal dashboards and safe operations tooling.

No critical game runtime dependency.

## Shared package responsibilities

### `packages/simulation`

Owns fixed-tick orchestration, entity state, deterministic tick order, command dispatch, simulation events and snapshot/hash interfaces.

### `packages/movement`

Owns Wayfarer locomotion, jump/air control, evade, grounding, coyote/buffer logic and external field application.

### `packages/resonance`

Owns TargetID, target eligibility, target scoring data, Attract, Repel and relationship-model foundations.

M0 implements only Attract/Repel plus target foundations.

### `packages/physics`

Owns Rapier initialization, collider/entity mapping, deterministic construction order, shape/raycast facade, character collision adapter and snapshot/debug hash.

### `packages/net-protocol`

M1+.

Owns input wire schema, snapshot schema, protocol version, sequence/tick types and serialization-safe enums.

### `packages/game-data`

Owns movement/Resonance tuning and deterministic-friendly gameplay data.

### `packages/content-schema`

Owns RoomID, TargetID authoring format, spawns and validation schemas.

### `packages/save-schema`

Owns profile/campaign schema types, versions and migrations.

### `packages/ui`

Reusable React UI/view models.

No simulation authority.

## Dependency invariant

> Rendering/platform code depends on gameplay; gameplay never depends on rendering/platform code.

Babylon, React, DOM, Electron and Colyseus client presentation types must not leak into simulation package public APIs.

## TypeScript configuration

Baseline:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "useUnknownInCatchVariables": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true
  }
}
```

## Runtime rules

Hot simulation code:

- minimize per-tick allocations;
- stable array/entity ordering;
- no wall clock for gameplay;
- no unseeded `Math.random()`;
- no render-frame delta as gameplay time;
- avoid platform-sensitive math in prediction-critical branches where deterministic alternatives are practical.

## IDs

Use branded types rather than naked primitives in domain APIs.

```ts
type Tick = number & { readonly __brand: "Tick" };
type EntityId = number & { readonly __brand: "EntityId" };
type TargetId = number & { readonly __brand: "TargetId" };
type RoomId = string & { readonly __brand: "RoomId" };
type Revision = number & { readonly __brand: "Revision" };
```

Persistent/editor IDs may be strings/GUIDs; runtime hot-path IDs should be compact integers.

## Testing stack

Recommended:

- Vitest;
- Playwright;
- deterministic replay CLI;
- browser GPU smoke tests;
- M1 server integration tests.

## Root scripts

```text
pnpm dev:web
pnpm dev:server
pnpm dev:desktop
pnpm test
pnpm test:determinism
pnpm test:browser
pnpm lint
pnpm typecheck
pnpm build
pnpm build:content
pnpm validate:content
pnpm replay
pnpm perf
```

## Initial ADRs

- ADR-001 Browser-first/Babylon.
- ADR-002 Dedicated authority for co-op.
- ADR-003 Shared deterministic simulation.
- ADR-004 Deterministic Rapier build.
- ADR-005 Fixed 60 Hz simulation.
- ADR-006 WebGPU with WebGL2 fallback.
- ADR-007 Engine-independent stable IDs.

## M0 repository exit

Repository is ready for gameplay code when:

- clean install succeeds on Windows/macOS/Linux dev environments;
- root typecheck/test/build works;
- web-client boots;
- deterministic Rapier package loads in browser and Node;
- package dependency rules have no cycles;
- CI executes the same commands as local development.
