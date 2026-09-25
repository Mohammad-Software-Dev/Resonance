# Canonical Campaign State Schema

**Status:** Iteration 3J gameplay-state source of truth  
**Purpose:** Define canonical world-choice tags, derived late-game state and finale prerequisites.

This document layers gameplay-state naming on top of the technical save architecture in `38_SAVE_PROFILE_WORLD_STATE_SCHEMA.md`.

# Principles

- Host campaign owns irreversible world choices.
- World choices use stable semantic IDs/tags.
- Derived late-game state is recomputed from authoritative choices when practical.
- Do not use hidden morality scores.
- Guests do not overwrite host campaign choices.
- Choice commits are durable before transformed world presentation is treated as authoritative.

# Top-level campaign identity

Required conceptual fields:

- CampaignGUID;
- SaveSchemaVersion;
- WorldStateRevision;
- MainQuestState;
- RegionOutcomeTags;
- PermanentShortcutState;
- BossDefeatState;
- QuestSupportFlags;
- FinalConfigurationState;
- ChoiceLedger/debug history.

# Canonical regional outcome tags

## Gravity Orchard

- `World.Anchor.Orchard.Historical`
- `World.Anchor.Orchard.Adaptive`
- `World.Anchor.Orchard.Hybrid`

Meanings:

- Historical restoration;
- Adaptive stabilization;
- Hybrid calibration.

Exactly one final Orchard outcome tag is active.

## Solar Foundry

- `World.Anchor.Foundry.Historical`
- `World.Anchor.Foundry.Civic`
- `World.Anchor.Foundry.Spectrum`

Canonical display names:

- Historical Grid;
- Distributed Civic;
- Fractured Spectrum.

Exactly one active.

## Flooded Observatory

- `World.Anchor.Observatory.Historic`
- `World.Anchor.Observatory.Suspended`
- `World.Anchor.Observatory.Relief`

Canonical display names:

- Historic Channel Restoration;
- Suspended Basin Stabilization;
- Relief Diversion.

Relief also stores/derives the actual destination support target where relevant.

## Rust Sea

- `World.Anchor.Rust.Excavation`
- `World.Anchor.Rust.Tides`
- `World.Anchor.Rust.Migration`

Canonical display names:

- City Excavation;
- Stable Tides;
- Directed Migration.

Migration records a valid destination/support target.

## Choir Array

- `World.Anchor.Choir.CarrierLock`
- `World.Anchor.Choir.OpenChorus`
- `World.Anchor.Choir.PartitionedAccord`

Exactly one active.

## Cloud Loom

- `World.Anchor.Loom.Maximum`
- `World.Anchor.Loom.Stable`
- `World.Anchor.Loom.Distributed`

Canonical display names:

- Maximum Harvest;
- Stable Envelope;
- Distributed Lift.

Exactly one active.

# Crown state flags

Examples:

- `World.Crown.CustodianResolved`
- `World.Crown.ShepherdAligned`
- `World.Crown.PeripasisRouteOpen` — typo-prone; **do not use this spelling**.

Canonical route flag:

- `World.Crown.PeriapsisRouteOpen`

Optional support:

- `World.Crown.CustodianDiagnosticAccess`
- `World.Crown.TesselBoundedChannelRestored`

# Major optional support flags

Examples:

- `Support.AlignmentReserve`
- `Support.ControlledFieldChannel`
- `Support.DistributedCapacity`
- `Support.CustodianInterface`
- `Support.AnchorCalibration.Orchard`
- `Support.AnchorCalibration.Foundry`
- `Support.AnchorCalibration.Observatory`
- `Support.AnchorCalibration.Rust`
- `Support.AnchorCalibration.Choir`
- `Support.AnchorCalibration.Loom`

Individual quest files may use more specific flags, but final prerequisite logic should collapse them into stable support classes.

# Derived late-game state

## Power Reserve

Enum:

- Low;
- Medium;
- High.

Primary inputs:

- Foundry outcome;
- Loom outcome;
- selected power-support quests.

## Water/Thermal Stability

Enum:

- Fragile;
- Managed;
- Stable.

Primary inputs:

- Orchard;
- Observatory;
- Foundry;
- related support flags.

## Structural Access

Enum:

- Buried;
- Partial;
- Open.

Primary inputs:

- Rust;
- salvage/excavation support;
- Shepherd alignment where relevant.

## Field Communication

Enum:

- Locked;
- Open;
- Partitioned.

Primary input:

- Choir outcome;
- late bounded-channel support where applicable.

## Atmospheric Support

Enum:

- Maximum;
- Stable;
- Distributed.

Primary input:

- Loom outcome.

## Habitat/Adaptation Support

Enum:

- RestorationLeaning;
- Mixed;
- AdaptationLeaning.

**Production-only technical state.**

Do not expose this to players as morality, ideology or a score.

It summarizes which support actors/ecological systems can participate in Crown/Periapsis variants.

# Periapsis support-class derivation

## Controlled Field Channel

True if any approved path exists, including:

- Choir Partitioned Accord;
- Open Chorus + relevant Safe Band/mediation support;
- Carrier Lock + late bounded-channel restoration.

## Distributed Support Capacity

True if:

- Loom Distributed Lift; or
- enough qualified regional support/calibration flags are active.

Current design target:

three qualified regional support flags can substitute, subject to final balancing.

## Alignment Reserve

True if:

- Astral Shepherd completed; or
- substitute regional calibration requirement is met.

Current design target:

three Anchor calibration diagnostics can substitute.

## Custodian Interface Access

Version 1 baseline:

true after mandatory Crown resolution and preserved diagnostic interface.

Do not create a standard campaign path where this essential support class becomes permanently unknowable.

# Final configuration state

## Availability tags

Calculated at Configuration Forum.

- `Final.Available.HistoricalContinuity`
- `Final.Available.DistributedMeridian`
- `Final.Available.OpenResonance`
- `Final.Available.BoundedAccord`

Rules:

Historical Continuity = always true after Neutral Zero.

Distributed Meridian = always true after Neutral Zero.

Open Resonance = viable Tessel channel required.

Bounded Accord = all four support classes required.

## Commit states

Enum-like campaign state:

- None;
- Previewing;
- PendingHistoricalContinuity;
- PendingDistributedMeridian;
- PendingOpenResonance;
- PendingBoundedAccord;
- CompletedHistoricalContinuity;
- CompletedDistributedMeridian;
- CompletedOpenResonance;
- CompletedBoundedAccord.

Do not represent completion only as a loose boolean.

# Final transaction

Required conceptual sequence:

1. validate host authority;
2. validate current WorldStateRevision;
3. recompute configuration prerequisites;
4. create durable Pre-Commit Save;
5. host explicitly confirms;
6. write PendingConfiguration + increment commit revision;
7. run branch encounter;
8. on success write CompletedConfiguration record;
9. preserve pre-commit campaign state for Continue.

# Completion profile

Separate from active campaign world state.

May store:

- completed configuration;
- completion timestamp;
- world snapshot version/hash;
- optional mastery flags;
- challenge record.

It must not force contradictory post-ending states into the active campaign.

# Guest state

JoinSnapshot includes:

- CampaignGUID;
- WorldStateRevision;
- active region/room variants;
- relevant aggregate state;
- boss/encounter state;
- session licenses;
- party profiles.

Do not send the entire save file to guests.

# Stable identifier policy

Persistent objects and choices use:

- semantic GameplayTag/category;
- stable GUID where instance identity is required;
- human-readable editor label.

Never use array position as save identity.

# Versioning

Schema migrations remain incremental:

- V1 → V2;
- V2 → V3;
- etc.

When a tag is renamed after a shipped build:

- keep migration alias/tombstone;
- do not silently repurpose old tag.

# QA invariants

Every valid save must satisfy:

- exactly one committed outcome per completed major region;
- no mutually exclusive duplicate region outcome;
- critical-route graph valid;
- at least Historical Continuity and Distributed Meridian available after Neutral Zero;
- session ability mismatch recoverable;
- final commit state internally consistent.

# Canonical naming rule

Implementation code/data should use the exact tags in this document once production locks them.

If a later document proposes different tag spelling, this schema wins until explicitly versioned.
