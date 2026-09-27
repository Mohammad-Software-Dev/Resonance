# M0 Field Evidence Kit

**Status:** Ready for physical-device and blind-human collection  
**Purpose:** Make M0 acceptance evidence reproducible, private by default and easy to validate before signoff.

## Evidence build

Use only the current evidence candidate recorded in `131_M0_SIGNOFF_EVIDENCE_GATE.md` and `133_M0_DEPLOYED_SMOKE_EVIDENCE.md`.

Public route (ordinary automatic backend selection):

`https://resonance-m0-evidence.resonance-mohammad-dev.workers.dev`

Required WebGPU capture route:

`https://resonance-m0-evidence.resonance-mohammad-dev.workers.dev/?backend=webgpu`

Required WebGL2 capture route:

`https://resonance-m0-evidence.resonance-mohammad-dev.workers.dev/?backend=webgl2`

Blind route:

`https://resonance-m0-evidence.resonance-mohammad-dev.workers.dev/?blind=1`

The explicit backend routes are evidence controls. `backend=webgpu` requires WebGPU and fails visibly instead of silently falling back. `backend=webgl2` skips the WebGPU attempt entirely, making the fallback capture reproducible on the same physical machine.

After any gameplay, rendering, performance-instrumentation or blind-harness change, redeploy and use the new exact build SHA for all newly collected evidence.

## Private local evidence layout

Use the git-ignored `.local/` directory:

```text
.local/m0-evidence/<build-sha>/
  hardware/
  performance/
    webgpu/
    webgl2/
    firefox/
    safari/
  blind/
    completed/
    partial/
  context-recovery/
  memory/
  notes/
```

Do not commit raw tester free-form responses or tester identity to the public repository.

## Physical pre-tester smoke

Before collecting acceptance runs on a machine:

1. open the normal public route;
2. confirm the expected backend in diagnostics;
3. move, jump, evade, Attract and Repel;
4. confirm F9 begins replay capture and F10 exports it;
5. press P once and verify the performance JSON contains the exact deployed build SHA;
6. open the blind route;
7. verify engineering diagnostics are hidden;
8. press F7 and verify the questionnaire opens;
9. cancel/reload rather than counting this as a tester session;
10. press F8 on a fresh blind page and verify the partial JSON contains the exact deployed build SHA.

Record the machine/browser identity before proceeding.

## Tier M performance collection

Required conditions are defined in `127_M0_BROWSER_PERFORMANCE_PASS.md`.

For each WebGPU and WebGL2 capture:

1. use the explicit backend URL above and confirm diagnostics show the same active/requested backend;
2. use 1920x1080 and Medium preset for Tier M approval;
3. close unrelated GPU-heavy applications where practical;
4. allow startup and shader warmup to complete;
5. press X to reset the capture window;
6. traverse for at least 120 seconds;
7. include jump, evade, moving anchor, Attract and Repel;
8. press P;
9. verify the JSON `backend` and `backendPreference` match the requested route;
10. move the unchanged JSON into the matching private evidence folder.

The current capture artifact records full-window:

- frame duration distribution;
- CPU frame-time distribution;
- GPU frame-time distribution when supported;
- render-scale distribution;
- draw-call distribution;
- capture duration.

This allows the preflight tool to compute the M0.9 objective percentile gates rather than relying on a single instantaneous counter.

### Suggested filenames

```text
performance/webgpu/tier-m-chrome-webgpu-01.json
performance/webgl2/tier-m-chrome-webgl2-01.json
performance/firefox/tier-m-firefox-01.json
performance/safari/tier-m-safari-01.json
```

## Blind tester handoff

Give each qualifying tester **only** this instruction:

> Play the movement course without coaching. Try the movement and Resonance controls, explore the available challenges, and stop when you feel you have understood the course or no longer want to continue. When finished, press F7 and answer from your first impression.

Do not explain the route, anchors, target scoring or intended Attract/Repel sequence.

After the tester finishes:

- retain the exported report unchanged;
- place questionnaire-completed reports under `blind/completed/`;
- place useful F8/incomplete reports under `blind/partial/`;
- do not rename files in a way that encodes the tester's name or identity;
- record any observer-only technical failure separately under `notes/`.

## One-command evidence preflight

Run:

```text
pnpm evidence:preflight .local/m0-evidence/<build-sha> <build-sha>
```

The command recursively reads JSON and validates:

- exact deployed build ID;
- performance schema;
- WebGPU and WebGL2 capture presence;
- explicit requested/active backend equality (auto-selected backend captures are rejected);
- required Firefox physical capture presence;
- >=120-second capture window;
- average 60 Hz frame cadence;
- frame p50/p95/p99 targets;
- CPU frame p95;
- GPU frame p95 when available;
- draw-call maximum;
- active meshes, materials and textures;
- zero warmed-traversal runtime shader compilation;
- Medium-preset minimum render scale;
- blind-test schema;
- duplicate session IDs;
- questionnaire-completed blind count;
- observed voluntary-replay majority.

It intentionally does **not** automate judgments that require a human:

- whether >50 ms hitches are repeatable/gameplay-visible;
- whether a tester truly completed the course;
- whether the tester was genuinely blind/uncoached;
- hardware-tier identity;
- visual/readability quality;
- context-loss quality;
- five-minute memory/GC trend interpretation;
- whether evidence-driven tuning is needed.

Exit code 2 means objective blockers remain. Exit code 0 means the machine-checkable subset is clear; human/physical signoff items still remain.

## Handoff back into engineering

When evidence exists:

1. keep the raw files unchanged;
2. run the preflight command;
3. retain its JSON output;
4. fill `128_M0_REFERENCE_HARDWARE_CAPTURE_TEMPLATE.md`;
5. run `pnpm blind-test:report <blind-report-directory>` for the human-test aggregate;
6. review recurring confusion and physical bottlenecks;
7. make the smallest evidence-driven tuning change, if any;
8. rerun M0.10 and redeploy if behavior changes;
9. complete `131_M0_SIGNOFF_EVIDENCE_GATE.md` only after all physical and human requirements are satisfied.
