# M0.14 Authored Visual Identity Pass

**Status:** IN PROGRESS  
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
