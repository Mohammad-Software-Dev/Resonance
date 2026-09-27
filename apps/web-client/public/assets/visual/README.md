# Authored runtime visual assets

This directory is the browser runtime boundary for production visual art.

Expected format:

- characters and enemies: glTF 2.0 binary `.glb`;
- compressed geometry: meshopt where appropriate;
- runtime textures: KTX2/Basis where supported by the authored asset pipeline;
- source `.blend`, Substance and high-resolution authoring files do not belong here.

Current typed slots are defined in `src/graphics/authored-visual-assets.ts`.

The first assigned runtime slot is now `wayfarer-player`, backed by `characters/wayfarer-mara-m0.glb`. It is an **authored M0 placeholder**, not shipping art: its purpose is to prove that a real binary character asset can replace procedural geometry without touching deterministic gameplay.

Unassigned slots remain `null` and retain the procedural fallback. A failed authored-asset load must also fall back rather than breaking gameplay boot.

Do not treat either the procedural fallbacks or the M0 authored placeholder as final production art.
