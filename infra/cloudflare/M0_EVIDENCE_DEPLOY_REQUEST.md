# M0 Evidence Deployment Request

**Request:** 30  
**Requested from baseline:** `a7b3ea2f709757675a38fe0efedba5e311043982`  
**Purpose:** Publish the first M0.14 authored-v2 visual identity candidate.

Deployment #29 completed M0.13 presentation motion/depth. Its retained screenshot is recognizably game-like but still dominated by first-generation placeholder geometry.

This request publishes:

- versioned v2 authored Mara Wayfarer GLB;
- versioned v2 damaged Scrapper GLB;
- versioned v2 Wayfarer Scar setdress GLB;
- `data-resonance-visual-identity="authored-v2"` runtime/smoke contract;
- reduced prototype target-scale dominance;
- corrected smoke HTTP semantics so cache 304s are not reported as failures while genuine request/HTTP failures are fatal.

Deterministic gameplay, collision, target selection and replay semantics are unchanged. M0 physical/human acceptance remains deferred and no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
