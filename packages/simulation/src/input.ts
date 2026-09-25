import { asTargetId, type Brand, type TargetId, type Tick } from "@resonance/game-data";

export type QuantizedAxis = Brand<number, "QuantizedAxis">;

export const AXIS_MAX = 32_767;

export function quantizeAxis(value: number): QuantizedAxis {
  const finite = Number.isFinite(value) ? value : 0;
  const clamped = Math.max(-1, Math.min(1, finite));
  return Math.round(clamped * AXIS_MAX) as QuantizedAxis;
}

export function dequantizeAxis(value: QuantizedAxis): number {
  return Number(value) / AXIS_MAX;
}

export interface SimInput {
  readonly tick: Tick;
  readonly moveX: QuantizedAxis;
  readonly moveY: QuantizedAxis;
  readonly jumpPressed: boolean;
  readonly jumpHeld: boolean;
  readonly evadePressed: boolean;
  readonly attractPressed: boolean;
  readonly repelPressed: boolean;
  readonly targetId: TargetId | 0;
}

export class InputLatch {
  private moveX = quantizeAxis(0);
  private moveY = quantizeAxis(0);
  private jumpHeld = false;
  private jumpPressed = false;
  private evadePressed = false;
  private attractPressed = false;
  private repelPressed = false;
  private targetId: TargetId | 0 = 0;

  setMoveAxes(x: number, y: number): void {
    this.moveX = quantizeAxis(x);
    this.moveY = quantizeAxis(y);
  }

  setJumpHeld(held: boolean): void {
    if (held && !this.jumpHeld) this.jumpPressed = true;
    this.jumpHeld = held;
  }

  pressEvade(): void { this.evadePressed = true; }
  setAttractPressed(pressed: boolean): void { this.attractPressed = pressed; }
  pressRepel(): void { this.repelPressed = true; }
  setTarget(targetId: number): void { this.targetId = targetId === 0 ? 0 : asTargetId(targetId); }

  consume(tick: Tick): SimInput {
    const input: SimInput = {
      tick,
      moveX: this.moveX,
      moveY: this.moveY,
      jumpPressed: this.jumpPressed,
      jumpHeld: this.jumpHeld,
      evadePressed: this.evadePressed,
      attractPressed: this.attractPressed,
      repelPressed: this.repelPressed,
      targetId: this.targetId,
    };
    this.jumpPressed = false;
    this.evadePressed = false;
    this.repelPressed = false;
    return input;
  }
}
