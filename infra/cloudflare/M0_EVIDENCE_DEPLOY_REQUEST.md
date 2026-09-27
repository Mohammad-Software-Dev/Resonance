# M0 Evidence Deployment Request

**Request:** 9  
**Requested from baseline:** `56d8aebef7dbb2eb853cf6847a253f653b5007bb`  
**Purpose:** Verify the real WebGL2 fallback after fixing unsupported GPU-frame instrumentation.

Request 8 isolated a real deployed fallback-path crash after shader warmup: `EngineInstrumentation.captureGPUFrameTime` called an engine capability absent from the active WebGL2 fallback. The performance monitor now enables GPU frame timing only when the active engine exposes the required capture function, with unit coverage.

The deployed smoke continues to record WebGPU initialization failure, but treats that message as expected only when application startup succeeds through the fallback path. Page errors and all other console errors remain failures.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
