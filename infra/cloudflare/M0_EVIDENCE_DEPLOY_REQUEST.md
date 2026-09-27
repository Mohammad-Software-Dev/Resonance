# M0 Evidence Deployment Request

**Request:** 17  
**Requested from baseline:** `d6f8d3513cf26ea27ea2e657526547923ec88903`  
**Purpose:** Publish M0.12 Pass 4 Resonance interaction readability.

This presentation-only candidate adds:

- a live Resonance interaction HUD;
- authored target labels for anchor/node types;
- explicit idle / locked / Attract / Repel presentation states;
- deployed-smoke checks for normal-route interaction HUD visibility and blind-mode HUD concealment.

No targeting, movement, force, collision, cooldown or deterministic replay semantics are changed.

Physical and blind-human acceptance remain deferred. No owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
