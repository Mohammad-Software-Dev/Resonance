# M0 Evidence Deployment Request

**Request:** 22  
**Requested from baseline:** `34240545de717e621537109c74ce7fcab29fdd4e`  
**Purpose:** Publish M0.12 Pass 9 with the first actual authored runtime character replacement.

This candidate uses the Pass 8 GLB boundary rather than extending the procedural character indefinitely.

Changes:

- adds `/assets/visual/characters/wayfarer-mara-m0.glb`;
- assigns it to the typed `wayfarer-player` slot;
- loads the binary GLB through Babylon's glTF loader before shader warmup;
- mirrors deterministic player position/facing into the authored presentation root;
- disables the procedural Wayfarer presentation only after successful authored load;
- keeps procedural fallback code for fault tolerance;
- requires authored Mara mesh landmarks in the visual audit;
- requires `data-resonance-authored-wayfarer="authored"` in deployed smoke;
- records explicit asset provenance and `shippingArt: false`.

This is an authored M0 placeholder, not final character art. It proves the production runtime asset replacement path and moves the prototype away from code-generated primitives.

No movement, collision, target selection, Resonance-force, progression, combat, AI or deterministic replay semantics are changed.

Physical and blind-human acceptance remain deferred. No owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
