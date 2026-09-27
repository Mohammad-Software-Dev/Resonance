import { describe, expect, it } from "vitest";
import {
  wayfarerPresentationMotionMode,
  wayfarerPresentationPose,
} from "./wayfarer-presentation-motion";

const base = {
  elapsedSeconds: 1,
  velocityX: 0,
  velocityY: 0,
  grounded: true,
  movementMode: "grounded" as const,
  attractActive: false,
  repelActive: false,
};

describe("wayfarerPresentationMotionMode", () => {
  it("prioritizes recoil, evade and active resonance states", () => {
    expect(wayfarerPresentationMotionMode({ ...base, repelActive: true })).toBe("repel");
    expect(wayfarerPresentationMotionMode({ ...base, movementMode: "evade" })).toBe("evade");
    expect(wayfarerPresentationMotionMode({ ...base, attractActive: true })).toBe("attract");
  });

  it("distinguishes air, run and idle without changing simulation", () => {
    expect(wayfarerPresentationMotionMode({
      ...base,
      grounded: false,
      movementMode: "airborne",
      velocityY: 4,
    })).toBe("air");
    expect(wayfarerPresentationMotionMode({ ...base, velocityX: 4 })).toBe("run");
    expect(wayfarerPresentationMotionMode(base)).toBe("idle");
  });
});

describe("wayfarerPresentationPose", () => {
  it("keeps every visual offset bounded", () => {
    const inputs = [
      base,
      { ...base, velocityX: 8 },
      { ...base, grounded: false, movementMode: "airborne" as const, velocityX: 8, velocityY: -10 },
      { ...base, movementMode: "evade" as const, velocityX: 12 },
      { ...base, attractActive: true },
      { ...base, repelActive: true },
    ];
    for (const input of inputs) {
      const pose = wayfarerPresentationPose(input);
      expect(pose.rootYOffset).toBeGreaterThanOrEqual(-0.1);
      expect(pose.rootYOffset).toBeLessThanOrEqual(0.08);
      expect(Math.abs(pose.rootLeanZ)).toBeLessThanOrEqual(0.2);
      expect(pose.rootScaleY).toBeGreaterThanOrEqual(0.85);
      expect(pose.rootScaleY).toBeLessThanOrEqual(1.06);
      expect(pose.emitterScale).toBeGreaterThanOrEqual(1);
      expect(pose.emitterScale).toBeLessThanOrEqual(1.5);
    }
  });

  it("gives attract and repel visibly different silhouettes", () => {
    const attract = wayfarerPresentationPose({ ...base, attractActive: true });
    const repel = wayfarerPresentationPose({ ...base, repelActive: true });
    expect(attract.rootLeanZ).toBeLessThan(0);
    expect(repel.rootLeanZ).toBeGreaterThan(0);
    expect(repel.rootScaleY).toBeLessThan(attract.rootScaleY);
  });
});
