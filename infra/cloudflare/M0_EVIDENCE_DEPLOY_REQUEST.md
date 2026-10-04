# M0 Evidence Deployment Request

**Request:** 37  
**Requested from baseline:** `6fbe6de0f7ac0503379750b5c1b19b32a220e9f1`  
**Purpose:** Republish M0.17 after restoring the hard 24-material ceiling.

Deployment #36 reached the live runtime and visually proved the new encounter composition, but deployed smoke correctly rejected the build because the additional `CreateLines` hostile bracket allocated one implicit Babylon line material, producing 25 materials instead of the hard limit of 24.

This request retains the successful M0.17 composition and changes only the bracket implementation:

- remove the extra line mesh/material;
- render the same orange hostile bracket as eight small corner bars;
- reuse the existing authored hostile material;
- preserve `data-resonance-encounter-composition="encounter-path-v1"`;
- preserve hostile staging, camera bias, route contrast, quieter background conduits and lower idle-anchor visibility.

Expected result: materials return to 24; draw calls remain below 250. Gameplay, collision, target selection, Attract/Repel semantics, objective progression and deterministic replay are unchanged. Physical/human acceptance remains deferred; no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
