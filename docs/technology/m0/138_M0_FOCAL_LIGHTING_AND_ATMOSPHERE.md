# M0.15 Focal Lighting and Atmospheric Composition

**Status:** COMPLETE — deployed build `6d780e7d04b2b916f182c864250a5e3eef3bb505`  
**Purpose:** Move the authored Wayfarer Scar slice from flat prototype illumination toward a deliberate game-facing composition without adding gameplay, networking, new materials, or owner-run testing.

M0.14 established authored-v2 character/enemy/environment slots and a stable subject hierarchy. Its final retained screenshot still reads flatter than the intended orbital-industrial art direction: Mara is readable but not locally lit as the primary subject, wreck surfaces cluster in a narrow gray range, and inactive Resonance nodes remain more visually present than necessary.

## Scope

Presentation-only:

- add one localized Wayfarer fill light while keeping the scene at four simultaneous lights;
- strengthen warm/cool separation between gas-giant exterior light, cold wreck metal and Mara's field rig;
- improve foreground/background tonal hierarchy using existing materials only;
- add a restrained image-processing vignette/contrast treatment;
- reduce inactive target visibility while preserving selected/active/Repel readability;
- publish an automated `focal-lighting-v1` runtime contract;
- retain authored-v2 assets and authored-subject-v2 hierarchy.

## Hard constraints

- material count must remain <=24; this pass adds no materials;
- deployed draw calls must remain <=250;
- textures remain within the existing budget;
- deterministic simulation/replay fingerprint must not change;
- collision, TargetID, target scoring and force semantics are untouched;
- blind mode remains free of normal-game HUD/diagnostics;
- no physical/human acceptance claim and no owner-run test request.

## Automated gate

M0.15 is green only when:

- unit tests cover target visibility/focal-light behavior;
- Chromium presentation screenshot is retained;
- deployed smoke reports `data-resonance-lighting-composition="focal-lighting-v1"`;
- authored-v2 and authored-subject-v2 contracts remain active;
- materials <=24 and draw calls <=250;
- runtime shader compilation after warmup is 0;
- verify + Chromium + Firefox + WebKit replay gates pass;
- no page/console/request/HTTP failures occur.

The retained screenshot is the iteration loop for this milestone.


## Completion record

- PR #64 merged as `6d780e7d04b2b916f182c864250a5e3eef3bb505`.
- PR CI #277: verify + Chromium + Firefox + WebKit PASS.
- post-merge CI #278: PASS.
- Deploy M0 Evidence Build #33 / run `37210586868`: PASS.
- retained deployed-smoke artifact: `11306034553`.
- artifact digest: `sha256:99ea1518c98bb84e1716208b700a7b47322fe22f466f62ac2effcf86409b4b0b`.
- lighting contract: `focal-lighting-v1`.
- visual identity: `authored-v2`.
- subject hierarchy: `authored-subject-v2`.
- materials: 24 / 24.
- deployed draw-call range: 185–192 / 250.
- textures: 16.
- runtime shader compilation after warmup: 0.0 ms.
- page/console/request/HTTP failures: none.
- deterministic replay/browser equivalence: unchanged and green.

Retained screenshot review confirms that M0.15 achieved its intended lighting/composition scope: localized Wayfarer separation, stronger warm/cool scene division, restrained edge darkening and lower inactive-target dominance. The screenshot also exposes the next bottleneck: the hero character and encounter subjects remain too proxy-like/blocky for the intended game-facing quality. That work belongs to M0.16 rather than expanding M0.15 indefinitely.

Physical/human acceptance remains deferred, not passed. No owner-run test is requested.
