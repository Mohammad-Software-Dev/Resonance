import type { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import { describe, expect, it } from "vitest";
import { supportsGpuFrameCapture } from "./browser-performance";

function asEngine(value: object): AbstractEngine {
  return value as unknown as AbstractEngine;
}

describe("supportsGpuFrameCapture", () => {
  it("accepts engines that expose Babylon GPU frame capture", () => {
    expect(supportsGpuFrameCapture(asEngine({
      captureGPUFrameTime: () => undefined,
      getGPUFrameTimeCounter: () => ({ current: 0 }),
    }))).toBe(true);
  });

  it("rejects fallback engines without GPU frame capture support", () => {
    expect(supportsGpuFrameCapture(asEngine({}))).toBe(false);
  });

  it("rejects engines that can start capture but cannot read the GPU counter", () => {
    expect(supportsGpuFrameCapture(asEngine({
      captureGPUFrameTime: () => undefined,
    }))).toBe(false);
  });

  it("rejects non-callable capture members", () => {
    expect(supportsGpuFrameCapture(asEngine({
      captureGPUFrameTime: true,
    }))).toBe(false);
  });
});
