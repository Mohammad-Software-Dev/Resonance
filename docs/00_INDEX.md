# Resonance — Game Design Documentation Index

**Status:** Canonical design bible, Implementation Phase M0 — implementation blueprint complete  
**Working title:** Resonance  
**Genre:** 1–4 player precision 2.5D action-Metroidvania  
**Runtime strategy:** Browser first; same client packaged for Steam/Electron  
**Core promise:** *Your friends become part of your moveset.*

## Canonical product assumptions

- Browser-first desktop release.
- Steam/Electron build uses the same TypeScript client.
- PC-class desktop/laptop is the Version 1 performance target.
- Solo + 1–4 online co-op.
- One human per client.
- No couch/split-screen Version 1.
- Four-player architecture from the first online prototype.
- Named Wayfarers: Mara Venn, Ily Sare, Jun Vale, Oren Kade.
- Challenging baseline + granular per-player accessibility.
- Moderate character-driven story + environmental lore.
- Campaign owner controls irreversible world choices.
- Guests retain eligible personal progression/rewards.
- Gas-giant orbital habitat setting.
- Main campaign planning target: approximately 18–22 hours.
- Completionist planning target: approximately 30–40 hours.

## Canonical browser-first stack

- TypeScript 7.0.2 strict.
- Babylon.js 9.27.1 full engine.
- WebGPU preferred; WebGL2 fallback.
- Rapier 3D deterministic WASM 0.20.0.
- custom deterministic kinematic player controller.
- shared engine-independent client/server gameplay simulation.
- Colyseus 0.18.x dedicated authoritative game servers.
- uWebSockets/WSS launch transport.
- Node.js 24 LTS.
- Colyseus Cloud multi-region hosting.
- Vite 8.3.1 + pnpm workspaces.
- React 19.x DOM UI.
- Supabase Auth + PostgreSQL.
- Cloudflare Workers Static Assets + R2.
- PWA/service worker + IndexedDB/Cache Storage.
- glTF/GLB + meshopt + KTX2/Basis.
- Blender + Babylon.js Editor.
- Electron stable + steamworks.js for Steam.
- Git + Git LFS + GitHub Actions.
- Sentry + OpenTelemetry-compatible observability.

## Architecture precedence

The browser-first files introduced/updated in Iteration 4A supersede Unreal-specific implementation assumptions from Iteration 3B.

Historical Unreal documents are design-history references only.

See:

- `109_SUPERSESSION_AND_DEPRECATION_REGISTER.md`
- `118_ITERATION_4A_BROWSER_FIRST_ARCHITECTURE_LOCK.md`

## Core design files

### 01–19 — Product foundation

- `01_VISION_AND_PILLARS.md`
- `02_CORE_GAME_LOOP.md`
- `03_PLAYER_MOVEMENT_AND_CONTROLS.md`
- `04_RESONANCE_SYSTEM.md`
- `05_COMBAT_AND_HEALTH.md`
- `06_COOP_AND_SOLO_ECHO.md`
- `07_PROGRESSION_LOADOUTS_ECONOMY.md`
- `08_WORLD_MAP_BIOMES_TRAVERSAL.md`
- `09_NARRATIVE_LORE_CHARACTERS.md`
- `10_ENEMIES_BOSSES_ENCOUNTER_DESIGN.md`
- `11_LEVEL_PUZZLE_AND_BACKTRACKING.md`
- `12_MULTIPLAYER_NETWORK_SAVE_MATCHMAKING.md` — browser-first dedicated-network model.
- `13_UI_UX_ACCESSIBILITY.md`
- `14_ART_AUDIO_ANIMATION.md`
- `15_VERTICAL_SLICE_PRODUCTION_ROADMAP.md`
- `16_BUSINESS_MARKETING_COMMUNITY.md`
- `17_LEGAL_ORIGINALITY_GUARDRAILS.md`
- `18_BALANCE_TESTING_TELEMETRY.md`
- `19_OPEN_DECISIONS_AND_NEXT_ITERATION.md` — owner decisions + browser M0/M1 handoff.

### 20–34 — Canon, cast and opening slice

- `20_CANON_SCOPE_AND_V1.md` — browser-first Version 1 promise.
- `21_PLAYABLE_CHARACTERS.md`
- `22_FIRST_60_MINUTES.md`
- `23_ABILITY_AND_PROGRESSION_GRAPH.md`
- `24_WORLD_TOPOLOGY_AND_REGION_STATES.md`
- `25_ENEMY_ROSTER.md`
- `26_MAJOR_BOSS_ROSTER.md`
- `27_FOUR_PLAYER_NETWORK_SPEC.md` — dedicated-authority browser network spec.
- `28_VERTICAL_SLICE_TEAM_AND_BACKLOG.md` — browser-first team/backlog.
- `29_ITERATION_3A_PRODUCTION_BRIEF.md`
- `30_OPENING_REGIONS_ROOM_BY_ROOM.md`
- `31_PENDULUM_BOSS_PRODUCTION_SPEC.md`
- `32_EARLY_GAME_COMBAT_AND_PROGRESSION.md`
- `33_PLAYER_COUNT_MATRIX_AND_ONLINE_FLOW.md`
- `34_VERTICAL_SLICE_IMPLEMENTATION_SPEC.md` — browser-first implementation slice.

### 35–42 — Canonical technology

- `35_ITERATION_4A_BROWSER_FIRST_TECH_ARCHITECTURE.md`
- `36_BROWSER_CLIENT_NETWORK_DEPLOYMENT_STACK.md`
- `37_RESONANCE_MOVEMENT_PHYSICS_ECHO_TECH.md`
- `38_SAVE_PROFILE_WORLD_STATE_SCHEMA.md`
- `39_CONTENT_TOOLS_AND_ROOM_ARCHITECTURE.md`
- `40_BROWSER_PERFORMANCE_SOURCE_CONTROL_CI.md`
- `41_PROTOTYPE_SPRINT_PLAN_M0_M3.md`
- `42_TECH_RISK_REGISTER_AND_SPIKES.md`

### 43–49 — Solar Foundry

Detailed region, room, boss, enemy, heat/beam/mirror, narrative and progression specifications.

### 50–57 — Flooded Observatory

Detailed region, room, Leviathan, enemy, water-sphere, narrative, progression and network/performance specifications.

### 58–66 — Rust Sea

Detailed region, Flux, Dust Cathedral, enemy, particulate, narrative, progression and technical-risk specifications.

### 67–75 — Choir Array

Detailed region, Phase, Choir Prime, enemy, standing-wave/signal, Tessel narrative and technical specifications.

### 76–85 — Cloud Loom

Detailed region, Invert, Loom Harvester, enemy, current/kite, narrative, networking and endgame-state specifications.

### 86–96 — Broken Transit Crown

Detailed Crown topology, Meridian Custodian, Custodian enemy family, optional Astral Shepherd, full-toolkit grammar, campaign-state aggregation, narrative and late-game technical specifications.

### 97–107 — Periapsis / finale

Detailed Periapsis topology, Anchor Zero, four final configurations, world-state integration, Wayfarer/faction beats, finale saves/networking/postgame, campaign audit and risk review.

### 108–117 — Canonical consolidation / production planning

- `108_CANONICAL_CAMPAIGN_FLOW.md`
- `109_SUPERSESSION_AND_DEPRECATION_REGISTER.md`
- `110_MVP_VS_FULL_VERSION_1_MATRIX.md`
- `111_PRODUCTION_MILESTONE_ROADMAP.md`
- `112_ENGINEERING_PROOF_GATES.md`
- `113_CONTENT_DEPENDENCY_MATRIX.md`
- `114_CANONICAL_CAMPAIGN_STATE_SCHEMA.md`
- `115_FINAL_UNRESOLVED_DECISION_REGISTER.md`
- `116_TERMINOLOGY_AND_NAMING_CANON.md`
- `117_ITERATION_3J_CONSOLIDATION_SUMMARY.md`


### 119–125 — M0 implementation blueprint

- `119_M0_REPOSITORY_AND_PACKAGE_ARCHITECTURE.md` — exact monorepo/package boundaries, dependency rules and kickoff pins.
- `120_M0_SIMULATION_TICK_AND_STATE_CONTRACT.md` — fixed 60 Hz input/state/snapshot contract.
- `121_M0_BABYLON_BOOTSTRAP_RENDERING_SPEC.md` — WebGPU/WebGL boot, frame loop, premium test room and graphics gates.
- `122_M0_RAPIER_AND_WAYFARER_CONTROLLER_SPEC.md` — deterministic collision adapter and custom kinematic controller.
- `123_M0_TARGETID_ATTRACT_REPEL_SPEC.md` — targeting semantics and first Resonance movement implementation.
- `124_M0_TEST_DIAGNOSTICS_AND_ACCEPTANCE.md` — deterministic, graphics, performance and blind-test go/no-go criteria.
- `125_M0_IMPLEMENTATION_BACKLOG_AND_SEQUENCE.md` — ordered engineering epics M0.0–M0.11.

### 118 — Browser architecture lock

- `118_ITERATION_4A_BROWSER_FIRST_ARCHITECTURE_LOCK.md`

## Canonical ability spine

Attract → Repel → Link/Echo → Latch → Orbit → Vector Shift → Flux → Phase → Invert.

Broken Transit Crown and Periapsis recombine this toolkit rather than adding a foundational movement verb.

## Canonical region spine

Wayfarer Scar / Transit  
→ Gravity Orchard  
→ Solar Foundry  
→ Flooded Observatory  
→ Rust Sea  
→ Choir Array  
→ Cloud Loom  
→ Broken Transit Crown  
→ Periapsis Core.

## Mandatory major-boss structure

Opening mini-Guardian:

- Alignment Hound.

Mandatory major slots:

1. The Pendulum.
2. The Glass Regent.
3. Leviathan of the Flood.
4. Dust Cathedral.
5. Choir Prime.
6. Loom Harvester.
7. Meridian Custodian.
8. Anchor Zero.
9. Final Configuration Encounter.

Astral Shepherd is optional.

## Final configuration families

- Historical Continuity.
- Distributed Meridian.
- Open Resonance.
- Bounded Accord.

No configuration is labeled the true/good/canon ending.

## Definition of technical success

The browser-first architecture succeeds when:

- movement is fun before art/content;
- Tier M holds a stable 60 fps target;
- WebGPU provides premium presentation;
- WebGL2 remains fully playable;
- four-player co-op is responsive at 150 ms RTT;
- moving anchors reconcile cleanly;
- Link feels immediate;
- Echo is reliable;
- browser refresh/reconnect is recoverable;
- room/region streaming avoids gameplay stalls;
- browser and Electron builds share gameplay behavior;
- acknowledged campaign saves survive client/device failure.

The project should not scale content production before these foundations pass their proof gates.
