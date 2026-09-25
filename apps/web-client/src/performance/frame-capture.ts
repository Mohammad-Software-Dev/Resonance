export interface FrameCaptureSummary {
  readonly samples: number;
  readonly frameP50Ms: number;
  readonly frameP95Ms: number;
  readonly frameP99Ms: number;
  readonly frameMaxMs: number;
  readonly framesOver50Ms: number;
  readonly minimumRenderScale: number;
  readonly averageRenderScale: number;
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
  private writeIndex = 0;
  private count = 0;

  public constructor(capacity = 60 * 120) {
    this.frameMs = new Float32Array(capacity);
    this.renderScale = new Float32Array(capacity);
  }

  public push(frameMs: number, renderScale: number): void {
    if (!Number.isFinite(frameMs) || frameMs <= 0 || frameMs > 1000) return;
    this.frameMs[this.writeIndex] = frameMs;
    this.renderScale[this.writeIndex] = renderScale;
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
    const scaleTotal = scales.reduce((sum, value) => sum + value, 0);

    return {
      samples: frames.length,
      frameP50Ms: percentile(frames, 0.5),
      frameP95Ms: percentile(frames, 0.95),
      frameP99Ms: percentile(frames, 0.99),
      frameMaxMs: frames.at(-1) ?? 0,
      framesOver50Ms: frames.filter((value) => value > 50).length,
      minimumRenderScale: scales.length === 0 ? 0 : Math.min(...scales),
      averageRenderScale: scales.length === 0 ? 0 : scaleTotal / scales.length,
    };
  }

  public exportSamples(): {
    readonly frameMs: readonly number[];
    readonly renderScale: readonly number[];
  } {
    return {
      frameMs: this.values(this.frameMs),
      renderScale: this.values(this.renderScale),
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
