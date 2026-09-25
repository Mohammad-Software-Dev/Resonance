# Browser Client, Network and Deployment Stack

**Status:** Canonical browser-first production stack  
**Supersedes:** `36_UNREAL_PROJECT_NETWORK_STEAM_STACK.md`

## Runtime split

Resonance uses four runtime domains:

### Web client

Owns:

- input sampling;
- local prediction;
- rendering;
- audio;
- UI;
- remote interpolation;
- client caches;
- local solo simulation when offline/solo.

### Dedicated game server

Owns during co-op:

- authoritative gameplay simulation;
- input validation;
- player/world state;
- bosses;
- enemies;
- shared objects;
- Link/Echo session state;
- room transition;
- co-op reward/session state.

### Persistent backend

Owns:

- accounts;
- profiles;
- campaign saves;
- completion records;
- entitlement/cosmetic metadata;
- durable choice ledger.

### CDN/content layer

Owns:

- JS/WASM app bundles;
- GLB scene assets;
- KTX2 textures;
- audio;
- manifests;
- immutable versioned content.

# Client stack

## Babylon.js

Use full Babylon.js.

Do not place authoritative movement logic inside Babylon physics/scene callbacks.

Babylon is responsible for:

- scene;
- camera;
- material;
- lights;
- particles;
- animation;
- audio presentation;
- GPU resources;
- content loading.

## React

React is used for:

- menus;
- party UI;
- map;
- inventory/loadout;
- accessibility;
- settings;
- diagnostics;
- connection/reconnect UX.

Per-frame transforms and combat state do **not** flow through React reconciliation.

React reads a low-frequency UI view-model.

## Vite

Vite builds:

- browser app;
- worker chunks;
- content tooling front ends;
- Electron renderer bundle.

Production output uses content hashing and immutable caching.

# Network framework

## Colyseus 0.18.x

Selected for:

- authoritative rooms;
- typed state;
- matchmaking/session primitives;
- prediction/reconciliation;
- interpolation;
- lag-compensation primitives;
- reconnect;
- multi-region server selection support.

## Production transport

Use:

**uWebSockets.js transport over secure WebSocket (WSS).**

Reasons:

- mature;
- production recommended by Colyseus;
- broad browser compatibility;
- less protocol risk than experimental WebTransport;
- sufficient for four-player co-op when state/input payloads remain small.

Do not enable compression for small high-frequency gameplay packets unless profiling proves benefit.

## WebTransport policy

Architecture includes a transport adapter.

WebTransport/datagrams may be tested later.

Do **not** make Version 1 depend on it until:

- Colyseus implementation is no longer experimental for our use;
- target browsers pass a full compatibility matrix;
- packet-loss testing demonstrates measurable gameplay benefit.

# Fixed-timestep netcode

Canonical target:

- local input sample: render frame;
- gameplay simulation: 60 Hz fixed step;
- server authority: 60 Hz fixed step;
- input sequence: timestamped/sequence-numbered;
- state replication target: 30 Hz for high-value gameplay state;
- lower-frequency state: 10–20 Hz or event-driven;
- remote entity render interpolation: approximately 80–100 ms buffer, tuned by testing.

Local player:

- immediate prediction;
- input history;
- authoritative reconciliation;
- smoothing for small corrections;
- snap only past strict error threshold.

Remote players:

- interpolation;
- limited extrapolation only where safe.

## Target latency tiers

- <50 ms RTT: excellent;
- 50–100 ms: target normal;
- 100–150 ms: fully supported;
- 150–250 ms: degraded but playable;
- >250 ms: warn player/party.

# Multi-region session placement

Launch uses Colyseus Cloud multi-region.

Before creating a co-op room:

1. each party member measures RTT to candidate regions;
2. party sends RTT vector;
3. region score minimizes worst-party RTT with secondary average-RTT weighting;
4. room is created in chosen region;
5. party joins the same authoritative room.

Do not simply choose the host's nearest region if it produces a much worse party result.

# Party/invite model

Browser:

- shareable party URL/code;
- authenticated friends list may be added later;
- invite survives page refresh where session is valid.

Steam/Electron:

- Steam invite maps to the same party/session identifiers;
- gameplay server remains Colyseus.

Public matchmaking is not required for Version 1.

# Reconnect

Client maintains:

- authenticated user identity;
- campaign/session ID;
- room reconnect token;
- last acknowledged input sequence;
- build/protocol version.

On temporary disconnect:

1. presentation enters reconnect state;
2. local gameplay stops advancing authoritative co-op state;
3. reconnect to same room;
4. server returns authoritative snapshot;
5. client reconciles;
6. control resumes at safe point.

# Browser refresh behavior

During co-op:

- page refresh should be recoverable inside the reconnect window;
- reconnect token is stored in session-safe browser storage;
- no campaign data is trusted from localStorage as authority.

# Hosting

## Colyseus Cloud

Launch game-session hosting.

Reasons:

- same framework/vendor;
- fewer custom infrastructure bugs;
- multi-region support;
- scaling and process management included;
- environment/secrets tooling;
- easier operational ownership for a small team.

The game server remains containerizable/portable so the project can move to another orchestrator later without rewriting gameplay.

## Cloudflare

Use:

- Workers Static Assets for web app shell;
- R2 for large immutable game content;
- Cloudflare caching/CDN;
- HTTPS/custom domain.

Large assets use content-hashed names and long immutable cache lifetimes.

# Account/persistence

## Supabase Auth

Selected for browser authentication.

Support initial options:

- anonymous/guest account;
- email magic link;
- selected OAuth providers.

Steam build can link Steam identity to the same account/profile.

Game servers validate JWT signatures locally using JWKS rather than making an auth-network request for every player action.

## PostgreSQL / Supabase

Durable storage for:

- profile;
- campaign save metadata;
- versioned campaign snapshot;
- choice ledger;
- completion records;
- entitlement metadata.

Gameplay state is not read/written to Postgres every frame.

Writes occur at:

- Relay/checkpoint;
- major choice commit;
- boss completion;
- session exit;
- periodic safe save.

# Steam desktop shell

Use stable Electron.

Reasons:

- exact Chromium runtime;
- same web client;
- predictable WebGPU/WebGL behavior;
- straightforward Steam integration;
- minimizes browser-specific runtime variability for Steam customers.

Renderer remains sandboxed/context-isolated.

Steamworks native access lives in:

- Electron main process;
- narrow preload/context bridge;
- never arbitrary renderer Node access.

# Protocol versioning

Every connection includes:

- ClientBuildID;
- ProtocolVersion;
- ContentManifestVersion;
- SaveSchemaVersion.

Server rejects incompatible clients with a clear update message.

Rooms never mix incompatible simulation versions.

# Security

Browser client is untrusted.

Server validates:

- ability ownership/session license;
- movement input bounds;
- cooldown/resource rules;
- target IDs;
- world-state revisions;
- reward commits.

Never trust:

- client position;
- client damage;
- client inventory grant;
- client boss defeat;
- client final configuration result.

# Acceptance

The network stack is acceptable when:

- four-player sessions survive 150 ms simulated RTT;
- reconnect works after browser refresh;
- room selection chooses sane party region;
- no client-authoritative exploit can mutate durable campaign state;
- solo and co-op use the same gameplay rules;
- Steam wrapper joins the same servers as browser clients where build compatibility allows.
