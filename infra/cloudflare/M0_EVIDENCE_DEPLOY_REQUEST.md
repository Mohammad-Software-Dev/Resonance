# M0 Evidence Deployment Request

**Request:** 27  
**Requested from baseline:** `8a93f02a609fa57fa491476c520e66491d465abe`  
**Purpose:** Publish M0.12 Pass 14 game-style camera staging and close the implementation recovery milestone.

Pass 13 completed the three authored visual slots while keeping the loaded scene at 22/24 materials. Pass 14 improves presentation of those assets rather than adding more scene content.

Changes:

- move the perspective camera from room-wide engineering framing to a closer gameplay distance;
- follow the Wayfarer across the full three-deck authored route;
- preserve restrained velocity look-ahead;
- add bounded composition bias toward the currently selected Resonance target;
- add modest Relay/complete objective bias;
- strengthen aerial vertical tracking;
- retain frame-time-clamped smoothing;
- publish and smoke-test `data-resonance-camera-staging="follow-focus-v1"`;
- preserve traversal course v2, all three authored asset checks and the <=24 material gate.

No movement, collision, targeting, Resonance-force, combat, AI, progression or deterministic replay semantics are changed.

If deployment #27 is green, M0.12 visual-readability recovery is **implementation complete**. M0 physical and blind-human acceptance remain deferred/incomplete; no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
