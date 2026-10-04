# M0 Evidence Deployment Request

**Request:** 35  
**Requested from baseline:** `b9320c1f58eccbca1aadbda96e059155431d26f5`  
**Purpose:** Publish the M0.16 hostile-silhouette refinement.

Deployment #34 proved `hero-hostile-v1` and kept the hard rendering budgets green, but its retained screenshot still showed the damaged Scrapper as too crate-like and the hostile scan only intermittently.

This request publishes:

- low/wide Scrapper scaling to expose maintenance-drone articulation;
- a slight three-quarter enemy yaw;
- a small vertical staging lift;
- stronger but bounded damaged-arm and loose-plate motion;
- persistent-low / pulsed-high hostile scan intensity;
- `data-resonance-subject-readability="hero-hostile-v2"`.

The scan still reuses the existing Resonance tether mesh, so no material is added. The 24-material and 250-draw-call ceilings remain hard. Gameplay, collision, target selection, force semantics and deterministic replay remain unchanged. Physical/human acceptance remains deferred; no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
