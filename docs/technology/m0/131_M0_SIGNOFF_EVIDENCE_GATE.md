# M0 Signoff Evidence Gate

**Status:** BLOCKED on physical and human evidence  
**Milestone:** M0 final acceptance / M1 entry gate  
**Repository baseline:** `da925b3dc49cd33c82f33156a460d7c2934ff774` (M0.11 merged)  
**Purpose:** Keep implemented engineering evidence separate from acceptance evidence that must come from real hardware and real blind testers.

**Execution runbook:** `132_M0_EVIDENCE_EXECUTION_RUNBOOK.md`  
**Automated deployment evidence:** `133_M0_DEPLOYED_SMOKE_EVIDENCE.md`

## Current repository state

The engineering implementation through M0.11 is merged.

| Item | Repository evidence | Status |
| --- | --- | --- |
| M0.9 browser performance instrumentation/pass | `b44d4a0006170f7e30e73ad22ebe7bfa50b77105` | IMPLEMENTED |
| M0.10 deterministic replay/test harness | PR #9, squash `a2dced350f6d9d32863d8284213657ce62dad2d3`; final PR CI run 149 passed verify + Chromium + Firefox + WebKit | IMPLEMENTED / AUTOMATED GATE GREEN |
| M0.11 blind movement test harness | PR #10, squash `da925b3dc49cd33c82f33156a460d7c2934ff774`; final PR CI run 159 passed | IMPLEMENTED / AUTOMATED GATE GREEN |
| Deployed M0 evidence candidate | `6704d3741d3c3fc3324804f29f0f63e84e457953`; Deploy M0 Evidence Build run `36318558242`; retained smoke artifact `10932015114` | DEPLOYED / AUTOMATED SMOKE GREEN |

These results prove that the test infrastructure and current automated regression gates work. They do **not** satisfy the physical-performance or blind-human acceptance requirements below.

## Gate A — M0.9 physical performance evidence

Source of truth:

- `127_M0_BROWSER_PERFORMANCE_PASS.md`
- `128_M0_REFERENCE_HARDWARE_CAPTURE_TEMPLATE.md`

M0.9 remains **NOT SIGNED OFF** until real physical-device evidence is recorded.

Required evidence:

- [ ] Tier M approval hardware is concretely identified: device/model, CPU, GPU, memory, OS/build, GPU driver, browser/version and display resolution.
- [ ] Tier M production-build WebGPU capture runs for at least 120 seconds after warmup and satisfies the M0.9 target gates.
- [ ] Tier M production-build WebGL2 fallback capture runs for at least 120 seconds after warmup and satisfies the M0.9 target gates.
- [ ] One Firefox physical run is recorded.
- [ ] Safari/macOS physical evidence is recorded when reference hardware is available.
- [ ] Context-loss/recovery is exercised where the browser exposes a practical test path, with recovery observations recorded.
- [ ] A five-minute repeated movement loop is recorded for memory/GC behavior.
- [ ] Capture JSON artifacts are retained without hand-editing values.
- [ ] The measured results are entered into `128_M0_REFERENCE_HARDWARE_CAPTURE_TEMPLATE.md`, including PASS/FAIL decisions and notes.

A blank field is not a pass. Dynamic resolution must not be used to disguise a Tier M failure; the M0.9 policy remains authoritative.

## Gate B — M0.11 blind movement evidence

Source of truth:

- `130_M0_BLIND_MOVEMENT_TEST_PROTOCOL.md`

M0.11 remains **NOT HUMAN-SIGNED-OFF** until genuinely blind tester evidence exists.

Required evidence:

- [x] `Deploy M0 Evidence Build` published commit `6704d3741d3c3fc3324804f29f0f63e84e457953` from `main` at `https://resonance-m0-evidence.resonance-mohammad-dev.workers.dev`; automated Chromium smoke verified forced `?backend=webgl2`, `?blind=1&backend=webgl2`, exact build IDs, requested/active backend identity, full-window physical-capture telemetry, and the high-refresh-safe capture build on that exact commit. See `133_M0_DEPLOYED_SMOKE_EVIDENCE.md`.
- [ ] The physical pre-tester smoke from `132_M0_EVIDENCE_EXECUTION_RUNBOOK.md` is completed on the intended test machine.
- [ ] At least five testers who did not build the movement system and were not coached through the course complete the M0 course.
- [ ] A questionnaire-completed local report is retained for each qualifying tester.
- [ ] Useful partial reports are retained separately and are not counted toward the five-completed-session minimum.
- [ ] Human review confirms course completion from the retained task/observer evidence; the report aggregator is not treated as an automatic completion judge.
- [ ] A majority of qualifying testers voluntarily replay at least one movement challenge, using the observed replay behavior defined by M0.11.
- [ ] Responsiveness, targeting-clarity and Repel-predictability distributions are summarized.
- [ ] Recurring confusion themes and recovery/retry observations are summarized.
- [ ] A focused movement/targeting tuning pass is completed, or an explicit evidence-backed no-change decision is recorded.
- [ ] If tuning changes deterministic behavior, M0.10 canonical replay hashes are intentionally updated in the same reviewed change and all replay/browser gates pass again.

Do not commit tester identity or private free-form evidence to the public repository by default. Store raw reports in the private/local evidence location defined by the test protocol and commit only the non-sensitive aggregate/signoff record as appropriate.

## Gate C — final regression after evidence-driven tuning

Before M0 can be declared complete:

- [ ] The final code commit used for physical and human acceptance is identified.
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm test` passes.
- [ ] Canonical M0 replay fingerprint is unchanged, or any intentional deterministic change is reviewed and the canonical fingerprint is updated.
- [ ] Node 30/45/60/90/120/144 replay cadence matrix passes.
- [ ] Chromium browser cadence matrix passes.
- [ ] Direct deterministic replay equivalence passes in Chromium, Firefox and WebKit.
- [ ] Production build and bundle budget pass.

## M1 entry decision

M1 may begin only when:

1. Gate A is complete;
2. Gate B is complete;
3. Gate C is green on the final accepted build; and
4. the evidence is reviewed together rather than treating implementation, CI, or a single successful tester/device as a substitute for the missing acceptance categories.

Until then, the repository state is:

> **M0 engineering implementation through M0.11 is complete, but M0 acceptance is blocked. Do not claim M0 signoff or M1 readiness yet.**

## Signoff record

Fill this section only from real retained evidence.

- Final accepted commit:
- Physical evidence location:
- Tier M WebGPU result:
- Tier M WebGL2 result:
- Firefox result:
- Safari/macOS result or availability note:
- Context-loss/recovery result:
- Five-minute memory/GC result:
- Qualifying blind tester count:
- Observed voluntary-replay count / qualifying tester count:
- Blind-test aggregate summary location:
- Recurring confusion themes:
- Tuning changes made, or evidence-backed no-change rationale:
- Final M0.10 regression CI run:
- Final decision: **BLOCKED**
- Signoff date:
- Signoff reviewer:
