# Iteration 3J — Canonical Consolidation Summary

**Status:** Canonical consolidation complete  
**Purpose:** Record what changed and define the handoff from concept design to implementation planning.

# What 3J changed

Iteration 3J did not add a new region or foundational ability.

It reconciled the full design bible after Iterations 3A–3I.

## Core bibles replaced in place

Updated canonical versions:

- `23_ABILITY_AND_PROGRESSION_GRAPH.md`
- `24_WORLD_TOPOLOGY_AND_REGION_STATES.md`
- `25_ENEMY_ROSTER.md`
- `26_MAJOR_BOSS_ROSTER.md`

These now reflect:

- locked ability locations;
- final late-game structure;
- current Custodian enemy family;
- optional Astral Shepherd;
- Anchor Zero;
- four final configurations;
- reduced mandatory major-boss count.

# New canonical planning files

- `108_CANONICAL_CAMPAIGN_FLOW.md`
- `109_SUPERSESSION_AND_DEPRECATION_REGISTER.md`
- `110_MVP_VS_FULL_VERSION_1_MATRIX.md`
- `111_PRODUCTION_MILESTONE_ROADMAP.md`
- `112_ENGINEERING_PROOF_GATES.md`
- `113_CONTENT_DEPENDENCY_MATRIX.md`
- `114_CANONICAL_CAMPAIGN_STATE_SCHEMA.md`
- `115_FINAL_UNRESOLVED_DECISION_REGISTER.md`
- `116_TERMINOLOGY_AND_NAMING_CANON.md`

# Canonical product identity

Resonance remains a working title for:

- premium 2.5D action-exploration Metroidvania;
- PC-first;
- solo + 1–4 online co-op;
- named Wayfarers;
- challenging baseline;
- granular accessibility;
- host-owned campaign state;
- reactive regional decisions;
- orbital gas-giant setting.

# Canonical ability spine

- Attract;
- Repel;
- Link / Echo;
- Latch;
- Orbit;
- Vector Shift;
- Flux;
- Phase;
- Invert.

No further foundational critical-path movement ability.

# Canonical region spine

1. Wayfarer Scar / Transit opening.
2. Gravity Orchard.
3. Solar Foundry.
4. Flooded Observatory.
5. Rust Sea.
6. Choir Array.
7. Cloud Loom.
8. Broken Transit Crown.
9. Periapsis Core.

# Canonical mandatory major bosses

1. The Pendulum.
2. The Glass Regent.
3. Leviathan of the Flood.
4. Dust Cathedral.
5. Choir Prime.
6. Loom Harvester.
7. Meridian Custodian.
8. Anchor Zero.
9. Final Configuration Encounter.

Opening:

- Alignment Hound mini-Guardian.

Astral Shepherd:

- optional.

# Canonical finale

- Historical Continuity.
- Distributed Meridian.
- Open Resonance.
- Bounded Accord.

At least the first two remain available in every valid completed campaign.

# Superseded concepts

Major corrected items include:

- “12 mandatory major bosses” target;
- Astral Shepherd as normal critical progression;
- old Custodian enemy names;
- provisional ability-region wording;
- “Pale Engine” working name;
- early generic ending labels;
- generic region room-count target;
- any couch/local multiplayer Version 1 wording;
- any plan to retrofit 4P after 2P.

# Drive cleanup

Duplicate Crown files from the earlier write cycle were moved into:

`_ARCHIVE_SUPERSEDED_DUPLICATES`

The main folder should contain one active canonical copy of each Crown file.

# Production posture

The design is now broad enough.

The project should not continue inventing major systems without prototype evidence.

Recommended next phase:

> **Prototype execution and vertical-slice planning.**

# Immediate implementation priorities

1. repository/build skeleton;
2. precision controller;
3. Attract/Repel local feel;
4. networked CharacterMovement proof;
5. four-client session;
6. Link/rescue;
7. combat/shared objects;
8. Echo;
9. opening greybox;
10. Pendulum + Orchard transformation;
11. production-quality vertical slice.

# Owner decisions still open

Only a small number remain:

- final title;
- final public-facing configuration names;
- obsolete Anchor Prototype name if retained;
- public matchmaking inclusion;
- exact optional superboss count;
- contingency decision on Bounded Accord only if production risk becomes severe.

# Definition of design handoff readiness

The project is ready for structured implementation planning because canonical documents now answer:

- what happens from opening to credits;
- where abilities unlock;
- what each region adds;
- what bosses are mandatory;
- how solo/co-op scale;
- how regional decisions propagate;
- how finale configurations work;
- what V1 must protect;
- what can be cut;
- what engineering must prove first.

# Next recommended iteration label

Do not continue to Iteration 3K as another concept-design pass.

Use the next phase as:

**Implementation Phase 1 — M0/M1 Technical Prototype**

followed by:

**Vertical Slice Production — M4/M5**

unless prototype evidence requires a targeted design revision.
