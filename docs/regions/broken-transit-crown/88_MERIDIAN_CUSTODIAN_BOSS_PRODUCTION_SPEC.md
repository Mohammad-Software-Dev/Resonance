# Meridian Custodian — Major Boss Production Specification

**Region:** Broken Transit Crown  
**Encounter ID:** BOSS_BTC_MERIDIAN_CUSTODIAN  
**Type:** Mandatory late-game major boss / political-technical confrontation  
**Expected first-clear timing:** 5–10 attempts  
**Retry:** BTC26 Relay directly adjacent  
**Primary tests:** full-toolkit adaptation, anti-pattern counterplay, Link management, infrastructure-scale control, 1–4 player responsibility scaling

## Core fantasy

The Meridian Custodian is a highly trained human operator connected to Crown infrastructure through a large control rig.

The encounter is **not** a generic rival duel.

The operator is human-scale in decision-making but controls:

- temporary anchors;
- rail segments;
- suppressor fields;
- relationship reversals;
- Relay locks;
- platform orientation;
- Link interception;
- Phase-access barriers.

The boss uses the same engineering language the player has mastered.

## Narrative role

The Custodian believes:

- Periapsis failure is close;
- Wayfarer regional reconfiguration introduced unvalidated states;
- Tessel may be intelligent but remains an uncontrolled system-scale actor;
- regional autonomy cannot outweigh total habitat survival;
- forced standardization is justified if the alternative is orbital loss.

The player defeats or outmaneuvers the Custodian's control architecture; winning does not prove the worldview false.

## Operator identity

Working name:

**Executor Rhen Marr**

Final naming pass should check against the full cast before lock.

## Arena

Large Crown control chamber built around recognizable Transit rails.

Contains:

- 4 rail sectors;
- 6 anchor sockets;
- 2 Phase bridges;
- 2 Flux-inert emergency controls;
- central Custodian rig;
- outer moving platforms;
- Link relay nodes.

Arena changes through infrastructure state rather than arbitrary destruction.

## Boss resources

- Operator Integrity;
- Rig Stability;
- 4 Sector Control states;
- Countermeasure Memory;
- active Link Seizure state;
- topology revision.

Direct damage matters, but vulnerability is primarily created through Rig Stability / sector control.

# Phase 1 — Validated Route

**Target:** 90–150 seconds.

## Temporary Anchor Deployment

Boss creates anchors on authored sockets.

Some can be stolen/used by player.

## Route Lock

One repeatedly used anchor/rail is temporarily suppressed.

Telegraph:

- lock pattern;
- field build-up;
- response window.

Boss cannot lock all equivalent routes.

## Counter-Pulse

If player repeatedly reflects projectiles, boss introduces a telegraphed non-reflectable follow-up.

## Platform Reorientation

Rotates or shifts one rail/platform relationship.

Invert can counter selected cases.

## Vulnerability

Take control of two Sector Nodes.

Typical chain:

- Flux emergency control;
- Phase to alternate receiver;
- Invert rail relation;
- force node open.

### Solo

Sequential with Echo holding one node during overlap.

### 2P

One sector each.

### 3P

Two sectors + flex.

### 4P

Two paired sectors.

Success exposes rig.

# Phase 2 — Contested Network

**Target:** 100–180 seconds.

## Link Seizure

Boss can target an active player Link.

Telegraph:

- visible third-point lock;
- Link pattern change;
- warning.

If unresolved, boss redirects environmental force through the Link or breaks it at a bad time.

Counterplay:

- voluntarily break Link;
- Phase one endpoint if valid;
- route through Relay node;
- attack seizure controller;
- Invert tagged environment.

No instant unavoidable teammate damage.

## Habit Counter

System tracks a small authored set of repeated tactics:

- same anchor category;
- same aerial launch line;
- repeated Link revive route;
- repeated reflected projectile.

After threshold:

- boss telegraphs adaptation;
- deploys one temporary counter;
- counter expires/can be destroyed.

No uncommitted-input reading.

## Attacks

- Rail Split;
- Phase Seal;
- Flux Quarantine;
- Anchor Capture.

## Vulnerability

Three sector relationships must be destabilized across a broad overlap.

### 1P

Echo + sequential setup.

### 2P

Split lanes.

### 3P

Pair + anti-seizure flex.

### 4P

Two pairs with cross-targeted Links.

# Phase 3 — Emergency Authority

**Target:** 75–135 seconds.

Arena partly opens to exterior.

State:

- stronger current;
- fewer stable floors;
- moving rail arms;
- Phase bridges;
- emergency anchors.

## Attacks

### Authority Override

Briefly changes one shared infrastructure relationship.

Player can counter-Invert.

### Anchor Cascade

Deploys several anchors, then suppresses a subset.

### Relay Seizure

Boss attempts to control a recovery/Link relay.

### Emergency Purge

Large field sweep with explicit Material and Resonant safe options.

## Final objective

1. break emergency Sector Control;
2. reach central rig;
3. choose one valid shutdown interaction:
   - sever field control;
   - overload stabilization;
   - force operator disconnect.

All converge on the same state: Custodian loses exclusive control of Periapsis route.

No ending is chosen.

# Player-count scaling

| Players | Structure |
|---:|---|
| 1 | sequential sectors + Echo overlap |
| 2 | paired sectors |
| 3 | pair + anti-seizure/flex |
| 4 | two paired sector operations |

Prototype Integrity:

- 1P 1.00x
- 2P 1.35x
- 3P 1.60x
- 4P 1.85x

System responsibility scales more than HP.

# Fairness rules

Custodian cannot:

- disable all versions of one movement verb;
- steal Link without warning;
- lock the only safe anchor;
- read inputs before action;
- change Phase collision without telegraph;
- remove accessibility assists.

# Adaptive counter implementation

Use event counters, not ML.

At threshold:

- select validated counter PatternID;
- telegraph;
- activate;
- cooldown before same counter can recur.

Reset/decay between phases.

# Down/revive

Revive remains possible.

Boss may pressure revive location but cannot permanently camp a downed player with unavoidable field.

# Accessibility

Per-player assists may modify:

- incoming damage;
- counter telegraph duration;
- suppressor contrast;
- Link seizure warning;
- Phase state contrast;
- aim/target acquisition;
- boss speed within approved range.

# Network

Server owns boss state, sector state, countermeasure state, Link seizure, temporary anchors, topology revision and adaptation counters.

Clients render telegraphs, anchor VFX, rail interpolation, seizure lines and exterior presentation.

# Performance

At 4P:

- Custodian VFX has highest priority;
- background Crown effects reduce before gameplay cues;
- temporary anchors are capped;
- moving rails are parametric;
- Phase overlays remain light.

# Narrative finish

Custodian rig is disabled or force-disconnected.

Operator survives unless later narrative specifically requires otherwise.

Post-fight response can vary by evidence, Choir outcome, Shepherd completion and prior choices.

Winning does not force ideological conversion.

# Telemetry

Track:

- attempts;
- sector completion time;
- repeated-route counters triggered;
- Link seizures;
- voluntarily broken Links;
- Phase/Flux/Invert usage;
- deaths during counters;
- 4P role distribution;
- accessibility usage;
- abandon rate.

# Acceptance criteria

- feels like infrastructure control, not generic duel;
- boss counters habits without cheating;
- Link seizure is tense but fair;
- every player count has active responsibilities;
- full toolkit matters without input overload;
- narrative conflict remains credible;
- Periapsis route opens without deciding the ending.
