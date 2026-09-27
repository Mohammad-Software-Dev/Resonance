export interface FrameCaptureSummary {
  readonly samples: number;
  readonly captureDurationMs: number;
  readonly frameP50Ms: number;
  readonly frameP95Ms: number;
  readonly frameP99Ms: number;
  readonly frameMaxMs: number;
  readonly framesOver50Ms: number;
  readonly minimumRenderScale: number;
  readonly averageRenderScale: number;
  readonly cpuFrameP95Ms: number;
  readonly gpuFrameP95Ms: number | null;
  readonly drawCallsMin: number;
  readonly drawCallsMax: number;
}

const DEFAULT_CAPTURE_CAPACITY = 120_000;

export interface FrameCaptureSamples {
  readonly frameMs: readonly number[];
  readonly renderScale: readonly number[];
  readonly cpuFrameMs: readonly number[];
  readonly gpuFrameMs: readonly (number | null)[];
  readonly drawCalls: readonly number[];
}

function percentile(sorted: readonly number[], fraction: number): number {
  if (sorted.length === 0) return 0;
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil(sorted.length * fraction) - 1),
  );
  return sorted[index] ?? 0;
}

export class FrameCaptureBuffer {
  private readonly frameMs: Float32Array;
  private readonly renderScale: Float32Array;
  private readonly cpuFrameMs: Float32Array;
  private readonly gpuFrameMs: Float32Array;
  private readonly drawCalls: Float32Array;
  private writeIndex = 0;
  private count = 0;

  public constructor(capacity = DEFAULT_CAPTURE_CAPACITY) {
    this.frameMs = new Float32Array(capacity);
    this.renderScale = new Float32Array(capacity);
    this.cpuFrameMs = new Float32Array(capacity);
    this.gpuFrameMs = new Float32Array(capacity);
    this.gpuFrameMs.fill(Number.NaN);
    this.drawCalls = new Float32Array(capacity);
  }

  public push(
    frameMs: number,
    renderScale: number,
    cpuFrameMs: number,
    gpuFrameMs: number | null,
    drawCalls: number,
  ): void {
    if (!Number.isFinite(frameMs) || frameMs <= 0 || frameMs > 1000) return;
    this.frameMs[this.writeIndex] = frameMs;
    this.renderScale[this.writeIndex] = renderScale;
    this.cpuFrameMs[this.writeIndex] = Number.isFinite(cpuFrameMs) ? cpuFrameMs : 0;
    this.gpuFrameMs[this.writeIndex] = gpuFrameMs !== null && Number.isFinite(gpuFrameMs)
      ? gpuFrameMs
      : Number.NaN;
    this.drawCalls[this.writeIndex] = Number.isFinite(drawCalls) ? drawCalls : 0;
    this.writeIndex = (this.writeIndex + 1) % this.frameMs.length;
    this.count = Math.min(this.count + 1, this.frameMs.length);
  }

  public reset(): void {
    this.writeIndex = 0;
    this.count = 0;
  }

  public summary(): FrameCaptureSummary {
    const frames = this.values(this.frameMs).sort((a, b) => a - b);
    const scales = this.values(this.renderScale);
    const cpuFrames = this.values(this.cpuFrameMs).sort((a, b) => a - b);
    const gpuFrames = this.values(this.gpuFrameMs)
      .filter((value) => Number.isFinite(value) && value > 0)
      .sort((a, b) => a - b);
    const draws = this.values(this.drawCalls);
    const scaleTotal = scales.reduce((sum, value) => sum + value, 0);

    return {
      samples: frames.length,
      captureDurationMs: frames.reduce((sum, value) => sum + value, 0),
      frameP50Ms: percentile(frames, 0.5),
      frameP95Ms: percentile(frames, 0.95),
      frameP99Ms: percentile(frames, 0.99),
      frameMaxMs: frames.at(-1) ?? 0,
      framesOver50Ms: frames.filter((value) => value > 50).length,
      minimumRenderScale: scales.length === 0 ? 0 : Math.min(...scales),
      averageRenderScale: scales.length === 0 ? 0 : scaleTotal / scales.length,
      cpuFrameP95Ms: percentile(cpuFrames, 0.95),
      gpuFrameP95Ms: gpuFrames.length === 0 ? null : percentile(gpuFrames, 0.95),
      drawCallsMin: draws.length === 0 ? 0 : Math.min(...draws),
      drawCallsMax: draws.length === 0 ? 0 : Math.max(...draws),
    };
  }

  public exportSamples(): FrameCaptureSamples {
    return {
      frameMs: this.values(this.frameMs),
      renderScale: this.values(this.renderScale),
      cpuFrameMs: this.values(this.cpuFrameMs),
      gpuFrameMs: this.values(this.gpuFrameMs).map((value) =>
        Number.isFinite(value) ? value : null
      ),
      drawCalls: this.values(this.drawCalls),
    };
  }

  private values(source: Float32Array): number[] {
    const result = new Array<number>(this.count);
    const start = this.count === source.length ? this.writeIndex : 0;
    for (let i = 0; i < this.count; i += 1) {
      result[i] = source[(start + i) % source.length] ?? 0;
    }
    return result;
  }
}
