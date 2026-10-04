# M0.17 Encounter Staging and Traversal-Path Readability

**Status:** COMPLETE — deployed build `d7c23da1fb95e7f1ad6771bd126a6b414ebb5c4c`  
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
- publish `data-resonance-encounter-composition="encounter-path-v3"`;
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
- browser and deployed smoke require `encounter-path-v3`;
- `hero-hostile-v2`, `focal-lighting-v1`, `authored-subject-v2` and `authored-v2` remain active;
- materials <=24 and draw calls <=250;
- runtime shader compilation after warmup is 0;
- verify + Chromium + Firefox + WebKit replay gates pass;
- no page/console/request/HTTP failures occur.

The retained deployed screenshot remains the iteration loop. Do not request owner-run testing at this milestone.


## Deployment #36 budget correction

The first live M0.17 candidate proved the encounter composition visually, but deployed smoke rejected it because Babylon's additional `CreateLines` bracket allocated an implicit line material, raising the scene from 24 to 25 materials. The retained frame confirmed the intended hostile staging and scan origin.

The correction keeps the composition and replaces that bracket with eight tiny corner bars using the already-existing hostile material. This preserves the 24-material ceiling at the cost of a small, bounded draw-call increase that remains well below 250.


## Deployment #37 retained-frame review

Deployment #37 restored the 24-material ceiling and passed all automated runtime gates, but the retained screenshot exposed a remaining composition defect: the orange scan telegraph was more legible than the damaged Scrapper that generated it. The hostile could still read as peripheral/off-screen even though the runtime contract was green.

M0.17 therefore remains open for one final presentation-only correction rather than closing on counters alone.

## Final hostile-first correction

The final M0.17 candidate:

- moves the Scrapper focal position leftward onto the opening composition;
- raises and enlarges the authored Scrapper silhouette;
- strengthens its three-quarter rotation and hostile eye read;
- widens the reused-material hostile bracket around the actual subject;
- biases the encounter camera earlier once the player begins moving into the breach;
- reduces scan opacity so the scan supports, rather than replaces, the hostile;
- advances the runtime contract to `encounter-path-v3`.

Deterministic gameplay, collision, targeting, force semantics and AI remain unchanged.


## Deployment #38 retained-frame review

Deployment #38 successfully moved and enlarged the Scrapper presentation, but the retained frame exposed the true camera bug: idle target selection still overrode encounter focus. Because the nearby low Repel node is selected immediately, the camera remained centered on the player/anchor while the hostile stayed beyond the right edge.

The final correction changes camera priority only:

- active Attract/Repel interaction may override encounter focus;
- idle target selection does not;
- encounter staging therefore owns the opening breach composition;
- the runtime contract advances to `encounter-path-v3`.

This is presentation-only and leaves target selection itself unchanged.


## Completion record

- final implementation commit: `d7c23da1fb95e7f1ad6771bd126a6b414ebb5c4c`;
- post-merge CI #292: PASS;
- Deploy M0 Evidence Build #39 / run `37217699067`: PASS;
- retained deployed-smoke artifact: `11308958469`;
- artifact digest: `sha256:2eac640ed9bd295cbed0b05dbc5913837a032ee4132a202a622f9a8df1d408f3`;
- encounter composition contract: `encounter-path-v3`;
- materials: 24 / 24;
- deployed draw-call range: 176–194 / 250;
- textures: 16;
- page/console/request/HTTP failures: none;
- deterministic replay/browser equivalence: unchanged and green.

Retained-frame review confirms that M0.17 corrected the camera/encounter priority problem: idle target selection no longer suppresses encounter framing. The remaining visual bottleneck is now the Scrapper asset itself, which still reads too much like a dark maintenance crate with an orange slit. That is explicitly handed to M0.18 rather than extending camera/path work further.

Physical/human acceptance remains deferred, not passed. No owner-run test is requested.
