# M0.15 Focal Lighting and Atmospheric Composition

**Status:** IN PROGRESS  
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
