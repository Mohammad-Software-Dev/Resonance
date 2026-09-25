# Vertical Slice and Production Roadmap

## Production principle

Do not build the world before proving the **movement + Resonance + four-player-capable networking + Echo** foundation.

The project's biggest risk is not content quantity. It is whether force-based cooperative movement feels precise online and remains readable.

## Phase 0 — Paper/system design

Deliverables:

- input/state diagrams;
- mass/force rules;
- co-op consent/rescue rules;
- save/world ownership model;
- one boss paper design;
- one solo Echo puzzle;
- one co-op traversal room.

Exit criterion: no unresolved contradiction requiring different core physics models for solo and multiplayer.

## Phase 1 — Movement prototype

Greybox only.

Build:

- run/jump/air control;
- Attract/Repel;
- fixed/mobile anchors;
- camera;
- basic attack;
- one simple enemy;
- debug visualization for forces.

Test question: Is traversal fun in an empty room?

Kill/redo if not.

## Phase 2 — Four-player-capable network prototype

Add:

- host plus up to three online clients from the architecture outset;
- online join;
- player Link;
- launch/catch;
- shared critical object;
- moving enemy;
- 30–250 ms simulated latency;
- reconnect/state restoration.

Exit criteria:

- four simultaneous clients can complete the stress room without state divergence;
- launches feel predictable at 150 ms;
- no frequent hard teleports/corrections;
- host/client agree on critical object states;
- disconnect does not corrupt session.

## Phase 3 — Echo prototype

Add:

- record/playback;
- switches;
- Attract/Repel reproduction;
- Echo as Link/anchor target;
- fast reset.

Build the same puzzle in:

- solo Echo version;
- two-player human version.

Exit criterion: both are enjoyable and understandable.

## Phase 4 — Combat prototype

Build:

- light/heavy attack;
- stability;
- armor stripping;
- throwable plate;
- Fracture Health;
- projectile reflection;
- 4 enemy roles.

Co-op test: pass/redirect object between players.

## Phase 5 — Boss prototype

Build one Guardian in greybox: recommended **The Pendulum** or **Astral Shepherd**.

Requirements:

- three phases;
- movement transformation;
- Resonance interaction;
- solo Echo solution;
- two-player cooperative solution;
- player-count adaptation;
- restart flow.

If boss is only fun because of visuals, core system is not ready.

## Phase 6 — 45–60 minute vertical slice

Suggested region: a compact part of Gravity Orchard leading into Pendulum Guardian.

Contents:

- opening traversal beat;
- 4 standard enemy types;
- 1 elite;
- 2 NPCs;
- 2–3 secrets;
- Relay;
- small map;
- one Core and 3–5 Modules;
- one Echo puzzle;
- one co-op-specific expression with solo parity;
- mini world-state transformation;
- full boss;
- final art/audio quality representative of shipping target.

## Vertical slice success questions

Quantitative targets are provisional. Qualitative signals matter most.

Ask:

- Do testers replay movement rooms voluntarily?
- Do two players communicate naturally?
- Do players discover unscripted combinations?
- Can players identify force direction instantly?
- Does solo Echo feel clever or like work?
- Are deaths followed by “again” rather than frustration?
- Can viewers understand the hook in short clips?

## Production scope hypothesis

Full game target:

- 18–22 hour main path;
- 8 major regions;
- 10–12 major bosses;
- 10–14 optional/mini bosses;
- 35–45 enemy archetypes/variants;
- 15–20 major recurring NPCs;
- 6 major system abilities;
- 3–4 narrative endings;
- 1–4 players.

This is ambitious. If team size is small, reduce region/boss count before reducing movement/combat quality.


## Recommended production team

For the owner-selected scope—2.5D, named characters, meaningful story, challenging combat, **1–4 online players from day one**, PC first—the recommended baseline is **10–14 full-time core developers during full production**, supported by specialist contractors and expanded QA near alpha/beta.

Couch/local multiplayer is out of scope for Version 1. Production does not need to budget for split-screen, shared-machine controller routing or hybrid local+online sessions.

Suggested core shape:

- 1 game/creative director (can also be lead systems designer);
- 1 producer/project manager;
- 3 engineers: gameplay/physics, network/online, tools/engine; a fourth engineer is highly valuable later for UI/platform/performance;
- 2 game/level designers, one owning world/encounters and one systems/bosses/quests;
- 3–4 art staff spanning art direction/environment, character/animation, technical art/VFX and UI as needed;
- 1 narrative/quest designer-writer (can be part-time early if a designer carries narrative);
- audio/composer through a dedicated contractor or small external team;
- QA begins external/part-time, then grows to dedicated multiplayer/network QA before content complete.

A 6–8 person team could attempt the project but would likely require either a much smaller world or a longer schedule. A 15–20 person team lowers bottlenecks and lets the 18–22 hour content target breathe, but raises burn rate substantially. **10–14 core is the recommended balance between ambition and control.**

The most dangerous roles to under-staff are network engineering, technical art/animation and QA. Multiplayer defects and 2.5D presentation problems compound late if these are treated as contractor clean-up tasks.

## Team disciplines needed

At minimum across internal team + contractors:

- game/design director;
- gameplay programmer;
- network programmer or strong network-capable gameplay engineer;
- level designer;
- 2D/3D environment artist(s) depending on chosen rendering style;
- character/animation artist;
- VFX/technical art;
- audio/music;
- narrative/design support;
- QA with networking focus;
- production/project management.

One person can cover multiple roles, but networking + systemic physics makes a three-person production much riskier than a conventional single-player Metroidvania.

## Milestone order

Recommended:

1. Core movement proof.
2. Network proof.
3. Echo proof.
4. Combat proof.
5. Boss proof.
6. Art-direction proof.
7. Vertical slice.
8. External playtest/demo validation.
9. Full production.
10. Content-complete alpha.
11. Online/network stress beta.
12. Certification/launch.

## Scope kill-list

Features to cut before damaging the core:

- public matchmaking;
- cross-play at launch;
- large crafting system;
- fully voiced incidental NPCs;
- dozens of mini-games;
- complex cosmetics system;
- procedural challenge modes;
- New Game+ variants.

Protect at all costs:

- movement feel;
- Resonance readability;
- 1–4 player online quality;
- solo Echo quality;
- bosses;
- world transformations;
- save correctness.

## Risk register

### High: Networking + physics

Mitigation: prove early; authoritative state; design timing windows for latency.

### High: Solo/multiplayer content duplication

Mitigation: shared conceptual mechanics with Echo parity; avoid building two campaigns.

### High: Camera/readability with 4 players

Mitigation: design and stress-test effects/camera/targeting at 4-player load from the first network milestone; keep encounter grammar readable at every player count.

### Medium: Content scope

Mitigation: modular regions; fewer higher-quality bosses/biomes.

### Medium: World-state branching QA

Mitigation: constrain Anchor state combinations; state-machine tooling; automated save tests.

### Medium: Art identity drift toward genre references

Mitigation: originality review at concept gates; style bible; silhouette tests.
