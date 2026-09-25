import { describe, expect, it } from "vitest";
import { resolveTargetAim } from "./aim";

describe("resolveTargetAim", () => {
  it("prefers normalized gamepad right-stick intent above the deadzone", () => {
    const result = resolveTargetAim({
      gamepadX: 0.6,
      gamepadY: 0.8,
      mouseX: -1,
      mouseY: 0,
      hasMouse: true,
      facing: -1,
    });
    expect(result.source).toBe("gamepad");
    expect(result.vector.x).toBeCloseTo(0.6, 6);
    expect(result.vector.y).toBeCloseTo(0.8, 6);
  });

  it("uses mouse direction when the gamepad remains inside its deadzone", () => {
    const result = resolveTargetAim({
      gamepadX: 0.1,
      gamepadY: 0.1,
      mouseX: 0,
      mouseY: 1,
      hasMouse: true,
      facing: 1,
    });
    expect(result.source).toBe("mouse");
    expect(result.vector).toEqual({ x: 0, y: 1, z: 0 });
  });

  it("falls back to keyboard-facing intent without requiring cursor precision", () => {
    const result = resolveTargetAim({
      gamepadX: 0,
      gamepadY: 0,
      mouseX: 0,
      mouseY: 0,
      hasMouse: false,
      facing: -1,
    });
    expect(result).toEqual({
      source: "facing",
      vector: { x: -1, y: 0, z: 0 },
    });
  });
});
