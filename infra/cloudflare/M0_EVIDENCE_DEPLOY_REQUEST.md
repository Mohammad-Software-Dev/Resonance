# M0 Evidence Deployment Request

**Request:** 23  
**Requested from baseline:** `59e02e9b3daa056e1da47e8160a1998c763237dc`  
**Purpose:** Publish M0.12 Pass 10 with the authored damaged Scrapper replacement.

Changes:

- adds `/assets/visual/enemies/scrapper-damaged-m0.glb`;
- assigns the typed `scrapper-damaged` slot;
- loads the binary GLB before shader warmup;
- disables the procedural Scrapper body after successful import;
- retains the existing threat ring as gameplay-readable VFX;
- applies presentation-only idle drift, damaged-arm motion, loose-plate wobble and hostile-eye pulse to authored nodes;
- requires authored Scrapper mesh landmarks;
- requires `data-resonance-authored-scrapper="authored"` in deployed smoke;
- records explicit asset provenance and `shippingArt: false`.

Mara Venn remains authored from Pass 9. Both models are M0 authored placeholders, not final production art.

No movement, collision, target selection, Resonance-force, progression, combat, AI or deterministic replay semantics are changed.

Physical and blind-human acceptance remain deferred. No owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
