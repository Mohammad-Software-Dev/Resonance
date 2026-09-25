import { describe, expect, it } from "vitest";
import {
  DynamicResolutionGovernor,
  M0_DYNAMIC_RESOLUTION,
  type DynamicResolutionConfig,
} from "./dynamic-resolution";

function testConfig(overrides: Partial<DynamicResolutionConfig> = {}): DynamicResolutionConfig {
  return {
    ...M0_DYNAMIC_RESOLUTION,
    downFrames: 3,
    upFrames: 4,
    cooldownFrames: 2,
    emaAlpha: 1,
    ...overrides,
  };
}

describe("DynamicResolutionGovernor", () => {
  it("reduces scale only after sustained slow frames", () => {
    const governor = new DynamicResolutionGovernor(0.85, testConfig());
    expect(governor.sample(20)).toBeNull();
    expect(governor.sample(20)).toBeNull();
    expect(governor.sample(20)).toBe(0.8);
  });

  it("uses hysteresis and restores no faster than the authored evidence window", () => {
    const governor = new DynamicResolutionGovernor(0.85, testConfig());
    governor.sample(20);
    governor.sample(20);
    expect(governor.sample(20)).toBe(0.8);

    expect(governor.sample(10)).toBeNull();
    expect(governor.sample(10)).toBeNull();
    expect(governor.sample(10)).toBeNull();
    expect(governor.sample(10)).toBeNull();
    expect(governor.sample(10)).toBeNull();
    expect(governor.sample(10)).toBe(0.85);
  });

  it("never falls below the configured minimum", () => {
    const governor = new DynamicResolutionGovernor(
      0.7,
      testConfig({ downFrames: 1, cooldownFrames: 0, minScale: 0.6 }),
    );
    for (let i = 0; i < 10; i += 1) governor.sample(30);
    expect(governor.snapshot().scale).toBe(0.6);
  });

  it("resets to the preset base scale when disabled", () => {
    const governor = new DynamicResolutionGovernor(
      0.85,
      testConfig({ downFrames: 1, cooldownFrames: 0 }),
    );
    expect(governor.sample(30)).toBe(0.8);
    expect(governor.setEnabled(false)).toBe(0.85);
    expect(governor.snapshot().enabled).toBe(false);
  });

  it("resets adaptation when the graphics preset changes", () => {
    const governor = new DynamicResolutionGovernor(0.85, testConfig());
    expect(governor.setBaseScale(1)).toBe(1);
    expect(governor.snapshot().baseScale).toBe(1);
    expect(governor.snapshot().scale).toBe(1);
  });
});
