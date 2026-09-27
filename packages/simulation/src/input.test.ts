import { asTick } from "@resonance/game-data";
import { describe, expect, it } from "vitest";
import { InputLatch, dequantizeAxis } from "./input";

describe("InputLatch", () => {
  it("clears held and transient actions before modal UI pauses gameplay", () => {
    const input = new InputLatch();
    input.setMoveAxes(1, -1);
    input.setJumpHeld(true);
    input.pressEvade();
    input.setAttractPressed(true);
    input.pressRepel();
    input.setTarget(3);

    input.clear();
    const snapshot = input.consume(asTick(1));

    expect(dequantizeAxis(snapshot.moveX)).toBe(0);
    expect(dequantizeAxis(snapshot.moveY)).toBe(0);
    expect(snapshot.jumpPressed).toBe(false);
    expect(snapshot.jumpHeld).toBe(false);
    expect(snapshot.evadePressed).toBe(false);
    expect(snapshot.attractPressed).toBe(false);
    expect(snapshot.repelPressed).toBe(false);
    expect(snapshot.targetId).toBe(0);
  });
});
