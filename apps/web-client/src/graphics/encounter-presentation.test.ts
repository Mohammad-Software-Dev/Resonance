import { describe, expect, it } from "vitest";
import { encounterPresentation } from "./encounter-presentation";

describe("encounterPresentation", () => {
  it("keeps the hostile staged on the readable right-side gameplay plane", () => {
    expect(encounterPresentation(-5, "breach").hostileBaseX).toBeCloseTo(2.35);
    expect(encounterPresentation(0, "repel").hostileBaseX).toBeCloseTo(2.35);
  });

  it("only biases the camera toward the hostile after the player approaches", () => {
    expect(encounterPresentation(-5, "breach").cameraFocusX).toBeNull();
    expect(encounterPresentation(-4.4, "breach").cameraFocusX).toBeCloseTo(2.35);
    expect(encounterPresentation(1.5, "complete").cameraFocusX).toBeNull();
  });

  it("ramps telegraph visibility without becoming dominant", () => {
    const far = encounterPresentation(-4.2, "breach");
    const near = encounterPresentation(1.2, "resonance");
    expect(far.bracketAlpha).toBeGreaterThanOrEqual(0.44);
    expect(near.bracketAlpha).toBeGreaterThan(far.bracketAlpha);
    expect(near.bracketAlpha).toBeLessThanOrEqual(0.62);
    expect(far.scanAlphaFloor).toBeLessThan(far.bracketAlpha);
    expect(near.scanAlphaFloor).toBeLessThanOrEqual(0.22);
  });
});
