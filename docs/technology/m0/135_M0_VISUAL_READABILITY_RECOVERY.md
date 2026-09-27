# M0.12 Visual Readability / Recognizable Game Pass

**Status:** IN PROGRESS  
**Reason:** Product-owner review found the current representative room technically functional but visually too abstract to read as a game. Player, gameplay surfaces, traversal objects and Resonance targets are not sufficiently self-explanatory.

## Decision

Physical-performance and blind-human acceptance work is **deferred, not passed**. The existing evidence build remains a valid engineering artifact, but no M0 signoff is claimed and M1 is not considered accepted/unblocked.

No further owner-run physical testing is requested during this pass.

## Goal

Make the browser prototype immediately readable without relying on the diagnostics overlay.

A first-time viewer should be able to identify, from presentation alone:

- the playable Wayfarer;
- walkable deck/floor;
- walls and collision boundaries;
- moving platform;
- hazardous traversal surface;
- Resonance anchors;
- the far-side Relay/objective;
- foreground gameplay plane versus distant orbital structure.

## Art-direction constraints

Follow the canonical art direction:

- orbital industrial ecology;
- human/human-derived Wayfarer silhouette;
- ceramic + conductive industrial technology;
- luminous force-field language;
- no gothic insect, horned-mask or ruined-medieval visual vocabulary;
- depth must never masquerade as reachable geometry.

## Implementation pass

1. Replace gameplay-plane PBR dependence with explicit semantic materials that remain legible under WebGPU/WebGL2.
2. Give walkable, hazardous, movable and Resonance-interactive objects different shape/material languages.
3. Strengthen the Wayfarer silhouette with a readable body, visor/emitter accents and a grounding marker.
4. Add deck-edge trims, moving-platform rails and hazard bands.
5. Turn anchors from plain spheres into recognizable ring/core devices.
6. Keep distant machinery darker and less contrast-heavy than gameplay geometry.
7. Keep diagnostics hidden unless `?debug=1`.
8. Preserve all collision, target IDs, deterministic simulation and replay semantics.

## Automated acceptance for this pass

- typecheck/tests/build stay green;
- deterministic replay fingerprint and browser equivalence stay green;
- no gameplay-state changes;
- semantic presentation helper tests pass;
- normal route reaches ready state in automated smoke;
- blind route remains engineering-HUD-free.

## Human acceptance

Deferred until the project reaches a materially more game-like presentation. When resumed, physical/human evidence must be collected against the then-current deployed build. Previous missing evidence is not retroactively waived.


## Pass 2 — recognizable world composition

The second M0.12 pass moves beyond semantic contrast and adds recognizable world cues:

- in-world Meridian Transit / Wreck 07 signage;
- in-world Relay 07 destination signage;
- a visible transit bulkhead and maintenance/cargo props;
- a persistent Relay beacon column/halo;
- explicit moving-platform and hazard identity panels;
- non-overlapping cardinal anchor fins;
- a more human Wayfarer silhouette with collar, pelvis, boots and shoulder volumes;
- an automated visual-landmark boot contract so required scene landmarks cannot silently disappear.

This remains a presentation-only pass. Collision, fixed-step simulation, target IDs, Attract/Repel behavior and deterministic replay semantics are unchanged.

The deployed smoke must report `data-resonance-visual-landmarks="ready"` before a visual recovery build is considered automation-green.


## Pass 3 — material language

The third M0.12 pass reduces the remaining debug-primitive look without adding external art dependencies.

Presentation changes:

- procedural panel seams/rivets on walkable deck surfaces;
- distinct wall panel patterning;
- high-contrast hazard striping on dangerous traversal geometry;
- machinery/moving-platform surface markings;
- a banded gas-giant texture with a simple storm feature;
- no changes to gameplay collision or deterministic simulation.

The purpose is to make existing geometry read as authored orbital infrastructure rather than flat-color test primitives while keeping the browser bundle self-contained and reproducible.


## Pass 4 — Resonance interaction readability

The fourth M0.12 pass makes interaction state understandable without the engineering diagnostics overlay.

The normal game HUD now exposes four presentation states:

- idle scan;
- passive anchor lock;
- active Attract field;
- Repel burst/recovery.

The HUD names the selected gameplay object using authored terms such as Moving Anchor, Breach Anchor and Relay Node, and preserves the existing teal Attract / orange Repel VFX language.

This is presentation-only. It reads existing selection, Attract and Repel state and does not alter targeting, force application, movement, cooldowns or deterministic simulation.

The deployed smoke verifies that:

- a valid interaction state is published by the normal route;
- the Resonance interaction HUD is visible on the normal route;
- the full game HUD remains hidden in blind-test mode.


## Pass 5 — ability impact and objective choreography

The fifth M0.12 pass makes successful movement-system actions feel like game events rather than hidden state changes.

Presentation additions:

- a world-space expanding orange Repel shockwave using the existing line-rendering path;
- short objective-stage callouts for breach, Resonance discovery, Attract confirmation, Repel confirmation and Relay restoration;
- objective callout tones that reuse the existing neutral / Resonance / Repel / completion language;
- automated visual-landmark coverage for the Repel impact surface;
- deployed-smoke checks for objective choreography presence on the normal route and concealment in blind mode.

The pass observes existing gameplay state only. It does not alter target selection, force magnitudes, movement, collision, progression thresholds or deterministic simulation.


## Pass 6 — living encounter presence

The sixth M0.12 pass addresses the remaining empty-test-room feel by adding the first canonical hostile presence from the opening-room specification.

WS01 canon already calls for one damaged **Scrapper** blocking the door. This pass visualizes that beat without prematurely adding combat simulation:

- recognizable maintenance-construct torso/head/limb silhouette;
- hostile sensor eye distinct from Resonance teal;
- visibly damaged arm and loosened forearm plate;
- subtle unstable idle/patrol motion;
- ground threat ring that communicates hostile space without relying on color alone;
- required visual-landmark coverage so the encounter vignette cannot silently disappear.

This is deliberately presentation-only. The Scrapper has no hitbox, damage, health, attack resolution or AI authority yet. It does not alter Rapier collision, target selection, movement, Resonance forces, progression thresholds or deterministic replay.

The purpose is to make Wayfarer Scar read as an inhabited game space while preserving M0's deterministic foundation. Full combat belongs to the combat milestone rather than being smuggled into a visual-recovery pass.


## Pass 7 — animated wreck-state atmosphere

The seventh M0.12 pass makes Wayfarer Scar feel like an actively failing transit wreck rather than a static arrangement of geometry.

Presentation additions:

- broken conduit with intermittent electrical sparks;
- hanging cable / fault light with subtle motion and flicker;
- visible atmosphere leak / vapor plume;
- drifting lightweight wreck debris in the deeper presentation plane;
- graphics-preset-aware particle rates;
- visual-landmark enforcement for the major wreck-state cues.

All effects are presentation-only. They do not create colliders, forces, damage, navigation state, AI state or deterministic simulation input. The damage layer exists to communicate place, danger and motion while keeping the gameplay plane readable.


## Pass 8 — authored visual asset boundary

The eighth M0.12 pass stops treating code-generated meshes as the long-term art path.

Infrastructure added:

- Babylon glTF loader package pinned to the same engine version;
- typed runtime visual slots for the Wayfarer, damaged Scrapper and Wayfarer Scar set dressing;
- canonical `/assets/visual/` runtime root for authored `.glb` assets;
- URL/format validation;
- fail-safe procedural fallback when a slot is unassigned, invalid or fails to load;
- runtime `data-resonance-authored-visual-assets` state;
- deployed-smoke verification that the authored/fallback asset mode is always published.

Current slot URLs intentionally remain unassigned until actual reviewed art exists. This pass does **not** relabel the procedural M0 geometry as production art. It creates the replacement seam so real Blender/Babylon-authored assets can be introduced without changing collision, movement or deterministic gameplay code.

The next visual milestone should replace at least one major procedural subject through this path rather than adding more permanent code-generated geometry.


## Pass 9 — first authored character replacement

The ninth M0.12 pass uses the Pass 8 asset boundary for a real replacement rather than adding more permanent procedural character geometry.

Runtime asset:

- `/assets/visual/characters/wayfarer-mara-m0.glb`;
- slot: `wayfarer-player`;
- character identity: Mara Venn;
- binary glTF 2.0;
- explicit asset metadata: `wayfarer-mara-m0.asset.json`;
- status: authored M0 placeholder, **not shipping art**.

Presentation intent:

- readable adult human silhouette;
- ceramic field-rig plates;
- dark flexible suit;
- asymmetric shoulder treatment;
- visible Resonance gauntlet/emitter;
- backpack/resonance spine;
- non-gothic orbital-industrial language.

The deterministic simulation still moves the original invisible player presentation root. The authored GLB mirrors that state visually; collision, movement, target selection, Attract/Repel and replay hashes remain untouched.

Fail-safe behavior remains available in code, but this Pass 9 deployment is automation-green only when the authored Mara GLB actually loads. Deployed smoke requires both `data-resonance-authored-wayfarer="authored"` and authored mesh landmarks such as `Mara_Helmet` and `Mara_GauntletEmitter`.

This asset is deliberately a pipeline/recognizability step, not a claim of final character quality, rigging, skinning or animation.


## Pass 10 — authored hostile replacement

The tenth M0.12 pass replaces the procedural body of the WS01 damaged Scrapper with a second binary GLB:

- `/assets/visual/enemies/scrapper-damaged-m0.glb`;
- slot: `scrapper-damaged`;
- status: authored M0 placeholder, **not shipping art**;
- provenance: `scrapper-damaged-m0.asset.json`.

The authored body keeps the recognizable maintenance-construct language established in Pass 6: industrial shell, dark joints, single hostile sensor, asymmetrically damaged arm and loose forearm plate.

The existing procedural threat ring remains as gameplay-readable VFX rather than being baked into the model. Presentation-only idle drift, damaged-arm motion, loose-plate wobble and hostile-eye pulse are applied to the authored mesh nodes.

No combat body, hitbox, health, attack, AI, pathing or deterministic gameplay authority is introduced. The enemy remains a visual vignette.

Deployment is considered automation-green only when both authored subjects load:

- `data-resonance-authored-wayfarer="authored"`;
- `data-resonance-authored-scrapper="authored"`.

The landmark audit additionally requires `Scrapper_Torso`, `Scrapper_HostileEye` and `Scrapper_LooseForearmPlate`.


## Pass 11 — presentation material-budget consolidation

The eleventh M0.12 pass responds to a concrete regression signal from the Pass 10 deployed smoke: the scene had grown to **40 materials**, exceeding the earlier M0 target of 24.

The pass preserves the authored Wayfarer and Scrapper while reducing material residency:

- imported Mara and Scrapper material slots are remapped onto the room's existing authored presentation palette;
- replaced GLB materials are disposed after remapping;
- successfully replaced procedural Wayfarer fallback meshes/materials are released;
- successfully replaced procedural Scrapper body meshes/materials are released while its gameplay-readable threat ring remains;
- the retained threat ring moves onto the shared hostile/emergency material;
- wreck sparks, fault infrastructure and air-leak presentation reuse existing dark/emergency/route materials instead of owning three additional materials;
- released fallback meshes are no longer animated.

This is a resource consolidation pass, not a visual rollback. The authored binary meshes remain active and the deterministic simulation is untouched.

The deployed smoke now makes the material target executable: a visual-recovery build fails deployment smoke when `performance.graphics.materials > 24`.

The third authored set-dress slot should not be assigned until this budget gate is green.


## Pass 12 — real traversal topology

The twelfth M0.12 pass replaces the remaining flat continuous test floor with a spatially legible Wayfarer Scar traversal route.

Gameplay/runtime changes:

- the 16-unit continuous floor becomes three separated deck colliders;
- the first breach spans the moving-platform route;
- a second gap separates the center deck from the relay-side deck;
- the central Resonance pillar remains a physical obstacle;
- the existing slope leads into the relay approach;
- visible hazard fields sit below both breaches;
- deck-edge and route-marking presentation is split so no decorative strip visually bridges a real gameplay gap.

Deterministic proof:

- headless fixture advances from `m0-representative-course@1` to `@2`;
- browser F9 replay exports use the same fixture version;
- the canonical 360-tick trace is intentionally retimed for the broken-deck route;
- the canonical fingerprint is intentionally regenerated;
- replay tests require the trace to enter the first breach region, reach the relay-side approach, and exercise both Attract and Repel;
- deployed smoke requires `data-resonance-traversal-course="v2"` in addition to the visual-landmark audit.

This is the first M0.12 pass that changes the representative course's collision topology. It is intentional and fully mirrored between browser physics and the engine-independent replay fixture. Physical/human acceptance remains deferred; no owner-run testing is requested.


## Pass 13 — authored Wayfarer Scar set dressing

The thirteenth M0.12 pass assigns the third typed authored slot after Pass 12 confirmed the scene remained below the 24-material target.

Runtime asset:

- `/assets/visual/environment/wayfarer-scar-setdress-m0.glb`;
- slot: `wayfarer-scar-setdress`;
- status: authored M0 placeholder, **not shipping art**;
- provenance: `wayfarer-scar-setdress-m0.asset.json`.

The GLB replaces the procedural presentation for:

- the left-side Meridian transit bulkhead;
- the cargo cluster and maintenance cases;
- the overhead service-spine/conduit cluster;
- small resonance/damage accents embedded in those assemblies.

The world-space signs, Relay beacon, gameplay collision, broken-deck topology and objective VFX remain separate so semantic gameplay readability is not baked into decorative art.

Resource discipline:

- imported `Scar_Shell`, `Scar_Ceramic`, `Scar_Resonance` and `Scar_Damage` materials are remapped to the existing room palette;
- imported materials are disposed after remapping;
- replaced procedural set-dress meshes are disposed after successful authored load;
- the deployed smoke still fails above 24 loaded materials.

Automation now requires:

- `data-resonance-authored-setdress="authored"`;
- authored landmarks `Scar_TransitBulkhead`, `Scar_CargoCluster` and `Scar_ServiceSpine`;
- existing Mara/Scrapper authored checks;
- traversal course v2;
- the <=24 material gate.

No gameplay semantics are changed. Physical/human acceptance remains deferred and no owner-run testing is requested.
