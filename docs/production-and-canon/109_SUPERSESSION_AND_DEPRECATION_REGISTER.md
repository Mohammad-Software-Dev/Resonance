# Supersession and Deprecation Register

**Status:** Iteration 4A canonical reconciliation record  
**Purpose:** Prevent older provisional statements from being implemented after later design/architecture decisions replaced them.

## Precedence

When documents conflict:

1. Iteration 4A browser-first architecture files and Iteration 3J canonical design files;
2. detailed production specs from Iterations 3C–3I;
3. earlier Iteration 3A–3B documents only where not superseded;
4. early overview/concept documents.

## Technical architecture supersession — Iteration 4A

The following Iteration 3B architecture is now **superseded**:

- Unreal Engine 5.8.x as primary runtime;
- C++/Blueprint implementation split;
- `UCharacterMovementComponent`;
- Iris replication;
- host-authoritative listen server;
- Online Subsystem Steam as gameplay-session foundation;
- Perforce + UnrealGameSync;
- Horde/BuildGraph as primary CI path.

Canonical replacement:

- TypeScript 7.0.2 strict;
- Babylon.js 9.27.1 full engine;
- WebGPU preferred + WebGL2 fallback;
- Rapier 3D deterministic WASM 0.20.0;
- engine-independent shared gameplay simulation;
- custom kinematic Wayfarer controller;
- Colyseus 0.18.x dedicated authoritative rooms;
- Node.js 24 LTS;
- uWebSockets/WSS transport;
- Colyseus Cloud multi-region hosting;
- Vite + pnpm monorepo;
- React DOM UI;
- Supabase Auth + PostgreSQL;
- Cloudflare Workers Static Assets + R2;
- Electron + steamworks.js for Steam;
- Git + Git LFS + GitHub Actions.

The old Unreal files remain useful historical decision context but are not implementation authority.

## Authority terminology change

Old:

“host-authoritative” often meant the campaign-owning player's machine was also the simulation server.

Canonical:

- **campaign owner / host** owns irreversible campaign choices;
- **dedicated game server** owns co-op simulation authority;
- guests advise/vote and retain eligible personal progression.

Do not conflate campaign ownership with network simulation authority.

## Platform supersession

Old:

PC/Steam-first native runtime.

Canonical:

- browser-first desktop runtime;
- installable PWA;
- Steam/Electron uses same web client;
- PC desktop hardware remains the performance focus;
- mobile touch and consoles are not Version 1 commitments.

## Rendering supersession

Old:

Unreal renderer assumptions including native-engine performance budgets.

Canonical:

- Babylon.js full engine;
- WebGPU primary;
- WebGL2 fallback;
- 60 Hz fixed gameplay simulation;
- 60 fps Tier M baseline;
- streamed GLB/KTX2 content;
- stylized PBR with strict browser budgets.

No critical gameplay behavior may be WebGPU-only.

## Network supersession

Old:

peer listen-server + Steam networking path.

Canonical:

- dedicated regional Colyseus authority;
- client prediction/reconciliation;
- WSS/uWebSockets launch transport;
- WebTransport only a future measurement-driven option;
- browser and Steam/Electron share protocol/servers.

## Persistence supersession

Old:

native local campaign files + optional Steam Cloud as primary durable model.

Canonical:

- PostgreSQL-backed durable online profile/campaign;
- IndexedDB local recovery/offline solo cache;
- atomic revisioned saves;
- explicit offline/cloud conflicts;
- completion and irreversible choices acknowledged only after durable commit in online co-op.

## Source/build supersession

Old:

Perforce/UGS/Horde.

Canonical:

- Git;
- Git LFS;
- pnpm workspace;
- GitHub;
- GitHub Actions;
- immutable web/content artifacts.

## Ability progression supersessions

- Vector Shift: Solar Foundry.
- Flux: Rust Sea.
- Phase: Choir Array.
- Invert: Cloud Loom.
- No foundational critical-path movement ability after Invert.

## Boss/content supersessions

- mandatory structure = 9 major boss slots + opening mini-Guardian;
- Astral Shepherd = optional;
- “The Pale Engine” = deprecated placeholder;
- old Custodian Runner / Brace Guard / Field Auditor / Relay Seizer / Protocol Drone family = superseded by the canonical Custodian family.

## Finale

Canonical working configuration names:

- Historical Continuity;
- Distributed Meridian;
- Open Resonance;
- Bounded Accord.

No “true” or consequence-free golden ending.

## Documentation rule

Do not delete older historical files solely because a decision changed.

Instead:

- current index points to canonical files;
- this register records the replacement;
- implementation follows the later canonical rule.
