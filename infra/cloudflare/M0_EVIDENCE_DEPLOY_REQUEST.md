# M0 Evidence Deployment Request

**Request:** 39  
**Requested from baseline:** `661016e361ca11a67c1896b35fc0499161ee50c8`  
**Purpose:** Publish the final M0.17 camera-priority correction.

Deployment #38 proved the hostile presentation changes but its retained screenshot showed the Scrapper still off-screen. Root cause: idle Resonance target selection always overrode the encounter camera focus.

This candidate changes only presentation-camera priority:

- encounter focus owns the opening breach composition;
- an actively used Attract/Repel target may override encounter focus;
- idle selected targets no longer suppress hostile staging;
- runtime contract advances to `encounter-path-v3`.

No target-selection, physics, collision, gameplay, AI, objective or deterministic simulation behavior changes.

Physical/human acceptance remains deferred and no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
