# Multiplayer, Network, Save and Matchmaking — Browser-First Canon

## Non-negotiable product rule

Resonance supports:

- solo;
- 2-player online;
- 3-player online;
- 4-player online;

from the first production network architecture.

Version 1 has no couch/split-screen requirement.

## Session architecture

### Solo

Solo uses local authority with the shared deterministic TypeScript simulation.

Benefits:

- zero network latency;
- optional offline-capable play after assets are cached;
- deterministic Echo;
- same gameplay rules as online.

### Online co-op

Online sessions use a **dedicated authoritative Colyseus server**.

No browser player is the server.

The dedicated server owns:

- player authoritative state;
- boss/enemy state;
- critical shared objects;
- Link/Echo session relationships;
- pickups;
- world-state transitions;
- irreversible choices;
- reward events.

Clients predict local movement and render immediate feedback.

## Why dedicated authority

Browser-host authority is rejected because:

- background tabs may be throttled;
- client runtime is inspectable/modifiable;
- host upload/network quality should not determine everyone else's simulation;
- region placement can minimize party latency;
- reconnect/refresh is easier to reason about.

## Netcode

Canonical:

- Colyseus 0.18.x;
- Node.js 24 LTS;
- uWebSockets/WSS production transport;
- 60 Hz server simulation;
- client prediction/reconciliation;
- remote interpolation;
- shared simulation package;
- deterministic TargetID/RelationshipID semantics.

Target latency tests:

- 30 ms;
- 80 ms;
- 150 ms;
- 250 ms;
- jitter;
- packet loss.

## Region placement

Before session creation:

- every party member measures candidate-region RTT;
- choose region minimizing worst-party latency with average RTT as secondary factor;
- all players join one room in that region.

Launch hosting:

**Colyseus Cloud multi-region.**

## Invite model

Browser:

- party URL/code;
- signed/authenticated party identity.

Steam/Electron:

- Steam invite resolves to the same party/session model.

Invite/Friends is Version 1 baseline.

Public matchmaking remains optional.

## Join-in-progress

Allowed during safe synchronization states.

Joining player receives:

- world revision;
- active room/variant;
- encounter state;
- party profiles;
- critical object snapshot;
- ability session licenses;
- reconnect/session metadata.

Certain boss transitions may delay spawn until safe boundary.

## Disconnect/reconnect

### Guest

Server:

- releases object ownership;
- adapts player-count-dependent mechanics at safe boundary;
- preserves durable rewards already committed.

Guest may reconnect inside session window.

### Campaign owner / host identity

The campaign owner is still the player whose campaign world is being used, but that player is **not** the network simulation host.

If campaign owner disconnects:

- dedicated game room may remain alive for reconnect window;
- other players may remain in safe/pause state depending current encounter;
- irreversible host-owned world choices cannot be committed without owner authority.

This is different from the old listen-server model.

## Campaign ownership

Host/campaign owner owns:

- irreversible regional choices;
- campaign world state;
- final configuration.

Guests own:

- personal profile;
- eligible rewards;
- accessibility;
- personal unlock records.

Guest votes are advisory for irreversible host-world decisions.

## Save

### Solo

- IndexedDB atomic local generations;
- cloud sync when online;
- explicit conflict handling.

### Co-op

Dedicated server commits to PostgreSQL/Supabase at safe boundaries.

Irreversible choices wait for durable acknowledgement.

## Matchmaking

Version 1:

- direct invite;
- friends/party;
- private party code.

Optional later:

- public matchmaking;
- friends-of-friends;
- skill/preferences filters.

The campaign must never depend on public matchmaking population.

## Cross-play architecture

Browser and Steam/Electron clients may join the same session if:

- protocol version matches;
- content manifest version matches;
- platform/account policy permits.

The simulation/network protocol is platform-independent.

## Anti-cheat/security

This is a cooperative game, not a competitive anti-cheat arms race.

Still, clients are untrusted.

Server validates:

- movement bounds;
- targets;
- cooldowns/resources;
- item/reward grants;
- boss defeat;
- world choices.

## Acceptance gate

Multiplayer foundation is not accepted until a four-client stress session includes:

- Attract/Repel;
- moving anchor;
- Link;
- shared object;
- combat;
- revive;
- join/leave;
- reconnect;
- world-state commit;

under simulated 150 ms RTT.
