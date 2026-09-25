# Production Milestone Roadmap — Browser First

**Status:** Iteration 4A canonical production sequence  
**Principle:** progress by proof gates, not dates.

## M0 — Rendering + Controller + Attract/Repel

Prove:

- Babylon WebGPU and WebGL2 fallback;
- 2.5D camera/plane;
- Rapier collision;
- 60 Hz shared simulation;
- Attract/Repel;
- fixed/moving target;
- controller/gamepad;
- deterministic replay.

Exit:

- empty-room movement is enjoyable;
- 60 fps Tier M target is credible;
- gameplay does not vary with render FPS;
- WebGL fallback works.

## M1 — Dedicated 4P Network + Link

Prove:

- Colyseus 0.18 room;
- Node 24;
- uWebSockets/WSS;
- 4 clients from first accepted session layer;
- prediction/reconciliation;
- moving anchor;
- Link/rescue;
- multi-region ping selection;
- refresh/reconnect.

Exit at 150 ms:

- movement remains responsive;
- Link understandable;
- correction small/infrequent;
- server tick has headroom.

## M2 — Combat + Shared Objects + Durable Save

Prove:

- attacks/resources;
- projectile/armor;
- Interaction Token;
- authoritative shared object;
- Supabase/Postgres profile/campaign;
- idempotent guest rewards;
- IndexedDB recovery;
- Cloudflare/R2 deployment.

## M3 — Echo + Streaming + Electron Spike

Prove:

- deterministic Echo;
- GLB/KTX2 room packages;
- next-room prefetch;
- service-worker cache;
- local-solo ↔ dedicated-co-op handoff at Relay;
- Electron WebGPU/gamepad;
- Steam bridge spike.

## M4 — Opening Greybox

Content:

- Wayfarer Scar;
- early Transit Spine;
- Gravity Orchard;
- Alignment Hound;
- Crown Grazer;
- The Pendulum;
- first transformation.

Exit:

full slice works solo/2P/3P/4P and across 30/80/150/250 ms test profiles.

## M5 — Production-Quality Vertical Slice

Prove shipping pipeline:

- premium 2.5D art;
- animation/VFX/audio;
- WebGPU/WebGL graphics tiers;
- 4P readability;
- UI/accessibility;
- localization-ready text;
- browser asset delivery;
- Electron Steam packaging;
- automated QA.

Do not scale regional production before M5 provides real throughput/performance evidence.

## Production waves

P1: Solar Foundry + Flooded Observatory / Vector Shift + water framework.  
P2: Rust Sea / Flux.  
P3: Choir Array / Phase.  
P4: Cloud Loom / Invert/current/kites.  
P5: Broken Transit Crown / full toolkit/Custodian.  
P6: Periapsis / Anchor Zero/final configurations.

Each wave must pass its existing region-specific network/performance gates using the browser architecture.

## Alpha

Opening-to-credits playable with all critical systems, regions, choices and bosses.

No unresolved:

- save corruption;
- co-op progression architecture;
- legal world-state path;
- critical browser incompatibility.

## Beta

Feature/content complete.

No new major systems.

Focus on:

- performance;
- compatibility;
- networking;
- localization;
- save migration;
- accessibility;
- loading/cache;
- browser/Electron parity.

## Release Candidate

Requires:

- 1–4 regression matrix;
- target browser matrix;
- 60 fps target preset validation;
- disconnect/reconnect recovery;
- content CDN/rollback validation;
- final configuration records;
- Steam build/store flow;
- production game-server observability/capacity.

## Post-launch candidates

- public matchmaking;
- WebTransport if evidence supports it;
- NG+;
- optional bosses/challenges;
- console investigation;
- expanded post-ending presentation.
