# M0 Evidence Deployment Request

**Request:** 38  
**Requested from baseline:** `9376756902351366c86c214f846443df0b9ea6a1`  
**Purpose:** Publish the first M0.18 authored-asset fidelity v3 candidate.

Deployment #37 completed the encounter/path composition pass and exposed source geometry as the next presentation bottleneck. M0.18 replaces the authored-placeholder-v2 GLBs with reproducible v3 prototype geometry generated from versioned source before every CI/browser/deployment build.

This request publishes:

- Mara v3 with smoother human proportion transitions, layered ceramic protection, asymmetric field gear, refined helmet/visor and forearm Resonance emitter;
- damaged Scrapper v3 with a purpose-built wedge maintenance chassis, articulated supports, readable sensor face, broken tool arm and loose plate;
- Wayfarer Scar setdress v3 with layered transit profiles, trussed service spines, recognizable cargo pods and stronger Relay framing;
- runtime manifest URLs switched to `*-m0-v3.glb`;
- `data-resonance-authored-asset-fidelity="v3"`;
- pinned Python 3.12 / numpy 2.3.5 / trimesh 4.11.1 generation in CI and deployment;
- strict generated-GLB node/material/size validation before build.

The source GLBs keep the established material slot names so runtime remapping does not increase the scene material budget. Physics, collision, TargetIDs, Resonance mechanics, objective progression and deterministic replay are unchanged.

Hard gates remain materials <=24, draw calls <=250 and zero runtime shader compilation after warmup. Physical/human acceptance remains deferred; no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
