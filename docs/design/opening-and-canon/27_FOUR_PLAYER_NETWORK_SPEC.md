# Four-Player Network and State Specification — Dedicated Browser Architecture

## Non-negotiable

Resonance is architected for **1–4 online players from the first network prototype**.

Two-client success is not production readiness.

## Session model

Canonical online model:

**dedicated authoritative Colyseus room.**

The campaign owner is not the simulation host.

This supersedes the old Unreal listen-server architecture.

## Authority

### Dedicated server owns

- authoritative player simulation;
- world transformation;
- quests;
- boss/enemy state;
- critical puzzle/shared objects;
- pickups;
- RNG seeds;
- Link relationships;
- session Echo state;
- irreversible-choice validation;
- reward events.

### Local client predicts

- own movement;
- immediate animation;
- aim/target selection feedback;
- selected Resonance presentation.

### Client presents/interpolates

- remote players;
- remote shared-object motion;
- noncritical particles;
- cosmetic debris.

## Shared simulation

Client and server import the same engine-independent TypeScript simulation.

Rendering code cannot be imported into server simulation.

## Network rates

Target:

- simulation: 60 Hz;
- high-value replication: ~30 Hz;
- event-driven/low-priority state: lower frequency;
- local input sequences: every fixed tick or efficiently batched without adding control latency.

Final rates are profiling/tuning values.

## Four-player bandwidth principle

Do not replicate every object transform.

Classify:

1. gameplay critical;
2. reconstructable/event-driven;
3. cosmetic local;
4. dormant.

Particle fields never replicate individual particles.

## Shared object manipulation

Use Interaction Token.

Flow:

1. player requests control/manipulation;
2. server grants token;
3. additional players contribute validated forces/relationships;
4. server computes authoritative result;
5. clients predict presentation where useful.

## Link/rescue

Link is an authoritative relationship.

Client may show acquisition immediately.

Server validates:

- source/target;
- range;
- state;
- consent/armed action;
- cooldown/resource;
- obstruction where applicable.

At 150 ms, timing windows must still feel fair.

## Region placement

Party region is selected from measured RTTs across all members.

Do not let one player's geography dictate obviously worse latency for everyone.

## Join-in-progress

Join snapshot includes:

- WorldStateRevision;
- current region/RoomID;
- room VariantID;
- encounter phase;
- boss/enemy critical state;
- persistent object state;
- party profiles;
- session licenses;
- moving-platform path revisions.

Spawn only at safe join marker/boundary.

## Disconnect

### Guest

- release tokens;
- remove/park avatar safely;
- adapt mechanics at safe boundary;
- retain durable rewards;
- allow reconnect.

### Campaign owner

The room may remain available during reconnect grace.

Final/irreversible campaign decisions require campaign-owner authority.

If reconnect window expires:

- save last durable state;
- terminate/return party safely according to encounter.

No peer-host migration is needed because there is no peer simulation host.

## Player-count changes

Adapt:

- enemy reinforcement count;
- boss objective concurrency;
- revive rules;
- puzzle actor count;
- target selection.

Use safe phase boundaries.

## Session licenses

A guest lacking host-required ability may receive temporary session license.

Session license:

- enables gameplay compatibility;
- does not automatically grant permanent profile progress.

## Four-client stress scenario

Must include:

- four Wayfarers;
- two active Links;
- moving anchor;
- shared object;
- projectiles;
- enemy group;
- one down/revive;
- join or reconnect;
- world-state event.

Test:

- 30 ms;
- 80 ms;
- 150 ms;
- 250 ms;
- jitter/loss.

## Diagnostics

Expose:

- RTT;
- jitter;
- input sequence;
- server tick;
- reconciliation error;
- room region;
- bandwidth;
- server tick duration;
- moving target revision;
- Link state.

## Browser refresh

During reconnect window:

- user can refresh/reload;
- authenticated session recovers room token;
- server returns snapshot;
- player resumes at safe state.

## Steam compatibility

Electron clients use same protocol/room servers.

Steam provides identity/invite integration, not a separate gameplay transport.

## Acceptance

Four-player network foundation passes when:

- no 2P assumptions remain;
- 150 ms remains controllable;
- shared objects remain authoritative;
- owner disconnect does not corrupt save;
- browser refresh is recoverable;
- bandwidth/CPU leave headroom for production encounters.
