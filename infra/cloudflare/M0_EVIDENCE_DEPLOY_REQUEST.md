# M0 Evidence Deployment Request

**Request:** 28  
**Requested from baseline:** `239b2fdb71feb09ff9c9bc86fee0c41652e32dd9`  
**Purpose:** Publish M0.13 presentation-motion and depth-polish candidate.

M0.12 is implementation-complete. Physical and blind-human acceptance remain deferred, so this deployment continues visual/game-feel presentation without claiming M0 signoff.

Changes:

- add a pure state-driven Wayfarer presentation-pose resolver;
- distinguish idle, run, airborne, evade, Attract and Repel/recovery visual poses;
- apply bounded bob/lean/squash and authored helmet/emitter motion after deterministic simulation;
- publish `data-resonance-wayfarer-motion`;
- deployed smoke verifies an actual grounded-to-run presentation transition;
- darken the main deck/machinery palette so teal is reserved for Resonance and route accents;
- move bright route marks to thin front-edge strips rather than large glowing deck panels;
- render breach fields with the existing patterned hazard material instead of flat orange slabs;
- add mild image-processing contrast and a warm low-intensity rim light;
- keep the existing 22-material authored palette and <=24 deployed-smoke gate.

No collision, movement, target selection, force, progression, networking or replay semantics are changed. No owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
