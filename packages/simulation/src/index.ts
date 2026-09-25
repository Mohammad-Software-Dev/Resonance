import { SIM_DT_SECONDS, asTick, type Tick } from "@resonance/game-data";

export interface FixedStepFrame {
  readonly tick: Tick;
  readonly dtSeconds: number;
}

export class FixedStepClock {
  readonly dtSeconds = SIM_DT_SECONDS;
  private accumulatorSeconds = 0;
  private tickValue = 0;

  constructor(
    private readonly maxStepsPerFrame = 8,
    private readonly maxFrameSeconds = 0.25,
  ) {}

  get tick(): Tick { return asTick(this.tickValue); }
  get alpha(): number { return this.accumulatorSeconds / this.dtSeconds; }

  advance(frameSeconds: number): FixedStepFrame[] {
    const safeFrame = Math.min(Math.max(frameSeconds, 0), this.maxFrameSeconds);
    this.accumulatorSeconds += safeFrame;

    const steps: FixedStepFrame[] = [];
    while (this.accumulatorSeconds >= this.dtSeconds && steps.length < this.maxStepsPerFrame) {
      this.accumulatorSeconds -= this.dtSeconds;
      this.tickValue += 1;
      steps.push({ tick: asTick(this.tickValue), dtSeconds: this.dtSeconds });
    }

    if (steps.length === this.maxStepsPerFrame && this.accumulatorSeconds >= this.dtSeconds) {
      this.accumulatorSeconds %= this.dtSeconds;
    }
    return steps;
  }

  reset(): void {
    this.accumulatorSeconds = 0;
    this.tickValue = 0;
  }
}
