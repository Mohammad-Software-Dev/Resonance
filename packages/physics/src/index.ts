import RAPIER from "@dimforge/rapier3d-deterministic-compat";

let initialization: Promise<void> | undefined;

export async function initializePhysics(): Promise<typeof RAPIER> {
  initialization ??= RAPIER.init();
  await initialization;
  return RAPIER;
}

export function isPhysicsInitialized(): boolean {
  return initialization !== undefined;
}

export async function createPhysicsWorld(
  gravity = { x: 0, y: -9.81, z: 0 },
): Promise<RAPIER.World> {
  const rapier = await initializePhysics();
  return new rapier.World(gravity);
}
