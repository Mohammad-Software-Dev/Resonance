# M0 Evidence Deployment Request

**Request:** 4  
**Requested from baseline:** `a57376f2396d16a42a58e07221b6dc6df74c7087`  
**Purpose:** Publish the first externally reachable M0 acceptance build after completing one-time workers.dev account-subdomain onboarding.

Request 3 confirmed the Cloudflare credentials are valid and passed all evidence-build gates, then failed because the account had no workers.dev namespace. The deployment workflow now preserves an existing account subdomain and creates `resonance-mohammad-dev` only when none exists.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
