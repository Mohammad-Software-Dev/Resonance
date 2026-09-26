# M0.11 Blind Movement Test Protocol

**Status:** Harness implemented; human test evidence pending  
**Milestone:** M0.11  
**Depends on:** M0.10 deterministic replay/test harness  
**Hard acceptance:** at least five blind testers complete the M0 course.

## Purpose

M0.11 answers a question automation cannot answer:

> Can a new player understand and enjoy Resonance movement and target choice without developer coaching?

Do not treat automated tests, developer familiarity, or AI review as substitutes for blind human evidence.

## Tester entry point

Use any deployed M0 web-client URL and append:

```text
/?blind=1
```

Example for a local preview:

```text
http://localhost:5173/?blind=1
```

The blind-test query mode:

- hides the engineering diagnostics overlay;
- shows only the minimum controls;
- does not explain the intended route or target solution;
- samples gameplay telemetry locally;
- records observed task completion;
- never uploads tester identity or telemetry automatically.

A public preview URL is still an infrastructure/deployment action. The route is ready now; do not claim a public tester URL exists until a preview deployment is actually created.

## Tester instructions

Give the tester only this instruction:

> Play the movement course without coaching. Try the movement and Resonance controls, explore the available challenges, and stop when you feel you have understood the course or no longer want to continue. When finished, press F7 and answer from your first impression.

Do not:

- point at the correct anchor;
- explain the intended Attract/Repel chain;
- explain how target scoring works;
- rescue the tester unless the build itself is unusable;
- ask leading questions during play.

The observer may record obvious technical failures separately.

## Controls exposed to the tester

- Move: A/D or arrows.
- Jump: Space.
- Evade: Left Shift.
- Attract: E or gamepad RT.
- Repel: Q or gamepad LT.
- Aim: mouse or gamepad right stick.
- F7: open questionnaire.
- F8: export current report without completing questionnaire.

Developer-only tuning controls remain functional in the M0 build but are intentionally absent from the blind-test prompt.

## Observed course tasks

The harness records six behavioral signals:

1. **Basic traversal** — tester moves meaningfully away from the start.
2. **Moving anchor/platform** — tester establishes grounded contact with the authored moving platform.
3. **Attract** — tester successfully enters an Attract relationship.
4. **Repel** — tester successfully applies Repel.
5. **Target-choice fork** — tester meaningfully selects multiple authored targets during exploration.
6. **Recovery** — tester triggers the deterministic course recovery path.

These are instrumentation signals, not a hidden player score.

A tester can still provide valuable evidence if one or more signals are not completed; the observer must not coach merely to turn all six booleans green.

## Telemetry artifact

Schema:

`resonance.m0.blind-test.v1`

The local JSON export contains:

- build ID;
- random session ID;
- start/export timestamps;
- browser user agent;
- six observed task flags;
- distinct target count;
- event stream;
- one compact gameplay sample every 30 fixed ticks;
- questionnaire;
- explicit privacy note.

Samples include:

- fixed tick;
- position/velocity;
- grounded state;
- ground entity;
- selected target;
- active Attract target;
- Repel use count;
- collision count;
- maximum collision correction.

No name, email, account identifier, IP address, or free-form demographic profile is requested by the harness.

## Questionnaire

F7 asks:

- movement responsiveness, 1–5;
- targeting clarity, 1–5;
- Repel predictability, 1–5;
- whether the tester would voluntarily replay a movement challenge;
- free-form confusion/unpredictability notes.

The free-form response is intentionally last so the numerical questions do not prime a specific complaint.

## Required sample

M0.11 hard evidence requires at least **five blind testers** who did not build the movement system and were not coached through the course.

Keep each exported JSON report in a private/local evidence directory. Do not commit tester free-form responses to the public repository by default.

Aggregate the directory with:

```text
pnpm blind-test:report <report-directory>
```

The command rejects invalid/duplicate sessions and exits nonzero until at least five unique reports are present.

For signoff, summarize:

- tester count;
- course completion/task observations;
- retries/recoveries;
- voluntary replay count;
- responsiveness distribution;
- targeting-clarity distribution;
- Repel-predictability distribution;
- recurring confusion themes;
- concrete tuning changes made from the evidence.

## Tuning rule

If the same confusion appears across testers, prefer tuning the smallest responsible system:

- movement acceleration/deceleration;
- jump timing;
- target selection/retention;
- Attract acceleration/arrival behavior;
- Repel impulse/recovery;
- camera framing;
- input affordance.

Do not add content to compensate for movement that is not yet understandable.

Any deterministic tuning change must rerun M0.10 replay regression and intentionally update canonical hashes when behavior changes.

## Exit criteria

M0.11 is complete only when:

- blind-test route is deployed and reachable;
- at least five blind testers complete a session;
- all reports are retained;
- questionnaire results are summarized;
- movement/targeting tuning pass is performed or explicitly documented as unnecessary based on evidence;
- M0.10 deterministic regression remains green after tuning;
- M0.9 physical Tier-M performance evidence is also complete.

Only then can the full M0 hard-acceptance gate be signed off for M1.
