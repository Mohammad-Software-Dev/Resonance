import { describe, expect, it } from "vitest";
import { FrameCaptureBuffer } from "./frame-capture";

describe("FrameCaptureBuffer", () => {
  it("summarizes frame percentiles and render scale", () => {
    const capture = new FrameCaptureBuffer(10);
    for (const frame of [10, 11, 12, 13, 14, 15, 16, 17, 18, 55]) {
      capture.push(frame, frame === 55 ? 0.75 : 0.85);
    }
    const summary = capture.summary();
    expect(summary.samples).toBe(10);
    expect(summary.frameP50Ms).toBe(14);
    expect(summary.frameP95Ms).toBe(55);
    expect(summary.frameP99Ms).toBe(55);
    expect(summary.framesOver50Ms).toBe(1);
    expect(summary.minimumRenderScale).toBeCloseTo(0.75);
  });

  it("keeps the newest samples when the ring wraps", () => {
    const capture = new FrameCaptureBuffer(3);
    capture.push(10, 1);
    capture.push(20, 0.9);
    capture.push(30, 0.8);
    capture.push(40, 0.7);
    expect(capture.exportSamples().frameMs).toEqual([20, 30, 40]);
  });

  it("can be reset between physical capture runs", () => {
    const capture = new FrameCaptureBuffer(3);
    capture.push(10, 1);
    capture.reset();
    expect(capture.summary().samples).toBe(0);
  });
});
