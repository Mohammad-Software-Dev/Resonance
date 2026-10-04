# M0.18 Authored Asset Fidelity V3

**Status:** IN PROGRESS  
**Purpose:** Replace the current authored-placeholder-v2 character/enemy/setdress assets with a third authored prototype pass that reads as intentional game art rather than primitive proxy geometry.

Deployment #37 proves the camera, hierarchy, interaction language and traversal composition are stable enough that the largest remaining presentation limitation is now the source geometry itself.

## Scope

### Mara Venn v3

- preserve human/human-derived adult silhouette and identical gameplay collision;
- improve torso/hip/limb proportion transitions so the figure no longer reads as stacked primitives;
- add layered ceramic chest/shoulder/leg protection;
- add asymmetrical field gear and a clearer forearm Resonance emitter;
- improve helmet/visor silhouette with a recognizable facial plane;
- keep fabric/cable secondary shapes;
- keep the same runtime material-remap names so no new scene materials are introduced.

### Damaged Scrapper v3

- replace the crate-like body read with a low, wedge-shaped industrial maintenance chassis;
- expose articulated locomotion/tool supports as separate readable forms;
- create a clear front sensor/head direction;
- retain one visibly broken tool arm and loose plate;
- retain localized orange hostile language without turning the whole machine orange;
- remain clearly mechanical, non-organic and non-gothic.

### Wayfarer Scar setdress v3

- replace large flat slab reads with layered transit-frame profiles;
- add beveled/stepped bulkhead silhouettes and recognizable maintenance/cargo forms;
- improve Relay framing and destination hierarchy;
- preserve gameplay-plane clarity and avoid decorative geometry that looks reachable.

## Runtime contract

- v3 GLBs are deterministic build artifacts generated from the versioned Python authoring source and emitted under the existing canonical `/assets/visual/` roots;
- publish v3 URLs through `AUTHORED_VISUAL_ASSETS`;
- preserve material remap names:
  - Mara: `Mara_Suit`, `Mara_Ceramic`, `Mara_Resonance`, `Mara_Dark`, `Mara_Fabric`;
  - Scrapper: `Scrapper_Shell`, `Scrapper_Joint`, `Scrapper_Hostile`, `Scrapper_Damage`;
  - Scar: `Scar_Shell`, `Scar_Ceramic`, `Scar_Resonance`, `Scar_Damage`;
- procedural fallbacks remain available but authored v3 must load in automated browser/deployed smoke;
- add `data-resonance-authored-asset-fidelity="v3"`.

## Hard constraints

- physics/collision and deterministic simulation remain unchanged;
- TargetIDs and Resonance mechanics remain unchanged;
- materials <=24;
- draw calls <=250;
- runtime shader compilation after warmup = 0;
- bundle budget stays green;
- no shipping-art claim: v3 is a materially improved authored prototype pass, not final production art;
- physical/human acceptance remains deferred;
- no owner-run testing is requested.

## Automated gate

M0.18 completes only when:

- the versioned generator produces all three v3 GLBs in CI/deployment and asset-manifest tests require their v3 URLs;
- automated asset validation loads all generated v3 GLBs and verifies expected named nodes, material slots and bounded file sizes;
- normal Chromium presentation smoke retains a screenshot;
- deployed smoke proves v3 authored assets loaded;
- materials <=24, draw calls <=250, runtime shader compile 0;
- verify + Chromium + Firefox + WebKit are green;
- no page/console/request/HTTP failures occur.


## Reproducible authoring pipeline

M0.18 does not treat generated binary GLBs as hand-maintained source. The repository versions `tools/asset-pipeline/generate_m0_v3_assets.py`; CI and deployment use Python 3.12 with numpy 2.3.5 and trimesh 4.11.1 to emit the three GLBs before the browser build.

`tools/asset-pipeline/validate_m0_v3_assets.py` then requires the named geometry/material contracts and expected size bands. A missing, malformed or fallback asset therefore fails automation before the presentation build can be accepted.
