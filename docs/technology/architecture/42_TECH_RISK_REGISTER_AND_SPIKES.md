# Browser-First Technical Risk Register and Mandatory Spikes

## Risk scale

Impact / Likelihood: 1–5.

# R1 — Precision movement under 150 ms

**Impact:** 5  
**Likelihood:** 3

Risk:

prediction/reconciliation cannot preserve intended feel.

Mitigation:

- shared simulation;
- fixed 60 Hz;
- stable TargetIDs;
- local prediction;
- deterministic moving anchors;
- strict payloads.

Spike:

M1 Attract/Repel + moving anchor under 150 ms.

Pass:

blind tester describes controller as responsive; correction metrics remain below agreed thresholds.

# R2 — Browser GPU variability

**Impact:** 5  
**Likelihood:** 4

Risk:

WebGPU/browser/driver differences cause visual bugs/crashes/performance cliffs.

Mitigation:

- full Babylon engine;
- WebGL2 fallback;
- supported browser matrix;
- milestone version freeze;
- conservative shader features;
- GPU diagnostics.

Spike:

representative PBR/VFX scene across Chrome/Edge/Firefox/Safari + Electron.

# R3 — WebGPU availability

**Impact:** 4  
**Likelihood:** 3

Mitigation:

no WebGPU-only gameplay.

WebGL2 fallback is a first-class graphics backend with reduced quality.

# R4 — Main-thread stalls

**Impact:** 5  
**Likelihood:** 3

Sources:

- asset decode;
- GC;
- shader compile;
- UI churn;
- scene activation.

Mitigation:

- prefetch;
- compressed/streamed assets;
- prewarm shaders;
- allocation discipline;
- React isolation;
- frame budget telemetry.

# R5 — Asset download/startup size

**Impact:** 5  
**Likelihood:** 4

Risk:

browser players abandon during large initial download.

Mitigation:

- region packages;
- small shell;
- opening-first content;
- KTX2;
- meshopt;
- CDN;
- service worker.

Pass:

first-play-ready download meets product target on normal broadband.

# R6 — Browser memory pressure

**Impact:** 4  
**Likelihood:** 3

Mitigation:

- room residency budgets;
- LRU unload;
- compressed textures;
- LOD/HLOD;
- explicit disposal;
- leak tests.

# R7 — Physics determinism leakage

**Impact:** 5  
**Likelihood:** 3

Risk:

Rapier is deterministic but surrounding JS simulation introduces ordering/math differences.

Mitigation:

- stable ordering;
- seeded RNG;
- no wall-clock decisions;
- version lock;
- deterministic replay hashes.

# R8 — Shared object authority

**Impact:** 5  
**Likelihood:** 3

Mitigation:

server ownership/tokens; avoid client rigid-body truth.

# R9 — Echo instability

**Impact:** 5  
**Likelihood:** 3

Mitigation:

semantic TargetIDs, fixed simulation, bounded recording, invalid-trace handling.

# R10 — Dedicated server cost

**Impact:** 4  
**Likelihood:** 3

Browser-first co-op uses dedicated authority rather than free host P2P.

Mitigation:

- only co-op sessions require server;
- solo local authority;
- 1–4 player room density profiling;
- auto-scale;
- server sleeps/terminates after session.

Track cost per co-op player-hour before launch.

# R11 — Colyseus Cloud dependency

**Impact:** 3  
**Likelihood:** 2

Mitigation:

- standard Node/container server;
- no proprietary gameplay API dependence;
- persistence external;
- portable deployment.

# R12 — WebSocket head-of-line behavior

**Impact:** 4  
**Likelihood:** 3

Mitigation:

- small packets;
- no compression for hot packets;
- state delta discipline;
- input prediction;
- interpolation.

Fallback future spike:

WebTransport datagrams after production maturity.

Do not use experimental transport solely for theoretical latency.

# R13 — Supabase/backend outage

**Impact:** 4  
**Likelihood:** 2

Mitigation:

- local JWT verification;
- gameplay session does not query auth/database per tick;
- retry queue for safe saves;
- local solo recovery;
- previous snapshot backup.

Irreversible co-op choice waits for durable commit.

# R14 — Babylon Editor maturity

**Impact:** 3  
**Likelihood:** 3

The Editor is community-maintained.

Mitigation:

- runtime truth is GLB + typed manifest, not opaque editor state;
- Blender remains source DCC;
- scenes can be built/validated by CLI;
- custom lightweight room tools can replace editor components without replacing engine.

# R15 — WebGL fallback maintenance

**Impact:** 3  
**Likelihood:** 3

Mitigation:

- Node Material/shared compatible shaders;
- no WebGPU-only gameplay;
- nightly fallback smoke tests;
- lower preset rather than separate art content.

# R16 — Electron/Steam integration

**Impact:** 3  
**Likelihood:** 2

Mitigation:

- same renderer bundle;
- secure main/preload bridge;
- stable Electron only;
- Steam spike in M3, not launch month.

# R17 — Browser storage eviction/offline conflicts

**Impact:** 4  
**Likelihood:** 3

Mitigation:

- cloud durable source when online;
- IndexedDB multiple generations;
- explicit revision conflict UI;
- no localStorage campaign authority.

# R18 — Four-player readability

**Impact:** 5  
**Likelihood:** 4

Not solved by technology alone.

Mitigation:

- render/VFX budgets;
- per-player outlines;
- target priority;
- optional reduced teammate VFX;
- repeated 4P usability gates.

# R19 — Security/cheating

**Impact:** 3  
**Likelihood:** 4

Browser code is inspectable.

Mitigation:

- co-op server authority;
- validate inputs/rewards;
- signed/authenticated profile;
- no trusted client damage/position grants.

Do not spend competitive anti-cheat budget on a co-op game without evidence.

# R20 — Browser tab/background behavior

**Impact:** 4  
**Likelihood:** 4

Mitigation:

- browser never hosts co-op authority;
- pause local solo safely;
- reconnect UI;
- dedicated server keeps room alive for reconnect window.

# Mandatory spikes

Before production scale:

1. PBR/WebGPU/WebGL representative room.
2. 4P 150 ms movement.
3. moving anchor prediction.
4. Link/rescue.
5. Rapier deterministic replay.
6. shared object authority.
7. Echo.
8. GLB/KTX2 streaming.
9. browser refresh/reconnect.
10. Electron WebGPU/Steam bridge.
11. multi-region room placement.
12. durable regional choice save.
13. 4P Medium performance capture.

# Architecture kill criteria

Reconsider browser-first only if measured prototypes show one of these cannot be corrected within reasonable scope:

- movement prediction;
- target visual fidelity/performance;
- content streaming/memory;
- browser compatibility;
- editor/content throughput.

Do not switch engines because native tooling is merely more familiar.
