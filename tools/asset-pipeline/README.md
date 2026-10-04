# asset-pipeline

GLB/KTX2/meshopt content build tooling.

## M0 authored placeholder generator

`generate_m0_v2_assets.py` is a reproducible geometry-source script for the M0.14 authored placeholders. It is not part of the browser runtime or CI dependency graph.

Local authoring prerequisites:

```bash
python -m pip install trimesh numpy
python tools/asset-pipeline/generate_m0_v2_assets.py apps/web-client/public/assets/visual
```

It writes the three versioned M0.14 GLBs used by the typed authored-visual slots. Shipping assets are expected to come from Blender/Babylon production authoring and the normal GLB/KTX2/meshopt pipeline; this script exists so the prototype geometry is auditable rather than opaque binary-only content.


## M0.18 authored v3 geometry

The v3 Wayfarer, damaged Scrapper and Wayfarer Scar setdress are reproducible generated build assets. Source geometry is versioned in:

- `generate_m0_v3_assets.py`

The generated GLBs are intentionally not maintained as hand-edited source files. CI, browser jobs and the evidence deployment regenerate them before build/serve.

Pinned authoring environment:

- Python 3.12
- numpy 2.3.5
- trimesh 4.11.1

Generate:

```bash
python -m pip install numpy==2.3.5 trimesh==4.11.1
pnpm assets:m0:v3
```

Validate node/material/size contracts:

```bash
pnpm assets:m0:v3:validate
```

Outputs:

- `apps/web-client/public/assets/visual/characters/wayfarer-mara-m0-v3.glb`
- `apps/web-client/public/assets/visual/enemies/scrapper-damaged-m0-v3.glb`
- `apps/web-client/public/assets/visual/environment/wayfarer-scar-setdress-m0-v3.glb`

Runtime material remapping keeps the scene material ceiling independent of the source GLB material slots.
