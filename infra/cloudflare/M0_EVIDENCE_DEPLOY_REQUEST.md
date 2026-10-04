# M0 Evidence Deployment Request

**Request:** 36  
**Requested from baseline:** `c76b96ef2206036f7731848f845dc706fde8b6ac`  
**Purpose:** Publish the first M0.17 encounter-staging and traversal-path readability candidate.

Deployment #35 completed M0.16, but its retained screenshot exposed a composition issue: the damaged Scrapper could sit outside the opening camera frame while its hostile scan entered from off-screen, and long cyan/background elements still competed with the playable route.

This request publishes:

- presentation-only hostile staging at x=3.15 on the right gameplay plane;
- bounded camera bias toward the Scrapper only after player approach, while selected Resonance targets keep priority;
- one reusable orange line bracket around the hostile, adding no material;
- persistent-low hostile scan visibility tied to approach;
- brighter walkable deck/route accents using existing materials;
- quieter distant service conduits;
- lower idle-anchor visibility;
- `data-resonance-encounter-composition="encounter-path-v1"`.

The 24-material and 250-draw-call ceilings remain hard. Physics, collision, target selection, Attract/Repel semantics, objective progression and deterministic replay are unchanged. Physical/human acceptance remains deferred; no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
