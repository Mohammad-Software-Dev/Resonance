# M0 Evidence Deployment Request

**Request:** 29  
**Requested from baseline:** `03ad87c1c43353c52748a602d00e05037cff708c`  
**Purpose:** Publish M0.13 Pass 2 essential world-depth composition.

Deployment #28 proved the new Wayfarer presentation-motion state machine, but its retained WebGL2/Low screenshot revealed that the Low preset removed the entire backdrop and gas-giant vista. That made the course read like gameplay geometry suspended in a black test void.

Changes:

- keep the industrial backdrop and gas-giant vista enabled on all presets;
- continue gating only secondary Wayfarer Scar clutter behind `distantDetail`;
- add a two-ring orbital parallax silhouette using existing materials;
- re-stage the gas giant into the follow-camera field of view;
- make the gas-giant surface self-readable on fallback rendering;
- increase neutral deck-pattern value contrast without restoring cyan slabs;
- restrict route teal to small front-edge markers;
- replace the bright cyan Wayfarer ground ring with a subtle neutral grounding cue;
- improve shared shell/ceramic value separation for Mara and environment;
- publish `data-resonance-depth-composition="essential-v1"`;
- require `orbital-parallax-ring` and `gas-giant` in the landmark audit;
- preserve state-driven Wayfarer motion, traversal course v2, follow-focus-v1 camera and <=24 material gate.

No new material, collider, movement, targeting, force, progression, networking or replay semantics are introduced. No owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
