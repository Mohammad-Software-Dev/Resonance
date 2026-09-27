# M0 Evidence Execution Runbook

**Status:** Ready for real-world execution  
**Milestone:** M0 final acceptance  
**Depends on:** M0.9-M0.11 engineering complete and `131_M0_SIGNOFF_EVIDENCE_GATE.md`

## Purpose

This runbook turns the remaining M0 acceptance work into a reproducible sequence. It does not substitute automation, AI review or developer testing for physical-device measurements or blind human evidence.

## Phase 1 — publish one immutable evidence build

Use the GitHub Actions workflow:

`Deploy M0 Evidence Build`

The workflow must run from `main`. It stamps the exact checked-out commit into `VITE_BUILD_ID`, reruns deterministic/unit/build gates, and deploys `apps/web-client/dist` through Cloudflare Workers Static Assets.

Record:

- deployment workflow run;
- commit SHA;
- public `workers.dev` URL;
- deployment timestamp.

Do not gather acceptance evidence from a different build unless the signoff record is updated and the required regression/evidence is repeated.

## Phase 2 — smoke-check the deployed build

Before inviting testers:

- load the normal URL in a Chromium browser;
- confirm WebGPU or the expected WebGL2 fallback boots;
- traverse, jump, evade, Attract and Repel;
- confirm F9/F10 replay capture remains available;
- load the same URL with `?blind=1`;
- confirm engineering diagnostics are hidden;
- confirm F7 pauses gameplay and opens the questionnaire;
- confirm F8 exports a partial local report;
- confirm an exported report contains the deployed build SHA.

A smoke check is not a blind-test session and must not be counted as one.

## Phase 3 — Tier M physical performance captures

Follow `127_M0_BROWSER_PERFORMANCE_PASS.md` and fill `128_M0_REFERENCE_HARDWARE_CAPTURE_TEMPLATE.md`.

For the Tier M approval device:

1. record exact hardware, OS, driver, browser and display resolution;
2. use the deployed production build;
3. allow startup/shader warmup to finish;
4. press X to reset the capture window;
5. run the representative course for at least 120 seconds;
6. include jump, evade, moving anchor, Attract and Repel;
7. press P to export the performance JSON;
8. retain the raw JSON unchanged;
9. repeat for WebGPU and WebGL2 fallback.

Also complete:

- one Firefox physical run;
- Safari/macOS when reference hardware is available;
- context-loss/recovery where a practical browser path exists;
- five-minute repeated movement loop for memory/GC observation.

Do not mark a physical gate passed from an FPS counter screenshot alone.

## Phase 4 — five qualifying blind sessions

Follow `130_M0_BLIND_MOVEMENT_TEST_PROTOCOL.md`.

Give each tester only the protocol's approved instruction and the `?blind=1` URL.

A qualifying tester:

- did not build the movement system;
- is not coached through the route or target choices;
- completes the M0 course;
- submits the F7 questionnaire;
- has the exported report retained.

F8 partial reports remain useful but do not count toward the five completed sessions.

Keep raw tester reports private/local by default. Do not commit tester identity or private free-form evidence to the public repository.

## Phase 5 — aggregate and review

Place the retained JSON reports in a private/local directory and run:

```text
pnpm blind-test:report <report-directory>
```

Record:

- qualifying completed tester count;
- task coverage and recoveries;
- observed voluntary-replay count;
- responsiveness distribution;
- targeting-clarity distribution;
- Repel-predictability distribution;
- recurring confusion themes.

Human review still decides whether each qualifying tester completed the course.

## Phase 6 — evidence-driven tuning

If multiple testers or physical captures expose a repeated problem, change the smallest responsible system.

For movement/targeting changes, prefer:

- acceleration/deceleration;
- jump timing;
- target selection/retention;
- Attract acceleration/arrival;
- Repel impulse/recovery;
- camera framing;
- input affordance.

Do not add content to hide a movement-understanding problem.

Any deterministic tuning change requires an intentional M0.10 replay review. If the canonical fingerprint changes, update it in the same reviewed change and explain why.

## Phase 7 — final acceptance build

After tuning:

1. merge the final reviewed change to `main`;
2. require normal CI to pass;
3. redeploy using **Deploy M0 Evidence Build**;
4. rerun any physical/human evidence invalidated by the tuning;
5. fill the signoff record in `131_M0_SIGNOFF_EVIDENCE_GATE.md`;
6. mark M0 complete only when Gates A, B and C are all satisfied.

Only then begin M1 network production.
