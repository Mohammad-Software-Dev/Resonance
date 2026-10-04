import { describe, expect, it } from "vitest";
import {
  scrapperPresentationPose,
  targetPresentationScale,
  targetPresentationVisibility,
  wayfarerFillLightIntensity,
} from "./subject-presentation";

describe("targetPresentationScale", () => {
  it("keeps inactive anchors subordinate to selected/active feedback", () => {
    expect(targetPresentationScale({
      selected: false,
      active: false,
      repelFlash: false,
    })).toBe(0.31);
    expect(targetPresentationScale({
      selected: true,
      active: false,
      repelFlash: false,
    })).toBe(0.42);
    expect(targetPresentationScale({
      selected: false,
      active: true,
      repelFlash: false,
    })).toBe(0.49);
    expect(targetPresentationScale({
      selected: false,
      active: false,
      repelFlash: true,
    })).toBe(0.54);
  });
});

describe("scrapperPresentationPose", () => {
  it("drifts around the authored focal position instead of the old edge staging", () => {
    const start = scrapperPresentationPose(0);
    expect(start.x).toBeCloseTo(4.9);
    expect(start.rotationZ).toBeCloseTo(-0.11);

    for (const seconds of [0, 1, 2, 5, 10]) {
      const pose = scrapperPresentationPose(seconds);
      expect(pose.x).toBeGreaterThanOrEqual(4.72);
      expect(pose.x).toBeLessThanOrEqual(5.08);
      expect(pose.rotationZ).toBeGreaterThanOrEqual(-0.135);
      expect(pose.rotationZ).toBeLessThanOrEqual(-0.085);
    }
  });
});


describe("targetPresentationVisibility", () => {
  it("dims idle anchors while retaining strong interaction feedback", () => {
    expect(targetPresentationVisibility({
      selected: false,
      active: false,
      repelFlash: false,
    })).toBe(0.38);
    expect(targetPresentationVisibility({
      selected: true,
      active: false,
      repelFlash: false,
    })).toBe(0.82);
    expect(targetPresentationVisibility({
      selected: false,
      active: true,
      repelFlash: false,
    })).toBe(1);
    expect(targetPresentationVisibility({
      selected: false,
      active: false,
      repelFlash: true,
    })).toBe(1);
  });
});

describe("wayfarerFillLightIntensity", () => {
  it("stays inside a restrained focal-light range", () => {
    for (const seconds of [0, 0.5, 1, 2, 5, 10]) {
      const intensity = wayfarerFillLightIntensity(seconds);
      expect(intensity).toBeGreaterThanOrEqual(0.345);
      expect(intensity).toBeLessThanOrEqual(0.415);
    }
  });
});
