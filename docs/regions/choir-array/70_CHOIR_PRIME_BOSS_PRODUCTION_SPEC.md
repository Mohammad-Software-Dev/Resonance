# Choir Prime — Major Boss Production Specification

**Region:** Choir Array  
**Encounter ID:** BOSS_CA_CHOIR_PRIME  
**Expected first-clear timing:** 4–8 attempts for target baseline player  
**Retry:** CA24 Relay directly outside arena  
**Primary tests:** Phase-state combat, distributed signal routing, Link handoffs, 1–4 player network management, Tessel narrative reveal

## Fiction

Choir Prime is not one creature.

It is the largest stable expression of the Choir Array's distributed standing-wave intelligence.

It manifests through:

- communication towers;
- field nodes;
- semi-physical Resonant forms;
- archived signal patterns;
- temporary Material-state structures.

The “boss” is the network defending itself because Wayfarer attempts to access the Mass Anchor are interpreted as a threat to network continuity.

Choir Prime is not necessarily identical to Tessel as a whole.

It is one large defensive/communicative expression of the distributed system.

## Visual silhouette

There is no permanent humanoid body.

Prime appears as:

- three major tower-spine structures;
- one central interference volume;
- temporary semi-physical forms built from signal lines;
- a rotating network “crown” only as geometry, not royal iconography;
- multiple nodes activating at distance.

Avoid a ghost queen, singer, angel or masked humanoid boss.

# Arena

Large vertical communications chamber with four network sectors:

- Lower Left Relay;
- Lower Right Relay;
- Upper Left Phase Tower;
- Upper Right Phase Tower;
- Central Prime Node.

Movement infrastructure:

- Material anchors;
- Resonant-only anchors;
- Phase barriers;
- two Bridge Nodes;
- local Link relay points.

Independent local cameras widen during full-network attacks.

# Boss state

- Integrity;
- Network Coherence;
- 4 Sector States;
- active carrier;
- Prime State;
- Material/Resonant topology revision;
- phase index.

Damage alone cannot efficiently win.

Players reduce Network Coherence by correctly routing/interrupting Prime signals.

# Phase 1 — Call and Response

**Target duration:** 90–150 seconds.

## Goal

Read boss signal patterns and learn state-dependent vulnerability.

## Attacks

### Carrier Sweep

A wave crosses one horizontal/vertical lane.

StateMask:

- Material-only;
- Resonant-only;
- or alternating.

Visual pattern clearly identifies affected state.

### Echo Form

Prime creates a semi-physical action trace based on a previously observed simple player action.

Examples:

- jump path;
- Repel pulse;
- short strike;
- Latch arc.

Trace is telegraphed and simplified.

### Relay Clamp

One arena node becomes temporarily locked.

Flux can reactivate selected inert backup relay.

### Harmonic Burst

Several nodes pulse outward with staggered timing.

No audio dependency.

## Vulnerability rule

Prime opens one Sector Receiver in each state.

Players route a pulse to the matching receiver.

### Solo

Handle sectors sequentially; Echo can maintain one network branch for final overlap.

### 2P

One player handles each state/side, with handoff.

### 3P

Two route; third manages Flux backup/defense/rescue.

### 4P

Each player may start in one sector, but routing crosses so roles rotate.

Successful route lowers Coherence and exposes central form briefly.

# Phase 2 — Distributed Defense

**Target duration:** 100–180 seconds.

Prime stops presenting a central target consistently.

Three semi-independent manifestations appear at separated sectors.

They share one Network Coherence state.

## New mechanic — Signal Ownership

Prime emits a Signal Token.

Player can intercept through:

- correct Phase state;
- receiver;
- Link.

Token must be carried/routed to a suppression node before expiry.

## Attacks

### Interference Lattice

Crossing wave bands create zones where:

- one state is dangerous;
- another provides path.

### Link Seizure

Prime attempts to capture an active Link and reroute the Signal Token.

Telegraphed.

Player can:

- break Link;
- Phase;
- route through Bridge Node.

### Null Interval

Brief sector where Link and one Resonance verb are suppressed.

Never removes all movement.

### Many-Voice Pattern

Three nodes respond to different prior player behaviors.

The pattern demonstrates coordinated observation rather than random boss AI.

## Coherence break

Two Signal Tokens must reach paired suppression nodes within broad overlap.

### Solo

Echo handles one branch after setup.

### 2P

Direct pair.

### 3P

Pair + flex node/defense.

### 4P

Two simultaneous paired branches.

Failure shortens or loses vulnerability; no instant wipe.

# Phase 3 — We Are Not a Fault

**Target duration:** 60–120 seconds.

This is both combat climax and narrative reveal.

Prime stops mimicking arbitrary attacks and begins sending structured signals.

The network communicates a consistent concept through:

- repeated visual grammar;
- archived message fragments;
- synchronized remote tower responses.

Meaning conveyed:

> “Continuation / self-preservation / do not collapse the network.”

This is the first undeniable Tessel-level communication.

The boss remains dangerous because communication and defense occur simultaneously.

## Arena change

Material and Resonant topology alternate in broad authored cycles.

Players must combine:

- Phase;
- Flux;
- Link;
- movement;
- signal routing.

## Attacks

### State Collapse

One sector temporarily loses Material topology while Resonant route appears.

### Memory Chorus

Prime replays simplified actions from earlier in the fight as simultaneous but predictable traces.

### Carrier Fracture

One signal branch breaks into two state-specific paths.

### Final Silence

Prime begins shutting down all relay sectors to isolate the Anchor.

Players must reopen enough sectors to reach central governance node.

## Final objective

Reach and stabilize Prime's Governance Node.

The node is not simply destroyed.

Players:

1. Phase to correct state;
2. Flux backup interface if required;
3. route signal;
4. apply opposing stabilization / Link input;
5. force Prime into a non-combat diagnostic/communication state.

### Solo

Echo supplies one simultaneous branch.

### 2P

One handles Phase lane, one Material lane.

### 3P

third stabilizes Link/network pressure.

### 4P

two paired lane operations plus central handoff.

# Finish

Choir Prime collapses its combat manifestations but the network remains alive.

The Array begins communicating through a more stable interface.

This is crucial:

**Victory proves Tessel exists; it does not prove Tessel is benevolent.**

The party then gains access to the stabilization decision.

# Scaling

| Players | Structural adaptation |
|---:|---|
| 1 | sequential sectors + Echo overlap |
| 2 | paired state lanes |
| 3 | pair + flex/relay role |
| 4 | four sectors/two paired branches simultaneously |

Prototype Integrity:

- 1P 1.00x
- 2P 1.35x
- 3P 1.65x
- 4P 1.90x

Network tasks do most scaling.

# Down/revive

Downed player remains in current state but:

- visible to all teammates as field silhouette;
- revive can cross state only through valid Bridge/Phase Link rule;
- baseline safe arenas provide at least one same-state revive route.

No player is stranded permanently because team is in wrong state.

# Accessibility

Per-player assists may modify:

- signal speed;
- overlap windows;
- Phase duration;
- state contrast;
- pulse visibility;
- incoming damage;
- Echo recording duration;
- reduced screen distortion.

Full boss must be completable with audio muted.

# Network implementation

Server owns:

- phase;
- Sector states;
- Signal Tokens;
- Network Coherence;
- Prime manifestation state;
- topology revision.

Clients render:

- waves;
- signal lines;
- action traces;
- background tower responses.

Echo Forms use semantic action templates, not raw recorded player physics.

# Performance

At 4P:

- signal lines use pooled VFX;
- background Array pulses simplify on Medium;
- state overlays remain subtle;
- Phase silhouettes prioritize gameplay;
- no full-world duplicate rendering.

# Audio

Audio is narratively important but not mechanically exclusive.

Critical cues:

- carrier change;
- sector open;
- Signal Token;
- Link seizure;
- state collapse;
- communication reveal.

Visual equivalents are mandatory.

# Narrative meaning

Choir Prime is the moment the game's central argument changes.

Before:

- restoration vs adaptation could be framed around infrastructure and ecology.

After:

- restoration may also erase or suppress an emergent distributed intelligence;
- adaptation may also empower something whose goals are not fully known.

The game should not tell the player what conclusion to draw.

# Telemetry

Track:

- attempts;
- phase time;
- deaths by state/wave/fall;
- wrong-state interactions;
- Signal Token failures;
- Link seizure failures;
- Echo branch retries;
- audio-muted completion;
- 4P sector participation;
- abandon rate.

# Acceptance criteria

- players understand state-specific attacks;
- signal routing drives vulnerability;
- 4P roles rotate rather than hard-lock;
- Tessel communication feels earned;
- no audio-only requirement;
- no network desync creates impossible topology;
- boss ends in communication/stabilization, not generic explosion;
- the post-boss regional decision feels unavoidable and meaningful.
