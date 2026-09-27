import { describe, expect, it } from "vitest";
import {
  cameraSmoothingFactor,
  presentationCameraGoal,
} from "./presentation-camera";

describe("presentationCameraGoal", () => {
  it("adds restrained movement look-ahead", () => {
    expect(presentationCameraGoal({ playerX: 0, playerY: 1, velocityX: 5 }).x)
      .toBeCloseTo(0.55);
    expect(presentationCameraGoal({ playerX: 0, playerY: 1, velocityX: -5 }).x)
      .toBeCloseTo(-0.55);
  });

  it("keeps the camera inside authored room bounds", () => {
    expect(presentationCameraGoal({ playerX: 20, playerY: 1, velocityX: 20 }).x)
      .toBe(3.35);
    expect(presentationCameraGoal({ playerX: -20, playerY: 1, velocityX: -20 }).x)
      .toBe(-3.15);
  });

  it("keeps smoothing stable after long browser frames", () => {
    const factor = cameraSmoothingFactor(1);
    expect(factor).toBeGreaterThan(0);
    expect(factor).toBeLessThan(1);
    expect(factor).toBeCloseTo(cameraSmoothingFactor(0.1));
  });
});
