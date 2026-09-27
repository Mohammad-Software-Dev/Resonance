# M0 Evidence Deployment Request

**Request:** 11  
**Requested from baseline:** `f12ffcb68f72a65b2973491dffb3ac67e2f8a764`  
**Purpose:** Publish the physical-test evidence candidate with full-window CPU/GPU/draw-call telemetry and evidence preflight tooling.

The prior candidate `7044e62be61f58f3b2edfae19bfc8dd0405d4621` passed deployed runtime smoke, but its performance export retained only frame/render-scale distributions while CPU/GPU/draw-call values were instantaneous. The physical signoff template requires CPU frame p95, GPU frame p95 when available, and draw-call range.

This request adds capture-window duration plus aligned CPU, GPU and draw-call samples/summary fields. The deployed smoke now requires those fields in the exported JSON. Gameplay, simulation, movement, targeting, Attract and Repel semantics are unchanged.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow. If request #11 passes, use that new exact commit for subsequent physical and blind acceptance evidence.
