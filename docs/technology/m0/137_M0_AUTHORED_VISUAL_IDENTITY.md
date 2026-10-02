# M0.14 Authored Visual Identity Pass

**Status:** IN PROGRESS — final hierarchy-regression fix pending deployment  
**Purpose:** Move Wayfarer Scar from a recognizable prototype to a coherent first art-direction slice without requesting owner-run testing or entering M1.

Deployment #29 proved the room now reads as a game space, but its retained screenshot still shows first-generation placeholder geometry: block-heavy environment dressing, a mannequin-like Wayfarer silhouette and oversized prototype-style Resonance targets.

## Scope

Presentation-only work:

- replace the first authored Wayfarer placeholder with a higher-detail versioned GLB;
- replace the first damaged Scrapper placeholder with a clearer maintenance-drone silhouette;
- replace the first Wayfarer Scar setdress GLB with a richer transit-wreck kit;
- preserve the existing authored-slot/fallback contract;
- keep material remapping onto the shared runtime palette;
- reduce target presentation dominance while preserving interaction readability;
- publish an `authored-v2` visual-identity contract for deployed smoke;
- keep traversal course v2, follow-focus-v1 camera and essential-v1 depth composition intact.

## Art-direction requirements

The v2 assets must reinforce the canonical visual identity:

- orbital industrial ecology rather than gothic/medieval vocabulary;
- visibly human/human-derived Wayfarer proportions;
- ceramic field rig with asymmetric utility equipment;
- localized Resonance emitter rather than full-body cyan glow;
- damaged maintenance-machine enemy language;
- transit bulkheads, service spines, cargo and relay architecture that explain the space's former function.

## Non-goals

M0.14 does not change:

- deterministic movement or collision;
- target selection or force rules;
- combat authority or enemy AI;
- networking;
- progression;
- M0 physical/human acceptance status.

## Runtime asset contract

Versioned authored slots:

- `wayfarer-player` -> `characters/wayfarer-mara-m0-v2.glb`;
- `scrapper-damaged` -> `enemies/scrapper-damaged-m0-v2.glb`;
- `wayfarer-scar-setdress` -> `environment/wayfarer-scar-setdress-m0-v2.glb`.

The runtime publishes `data-resonance-visual-identity="authored-v2"` only when all three v2 slots load through the authored path.

## Automated gate

M0.14 is green only when:

- all authored visual asset tests pass;
- deployed smoke reports `authored-v2`;
- all three authored visual slots load;
- deterministic replay fingerprint remains unchanged;
- Chromium/Firefox/WebKit replay equivalence passes;
- traversal/camera/depth contracts remain unchanged;
- materials remain <=24;
- deployed draw calls remain <=250;
- no page/console/request failures occur;
- retained deployment screenshot is reviewed as the iteration loop.

No owner-run test is requested.


## Pass 2 — subject hierarchy refinement

The first authored-v2 retained screenshot proved the asset-loading path but still exposed three presentation problems:

- Mara shared too much value/material language with the wreck behind her;
- the damaged Scrapper was staged too far toward the edge to read as a deliberate encounter subject;
- long cyan infrastructure lines competed with Resonance anchors and route feedback.

Pass 2 keeps the same authored-v2 GLBs and improves runtime composition without changing simulation:

- dedicated Wayfarer suit/ceramic materials use the remaining two M0 material slots;
- Mara is slightly rescaled for stronger side-view presence;
- the Scrapper is moved into a clearer readable vignette position;
- background service conduits are thinner and lower-emission;
- Resonance anchor presentation is reduced from the previous prototype scale;
- the boot-time objective banner no longer covers the center of the retained screenshot;
- `data-resonance-presentation-hierarchy="authored-subject-v1"` is required by browser and deployed smoke.

The material ceiling remains 24 and the draw-call ceiling remains 250.



## Pass 3 — render-loop hierarchy correction

Deployment #31 exposed a code-path issue during final review: two presentation values from Pass 2 were only applied at initialization and were then overwritten every render frame.

Corrective work:

- target visual scale now comes from a tested pure presentation helper;
- inactive anchors are reduced to 0.31 scale;
- selected anchors use 0.42;
- active Attract anchors use 0.49;
- Repel flash peaks at 0.54;
- the authored Scrapper now drifts around the intended x=4.9 focal position rather than the old x=5.75 edge staging;
- the Scrapper's authored -0.11 rotation baseline is preserved by the animation loop;
- browser/deployed smoke contract advances to `data-resonance-presentation-hierarchy="authored-subject-v2"`.

This correction is presentation-only. It does not alter target selection, physics, collision, deterministic state or authored asset slots.
