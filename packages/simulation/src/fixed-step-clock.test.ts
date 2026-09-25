import { describe, expect, it } from "vitest";
import { FixedStepClock } from "./index";

describe("FixedStepClock", () => {
  it("advances exactly 60 ticks for one second regardless of render cadence", () => {
    for (const fps of [30, 60, 120, 144]) {
      const clock = new FixedStepClock();
      for (let frame = 0; frame < fps; frame += 1) clock.advance(1 / fps);
      expect(Number(clock.tick)).toBe(60);
    }
  });

  it("caps catch-up work after a long frame", () => {
    const clock = new FixedStepClock(4);
    expect(clock.advance(1).length).toBe(4);
  });
});
