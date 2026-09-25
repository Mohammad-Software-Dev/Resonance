# Choir Array — Standing-Wave, Signal and Link Systems

**Purpose:** Define Choir Array signal mechanics as deterministic network graphs with audio/visual parity.

# Core principle

Choir Array uses **signal state**, not a rhythm-game timeline.

Timing matters, but players are reading:

- node state;
- wave propagation;
- phase window;
- routing topology.

The player never needs to play notes to a beat.

# Signal Network

Each authored network contains:

- NetworkID;
- NodeIDs;
- links/edges;
- current carrier/state;
- timing profile;
- Phase compatibility;
- Link compatibility;
- completion conditions;
- reset rules.

# Node types

## Emitter

Creates pulse/state.

## Relay

Passes signal onward.

## Splitter

Routes signal to multiple branches.

## Gate

Passes only under defined state/timing.

## Memory Node

Stores one short state/pulse.

## Bridge Node

Transfers between Material and Resonant state.

## Receiver

Objective endpoint.

## Tessel Node

Behavior may adapt based on observed network/player state.

Tessel Node still obeys authored safety/logic bounds.

# Signal representation

Server-authoritative semantic state:

- active pulse ID;
- source;
- current node/edge;
- server start time;
- carrier type;
- state mask;
- network revision.

Clients render:

- wavefront;
- light;
- geometry pulse;
- sound.

# Timing

Use generous authored windows.

A pulse might:

- travel edge over 1.5 seconds;
- leave receiver open for 2 seconds;
- require another branch within 1 second overlap.

Do not require sub-100 ms multiplayer synchronization.

# Visual timing parity

Every important signal has:

- expanding ring;
- edge fill/progress;
- node animation;
- state icon;
- optional screen-space cue.

Audio enhances but never replaces these.

# Audio timing

Audio can provide:

- pitch identity;
- direction;
- pulse cadence;
- branch distinction;
- Tessel character.

Users with audio off can complete all content.

# Signal routing verbs

Players manipulate routing through existing systems:

- Attract/Repel moves tuning vane;
- Flux activates inert node;
- Phase enters correct state;
- Link bridges/holds signal;
- Echo repeats an action/state;
- Latch/Orbit/Vector Shift provide traversal between nodes.

# Link as signal carrier

A Link may carry a **Signal Token**.

Fields:

- SignalID;
- source endpoint;
- destination endpoint;
- state compatibility;
- start time;
- expiry;
- strength/validity.

The Link visual shows signal movement locally.

## Baseline restrictions

- endpoints usually require compatible Phase state;
- bridge nodes can cross state;
- distance/tension limits still apply;
- Link loss drops/returns signal according to puzzle rule.

# Player-to-player signal relay

Example:

1. Player A receives pulse.
2. Link to Player B transfers pulse.
3. B reaches remote receiver.
4. Receiver validates pulse before expiry.

This creates co-op movement+communication without voice requirement.

# Solo Echo relay

Echo may:

- reproduce a Link-capable endpoint;
- receive/transmit one recorded signal if authored;
- occupy one network node.

The system uses recorded semantic action, not free intelligence.

# Phase interaction

A signal can have StateMask:

- Material;
- Resonant;
- Dual.

A player in wrong state may:

- see partial trace;
- be unable to interact;
- route via Bridge Node.

Phase is therefore structural, not just a door key.

# Flux interaction

Some old signal nodes are inert.

Flux may:

- wake node temporarily;
- expose hidden edge;
- create temporary signal bridge.

Flux changes node eligibility.

Phase changes player access.

# Tessel adaptive behavior

Tessel can change an authored network pattern based on:

- which branch player used;
- previous room decision;
- regional state;
- whether player attacked/redirected a manifestation;
- puzzle attempt state.

Limits:

- no procedural unsolvable routing;
- no hidden rule change mid-attempt without telegraph;
- changes selected from validated authored patterns.

# Puzzle grammar

## Type A — Carrier Relay

Move one pulse across several nodes.

## Type B — State Bridge

Material source → Resonant receiver.

## Type C — Split Chorus

Two branches must overlap at destination.

## Type D — Moving Receiver

Traverse while signal propagates.

## Type E — Player Relay

Carry pulse through Link.

## Type F — Echo Memory

Echo repeats prior branch while player handles another.

## Type G — Adaptive Response

Tessel changes second cycle based on first successful pattern.

# Combat integration

Signals must matter during combat.

Examples:

- Pulse Cantor charges a network;
- Harmonic Knot shares enemy Stability through link;
- player reroutes pulse to stun both;
- Null Listener disables one relay zone;
- Phase into Resonant state to break Chorus Bloom node.

# Failure/reset

Common puzzle failure:

- resets in 2–4 seconds;
- preserves player position where safe;
- displays failed branch/state clearly.

Do not force long room traversal to retry.

# Multiplayer scaling

## 1P

- one or two branches;
- Echo supplies simultaneous role where needed.

## 2P

- direct branch split / signal handoff.

## 3P

- third player manages moving receiver, defense or cross-state bridge.

## 4P

- two branch pairs or four network segments with flexible Link handoffs.

No player becomes permanent idle receiver.

# Quick communication

Context pings include:

- Send here;
- Hold signal;
- Phase here;
- Link;
- Wait for pulse.

Voice chat is not required.

# Accessibility

Options:

- pulse speed reduction;
- larger overlap windows;
- stronger visual wave;
- node labels/icons;
- reduced background animation;
- no-audio critical path parity;
- colorblind-safe carrier patterns.

# Network

Server owns:

- signal graph state;
- pulse location/time;
- node state;
- completion;
- Tessel pattern selection.

Clients interpolate waves.

Do not replicate frame-by-frame waveform samples.

# Performance

- signal visuals are pooled;
- background waveform animation is local;
- active gameplay networks remain small;
- only nearby/relevant network nodes replicate;
- no FFT/audio analysis drives gameplay.

# Telemetry

Track:

- route attempts;
- wrong-state interactions;
- Link handoff failures;
- audio-disabled completion;
- visual-assist usage;
- signal overlap misses;
- Echo relay retries;
- 4P branch participation.

# Acceptance criteria

- players understand signals as routing, not rhythm;
- all critical timing is visually readable;
- Link creates genuine co-op handoff value;
- Phase and Flux have distinct roles;
- network graph remains deterministic;
- Tessel adaptation feels intelligent without becoming arbitrary;
- audio-disabled players can finish the region.
