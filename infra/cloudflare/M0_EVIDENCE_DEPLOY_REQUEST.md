# M0 Evidence Deployment Request

**Request:** 14  
**Requested from baseline:** `40499e4457ad221f985065e4f3fb640498031123`  
**Purpose:** Publish the first M0.12 visual-readability recovery candidate.

Owner review of the previous deployed room found it technically functional but visually too abstract to recognize as a game. This deployment moves presentation forward without altering deterministic gameplay semantics.

The candidate adds:

- explicit semantic materials for the gameplay plane, independent of PBR/IBL readability;
- stronger separation between walkable deck, collision walls, moving platform and hazard surface;
- route-edge and hazard markings;
- moving-platform rails;
- a clearer Resonance pillar;
- anchor fins/rings so Resonance targets no longer read as plain spheres;
- a stronger human Wayfarer silhouette and ground marker;
- preserved hidden-by-default diagnostics and unchanged simulation/target IDs.

Physical and blind-human acceptance remain deferred, not passed. This deployment is for automated regression/runtime verification and future visual development, not a request for owner testing.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.
