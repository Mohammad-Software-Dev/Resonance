import { describe, expect, it } from "vitest";
import {
  GRAPHICS_PRESETS,
  hardwareScalingLevel,
  initialGraphicsPreset,
  nextGraphicsPreset,
} from "./presets";

describe("M0 graphics presets", () => {
  it("defaults WebGPU to Medium and WebGL2 to Low", () => {
    expect(initialGraphicsPreset("webgpu")).toBe("medium");
    expect(initialGraphicsPreset("webgl2")).toBe("low");
  });

  it("cycles through every authored quality tier", () => {
    expect(nextGraphicsPreset("low")).toBe("medium");
    expect(nextGraphicsPreset("medium")).toBe("high");
    expect(nextGraphicsPreset("high")).toBe("ultra");
    expect(nextGraphicsPreset("ultra")).toBe("low");
  });

  it("keeps gameplay-independent quality settings monotonic", () => {
    expect(GRAPHICS_PRESETS.medium.renderScale).toBeGreaterThan(GRAPHICS_PRESETS.low.renderScale);
    expect(GRAPHICS_PRESETS.high.shadowMapSize).toBeGreaterThanOrEqual(GRAPHICS_PRESETS.medium.shadowMapSize);
    expect(GRAPHICS_PRESETS.ultra.particleEmitRate).toBeGreaterThan(GRAPHICS_PRESETS.high.particleEmitRate);
  });

  it("converts render scale to Babylon hardware scaling safely", () => {
    expect(hardwareScalingLevel(1)).toBe(1);
    expect(hardwareScalingLevel(0.5)).toBe(2);
    expect(hardwareScalingLevel(0.1)).toBe(2);
    expect(hardwareScalingLevel(2)).toBe(1);
  });
});
