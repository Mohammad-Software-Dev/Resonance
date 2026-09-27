# M0 Deployed Smoke Evidence

**Status:** PASS — automated deployment/runtime smoke only  
**Evidence build:** `6704d3741d3c3fc3324804f29f0f63e84e457953`  
**Workflow:** Deploy M0 Evidence Build #13  
**Workflow run:** `36318558242`  
**Public URL:** `https://resonance-m0-evidence.resonance-mohammad-dev.workers.dev`  
**Smoke artifact:** `10932015114`  
**Artifact digest:** `sha256:c15778653f1856ced16e6b69460c89c658e4aedd36a0b124c631937959f9a184`  
**Artifact expiry:** 2026-10-27T12:20:14Z

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
- build marker matched `6704d3741d3c3fc3324804f29f0f63e84e457953`;
- the root smoke explicitly requested `?backend=webgl2`, skipped the WebGPU attempt, and booted WebGL2 successfully;
- performance export used schema `resonance.m0.performance-capture.v1`;
- performance export `buildId` matched the deployed commit;
- performance export recorded `backendPreference: webgl2` and active `backend: webgl2`;
- performance export contained capture-window duration, CPU frame p95, GPU frame p95-or-null, draw-call range and aligned raw CPU/GPU/draw-call arrays;
- the deployed build includes the high-refresh-safe capture capacity used for subsequent 120-second physical evidence;
- `/?blind=1&backend=webgl2` returned HTTP 200 and retained the forced WebGL2 preference;
- blind-test body/prompt initialized;
- engineering diagnostics were hidden in blind mode;
- F7 opened the blind questionnaire;
- blind export used schema `resonance.m0.blind-test.v1`;
- blind export `buildId` matched the deployed commit;
- no page errors, console errors, request failures or HTTP failures were observed.

## Diagnostic snapshot

The automated headless smoke reported, for diagnostic context only:

- backend: WebGL2 fallback;
- WebGL2 context available: yes;
- shader warmup: 622.0 ms;
- runtime shader compile after warmup: 0.0 ms;
- deployed-smoke draw-call range: 44–45;
- active render meshes: 16 of 43;
- materials: 11;
- textures: 7;
- deployed-smoke CPU frame p95: 7.4 ms over its short smoke window;
- GPU frame timing: unavailable on this fallback path and correctly reported as `n/a`.

The smoke's capture window was only about 1.39 seconds because its purpose is schema/runtime verification. Those smoke values are not acceptance performance measurements; physical Tier M captures still require at least 120 seconds.

The headless software-renderer FPS was about 16.5 and adaptive render scale was 0.72. Those values are **not Tier M performance evidence** and must not be used for physical signoff.

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
