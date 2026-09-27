# M0 Evidence Deployment Request

**Request:** 13  
**Requested from baseline:** `7d4d1fe7b7cf38df9ff4b0f5c2ed14e9914f9aee`  
**Purpose:** Publish the physical-test candidate with a high-refresh-safe two-minute capture window.

Before physical collection began, review of the capture implementation found that the ring buffer was sized as `60 * 120` samples. On a 120/144/240 Hz display that could retain substantially less than 120 seconds even when the tester followed the protocol correctly.

This request increases the allocation-stable capture capacity to 120,000 samples, enough to retain at least two minutes up to 1000 samples/second. It also tightens the local preflight so a Tier M WebGPU capture below Medium preset is an objective failure. Gameplay and deterministic simulation semantics are unchanged.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

If request #13 passes, supersede `07c914155c74814a036cecf302b847792852b66c` before physical/human evidence collection begins and use the new exact deployed commit for all subsequent evidence.
