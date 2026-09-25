# M0 Reference Hardware and Performance Capture Record

**Status:** Template awaiting physical-device measurements  
**Purpose:** Store reproducible M0.9 evidence without inventing hardware tiers or performance results.

## Reference hardware

Do not mark a tier defined until every field below is concrete.

### Tier L

- Device/model:
- CPU:
- GPU:
- GPU VRAM/shared memory:
- RAM:
- OS/build:
- GPU driver:
- Browser/version:
- Display resolution:
- Notes:

### Tier M — M0 approval device

- Device/model:
- CPU:
- GPU:
- GPU VRAM/shared memory:
- RAM:
- OS/build:
- GPU driver:
- Browser/version:
- Display resolution:
- Notes:

### Tier H

- Device/model:
- CPU:
- GPU:
- GPU VRAM/shared memory:
- RAM:
- OS/build:
- GPU driver:
- Browser/version:
- Display resolution:
- Notes:

## Capture protocol

For each required run:

1. use a production build, not Vite dev mode;
2. record Build/commit SHA;
3. close unrelated GPU-heavy tabs/apps where practical;
4. open the representative M0 course;
5. allow startup and shader warmup to finish;
6. press X to reset the performance ring;
7. traverse for at least 120 seconds;
8. include jump, evade, moving anchor, Attract and Repel;
9. press P to export the JSON evidence;
10. attach/store the JSON with this record;
11. record any visible hitch, corruption or recovery issue separately.

Do not hand-edit exported capture values.

## Tier M WebGPU result

- Commit:
- Browser:
- Preset:
- Capture filename:
- Frame p50:
- Frame p95:
- Frame p99:
- Max frame:
- Frames >50 ms:
- Minimum render scale:
- Average render scale:
- CPU frame p95:
- GPU frame p95:
- Draw-call range:
- Runtime shader compile:
- Heap observation:
- Visual/readability notes:
- PASS / FAIL / NOT YET MEASURED: **NOT YET MEASURED**

## Tier M WebGL2 fallback result

- Commit:
- Browser:
- Preset:
- Capture filename:
- Frame p50:
- Frame p95:
- Frame p99:
- Max frame:
- Frames >50 ms:
- Minimum render scale:
- Average render scale:
- CPU frame p95:
- GPU frame p95 if available:
- Draw-call range:
- Runtime shader compile:
- Heap observation:
- Visual/readability notes:
- PASS / FAIL / NOT YET MEASURED: **NOT YET MEASURED**

## Firefox result

- Hardware tier:
- Commit:
- Backend:
- Browser/version:
- Capture filename:
- Result:
- Notes:

## Safari/macOS result

- Hardware tier:
- Commit:
- Backend:
- Browser/version:
- Capture filename:
- Result:
- Notes:

## Context-loss/recovery result

- Hardware:
- Browser:
- Backend:
- Test method:
- Restored successfully:
- Simulation accumulator recovered cleanly:
- Graphics preset restored:
- Dynamic resolution reset:
- Visual corruption after restore:
- Notes:

## Five-minute memory/GC loop

- Hardware:
- Browser:
- Backend:
- Start heap/memory observation:
- End heap/memory observation:
- Repeatable growth:
- GC/hitch notes:
- Result:

## M0.9 signoff

M0.9 is not performance-signed-off until the Tier M WebGPU and WebGL2 sections contain real measurements and satisfy the gates in `127_M0_BROWSER_PERFORMANCE_PASS.md`.

No blank field should be interpreted as a pass.
