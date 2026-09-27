# M0 Evidence Deployment Request

**Request:** 12  
**Requested from baseline:** `2ba1c4a54a4493a9737e7d2847e16a3b8ac20cd9`  
**Purpose:** Publish the final physical-capture candidate with deterministic backend selection.

Before physical collection began, the evidence procedure exposed one remaining reproducibility gap: a WebGPU-capable Chrome/Edge machine had no app-level way to force the WebGL2 fallback, and a nominal WebGPU run could silently fall back if WebGPU initialization failed.

This request adds evidence-only backend controls:

- `?backend=webgpu` — require WebGPU; fail visibly rather than silently falling back.
- `?backend=webgl2` — skip WebGPU entirely and use WebGL2 deterministically.
- no parameter / `?backend=auto` — retain normal runtime behavior.

Performance exports now record both the requested backend preference and active backend. The retained deployed smoke explicitly exercises `backend=webgl2` and requires matching export metadata. Gameplay and deterministic simulation semantics are unchanged.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

If request #12 passes, supersede `a18df4f0a3743964615da8ca146feb33584bd725` and use the new exact deployed commit for all subsequent physical and blind acceptance evidence.
