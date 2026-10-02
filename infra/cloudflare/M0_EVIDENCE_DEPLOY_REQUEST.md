# M0 Evidence Deployment Request

**Request:** 32  
**Requested from baseline:** `5cbc514c5b6e75030a28d55fcf648a281d447745`  
**Purpose:** Publish the final M0.14 focal-hierarchy regression correction.

Deployment #31 passed all automated gates, but screenshot/code review found that two Pass 2 values were overwritten in the render loop: Scrapper staging reverted toward the old edge position and target scales were raised again after initialization.

This request publishes:

- tested target-presentation scale hierarchy: inactive 0.31, selected 0.42, active 0.49, Repel flash 0.54;
- tested authored Scrapper drift around the intended x=4.9 focal position;
- preserved authored Scrapper rotation baseline;
- `data-resonance-presentation-hierarchy="authored-subject-v2"` browser/smoke contract.

Deterministic movement, collision, target selection, authored-v2 assets and replay semantics are unchanged. Physical/human acceptance remains deferred and no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
