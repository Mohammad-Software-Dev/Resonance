# M0 Deployed Smoke Evidence

**Status:** PASS — automated deployment/runtime smoke only  
**Evidence build:** `7044e62be61f58f3b2edfae19bfc8dd0405d4621`  
**Workflow:** Deploy M0 Evidence Build #10  
**Workflow run:** `36315331943`  
**Public URL:** `https://resonance-m0-evidence.resonance-mohammad-dev.workers.dev`  
**Smoke artifact:** `10930925566`  
**Artifact digest:** `sha256:2fa153fd0a4989217c48c6b17e5056f47fe95b7e3dfdd53662991108880705c5`  
**Artifact expiry:** 2026-10-27T11:20:24Z

## What this evidence proves

The deployment workflow completed all repository-side gates before publish:

- typecheck;
- unit tests;
- canonical replay fingerprint verification;
- canonical replay artifact generation;
- deterministic replay verification;
- 30/45/60/90/120/144 cadence matrix;
- production build;
- bundle budget;
- Cloudflare Workers Static Assets deployment.

The retained Chromium deployed smoke then verified:

- root route returned HTTP 200;
- application reached the explicit `ready` boot phase;
- build marker matched `7044e62be61f58f3b2edfae19bfc8dd0405d4621`;
- WebGL2 fallback booted successfully in the headless CI environment;
- performance export used schema `resonance.m0.performance-capture.v1`;
- performance export `buildId` matched the deployed commit;
- `/?blind=1` returned HTTP 200;
- blind-test body/prompt initialized;
- engineering diagnostics were hidden in blind mode;
- F7 opened the blind questionnaire;
- blind export used schema `resonance.m0.blind-test.v1`;
- blind export `buildId` matched the deployed commit;
- no page errors, request failures or HTTP failures were observed.

The smoke recorded the expected WebGPU initialization failure in this headless software-renderer environment and accepted it only because the application completed startup through the WebGL2 fallback.

## Diagnostic snapshot

The automated headless smoke reported, for diagnostic context only:

- backend: WebGL2 fallback;
- WebGL2 context available: yes;
- shader warmup: 609.5 ms;
- runtime shader compile after warmup: 0.0 ms;
- draw calls: 45;
- active render meshes: 16 of 43;
- materials: 11;
- textures: 7;
- GPU frame timing: unavailable on this fallback path and correctly reported as `n/a`.

The headless software-renderer FPS was about 17.2 and adaptive render scale was 0.72. Those values are **not Tier M performance evidence** and must not be used for physical signoff.

## What this evidence does not prove

This record does **not** satisfy:

- Tier M WebGPU physical performance;
- Tier M WebGL2 physical performance;
- Firefox physical-device performance;
- Safari/macOS physical evidence;
- physical context-loss/recovery behavior;
- five-minute physical memory/GC behavior;
- physical pre-tester movement smoke;
- any blind-human tester session;
- voluntary-replay acceptance;
- final evidence-driven tuning/signoff.

Those remain governed by `127_M0_BROWSER_PERFORMANCE_PASS.md`, `128_M0_REFERENCE_HARDWARE_CAPTURE_TEMPLATE.md`, `130_M0_BLIND_MOVEMENT_TEST_PROTOCOL.md`, and `131_M0_SIGNOFF_EVIDENCE_GATE.md`.

## Next required action

Run the physical pre-tester smoke on the intended test machine using this exact public build, then begin Gate A physical captures and Gate B qualifying blind sessions. If any tuning changes the build, redeploy and update this evidence chain before final signoff.
