# M0.18 Authored Scrapper Identity and Threat Readability

**Status:** IN PROGRESS  
**Purpose:** Replace the remaining crate-like hostile read in the Wayfarer Scar frame with a recognizable cross-region Scrapper identity, without introducing combat AI or changing deterministic gameplay.

M0.17 completed encounter framing and camera priority. Its final retained frame establishes the Scrapper's encounter space correctly, but the hostile body is still too box-like. The canonical enemy roster defines Scrapper as a cross-region maintenance-family melee-pressure enemy whose Resonance hook is being thrown after stagger.

## Canonical visual read

The M0.18 Scrapper should read at a glance as:

- industrial maintenance machine, not cargo;
- low-slung but clearly articulated;
- forward hostile sensor/face direction;
- two readable work/tool appendages, one visibly damaged;
- stable locomotion/contact language distinct from Mara's humanoid silhouette;
- localized hostile orange reserved for sensor/damage warning;
- neutral shell mass large enough to read against the dark wreck;
- no organic/gothic/insect silhouette language.

## Scope

Presentation-only:

- replace or augment the authored-v2 Scrapper body with an authored-v3 silhouette;
- make head/sensor direction readable without the scan line;
- separate torso, locomotion supports and tool arms at gameplay camera distance;
- preserve the damaged-arm asymmetry;
- retain the existing hostile bracket/scan as secondary telegraphs;
- add no new material families; reuse existing shell/dark/hostile/damage palette;
- publish `data-resonance-hostile-identity="scrapper-v3"`;
- retain `encounter-path-v3`, `hero-hostile-v2`, `focal-lighting-v1`, `authored-subject-v2` and `authored-v2`.

## Hard constraints

- materials <=24;
- draw calls <=250;
- textures remain inside the current budget;
- deterministic replay fingerprint does not change;
- no enemy AI, damage, combat authority, collision or target-selection semantics are added;
- blind mode remains HUD/diagnostic free;
- physical/human acceptance remains deferred;
- no owner-run test request.

## Automated gate

M0.18 is green only when:

- authored-asset validation covers the new Scrapper slot;
- unit/runtime tests lock the `scrapper-v3` contract;
- Chromium retained screenshot shows the hostile subject in-frame;
- deployed smoke requires `scrapper-v3` plus all prior presentation contracts;
- materials <=24 and draw calls <=250;
- runtime shader compilation after warmup is 0;
- verify + Chromium + Firefox + WebKit replay gates pass;
- no page/console/request/HTTP failures occur.

The retained deployment screenshot remains the visual iteration loop.

## Implementation candidate

The first M0.18 implementation deliberately **augments** the existing authored-v2 GLB rather than pretending a new binary asset has been authored. The runtime v3 identity adds machine-specific silhouette parts parented to the authored Scrapper root while reusing the existing shell/dark/hostile/damage material families.

Added v3 reads:

- forward sensor hood;
- separate left/right locomotion pods;
- intact maintenance tool arm + tool head;
- damaged opposite tool arm + broken fork;
- wider/lower body proportions;
- enlarged horizontal hostile sensor read;
- expanded hostile bracket sized around the articulated subject.

The authored asset slot publishes `presentationIdentity: "scrapper-v3"`, and the page publishes `data-resonance-hostile-identity="scrapper-v3"` only when the authored Scrapper loads successfully and the v3 augmentation is assembled.

This is presentation-only. No collision, AI, combat, target, force or deterministic simulation semantics are changed.
