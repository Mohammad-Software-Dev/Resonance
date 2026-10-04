# M0.16 Hero and Hostile Subject Readability

**Status:** IN PROGRESS  
**Purpose:** Move the retained Wayfarer Scar screenshot from “readable prototype subjects” toward a recognizable player-versus-encounter composition without changing deterministic gameplay, adding materials, or requesting owner-run testing.

M0.15 achieved its focal-lighting and atmosphere scope. Its retained screenshot exposed the next bottleneck: Mara and the damaged Scrapper still read too much like authored placeholders.

## Scope

Presentation-only:

- refine Mara's authored-v2 runtime proportions into a taller/slimmer human silhouette;
- use a slight three-quarter yaw so the field rig reads as volume rather than a flat mannequin;
- reduce helmet dominance while strengthening visor/emitter emphasis;
- deepen state-driven motion without changing simulation;
- add a subtle Scrapper hover/damage pose;
- make the hostile sensor pulse more clearly;
- reuse the existing Resonance tether mesh as a periodic hostile scan telegraph when the player is not actively using Resonance;
- publish `data-resonance-subject-readability="hero-hostile-v1"`;
- retain authored-v2, authored-subject-v2 and focal-lighting-v1 contracts.

## Hard constraints

- material count remains <=24; no new material is allocated;
- draw calls remain <=250;
- deterministic simulation/replay fingerprint does not change;
- collision, target selection, force semantics and objective progression are untouched;
- blind mode remains free of normal-game HUD/diagnostics;
- physical/human acceptance remains deferred;
- no owner-run testing is requested.

## Automated gate

M0.16 is green only when:

- unit tests cover Mara's subject profile and Scrapper presentation bounds;
- Chromium presentation screenshot is retained;
- browser and deployed smoke require `hero-hostile-v1`;
- authored-v2, authored-subject-v2 and focal-lighting-v1 remain active;
- materials <=24 and draw calls <=250;
- runtime shader compilation after warmup is 0;
- verify + Chromium + Firefox + WebKit replay gates pass;
- no page/console/request/HTTP failures occur.

The retained deployed screenshot is the iteration loop for this milestone.
