# M0 Evidence Deployment Request

**Request:** 6  
**Requested from baseline:** `8ea9caef9b5c0c4dddf1500f206db8ad9fcdf50b`  
**Purpose:** Publish and retain the first automated deployed-smoke evidence using the established workers.dev namespace.

Request 5 failed before build because the one-time account-subdomain onboarding step was not idempotent after request 4 had already created `resonance-mohammad-dev`. Routine deployments now preserve that established account-level namespace instead of attempting to create it again.

This deployment includes exact build IDs in both performance and blind-test exports, plus retained Chromium smoke evidence for the normal route, blind mode, hidden diagnostics, F7 questionnaire startup and build-ID equality.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
