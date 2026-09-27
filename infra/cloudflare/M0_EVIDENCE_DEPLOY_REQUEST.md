# M0 Evidence Deployment Request

**Request:** 7  
**Requested from baseline:** `bbe9d880e97dd1ef85affe74d1344b07570e00ce`  
**Purpose:** Rerun deployed acceptance smoke with explicit CI software-WebGL support and retained failure diagnostics.

Request 6 deployed successfully but its Chromium smoke timed out waiting for the runtime diagnostics marker. The smoke now launches Chromium with explicit ANGLE/SwiftShader software-WebGL flags and retains smoke JSON, screenshots, DOM, console errors and page errors on both success and failure.

All original smoke assertions remain: normal route runtime boot, blind mode, hidden diagnostics, F7 questionnaire, and exact deployed commit SHA in both performance and blind-test exports.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
