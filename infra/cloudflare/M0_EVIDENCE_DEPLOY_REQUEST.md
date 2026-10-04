# M0 Evidence Deployment Request

**Request:** 40  
**Requested from baseline:** `0dd8952c06a47b808bdd8ba50f2ac4c394135441`  
**Purpose:** Publish the first M0.18 authored Scrapper v3 identity candidate.

M0.17 completed encounter staging and camera priority. The retained frame then isolated the next visual bottleneck: the hostile body itself still read too much like a maintenance crate.

This candidate keeps the existing authored Scrapper GLB as the base body and augments it with a presentation-only v3 machine identity:

- forward sensor hood;
- separate low locomotion pods;
- intact maintenance tool arm and head;
- visibly damaged opposite arm/fork;
- wider/lower hostile proportions;
- stronger horizontal hostile sensor;
- bracket resized around the articulated subject;
- `data-resonance-hostile-identity="scrapper-v3"`.

All added geometry reuses the existing shell/dark/hostile/damage palette. No new material family, gameplay, AI, combat, collision, target, force or deterministic simulation behavior is introduced.

The deployed smoke now also enforces:
- Scrapper v3 runtime identity;
- materials <=24;
- draw calls <=250;
- textures <=24;
- zero runtime shader compilation after warmup;
- all prior presentation contracts and blind-mode hygiene.

Physical/human acceptance remains deferred and no owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
