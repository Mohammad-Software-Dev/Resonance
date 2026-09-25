# M0 Implementation Backlog and Execution Sequence

**Status:** Ready for engineering ticket breakdown  
**Purpose:** Order M0 so architecture risk is retired before polish.

## Epic M0.0 — Repository

Tasks:

- initialize Git repository;
- pnpm workspace;
- Node 24 toolchain;
- TypeScript 7 strict config;
- ESLint/Prettier;
- Vitest;
- CI;
- package-boundary checks;
- build/version module.

Exit:

`pnpm install && pnpm typecheck && pnpm test && pnpm build` passes cleanly.

## Epic M0.1 — Browser bootstrap

Tasks:

- Vite client;
- canvas shell;
- backend detector;
- Babylon WebGPU engine;
- WebGL2 fallback;
- resize/fullscreen;
- diagnostics overlay;
- basic React overlay.

Exit:

same representative scene boots through both backends.

## Epic M0.2 — Deterministic physics bootstrap

Tasks:

- deterministic Rapier package;
- world factory;
- stable collider construction;
- room fixture;
- physics snapshot/hash helper;
- Node/browser identical fixture.

Exit:

physics baseline deterministic test passes.

## Epic M0.3 — Fixed-step simulation

Tasks:

- Tick type;
- accumulator;
- one-input-per-tick capture;
- simulation state;
- snapshot/restore;
- canonical hash;
- render interpolation.

Exit:

same recorded input at 30–144 render fps yields the same simulation result.

## Epic M0.4 — Wayfarer controller

Tasks:

- capsule;
- gameplay-plane constraint;
- locomotion;
- grounding;
- slopes;
- jump;
- coyote;
- input buffer;
- evade;
- moving-platform frame;
- recovery.

Exit:

movement course is playable without Resonance.

## Epic M0.5 — Target system

Tasks:

- authored persistent target GUID;
- runtime TargetId registry;
- spatial candidates;
- hard filters;
- score;
- hysteresis;
- target debug overlay;
- gamepad and keyboard/mouse tests.

Exit:

target does not flicker in the target-choice fixture beyond approved thresholds.

## Epic M0.6 — Attract

Tasks:

- Attract movement state;
- acceleration profile;
- max speed;
- steering;
- moving target;
- collision handling;
- arrival/release experiments;
- semantic event hooks.

Exit:

static and moving pull routes are predictable and enjoyable.

## Epic M0.7 — Repel

Tasks:

- target-relative impulse;
- momentum preservation;
- speed cap;
- recovery state;
- Attract → Repel combo;
- wall/ground use tests.

Exit:

launch is repeatable and controllable.

## Epic M0.8 — Representative graphics room

Tasks:

- industrial/orbital environment;
- PBR;
- IBL;
- shadowed key light;
- fog/depth;
- Resonance Node Material;
- particles;
- gas-giant vista;
- production-like proxy silhouette;
- graphics presets.

Exit:

room is representative enough to make a browser visual-quality decision.

## Epic M0.9 — Performance pass

Tasks:

- shader warmup;
- allocation profiling;
- texture/mesh budget;
- draw-call audit;
- dynamic resolution;
- WebGL2 tuning;
- device-loss/error path.

Exit:

Tier M 60-fps target passes the representative course.

## Epic M0.10 — Replay/test harness

Tasks:

- record fixed-step inputs;
- export replay fixture;
- replay CLI;
- checkpoint hashes;
- divergence report;
- Playwright browser runner;
- render-FPS test matrix.

Exit:

deterministic regression runs in CI.

## Epic M0.11 — Blind movement test

Tasks:

- minimal tutorial prompts;
- tester URL;
- at least five blind testers;
- telemetry export;
- movement/targeting questionnaire;
- tuning pass.

Exit:

M0 hard acceptance criteria complete.

## Priority rule

Do **not** begin substantial M0.8 art polish before M0.3–M0.7 are credible.

Do **not** start M1 network production before:

- fixed-step input;
- snapshot/restore;
- stable TargetID;
- deterministic movement;
- Attract/Repel semantics

are established.

## M0 signoff deliverable

A URL opens directly into a premium-looking 2.5D test environment where the player can:

- run;
- jump;
- evade;
- select anchors;
- Attract;
- Repel;
- combine movement with a moving anchor;

with:

- WebGPU primary path;
- WebGL2 fallback;
- controller support;
- deterministic replay;
- performance diagnostics.

Multiplayer is not required for M0 signoff.

M1 begins immediately after M0 passes.
