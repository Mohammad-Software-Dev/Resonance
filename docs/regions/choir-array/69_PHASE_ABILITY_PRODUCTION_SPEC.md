# Phase — Production Ability Specification

**Ability tier:** Tier 4 — State Mastery  
**Acquisition region:** Choir Array  
**Primary purpose:** Temporarily shift the player into an overlapping Resonant field-state with different collision, interaction and vulnerability rules.

# Conceptual distinction

## Flux

Changes the target:

> Inert target becomes Resonant.

## Phase

Changes the player:

> Player occupies a different field-state.

These must never collapse into two flavors of “colored key.”

# Baseline states

## Material State

Default.

Interacts with:

- normal collision;
- ordinary enemies;
- normal anchors;
- Material signal nodes.

## Resonant State

Temporary Phase state.

Interacts with:

- Resonant-only collision;
- Phase entities;
- Phase anchors;
- alternate signal nodes;
- selected hazards/barriers.

The player remains at the same world location.

# Not a duplicate world

Implementation rule:

- one world;
- shared transform;
- state masks/tags decide collision and interaction;
- selected actors expose state-specific components/variants;
- local VFX changes presentation.

Do not duplicate every room, enemy and physics object.

# Activation

Prototype:

1. press Phase action;
2. short state-transition frame;
3. enter Resonant State;
4. remain for limited duration or until canceled;
5. return to Material State.

Exact control may use tap-to-toggle-with-duration or hold depending playtest.

It must work during movement.

# Duration

Phase should be long enough for:

- one traversal maneuver;
- short combat exchange;
- signal interaction.

It should not be so long that state choice becomes irrelevant.

Duration can vary through upgrades/accessibility.

# Heat / cost

Recommendation:

Phase uses a **Phase Charge / cooldown-like reset rule rather than continuously draining Heat**.

Reason:

- Flux already uses Heat;
- Phase has different conceptual identity;
- stacking all major abilities onto one Heat economy can create waiting.

Prototype:

- one Phase charge;
- recharge after Material-state recovery window or stable contact;
- selected Ghost Core/Module effects alter recharge.

Final tuning requires playtest.

# Safe re-entry

Critical rule:

Returning to Material State cannot place player inside solid Material collision.

Before Phase ends:

- predict/material-space check;
- if blocked, delay re-entry briefly;
- attempt nearest authored safe displacement;
- if no safe return, state remains Phase for short grace and warns player.

No instant crush because timer ended.

# Collision masks

Phase-compatible actor specifies:

- Material collision;
- Resonant collision;
- both;
- none;
- transition behavior.

Examples:

- Phase Barrier: Material solid / Resonant passable.
- Resonant Bridge: Material absent / Resonant solid.
- Dual Rail: different route in each state.
- Harmonic Hazard: safe in one state, lethal in other.

# Targeting

Resonance targeting filters by current state.

A target may be:

- Material-only;
- Resonant-only;
- Dual-state.

Target reticle clearly communicates valid state.

Flux and Phase may combine:

- Flux target in Material;
- Phase and interact with its Resonant-side function if authored.

# Traversal

## Barrier pass

Phase through selected collision.

## Phase anchor

Enter Resonant State → Latch/Orbit to anchor absent in Material.

## State-route swap

Move along Material route, Phase midair, catch Resonant route.

## Hazard avoidance

Selected wave/hazard exists only in one state.

Phase is not universal invulnerability.

# Combat

## State vulnerability

Tone Shade and selected enemies have active/vulnerable state rules.

## Phase counter

A player may Phase through selected telegraphed attack if attack StateMask does not affect current state.

Not all attacks are phaseable.

## Offensive use

Certain attacks/modules can interact differently during Phase.

Baseline Phase does not automatically grant damage bonus.

# Puzzle

Uses:

- occupy Resonant-only node;
- route signal across state;
- cross topology;
- alternate node activation;
- observe Tessel pattern invisible in Material.

# Link

Baseline Link rule:

- Link requires state compatibility unless one endpoint/node explicitly bridges states.

If one player Phases:

- ordinary Link may break after short grace;
- clear warning before break.

Upgrade candidate:

**Phase Link** — maintain one Link across state boundary briefly.

# Echo

Echo records:

- Phase enter;
- Phase exit;
- current state;
- TargetID interactions.

Playback:

- transitions at recorded time;
- uses same safety validation;
- fails clearly if state-specific object no longer valid.

Echo cannot “stay phased forever” because recording ended inside state.

# Multiplayer

Each player has independent Phase state.

World actors remain server-authoritative.

This enables:

- Player A Material;
- Player B Resonant;
- both in same room/location network.

State must be visible enough for teammates to understand.

## Teammate representation

When states differ:

- teammate remains visible as a reduced/outlined field silhouette;
- position remains readable;
- ping/Link status persists as permitted.

Do not make phased teammates effectively invisible.

# Network

Server owns:

- authoritative Phase state;
- start time;
- duration/charge;
- collision mask state;
- target validity.

Owning client predicts transition presentation and local movement response.

Replicate:

- state enum;
- transition timestamp;
- charge/recovery state;
- relevant state revision.

Do not replicate an alternate-world actor set per player.

# CharacterMovement integration

Phase is a movement/state modifier, not necessarily a full new locomotion model.

Movement remains:

- same velocity;
- same gameplay plane;
- same gravity unless a specific Phase volume modifies it.

Saved move may include:

- Phase activation;
- cancel;
- state sequence ID.

Server collision validation uses the player’s active Phase state for that move.

# Late join

Joining client receives:

- each player Phase state;
- state start/recovery;
- active Phase-compatible actor states;
- signal-network state.

No historical transition replay required.

# Accessibility

Per-player options may modify:

- Phase duration;
- re-entry warning strength;
- state-edge contrast;
- Phase target outline;
- reduced screen distortion;
- stronger visual timing;
- optional automatic safe-return assist.

Accessibility cannot auto-solve route choice.

# VFX language

Material:

- ordinary rendering.

Transition:

- localized field-line shear / silhouette split.

Resonant:

- subtle edge pattern;
- altered background signal layer;
- valid Resonant targets become legible.

Avoid full-screen heavy chromatic distortion.

# Audio

Phase:

- entry cue;
- stable-state texture;
- decay/recovery cue;
- invalid/safe-return warning.

All critical information has visual equivalent.

# Upgrade candidates

## Phase Carry

Preserve one light compatible Resonant object through transition.

## Phase Link

Maintain one Link across state boundary briefly.

## Phase Counter

Perfect transition through selected attack grants a small tactical reward.

## Long Step

Slightly longer Phase duration after skilled action.

These are later progression, not baseline.

# Sequence-break policy

Phase may unlock:

- optional routes;
- shortcuts;
- lore;
- old-region challenge rooms.

Do not allow Phase to:

- pass arbitrary world collision;
- skip irreversible triggers;
- enter late bosses without quest state;
- bypass Invert acquisition.

# Telemetry

Track:

- activations;
- deaths within 1s of re-entry;
- blocked re-entry events;
- Phase target attempts;
- state-vulnerability combat use;
- midair route swaps;
- Link breaks from Phase;
- Echo Phase playback;
- 4P mixed-state occupancy.

# Acceptance criteria

Phase is approved when:

- players understand state distinction quickly;
- safe re-entry prevents unfair deaths;
- traversal/combat/puzzle use all appear soon after unlock;
- it feels distinct from Flux;
- it does not function as universal dodge/invulnerability;
- mixed-state co-op remains readable;
- 150 ms play remains responsive;
- no duplicate-world simulation is required.
