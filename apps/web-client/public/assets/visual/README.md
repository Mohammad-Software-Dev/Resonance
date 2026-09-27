# Authored runtime visual assets

This directory is the browser runtime boundary for production visual art.

Expected format:

- characters and enemies: glTF 2.0 binary `.glb`;
- compressed geometry: meshopt where appropriate;
- runtime textures: KTX2/Basis where supported by the authored asset pipeline;
- source `.blend`, Substance and high-resolution authoring files do not belong here.

Current typed slots are defined in `src/graphics/authored-visual-assets.ts`.

Assigned M0 runtime slots now include:

- `wayfarer-player` → `characters/wayfarer-mara-m0.glb`;
- `scrapper-damaged` → `enemies/scrapper-damaged-m0.glb`.

Both are **authored M0 placeholders**, not shipping art. Their purpose is to prove that real binary character/enemy assets can replace procedural geometry without touching deterministic gameplay.

Unassigned slots remain `null` and retain the procedural fallback. A failed authored-asset load must also fall back rather than breaking gameplay boot.

Do not treat either the procedural fallbacks or the M0 authored placeholder as final production art.
