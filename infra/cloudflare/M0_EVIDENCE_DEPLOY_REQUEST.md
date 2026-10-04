# M0 Evidence Deployment Request

**Request:** 41  
**Requested from baseline:** `32b4236a2ac336cbfaebce186cfb50ddea202a11`  
**Purpose:** Publish the M0.18 Scrapper v3 silhouette correction after retained-frame review.

Deployment #40 passed all objective gates, but its retained screenshot still read as a dark maintenance crate with an orange slit. The first augmentation was too subtle and occluded at gameplay camera distance.

This correction keeps the same authored asset slot/root and material mapping, but suppresses the crate-like v2 child geometry and presents a stronger v3 machine silhouette:

- rounded low maintenance chassis;
- protruding forward sensor head and localized hostile sensor;
- separate grounded locomotion pods and feet;
- intact forward maintenance arm/tool head;
- damaged rear arm/fork;
- maintenance pack massing;
- larger bracket sized around the articulated subject.

Existing shell/dark/hostile/damage materials are reused. No new material family, gameplay, AI, combat, collision, target, force or deterministic simulation behavior is introduced.

All M0.18 runtime gates remain active, including `scrapper-v3`, materials <=24, draw calls <=250, textures <=24 and zero runtime shader compilation after warmup.

Physical/human acceptance remains deferred and no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
