# Content Tools, Asset Pipeline and Room Architecture — Browser First

## Principle

Artists/designers should author content visually, while gameplay truth stays in typed data and stable IDs.

## DCC pipeline

Canonical source tools:

- Blender — modeling, rigging, animation, layout source;
- Adobe Substance 3D Painter — PBR texturing where appropriate;
- Babylon.js Editor — gameplay scene assembly, materials, lighting, preview and optimization;
- code/data tools — gameplay metadata and validation.

## Runtime asset format

Primary:

- glTF 2.0;
- binary `.glb`.

Geometry:

- meshopt compression by default;
- quantization where visual tests permit;
- instancing for repeated static pieces;
- LOD/HLOD for large vista geometry.

Textures:

- KTX2/Basis Universal;
- UASTC for normals/high-quality non-color maps where required;
- ETC1S for suitable color/low-frequency content;
- mip chains generated offline.

Do not ship original PSD/SBSAR/PNG source textures as runtime content unless specifically needed.

## Scene source of truth

Babylon Editor project/source is authoring data.

Runtime output uses:

- exported scene/GLB;
- room manifest;
- typed gameplay metadata.

Do not require the shipping runtime to parse editor-only undocumented state for critical logic.

## Room package

Every room has stable:

- RoomID;
- content version;
- asset bundle list;
- gameplay bounds;
- spawn/join markers;
- Relay/checkpoint links;
- Resonance target metadata;
- hazard metadata;
- encounter definition;
- world-state VariantIDs;
- prefetch neighbors;
- performance budget.

## Room loading

Browser does not load an entire region/world at once.

At runtime maintain:

- active room;
- immediate neighbor/pre-entry assets;
- selected vista assets;
- shared region kit.

On route prediction/door/launch approach:

- prefetch next room bundle;
- decode/upload before transition;
- retain short LRU cache of recently visited rooms.

## Streaming rule

No critical high-speed launch may enter a room that has not met a minimum ready state.

If destination asset streaming is late:

- hold transition in an authored safe tunnel/occlusion moment;
- reduce LOD;
- never stall the simulation thread on a large synchronous decode.

## Content manifest

Each build publishes immutable manifest:

- ManifestVersion;
- BuildID;
- package hashes;
- byte sizes;
- dependencies;
- compatibility;
- cache policy.

Assets use content-hashed URLs.

## Cloudflare delivery

Use:

- Workers Static Assets for app shell/small static files;
- R2 for large game content;
- global CDN caching.

Service worker prefetches/cache-manages content.

## Initial-load budget

Browser-first principle:

**Start playing before downloading the whole game.**

Target staging:

1. shell/login/menu;
2. core engine/WASM;
3. Wayfarer Scar opening package;
4. background prefetch of likely next package.

The launch page should not require the full campaign asset set.

## Babylon rendering/content rules

Use:

- PBR materials;
- IBL/reflection probes;
- Node Material for stylized signature surfaces;
- Frame Graph/post processing;
- GPU particles where appropriate;
- thin instances/instances;
- frozen static transforms/materials where safe.

Avoid:

- thousands of unique materials;
- excessive alpha-blended particles;
- many shadow-casting dynamic lights;
- gameplay collision from high-detail render meshes;
- runtime mesh decomposition.

## Lighting strategy

To maximize graphics while remaining browser-stable:

- bake static indirect lighting/lightmaps where beneficial;
- use IBL/environment lighting;
- use one dominant shadowed directional/key light where scene style allows;
- tightly budget additional shadow-casting local lights;
- use emissive materials and non-shadowed lights for atmosphere;
- use contact/SS effects only by quality tier.

Gameplay readability wins over physically exact lighting.

## Collision

Collision meshes are separate/simple assets.

Use:

- capsules;
- boxes;
- convex/simple meshes;
- authored one-way surfaces;
- stable moving-platform proxies.

Do not use render triangles as the default gameplay collision representation.

## 2.5D plane

Room metadata defines:

- gameplay H/V plane frame;
- depth lane limits;
- authored gravity frame;
- camera framing;
- depth staging.

Visual geometry may extend deeply away from the gameplay plane.

## World-state variants

A transformed room should share:

- base geometry where possible;
- modular variant actors;
- stateful gameplay entities;
- alternate collision only where necessary.

Variant selection occurs before traversal commitment.

## Authoring IDs

Persistent gameplay objects receive stable IDs in data.

Names/paths in Blender or Babylon Editor are not sufficient save identity.

## Validation

Editor/build-time validation checks:

- duplicate IDs;
- missing target metadata;
- inaccessible critical route;
- unsupported WebGL fallback material;
- oversized texture;
- excessive draw calls/material count;
- missing LOD;
- missing collision;
- invalid save-state variant;
- missing prefetch dependency.

## Acceptance

Content pipeline passes when:

- a designer can assemble a room without gameplay-code edits;
- asset build is reproducible;
- browser streams adjacent rooms without visible stalls;
- WebGPU and WebGL2 render the same gameplay truth;
- transformed variants do not duplicate whole scenes unnecessarily;
- source art remains independent from runtime compression.
