# M0 Evidence Deployment Request

**Request:** 24  
**Requested from baseline:** `aec8329d9793ccda9c44646fde6c9d62c2442e8a`  
**Purpose:** Publish M0.12 Pass 11 presentation material-budget consolidation.

Pass 10 proved both authored character/enemy GLBs live, but its deployed smoke reported 40 scene materials. This pass restores the earlier M0 material discipline before adding the third authored set-dress slot.

Changes:

- remap imported Mara/Scrapper materials onto the existing room presentation palette;
- dispose replaced imported materials;
- release hidden procedural Wayfarer fallback meshes/materials after successful authored load;
- release hidden procedural Scrapper body meshes/materials after successful authored load;
- retain the Scrapper threat ring on the shared hostile palette;
- reuse existing room materials for wreck-state effects;
- stop updating released fallback presentation meshes;
- fail deployed smoke when the loaded scene exceeds 24 materials.

No authored Wayfarer/Scrapper geometry is removed. No movement, collision, targeting, Resonance-force, combat, AI, progression or deterministic replay semantics are changed.

Physical and blind-human acceptance remain deferred. No owner-run testing is requested.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
