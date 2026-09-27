# Cloudflare

Cloudflare hosts the browser-first static client and later CDN/R2 infrastructure.

## M0 evidence deployment

M0 uses Workers Static Assets for a production-style test URL.

Configuration:

- `wrangler.m0.jsonc`
- Worker name: `resonance-m0-evidence`
- asset root: `apps/web-client/dist`
- public route: the account's `*.workers.dev` URL
- blind-test entry: append `?blind=1`

The deployment contains no Worker script. It serves only the Vite production output.

### GitHub authentication

The manual `Deploy M0 Evidence Build` workflow requires these GitHub Actions repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Do not commit either value.

The deployment workflow validates both secrets before dependency installation or evidence-build work. If either is absent, it fails immediately with the missing secret name and does not spend CI time rebuilding an undeployable artifact.

The Cloudflare account was onboarded once during M0 evidence deployment request #4. Its established account namespace is `resonance-mohammad-dev.workers.dev`. Routine deployments do not mutate that account-level setting again; they deploy the project Worker at `https://resonance-m0-evidence.resonance-mohammad-dev.workers.dev`.

If the repository is ever moved to a different Cloudflare account, register a workers.dev account subdomain for that account and update the evidence URL in the workflow before requesting a deployment.

For a brand-new Worker, the token must be able to create the Worker in the selected Cloudflare account. After the Worker exists, reduce the token to the minimum permissions needed to deploy it.

### Deployment

A deployment can be initiated in either of two deliberate ways:

- manually run **Deploy M0 Evidence Build** from `main`; or
- update `M0_EVIDENCE_DEPLOY_REQUEST.md` through a reviewed PR and merge it to `main`.

The request-file path exists so automation clients that cannot call GitHub's workflow-dispatch API can still initiate a traceable evidence deployment without adding a broad deploy-on-every-push policy.

1. Merge only code that has passed the ordinary CI gate.
2. Initiate one of the two deployment methods above.
3. The workflow records the checked-out commit SHA and injects it into the Vite build as `VITE_BUILD_ID`.
4. The workflow reruns typecheck, unit tests, deterministic replay checks, production build and bundle budget before publishing.
5. Copy the deployed `workers.dev` URL from the Wrangler step.
6. Verify the normal route and `/?blind=1` on physical hardware before distributing it to testers.

The build SHA embedded in blind-test and performance exports must match the commit recorded for M0 signoff.

### Local validation

After a production build:

```text
pnpm deploy:m0:evidence:dry-run
```

This validates the Workers Static Assets package without uploading it.

An authenticated local deployment uses:

```text
CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_API_TOKEN=... pnpm deploy:m0:evidence
```
