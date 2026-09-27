import { describe, expect, it } from "vitest";
import {
  cameraSmoothingFactor,
  presentationCameraGoal,
} from "./presentation-camera";

describe("presentationCameraGoal", () => {
  it("adds restrained movement look-ahead", () => {
    expect(presentationCameraGoal({ playerX: 0, playerY: 1, velocityX: 5 }).x)
      .toBeCloseTo(0.475);
    expect(presentationCameraGoal({ playerX: 0, playerY: 1, velocityX: -5 }).x)
      .toBeCloseTo(-0.475);
  });

  it("biases framing toward a nearby interaction target without abandoning the player", () => {
    const focused = presentationCameraGoal({
      playerX: 0,
      playerY: 1,
      velocityX: 0,
      focusX: 3,
      stage: "resonance",
    });
    expect(focused.x).toBeCloseTo(0.48);
    expect(focused.z).toBe(-8.55);
  });

  it("biases relay-stage composition forward", () => {
    expect(presentationCameraGoal({
      playerX: 3,
      playerY: 1,
      velocityX: 0,
      stage: "relay",
    }).x).toBeCloseTo(3.42);
  });

  it("keeps the camera inside authored room bounds", () => {
    expect(presentationCameraGoal({ playerX: 20, playerY: 1, velocityX: 20 }).x)
      .toBe(5.25);
    expect(presentationCameraGoal({ playerX: -20, playerY: 1, velocityX: -20 }).x)
      .toBe(-5.05);
  });

  it("uses a closer gameplay distance than the old room-wide framing", () => {
    expect(presentationCameraGoal({ playerX: 0, playerY: 1, velocityX: 0 }).z)
      .toBeGreaterThan(-10);
  });

  it("keeps smoothing stable after long browser frames", () => {
    const factor = cameraSmoothingFactor(1);
    expect(factor).toBeGreaterThan(0);
    expect(factor).toBeLessThan(1);
    expect(factor).toBeCloseTo(cameraSmoothingFactor(0.1));
  });
});
