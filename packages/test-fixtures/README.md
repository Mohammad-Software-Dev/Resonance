# test-fixtures

Deterministic shared fixtures and replay runners.

Current M0 fixture:

- `m0-representative-course@1`
- deterministic Rapier collision;
- Wayfarer movement;
- moving platform/anchor;
- Attract and Repel;
- 30-tick replay checkpoints;
- 30/45/60/90/120/144 render-cadence verification.

This package is test/harness infrastructure. It must not introduce Babylon, DOM or presentation authority into gameplay simulation.
