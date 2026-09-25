import RAPIER from "@dimforge/rapier3d-deterministic";

let initialized = false;

export async function initializePhysics(): Promise<typeof RAPIER> {
  if (!initialized) {
    await RAPIER.init();
    initialized = true;
  }
  return RAPIER;
}

export async function createPhysicsWorld(gravity = { x: 0, y: -9.81, z: 0 }): Promise<RAPIER.World> {
  const rapier = await initializePhysics();
  return new rapier.World(gravity);
}
