# M0 Evidence Deployment Request

**Request:** 3  
**Requested from baseline:** `e66bf7d6f75fb0f3b8cb93f651337fc1acae305a`  
**Purpose:** Publish the first externally reachable M0 acceptance build after Cloudflare GitHub Actions credentials were configured.

Request 1 exposed a missing replay-generation step and produced no deployment. Request 2 passed the complete evidence build but failed at publish because the Cloudflare credentials were absent. Request 3 verifies the newly configured credentials through the workflow preflight and, if valid, deploys the evidence build.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
