import { SIM_DT_SECONDS, asTick, type Tick } from "@resonance/game-data";

export * from "./hash";
export * from "./input";
export * from "./replay";
export * from "./simulation";
export * from "./state";

export interface FixedStepFrame {
  readonly tick: Tick;
  readonly dtSeconds: number;
}

const STEP_EPSILON_SECONDS = 1e-10;

export class FixedStepClock {
  readonly dtSeconds = SIM_DT_SECONDS;
  private accumulatorSeconds = 0;
  private tickValue = 0;

  constructor(
    private readonly maxStepsPerFrame = 8,
    private readonly maxFrameSeconds = 0.25,
  ) {}

  get tick(): Tick { return asTick(this.tickValue); }
  get alpha(): number { return Math.max(0, Math.min(1, this.accumulatorSeconds / this.dtSeconds)); }

  advance(frameSeconds: number): FixedStepFrame[] {
    const safeFrame = Math.min(Math.max(frameSeconds, 0), this.maxFrameSeconds);
    this.accumulatorSeconds += safeFrame;

    const steps: FixedStepFrame[] = [];
    while (
      this.accumulatorSeconds + STEP_EPSILON_SECONDS >= this.dtSeconds
      && steps.length < this.maxStepsPerFrame
    ) {
      this.accumulatorSeconds = Math.max(0, this.accumulatorSeconds - this.dtSeconds);
      this.tickValue += 1;
      steps.push({ tick: asTick(this.tickValue), dtSeconds: this.dtSeconds });
    }

    if (steps.length === this.maxStepsPerFrame && this.accumulatorSeconds >= this.dtSeconds) {
      this.accumulatorSeconds %= this.dtSeconds;
    }
    return steps;
  }

  clearAccumulator(): void {
    this.accumulatorSeconds = 0;
  }

  reset(): void {
    this.clearAccumulator();
    this.tickValue = 0;
  }
}
