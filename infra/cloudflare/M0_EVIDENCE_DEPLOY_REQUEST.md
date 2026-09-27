# M0 Evidence Deployment Request

**Request:** 2  
**Requested from baseline:** `5d8311efdf194d5e10263199fcafc551ef669f1e`  
**Purpose:** Retry the first externally reachable M0 acceptance build after aligning the deployment replay gate with normal CI.

Request 1 reached the deployment workflow but stopped before build/deploy because `pnpm test:replay` had no generated `m0-canonical.json`. The workflow now generates that artifact immediately after canonical fingerprint verification, matching the normal CI sequence.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
