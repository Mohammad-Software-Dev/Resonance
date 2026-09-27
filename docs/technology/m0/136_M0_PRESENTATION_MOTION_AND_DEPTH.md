# M0.13 Presentation Motion and Depth Polish

**Status:** IN PROGRESS  
**Purpose:** Continue improving the browser prototype without asking for physical/human acceptance while M1 remains gated.

M0.12 made Wayfarer Scar recognizable as a game space. M0.13 addresses the next visible prototype cues: static authored subjects, over-uniform teal presentation and weak pose/grounding feedback.

## Scope

Presentation-only work:

- derive authored Wayfarer motion from existing deterministic movement state;
- distinguish idle, run, airborne, evade, Attract and Repel-recovery poses;
- add bounded root bob/lean/squash and authored helmet/emitter accents;
- preserve the simulation transform as the source of truth;
- darken primary deck/machinery surfaces so teal is reserved for Resonance and route accents;
- increase visual depth/contrast without adding gameplay geometry;
- publish presentation-motion state for automated smoke;
- keep the <=24 material gate and current draw-call budget.

## Non-goals

M0.13 does not add:

- combat authority;
- enemy AI;
- networking;
- new collision;
- new movement rules;
- target-selection changes;
- progression changes;
- M0 acceptance evidence.

## Automated gate

The pass is green only when:

- unit tests cover pose priority and bounded transforms;
- deterministic replay fingerprint remains unchanged;
- Chromium/Firefox/WebKit replay equivalence passes;
- deployed smoke reports a valid Wayfarer presentation-motion state;
- authored visual slots remain loaded;
- traversal course v2 and follow-focus-v1 camera remain intact;
- materials stay <=24;
- no page/console/request/HTTP failures occur.

No owner-run test is requested.
