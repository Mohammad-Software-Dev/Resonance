import { describe, expect, it } from "vitest";
import { wayfarerPresentationPose } from "./wayfarer-presentation";

const base = {
  velocityX: 0,
  velocityY: 0,
  grounded: true,
  attractActive: false,
  repelActive: false,
  facing: 1 as const,
};

describe("wayfarerPresentationPose", () => {
  it("prioritizes Repel and Attract over locomotion", () => {
    expect(wayfarerPresentationPose({ ...base, velocityX: 5, repelActive: true }).mode).toBe("repel");
    expect(wayfarerPresentationPose({ ...base, velocityX: 5, attractActive: true }).mode).toBe("attract");
  });

  it("distinguishes run, air and idle presentation", () => {
    expect(wayfarerPresentationPose({ ...base, velocityX: 4 }).mode).toBe("run");
    expect(wayfarerPresentationPose({ ...base, grounded: false, velocityY: 3 }).mode).toBe("air");
    expect(wayfarerPresentationPose(base).mode).toBe("idle");
  });

  it("keeps visual lean within authored limits", () => {
    expect(Math.abs(wayfarerPresentationPose({ ...base, velocityX: 99 }).bodyLean)).toBeLessThanOrEqual(0.13);
    expect(Math.abs(wayfarerPresentationPose({ ...base, grounded: false, velocityY: 99 }).bodyLean)).toBeLessThanOrEqual(0.12);
  });
});
