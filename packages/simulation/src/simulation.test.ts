import { describe, expect, it } from "vitest";
import { asEntityId, asTargetId, asTick } from "@resonance/game-data";
import { FixedStepClock } from "./index";
import { InputLatch } from "./input";
import { Simulation } from "./simulation";

const PLAYER = asEntityId(1);

function runTrace(renderFps: number): string {
  const clock = new FixedStepClock();
  const sim = new Simulation();
  const input = new InputLatch();
  sim.addWayfarer(PLAYER);

  for (let frame = 0; frame < renderFps * 10; frame += 1) {
    for (const step of clock.advance(1 / renderFps)) {
      const tick = Number(step.tick);
      input.setMoveAxes(tick < 180 ? 1 : tick < 360 ? -0.5 : 0, 0);
      input.setTarget(tick >= 240 && tick < 420 ? Number(asTargetId(7)) : 0);
      input.setAttractPressed(tick >= 240 && tick < 420);
      sim.step(new Map([[PLAYER, input.consume(step.tick)]]));
    }
  }

  return sim.stateHash();
}

describe("Simulation state contract", () => {
  it("produces the same trace hash across render cadences", () => {
    const hashes = [30, 45, 60, 90, 120, 144].map(runTrace);
    expect(new Set(hashes).size).toBe(1);
  });

  it("restores a snapshot exactly", () => {
    const sim = new Simulation();
    const input = new InputLatch();
    sim.addWayfarer(PLAYER);

    for (let tick = 1; tick <= 20; tick += 1) {
      input.setMoveAxes(-1, 0);
      sim.step(new Map([[PLAYER, input.consume(asTick(tick))]]));
    }

    const snapshot = sim.createSnapshot();
    const expectedHash = sim.stateHash();

    for (let tick = 21; tick <= 40; tick += 1) {
      input.setMoveAxes(1, 0);
      sim.step(new Map([[PLAYER, input.consume(asTick(tick))]]));
    }

    sim.restoreSnapshot(snapshot);
    expect(sim.stateHash()).toBe(expectedHash);
    expect(Number(sim.tick)).toBe(20);
  });

  it("latches edge-triggered input for exactly one fixed tick", () => {
    const input = new InputLatch();
    input.setJumpHeld(true);
    input.pressEvade();
    input.pressRepel();

    const first = input.consume(asTick(1));
    const second = input.consume(asTick(2));

    expect(first.jumpPressed).toBe(true);
    expect(first.evadePressed).toBe(true);
    expect(first.repelPressed).toBe(true);
    expect(second.jumpPressed).toBe(false);
    expect(second.evadePressed).toBe(false);
    expect(second.repelPressed).toBe(false);
    expect(second.jumpHeld).toBe(true);
  });
});
