# M0.13 Presentation Motion and Depth Polish

**Status:** COMPLETE — deployed build `a7b3ea2f709757675a38fe0efedba5e311043982`  
**Purpose:** Continue improving the browser prototype without asking for physical/human acceptance while M1 remains gated.

M0.12 made Wayfarer Scar recognizable as a game space. M0.13 addresses the next visible prototype cues: static authored subjects, over-uniform teal presentation and weak pose/grounding feedback.

## Scope

Presentation-only work:

- derive authored Wayfarer motion from existing deterministic movement state;
- distinguish idle, run, airborne, evade, Attract and Repel-recovery poses;
- add bounded root bob/lean/squash and authored helmet/emitter accents;
- preserve the simulation transform as the source of truth;
- darken primary deck/machinery surfaces so teal is reserved for Resonance and route accents;
- increase visual depth/contrast without adding gameplay geometry;
- publish presentation-motion state for automated smoke;
- keep the <=24 material gate and current draw-call budget.

## Non-goals

M0.13 does not add:

- combat authority;
- enemy AI;
- networking;
- new collision;
- new movement rules;
- target-selection changes;
- progression changes;
- M0 acceptance evidence.

## Automated gate

The pass is green only when:

- unit tests cover pose priority and bounded transforms;
- deterministic replay fingerprint remains unchanged;
- Chromium/Firefox/WebKit replay equivalence passes;
- deployed smoke reports a valid Wayfarer presentation-motion state;
- authored visual slots remain loaded;
- traversal course v2 and follow-focus-v1 camera remain intact;
- materials stay <=24;
- no page/console/request/HTTP failures occur.

No owner-run test is requested.


## Pass 2 — essential world depth on every preset

Deployment #28 proved state-driven Wayfarer motion, but its retained WebGL2/Low screenshot exposed a presentation-policy defect: Low disabled the entire industrial backdrop, Wayfarer Scar depth layer and gas-giant vista. The result was a technically readable gameplay plane floating in a black void.

Pass 2 keeps **essential composition** independent of optional distant detail:

- the main orbital frame remains enabled on every graphics preset;
- a large double orbital ring establishes station scale behind the playable plane;
- the gas giant is re-staged into the active follow-camera composition and remains visible on Low;
- the gas-giant material is self-readable rather than depending on expensive lighting;
- secondary Scar clutter remains controlled by `distantDetail`;
- deck panels use a neutral ceramic/metal pattern with sufficient value contrast;
- route teal is restricted to thin front-edge markers;
- the previous bright cyan Wayfarer ground ring becomes a small neutral grounding cue;
- shared ceramic/shell values are separated enough that Mara reads against the dark wreck;
- ambient fill is raised slightly while the warm rim light remains the primary silhouette separator.

The new automated contract is `data-resonance-depth-composition="essential-v1"`. The visual-landmark audit now requires both `orbital-parallax-ring` and `gas-giant`.

This pass adds no materials, collision, gameplay rules or deterministic state.


## Completion record

- PR #56: state-driven authored Wayfarer motion and scene presentation.
- PR #57: essential world depth retained on fallback.
- Deploy M0 Evidence Build #29 / run `36346612600`: PASS.
- CI #254: PASS.
- retained smoke artifact: `10941091896`.
- material count: 22 / 24 budget.
- deployed draw-call range: 168–182 / 250 budget.
- canonical deterministic replay: `266484aa` unchanged.

Owner-run testing was not requested. Physical/human M0 acceptance remains deferred, not passed.
