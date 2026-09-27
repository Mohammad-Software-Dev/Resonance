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
