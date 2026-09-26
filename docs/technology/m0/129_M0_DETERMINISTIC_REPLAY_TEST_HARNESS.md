# M0.10 Deterministic Replay and Test Harness

**Status:** Implementation candidate; CI/browser validation required before merge  
**Milestone:** M0.10  
**Purpose:** Turn M0 movement/Resonance behavior into reproducible evidence and make the first divergent fixed tick actionable.

## Replay contract

Schema:

`resonance.replay.v1`

A replay artifact contains:

- build ID;
- fixture ID/version;
- initial deterministic seed;
- gameplay settings required to reproduce the trace;
- initial simulation snapshot;
- one serialized `SimInput` per fixed tick;
- checkpoint interval;
- checkpoint hashes;
- checkpoint telemetry;
- final gameplay hash.

The replay artifact contains authoritative fixed-step input, not render-frame input.

## Composite gameplay hash

The M0 replay hash combines:

1. canonical `Simulation.stateHash()`;
2. Attract target/revision/tick/block/release state;
3. Repel last target/use count.

The hash helper lives in `@resonance/simulation` so browser recording and headless replay use the same contract.

Presentation state is deliberately excluded.

## M0 representative replay fixture

Fixture:

`m0-representative-course@1`

The canonical trace is 360 fixed ticks and exercises:

- locomotion;
- jump/hold/cut;
- evade;
- deterministic moving platform/anchor motion;
- Attract;
- Attract → Repel;
- Repel recovery;
- collision and grounding.

The headless M0 replay runtime recreates the same authored collision/target fixture used by the browser M0 course and composes:

- `Simulation`;
- `@resonance/movement`;
- deterministic Rapier;
- Attract/Repel runtime state;
- moving authored platform/anchor state.

Babylon is not part of replay authority.

## Checkpoints and divergence

Canonical checkpoints occur every 30 fixed ticks.

On a mismatch, verification stops at the first divergent checkpoint and reports:

- tick;
- expected hash;
- actual hash;
- fixed-step input;
- expected checkpoint telemetry when available;
- actual simulation hash;
- position/velocity;
- movement mode;
- grounding/ground entity;
- Attract state;
- Repel state;
- collision count/correction.

Do not continue hundreds of ticks after a known mismatch and report only the final state.

## Browser capture

The M0 browser course supports real-session replay capture.

- **F9** starts recording from the current safe neutral ability state.
- **F10** exports the replay JSON.

A capture can start after tick zero because the initial snapshot is embedded.

Capture start is rejected while:

- Attract is active or awaiting release;
- Repel recovery is active.

Changing the experimental Attract arrival mode while recording cancels the recording, because replay settings are fixed for one artifact.

Target selection is recorded as the resulting `TargetId` in `SimInput`. The replay therefore reproduces the authoritative gameplay consequence without requiring mouse/gamepad presentation sampling.

## CLI

Commands:

```text
pnpm --filter @resonance/replay-cli replay --generate <output.json>
pnpm --filter @resonance/replay-cli replay <replay.json>
pnpm --filter @resonance/replay-cli replay --matrix <replay.json>
pnpm replay:fingerprint
```

Verification exits nonzero on divergence.

The matrix command runs the same fixed-step replay through simulated render cadences:

- 30;
- 45;
- 60;
- 90;
- 120;
- 144 fps.

Every cadence must end on the same canonical hashes.

## Browser cross-runtime runner

Playwright sends the Node-generated canonical artifact into the browser replay verifier.

CI projects:

- Chromium;
- Firefox;
- WebKit.

Each browser must:

- reproduce the Node final hash;
- pass direct checkpoint verification;
- pass the 30–144 fps cadence matrix.

Linux Playwright WebKit is useful cross-runtime evidence but does **not** replace the required Safari/macOS physical acceptance run.

## CI gate

M0.10 adds these gates after ordinary unit tests:

1. canonical replay fingerprint generation;
2. production web build;
3. bundle budget;
4. Playwright browser installation;
5. Chromium/Firefox/WebKit replay equivalence.

Once the committed canonical fingerprint is locked, CI also verifies that code changes do not silently change expected checkpoints.

Intentional deterministic behavior changes must update the canonical fixture in the same reviewed change and explain why the hashes changed.

## Relationship to M0.9

M0.10 engineering can be implemented while physical M0.9 evidence is pending.

This does **not** waive M0.9 acceptance.

M0 remains blocked from final signoff/M1 until the physical Tier-M WebGPU/WebGL2 performance evidence in `128_M0_REFERENCE_HARDWARE_CAPTURE_TEMPLATE.md` is completed.

## M0.10 exit criteria

M0.10 is complete when:

- fixed-step input recording works;
- browser replay export works;
- canonical checkpoint hashes are committed;
- CLI verification reports first divergence;
- render-FPS matrix passes;
- Node ↔ Chromium ↔ Firefox ↔ WebKit replay hashes agree in CI;
- replay regression is part of normal CI.

The next engineering milestone after M0.10 is **M0.11 — Blind Movement Test**, while physical M0.9 performance signoff remains a separate required M0 gate.
