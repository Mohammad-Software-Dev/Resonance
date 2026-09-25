# Final Content Scope and Production Risk Review — End of Iteration 3I

**Purpose:** Summarize the current Version 1 design scope and identify what must be protected, validated or cut first if production pressure rises.

# Current Version 1 identity

Resonance is a 2.5D action-exploration Metroidvania built around:

- precision Resonance movement;
- solo + 1–4 player online co-op;
- Echo as solo substitute for simultaneous co-op mechanics;
- named Wayfarer cast;
- interconnected transformed regions;
- systemic regional choices;
- challenging combat with granular accessibility;
- PC-first release.

# Critical major-region sequence

1. Wayfarer Scar / Transit opening.
2. Gravity Orchard.
3. Solar Foundry.
4. Flooded Observatory.
5. Rust Sea.
6. Choir Array.
7. Cloud Loom.
8. Broken Transit Crown.
9. Periapsis Core.

Exact optional ordering can vary where previously specified.

# Major boss stack

Core roster now includes:

- regional Guardians;
- Meridian Custodian;
- Anchor Zero;
- path-specific Final Configuration Encounter.

Astral Shepherd is optional.

Several other optional bosses/superbosses remain candidates.

# Major ability stack

Locked foundational abilities:

- Attract;
- Repel;
- Link/Echo;
- Latch;
- Orbit;
- Vector Shift;
- Flux;
- Phase;
- Invert.

Do not add another foundational late-game ability without replacing, not stacking.

# Finale scope

Four final configurations:

- Historical Continuity;
- Distributed Meridian;
- Open Resonance;
- Bounded Accord.

Production strategy:

- shared Periapsis environment kit;
- shared Anchor Zero systems;
- shared final chamber components;
- branch-specific topology/objective/state/VO;
- branch-specific epilogue logic.

Do not build four wholly separate final levels.

# Highest production risks

## 1. Networked movement feel

Highest product risk.

If Attract/Repel/Latch/current movement feels poor at latency, the whole project suffers.

## 2. Input complexity

Complete toolkit may exceed comfortable controller budget.

Requires early mapping/usability tests.

## 3. Echo reliability

Solo viability depends on Echo.

Must be deterministic and understandable.

## 4. Four-player readability

Visual density across Phase, Flux, Link, enemies and co-op can become unreadable.

## 5. Content volume

The current design is ambitious.

Each major region has detailed room/boss/enemy/system content.

Production may need regional content cuts while preserving identity.

## 6. World-state QA

Regional transformations and four final configurations create a large state matrix.

Derived aggregate states reduce but do not eliminate testing burden.

## 7. Boss complexity

Many bosses are system-heavy, moving-platform/state encounters.

Prototype reusable boss/system frameworks early.

# Recommended cut order under schedule pressure

Cut first:

1. optional rooms;
2. optional mini-bosses;
3. secondary NPC quests;
4. extra Module variants;
5. cosmetic state variants;
6. optional superbosses;
7. some regional afterstate side routes.

Protect:

- controller feel;
- Attract/Repel;
- Link/Echo;
- core major ability progression;
- one strong identity per region;
- major regional bosses;
- solo + 1–4 online architecture;
- fast retries;
- save/network correctness;
- regional transformation visibility;
- finale configuration distinction.

# Vertical-slice implication

The eventual vertical slice still needs to prove the game's hardest promises, not just look beautiful.

Recommended slice proof set:

- precision Attract/Repel;
- Latch/Orbit;
- Link with 2–4 online players;
- Echo solo solution;
- one systemic enemy group;
- one transformation;
- one boss using shared environment;
- latency test at target presets;
- strong visual identity.

Flux/Phase/Invert can remain later prototypes, but their architecture must be anticipated.

# Engineering gates before full content production

Do not scale content team heavily until these pass:

1. 150 ms movement proof.
2. Link/rescue proof.
3. Echo proof.
4. 4P encounter readability.
5. authoritative shared-object proof.
6. save/guest reward proof.
7. moving-platform prediction proof.
8. room-state transformation save/load.

# Narrative production risk

Branching regional consequences can create dialogue explosion.

Mitigation:

- state-aware modular lines;
- a small number of major consequence callbacks;
- epilogues select representative outcomes;
- avoid bespoke dialogue for every combination.

# Finale production risk

Four finale variants are viable only if:

- mechanics share foundations;
- environments share modular assets;
- QA uses aggregate-state matrices;
- epilogues are data-driven.

If scope must shrink, preserve three standard configurations first.

Bounded Accord can be delayed/cut before collapsing distinctions among the three standard philosophies, but current recommendation is to retain it if production supports the prerequisite/QA burden.

# Business/production implication

A polished smaller game is more valuable than an enormous inconsistent one.

The project's differentiators are:

- Resonance movement;
- systemic co-op/solo duality;
- reactive world;
- distinctive region mechanics;
- meaningful final configuration.

Protect those before raw room count.

# Documentation status

After Iteration 3I:

- major region design is complete at production-spec level;
- critical ability architecture is complete;
- major boss/finale architecture is complete;
- late-game world-state logic is complete;
- save/postgame philosophy is specified.

The next step is **canonical consolidation**, not another region.

# Iteration 3J recommendation

Iteration 3J should:

- reconcile older provisional documents;
- update major boss roster;
- update ability graph;
- update world topology;
- create one canonical end-to-end campaign flow;
- create production priority/MVP vs full Version 1 matrix;
- create milestone roadmap;
- create unresolved decision register;
- remove superseded contradictions from the index.

# Acceptance criteria

Iteration 3I is considered design-complete when:

- Periapsis/finale files are committed;
- index/open-decision files are updated;
- no critical contradiction remains unresolved;
- next work is consolidation and implementation planning rather than foundational game design.
