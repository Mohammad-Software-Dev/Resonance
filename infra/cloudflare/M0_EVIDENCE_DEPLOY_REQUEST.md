# M0 Evidence Deployment Request

**Request:** 10  
**Requested from baseline:** `55e269a695bcb8cfb86b0fe5f5d344db765f7b33`  
**Purpose:** Verify the deployed WebGL2 fallback after guarding both GPU-frame capture and counter reads.

Request 9 reached application-ready on the deployed build, then isolated a second Babylon instrumentation capability mismatch: the fallback engine lacks `getGPUFrameTimeCounter`, so reading `gpuFrameTimeCounter.current` crashed the first diagnostics update. GPU timing is now enabled and read only when the engine exposes both required methods. Unsupported fallback engines report `gpuFrameMs: null`, as the M0 performance contract already permits.

The retained deployed smoke remains unchanged: normal route runtime boot, blind mode, hidden diagnostics, F7 questionnaire startup, exact build IDs in performance/blind exports, and no unexpected page/console errors.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
