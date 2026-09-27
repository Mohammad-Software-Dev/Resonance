# M0 Evidence Deployment Request

**Request:** 8  
**Requested from baseline:** `1e41cca1b98d8bdf89184f2a7edd021fba5d1ab6`  
**Purpose:** Resolve deployed Chromium readiness with explicit client boot-phase evidence and a longer software-renderer warmup window.

Request 7 proved the deployed page answers, WebGL2 is available, and the M0 scene visibly renders, but the app did not reach the diagnostics/input/export stage within the prior 30-second window. The client now exposes non-gameplay DOM boot markers for DOM, engine, graphics-room, shader-warmup and ready phases. The smoke allows up to 120 seconds for software-rendered shader warmup and retains page/console/resource failures.

No movement, simulation, targeting, Attract or Repel semantics are changed.

Changing this file on `main` intentionally triggers the `Deploy M0 Evidence Build` workflow.

The deployed build identity is the actual `main` commit checked out by the workflow, not the baseline written above. Record the resulting workflow run, deployed commit SHA, URL and timestamp in issue #13 and the M0 signoff evidence.
