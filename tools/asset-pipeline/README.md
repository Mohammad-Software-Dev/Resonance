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
