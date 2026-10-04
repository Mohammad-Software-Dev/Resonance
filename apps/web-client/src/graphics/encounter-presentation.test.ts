import { describe, expect, it } from "vitest";
import { encounterCameraFocus, encounterPresentation } from "./encounter-presentation";

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


describe("encounterCameraFocus", () => {
  it("keeps encounter staging when a target is merely selected", () => {
    expect(encounterCameraFocus(2.35, -4.2, false)).toBeCloseTo(2.35);
  });

  it("gives an actively used Resonance target camera priority", () => {
    expect(encounterCameraFocus(2.35, 1.5, true)).toBeCloseTo(1.5);
  });

  it("retains the normal player camera when neither focus exists", () => {
    expect(encounterCameraFocus(null, null, false)).toBeNull();
  });
});
