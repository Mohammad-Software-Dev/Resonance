export interface DynamicResolutionConfig {
  readonly targetFrameMs: number;
  readonly downThresholdMs: number;
  readonly upThresholdMs: number;
  readonly downFrames: number;
  readonly upFrames: number;
  readonly cooldownFrames: number;
  readonly minScale: number;
  readonly scaleStep: number;
  readonly emaAlpha: number;
}

export const M0_DYNAMIC_RESOLUTION: DynamicResolutionConfig = {
  targetFrameMs: 1000 / 60,
  downThresholdMs: 17.4,
  upThresholdMs: 14.2,
  downFrames: 45,
  upFrames: 180,
  cooldownFrames: 120,
  minScale: 0.6,
  scaleStep: 0.05,
  emaAlpha: 0.08,
};

export interface DynamicResolutionState {
  readonly enabled: boolean;
  readonly baseScale: number;
  readonly scale: number;
  readonly averageFrameMs: number;
  readonly slowFrames: number;
  readonly fastFrames: number;
  readonly cooldownRemaining: number;
  readonly changes: number;
}

export class DynamicResolutionGovernor {
  private enabled = true;
  private baseScale: number;
  private scale: number;
  private averageFrameMs = M0_DYNAMIC_RESOLUTION.targetFrameMs;
  private slowFrames = 0;
  private fastFrames = 0;
  private cooldownRemaining = 0;
  private changes = 0;

  public constructor(
    baseScale: number,
    private readonly config: DynamicResolutionConfig = M0_DYNAMIC_RESOLUTION,
  ) {
    this.baseScale = this.clampBase(baseScale);
    this.scale = this.baseScale;
  }

  public setEnabled(enabled: boolean): number | null {
    this.enabled = enabled;
    this.resetEvidence();
    if (!enabled && this.scale !== this.baseScale) {
      this.scale = this.baseScale;
      this.changes += 1;
      return this.scale;
    }
    return null;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setBaseScale(baseScale: number): number {
    this.baseScale = this.clampBase(baseScale);
    this.scale = this.baseScale;
    this.resetEvidence();
    this.changes += 1;
    return this.scale;
  }

  public sample(frameMs: number): number | null {
    if (!Number.isFinite(frameMs) || frameMs <= 0 || frameMs > 250) return null;

    const alpha = this.config.emaAlpha;
    this.averageFrameMs += (frameMs - this.averageFrameMs) * alpha;

    if (!this.enabled) return null;

    if (this.cooldownRemaining > 0) {
      this.cooldownRemaining -= 1;
      return null;
    }

    if (this.averageFrameMs > this.config.downThresholdMs) {
      this.slowFrames += 1;
      this.fastFrames = 0;
    } else if (this.averageFrameMs < this.config.upThresholdMs) {
      this.fastFrames += 1;
      this.slowFrames = 0;
    } else {
      this.slowFrames = 0;
      this.fastFrames = 0;
    }

    if (this.slowFrames >= this.config.downFrames) {
      const next = this.quantize(
        Math.max(this.config.minScale, this.scale - this.config.scaleStep),
      );
      this.resetEvidence();
      if (next !== this.scale) {
        this.scale = next;
        this.changes += 1;
        this.cooldownRemaining = this.config.cooldownFrames;
        return this.scale;
      }
    }

    if (this.fastFrames >= this.config.upFrames) {
      const next = this.quantize(
        Math.min(this.baseScale, this.scale + this.config.scaleStep),
      );
      this.resetEvidence();
      if (next !== this.scale) {
        this.scale = next;
        this.changes += 1;
        this.cooldownRemaining = this.config.cooldownFrames;
        return this.scale;
      }
    }

    return null;
  }

  public snapshot(): DynamicResolutionState {
    return {
      enabled: this.enabled,
      baseScale: this.baseScale,
      scale: this.scale,
      averageFrameMs: this.averageFrameMs,
      slowFrames: this.slowFrames,
      fastFrames: this.fastFrames,
      cooldownRemaining: this.cooldownRemaining,
      changes: this.changes,
    };
  }

  private clampBase(value: number): number {
    return Math.max(this.config.minScale, Math.min(1, value));
  }

  private quantize(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private resetEvidence(): void {
    this.slowFrames = 0;
    this.fastFrames = 0;
    this.cooldownRemaining = 0;
  }
}
