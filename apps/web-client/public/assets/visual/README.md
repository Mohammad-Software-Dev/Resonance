# Authored runtime visual assets

This directory is the browser runtime boundary for production visual art.

Expected format:

- characters and enemies: glTF 2.0 binary `.glb`;
- compressed geometry: meshopt where appropriate;
- runtime textures: KTX2/Basis where supported by the authored asset pipeline;
- source `.blend`, Substance and high-resolution authoring files do not belong here.

Current typed slots are defined in `src/graphics/authored-visual-assets.ts`.

Until a slot has reviewed authored art, its `url` remains `null` and the code-generated M0 presentation remains an explicit procedural fallback. A failed authored-asset load must also fall back rather than breaking gameplay boot.

Do not treat the procedural fallback meshes as shipping art.
