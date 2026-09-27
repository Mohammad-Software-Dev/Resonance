import { describe, expect, it } from "vitest";
import { FrameCaptureBuffer } from "./frame-capture";

describe("FrameCaptureBuffer", () => {
  it("summarizes frame, CPU, GPU, draw-call and render-scale distributions", () => {
    const capture = new FrameCaptureBuffer(10);
    const frames = [10, 11, 12, 13, 14, 15, 16, 17, 18, 55];
    frames.forEach((frame, index) => {
      capture.push(
        frame,
        frame === 55 ? 0.75 : 0.85,
        index + 1,
        index === 0 ? null : index + 0.5,
        40 + index,
      );
    });
    const summary = capture.summary();
    expect(summary.samples).toBe(10);
    expect(summary.captureDurationMs).toBe(181);
    expect(summary.frameP50Ms).toBe(14);
    expect(summary.frameP95Ms).toBe(55);
    expect(summary.frameP99Ms).toBe(55);
    expect(summary.framesOver50Ms).toBe(1);
    expect(summary.minimumRenderScale).toBeCloseTo(0.75);
    expect(summary.cpuFrameP95Ms).toBe(10);
    expect(summary.gpuFrameP95Ms).toBe(9.5);
    expect(summary.drawCallsMin).toBe(40);
    expect(summary.drawCallsMax).toBe(49);
  });

  it("keeps aligned newest samples when the ring wraps", () => {
    const capture = new FrameCaptureBuffer(3);
    capture.push(10, 1, 1, null, 10);
    capture.push(20, 0.9, 2, 2.5, 20);
    capture.push(30, 0.8, 3, 3.5, 30);
    capture.push(40, 0.7, 4, 4.5, 40);
    const samples = capture.exportSamples();
    expect(samples.frameMs).toEqual([20, 30, 40]);
    expect(samples.cpuFrameMs).toEqual([2, 3, 4]);
    expect(samples.gpuFrameMs).toEqual([2.5, 3.5, 4.5]);
    expect(samples.drawCalls).toEqual([20, 30, 40]);
  });

  it("preserves unavailable GPU timing as null", () => {
    const capture = new FrameCaptureBuffer(2);
    capture.push(16, 1, 4, null, 42);
    expect(capture.summary().gpuFrameP95Ms).toBeNull();
    expect(capture.exportSamples().gpuFrameMs).toEqual([null]);
  });

  it("can represent a two-minute high-refresh capture when capacity permits", () => {
    const capture = new FrameCaptureBuffer(144 * 120);
    for (let index = 0; index < 144 * 120; index += 1) {
      capture.push(1000 / 144, 0.85, 4, null, 45);
    }
    expect(capture.summary().captureDurationMs).toBeCloseTo(120_000, -1);
    expect(capture.summary().samples).toBe(144 * 120);
  });

  it("can be reset between physical capture runs", () => {
    const capture = new FrameCaptureBuffer(3);
    capture.push(10, 1, 1, null, 10);
    capture.reset();
    expect(capture.summary().samples).toBe(0);
    expect(capture.summary().captureDurationMs).toBe(0);
  });
});
