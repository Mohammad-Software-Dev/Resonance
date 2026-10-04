# M0.17 Encounter Staging and Traversal-Path Readability

**Status:** COMPLETE — deployed build `9376756902351366c86c214f846443df0b9ea6a1`  
**Purpose:** Convert the latest retained Wayfarer Scar frame from a readable subject study into a deliberate traversal encounter composition, while preserving deterministic gameplay and the hard rendering budgets.

M0.16 made Mara human-readable and improved the damaged Scrapper silhouette. Deployment #35 exposed the next bottleneck: the hostile can sit outside the opening camera composition while its scan line enters from off-screen, and long cyan/background elements still compete with the playable route.

## Scope

Presentation-only:

- move the damaged Scrapper's presentation staging onto the visible right-side gameplay plane;
- bias the follow camera toward the hostile only after the player approaches, while selected Resonance targets keep priority;
- add one low-cost orange hostile bracket using tiny corner geometry that reuses the existing hostile material;
- keep the hostile scan faint but visible enough to originate from a readable subject;
- brighten the walkable deck and route accents slightly;
- reduce long distant conduit dominance;
- reduce idle Resonance-anchor visibility while retaining selected/active/Repel hierarchy;
- publish `data-resonance-encounter-composition="encounter-path-v1"`;
- retain `hero-hostile-v2`, `focal-lighting-v1`, `authored-subject-v2` and `authored-v2`.

## Hard constraints

- material count remains <=24;
- draw calls remain <=250;
- deterministic simulation/replay fingerprint does not change;
- physics, collision, TargetID, target selection, Attract/Repel semantics and objective progression remain untouched;
- no hostile AI/combat authority is introduced in M0.17;
- blind mode remains free of normal-game HUD/diagnostics;
- physical/human M0 acceptance remains deferred;
- no owner-run testing is requested.

## Automated gate

M0.17 is green only when:

- unit tests cover encounter staging/camera-bias bounds;
- target-presentation tests lock the quieter idle-anchor hierarchy;
- Chromium presentation screenshot is retained;
- browser and deployed smoke require `encounter-path-v1`;
- `hero-hostile-v2`, `focal-lighting-v1`, `authored-subject-v2` and `authored-v2` remain active;
- materials <=24 and draw calls <=250;
- runtime shader compilation after warmup is 0;
- verify + Chromium + Firefox + WebKit replay gates pass;
- no page/console/request/HTTP failures occur.

The retained deployed screenshot remains the iteration loop. Do not request owner-run testing at this milestone.


## Deployment #36 budget correction

The first live M0.17 candidate proved the encounter composition visually, but deployed smoke rejected it because Babylon's additional `CreateLines` bracket allocated an implicit line material, raising the scene from 24 to 25 materials. The retained frame confirmed the intended hostile staging and scan origin.

The correction keeps the composition and replaces that bracket with eight tiny corner bars using the already-existing hostile material. This preserves the 24-material ceiling at the cost of a small, bounded draw-call increase that remains well below 250.


## Completion record

- PR #70 landed encounter staging/path hierarchy.
- Deployment #36 exposed an implicit Babylon line-material allocation and correctly failed at 25/24 materials.
- PR #71 replaced the line bracket with shared hostile-material corner geometry.
- final implementation commit: `9376756902351366c86c214f846443df0b9ea6a1`.
- CI #288 / run `37214598543`: PASS.
- Deploy M0 Evidence Build #37 / run `37214598708`: PASS.
- retained smoke artifact: `11307144847`.
- artifact digest: `sha256:fdf625c3b7093a0fe4d5cfa9ad43de8babe3e587391b8820cbc66f8bc1b903f4`.
- encounter contract: `encounter-path-v1`.
- materials: 24 / 24.
- deployed draw-call range: 187–198 / 250.
- textures: 16.
- runtime shader compilation after warmup: 0.0 ms.
- no page/console/request/HTTP failures.
- deterministic replay/browser equivalence: green.

The retained screenshot confirms the damaged Scrapper is now inside the right-side composition and its hostile scan originates from a visible subject. The walkable route has stronger local contrast and distant cyan service lines are quieter. M0.17 is therefore complete.

The next visual limitation is asset fidelity: the v2 GLBs are explicitly authored placeholders and still read as low-detail proxy models. That moves to M0.18.

Physical/human acceptance remains deferred, not passed. No owner-run test is requested.
