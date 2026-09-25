import { describe, expect, it } from "vitest";
import { asEntityId } from "@resonance/game-data";
import { M0_CHARACTER_PHYSICS_CONFIG, RapierCharacterWorld } from "./character";

const FLOOR = asEntityId(10);
const WALL = asEntityId(11);
const PLATFORM = asEntityId(12);

describe("Rapier Wayfarer collision adapter", () => {
  it("lands the capsule and reports the ground entity", async () => {
    const physics = await RapierCharacterWorld.create();
    physics.addStaticBox(FLOOR, { x: 0, y: -0.25, z: 0 }, { x: 6, y: 0.25, z: 1 });
    physics.createCharacter({ x: 0, y: 1.4, z: 0 });

    let result = physics.moveCharacter({ x: 0, y: -0.5, z: 0 }, 0);
    for (let tick = 0; tick < 8 && !result.grounded; tick += 1) {
      result = physics.moveCharacter({ x: 0, y: -0.5, z: 0 }, result.groundEntityId);
    }

    expect(result.grounded).toBe(true);
    expect(result.groundEntityId).toBe(FLOOR);
    expect(result.position.z).toBe(0);
    physics.free();
  });

  it("blocks horizontal movement through a wall", async () => {
    const physics = await RapierCharacterWorld.create();
    physics.addStaticBox(FLOOR, { x: 0, y: -0.25, z: 0 }, { x: 6, y: 0.25, z: 1 });
    physics.addStaticBox(WALL, { x: 1.2, y: 1, z: 0 }, { x: 0.15, y: 1, z: 1 });
    physics.createCharacter({ x: 0, y: 0.91, z: 0 });

    const result = physics.moveCharacter({ x: 2, y: -0.02, z: 0 }, FLOOR);
    expect(result.blockedX).toBe(true);
    expect(result.position.x).toBeLessThan(1);
    physics.free();
  });

  it("constrains all movement to the authored gameplay lane", async () => {
    const physics = await RapierCharacterWorld.create();
    physics.createCharacter({ x: 0, y: 2, z: 0.7 });
    const result = physics.moveCharacter({ x: 0.2, y: 0, z: 4 }, 0);
    expect(result.position.z).toBe(M0_CHARACTER_PHYSICS_CONFIG.gameplayLaneZ);
    physics.free();
  });

  it("carries a grounded character by deterministic platform delta", async () => {
    const physics = await RapierCharacterWorld.create();
    physics.addMovingBox(PLATFORM, { x: 0, y: 0, z: 0 }, { x: 1.5, y: 0.2, z: 1 });
    physics.createCharacter({ x: 0, y: 1.11, z: 0 });

    const settle = physics.moveCharacter({ x: 0, y: -0.05, z: 0 }, 0);
    expect(settle.grounded).toBe(true);

    physics.setMovingBoxPosition(PLATFORM, { x: 0.25, y: 0, z: 0 });
    const carried = physics.moveCharacter({ x: 0, y: -0.01, z: 0 }, PLATFORM);
    expect(carried.platformTranslation.x).toBeCloseTo(0.25, 6);
    expect(carried.position.x).toBeGreaterThan(0.2);
    physics.free();
  });

  it("climbs an authored walkable slope without leaving the lane", async () => {
    const physics = await RapierCharacterWorld.create();
    physics.addStaticBox(FLOOR, { x: -2, y: -0.25, z: 0 }, { x: 2, y: 0.25, z: 1 });
    physics.addStaticBox(asEntityId(13), { x: 1.3, y: 0.2, z: 0 }, { x: 1.8, y: 0.15, z: 1 }, Math.PI / 12);
    physics.createCharacter({ x: -0.5, y: 0.91, z: 0 });

    let lastY = physics.getCharacterPosition().y;
    for (let tick = 0; tick < 30; tick += 1) {
      const result = physics.moveCharacter({ x: 0.08, y: -0.02, z: 0 }, FLOOR);
      lastY = result.position.y;
      expect(result.position.z).toBe(0);
    }

    expect(lastY).toBeGreaterThan(0.9);
    physics.free();
  });
});
