# M0 Signoff Evidence Gate

**Status:** Open — human/physical evidence pending  
**Purpose:** Prevent M1 network production from starting before M0 hard acceptance is actually demonstrated.

## Rule

M0 is not signed off because code exists or CI is green.

M0 signoff requires both automated engineering evidence and real-world evidence.

Do not mark this gate complete by inference. Attach or reference the actual evidence.

## Automated engineering evidence

Required:

- clean install/typecheck/test/build;
- fixed 60 Hz simulation;
- deterministic replay fixture;
- render-cadence independence;
- Node/browser deterministic comparison;
- stable TargetID selection;
- Attract/Repel deterministic semantics;
- collision-safe movement;
- no Babylon types in simulation public APIs.

Current implementation is covered by the M0 CI/replay harness, but the final merge commit must be green before signoff.

## Physical Tier-M performance evidence — M0.9

Required on the defined Tier-M physical machine:

- exact CPU/GPU/RAM/OS/driver/browser recorded;
- WebGPU representative-room capture;
- WebGL2 fallback capture;
- agreed 60-fps budget demonstrated;
- first-use Resonance shader hitch check;
- resize/fullscreen/context recovery checks;
- capture artifacts retained.

Use:

`128_M0_REFERENCE_HARDWARE_CAPTURE_TEMPLATE.md`

Status:

**PENDING HUMAN/PHYSICAL RUN**

## Blind movement evidence — M0.11

Required:

- deployed/reachable blind-test URL;
- at least five genuinely blind testers;
- exported report retained for every tester;
- movement/targeting questionnaire summarized;
- voluntary replay result summarized;
- recurring confusion themes identified;
- tuning pass completed or explicitly justified as unnecessary;
- deterministic replay regression rerun after any tuning.

Use:

`130_M0_BLIND_MOVEMENT_TEST_PROTOCOL.md`

Status:

**PENDING HUMAN TESTING**

## M1 start gate

Do not begin M1 dedicated four-player netcode production until all hard M0 criteria in `124_M0_TEST_DIAGNOSTICS_AND_ACCEPTANCE.md` are complete.

Permitted while evidence is pending:

- CI/tooling fixes;
- test harness fixes;
- documentation;
- preview deployment setup;
- collecting M0.9/M0.11 evidence;
- bug fixes required by those tests.

Not permitted:

- treating M0 as accepted;
- starting substantial M1 authoritative networking production;
- fabricating tester or hardware evidence.

## Signoff record

When evidence is complete, record:

- M0 merge commit;
- CI run;
- Tier-M capture artifact references;
- blind tester report references;
- tuning commits, if any;
- final deterministic replay fingerprint;
- owner signoff date.

Until those fields are backed by real artifacts, M0 remains open.
