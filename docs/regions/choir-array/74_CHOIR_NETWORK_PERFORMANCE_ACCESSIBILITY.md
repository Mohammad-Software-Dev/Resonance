# Choir Array — Network, Performance and Accessibility Specification

**Purpose:** Keep Phase, signal networks and mixed-state multiplayer deterministic, performant and fully accessible without hearing.

# Technical principle

Replicate **state**, not waveform.

Authoritative gameplay cares about:

- player Phase state;
- actor StateMask;
- signal graph state;
- pulse identity/location/time;
- Link Signal Token;
- network topology revision;
- enemy/Prime state.

It does not care about:

- raw audio waveform;
- FFT results;
- decorative oscillation;
- background wave particles.

# Phase authority

Server owns:

- Phase state;
- transition start;
- duration/recovery;
- state-specific collision;
- target eligibility.

Owning client predicts:

- transition presentation;
- immediate target filtering;
- movement continuity.

# Phase collision risk

Highest risk:

client believes Resonant route exists while server resolves Material collision.

Mitigation:

- replicated state timestamp;
- saved-move Phase activation;
- stable authored state masks;
- collision transition grace;
- re-entry safety check;
- dedicated correction telemetry.

# Mixed-state players

Four players may occupy different states simultaneously.

Each actor:

- exists once;
- has one world transform;
- has PhaseState enum;
- renders state-specific presentation locally.

Do not instantiate four versions of a room.

# Signal network authority

Server owns:

- NetworkID revision;
- active pulse;
- node state;
- edge state;
- completion;
- Tessel authored pattern choice.

Clients reconstruct:

- wavefront position from server time;
- local light/audio;
- decorative network effects.

# Link Signal Token

Server validates:

- active Link;
- endpoint state compatibility;
- SignalID;
- expiry;
- target receiver.

Client may show immediate token movement.

If Link breaks:

- server resolves drop/reset;
- client VFX follows authoritative result.

# Audio-independent gameplay requirement

Every critical mechanic must pass with game audio muted.

Required visual equivalents:

| Audio concept | Visual equivalent |
|---|---|
| pulse timing | expanding ring / edge progress |
| carrier identity | pattern + icon |
| direction | moving wavefront / arrowed edge animation |
| phase mismatch | state symbol / geometry edge |
| warning | screen/world pulse + object animation |
| signal success | receiver lock animation |
| Tessel response | repeated visual grammar / remote node reaction |

# Accessibility test mode

CI/manual QA includes:

- master audio = 0;
- music = 0;
- effects = 0;
- subtitles/captions enabled as applicable.

All critical-route puzzles and bosses must remain completable.

# Timing windows

Multiplayer timing must tolerate latency.

Rules:

- broad overlap windows;
- signal propagation is server-timed;
- client visual predicts/interpolates;
- no mechanic requires exact same-frame action.

At 150 ms RTT, intended critical path remains fully playable.

# State-specific enemy risk

Tone Shade / Choir Prime may appear state-dependent.

Avoid:

- client seeing attack only after hit;
- invisible collision/hurtbox from wrong state;
- unsynchronized vulnerability.

Use:

- server-authoritative state;
- pre-transition telegraph;
- small transition grace where necessary.

# Echo Husk implementation

Do not record arbitrary remote-player transform tapes.

Use semantic templates:

- Action.JumpArc;
- Action.RepelPulse;
- Action.ShortStrike;
- Action.PhaseShift;
- Action.LatchArc.

Server selects template based on recent qualifying action.

Clients render locally.

# Tessel adaptive pattern risk

Tessel may feel “AI-like,” but gameplay uses validated authored patterns.

Server selects from:

- PatternID set;
- prerequisites;
- player-history tags;
- current attempt state.

No generated rule can create an untested puzzle.

# GPU risks

Primary:

- transparent Phase overlays;
- multiple wavefronts;
- signal lines;
- four-player Link effects;
- Choir Prime arena;
- state-specific ghosted teammates.

Rules:

- state readability before spectacle;
- Medium reduces background wave density;
- phased teammate silhouette uses cheap effect;
- no full-screen heavy refraction;
- no separate duplicate world rendering.

# CPU risks

- too many active signal nodes;
- repeated Phase target filtering;
- enemy state logic;
- Blueprint tick.

Use:

- small active network graphs;
- event-driven state changes;
- spatial candidate filtering;
- C++ state system;
- dormant distant nodes.

# Network risks

## A — Phase movement correction

**Impact:** 5  
**Likelihood:** 3

Spike:

- midair Phase through barrier;
- Phase → Latch;
- 30/80/150/250 ms.

Pass:

- no repeated hard correction;
- state/landing result broadly agrees.

## B — Unsafe re-entry divergence

**Impact:** 5  
**Likelihood:** 2

Spike:

- Phase expires near Material collision on host/client disagreement.

Pass:

- server safe-return always wins;
- client presents correction without lethal surprise.

## C — Signal token desync

**Impact:** 4  
**Likelihood:** 3

Pass:

- token never exists at two receivers;
- reset is consistent.

## D — Four-player mixed-state readability

**Impact:** 4  
**Likelihood:** 4

Pass:

each player can identify:

- own state;
- teammate positions/states;
- active pulse;
- lethal state-specific attacks;
- Link target.

## E — Choir Prime topology divergence

**Impact:** 5  
**Likelihood:** 3

Pass:

- all clients agree which platforms/barriers exist;
- wipe/reset returns identical arena.

# Four-player stress room

Representative:

- 4 players;
- 2 Material / 2 Resonant;
- 2 Links;
- 2 Signal Tokens;
- 8 enemies;
- 3 wavefronts;
- 1 Chorus Bloom;
- multiple Phase anchors.

Target:

- 60 fps Tier M/Medium;
- stable host frame;
- readable visuals;
- no replication burst.

# Late join

Join snapshot includes:

- player Phase states;
- active Phase-compatible actor state;
- NetworkID revisions;
- active pulse/token;
- encounter phase;
- topology revision.

Late join never replays entire signal history.

# Save model

Persist:

- Choir regional outcome;
- permanent network/route states;
- quest flags;
- one-time rewards;
- Phase ability ownership.

Do not persist:

- temporary player Phase state across unsafe quit;
- active signal pulse;
- boss midfight network state.

Quit/reload returns to safe Relay/room state.

# Accessibility controls

Per-player:

- state-edge contrast;
- signal visualization intensity;
- Phase duration assist;
- signal speed assist;
- overlap-window assist;
- reduced flashes;
- reduced screen distortion;
- teammate state marker;
- directional signal indicator;
- captions for meaningful non-verbal system events where appropriate.

# Color vision

Never use color alone to distinguish:

- Material vs Resonant;
- carrier types;
- player state;
- safe/danger wave;
- Link token.

Use pattern, animation and iconography.

# Photosensitivity

Options reduce:

- rapid pulsing;
- high-frequency flicker;
- full-screen flashes;
- strobing interference.

Gameplay timing remains visible through slower shape motion.

# Automated tests

1. 100 Phase enter/exit cycles.
2. blocked re-entry safety.
3. Phase → Latch at latency.
4. 4 players in mixed states.
5. Signal Token Link handoff.
6. audio-muted critical puzzle.
7. Echo Husk template replication.
8. Dissonant Pair reset.
9. Choir Prime phase reset.
10. late join into each boss phase safe boundary.
11. all three Choir afterstates.
12. Phase session-license guest.
13. old-region Phase gate load/save.

# Telemetry

Capture:

- Phase corrections;
- unsafe re-entry count;
- signal token resets;
- wrong-state target attempts;
- audio-muted playtest success;
- accessibility assists used;
- 4P state distribution;
- network bandwidth;
- GPU cost of wave/Phase VFX.

# Acceptance criteria

- Phase remains playable at 150 ms;
- re-entry is never unfairly lethal;
- critical content works with audio muted;
- mixed-state 4P remains readable;
- signals replicate as compact state;
- Choir Prime topology stays synchronized;
- Medium preset remains 60 fps target;
- no duplicate-world or audio-analysis architecture is introduced.
