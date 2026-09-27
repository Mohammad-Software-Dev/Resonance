# M0 Evidence Deployment Request

**Request:** 5  
**Requested from baseline:** `1310a7b8969217e3dabd468fb6d11dd9e1068d1a`  
**Purpose:** Publish and automatically smoke-test the evidence build after adding exact-build stamping to performance exports.

Request 4 successfully created the account workers.dev namespace and deployed `resonance-m0-evidence`. Request 5 adds retained post-deploy evidence: Chromium loads the normal route and blind route, verifies blind diagnostics suppression and F7 questionnaire startup, exports both performance and blind-test JSON, and requires both exports to carry this deployed commit SHA.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
