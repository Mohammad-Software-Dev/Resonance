import { describe, expect, it } from "vitest";
import { createPhysicsWorld } from "./index";

describe("deterministic Rapier bootstrap", () => {
  it("creates a world with the canonical deterministic build", async () => {
    const world = await createPhysicsWorld();
    expect(world).toBeDefined();
    world.free();
  });
});
