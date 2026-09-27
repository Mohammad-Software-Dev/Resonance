import { describe, expect, it } from "vitest";
import { WayfarerScarProgress } from "./slice-progression";

describe("WayfarerScarProgress", () => {
  it("advances through the opening slice without feeding back into simulation", () => {
    const progress = new WayfarerScarProgress();

    expect(progress.snapshot().stage).toBe("breach");
    expect(progress.update({ positionX: -4, attractActive: false, repelUses: 0 }).stage)
      .toBe("resonance");
    expect(progress.update({ positionX: -3.5, attractActive: true, repelUses: 0 }).stage)
      .toBe("repel");
    expect(progress.update({ positionX: 0, attractActive: false, repelUses: 1 }).stage)
      .toBe("relay");
    const complete = progress.update({ positionX: 6.3, attractActive: false, repelUses: 1 });
    expect(complete.stage).toBe("complete");
    expect(complete.complete).toBe(true);
  });

  it("remembers ability use even when it happened before the corresponding objective", () => {
    const progress = new WayfarerScarProgress();

    progress.update({ positionX: -5, attractActive: true, repelUses: 1 });
    const afterMove = progress.update({ positionX: -4, attractActive: false, repelUses: 1 });
    expect(afterMove.stage).toBe("relay");
  });

  it("never regresses after completion", () => {
    const progress = new WayfarerScarProgress();
    progress.update({ positionX: 7, attractActive: true, repelUses: 2 });
    expect(progress.snapshot().stage).toBe("complete");
    expect(progress.update({ positionX: -5, attractActive: false, repelUses: 0 }).stage)
      .toBe("complete");
  });
});
