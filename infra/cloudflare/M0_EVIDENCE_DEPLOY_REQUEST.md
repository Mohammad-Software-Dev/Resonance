# M0 Evidence Deployment Request

**Request:** 26  
**Requested from baseline:** `5f83cc3abaa32b6ae1f3738adda9f3f99c8bdac8`  
**Purpose:** Publish M0.12 Pass 13 authored Wayfarer Scar set dressing.

Pass 12 established the real three-deck traversal topology and retained the material budget at 22/24. Pass 13 now assigns the third authored visual slot rather than adding more procedural presentation.

Changes:

- assign `wayfarer-scar-setdress` to `/assets/visual/environment/wayfarer-scar-setdress-m0.glb`;
- add explicit asset provenance metadata;
- load the GLB through the existing authored visual boundary;
- remap/dispose imported materials onto the shared room palette;
- dispose the superseded procedural bulkhead/cargo/conduit meshes after successful load;
- require authored environment landmarks in the visual audit;
- require `data-resonance-authored-setdress="authored"` in deployed smoke;
- preserve authored Mara/Scrapper checks, traversal course v2 and the <=24 material gate.

No Rapier collision, movement, target selection, Resonance-force, combat, AI, progression or deterministic replay semantics are changed.

Physical and blind-human acceptance remain deferred. No owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
