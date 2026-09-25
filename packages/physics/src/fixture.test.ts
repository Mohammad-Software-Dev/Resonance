import { describe, expect, it } from "vitest";
import { runPhysicsDeterminismFixture } from "./fixture";

describe("Rapier deterministic fixture", () => {
  it("repeats the same fixed-tick result in Node", async () => {
    const first = await runPhysicsDeterminismFixture();
    const second = await runPhysicsDeterminismFixture();

    expect(second.hash).toBe(first.hash);
    expect(second.position).toEqual(first.position);
    expect(second.velocity).toEqual(first.velocity);
  });
});
