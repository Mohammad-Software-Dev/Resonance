import RAPIER from "@dimforge/rapier3d-deterministic";

let initialized = false;

export async function initializePhysics(): Promise<typeof RAPIER> {
  // Rapier 0.20's non-compat ESM build is initialized by its module loader and
  // no longer exposes the legacy init() function. Keep this async facade so
  // callers remain unchanged if we later need the deterministic-compat build.
  initialized = true;
  return RAPIER;
}

export function isPhysicsInitialized(): boolean {
  return initialized;
}

export async function createPhysicsWorld(
  gravity = { x: 0, y: -9.81, z: 0 },
): Promise<RAPIER.World> {
  const rapier = await initializePhysics();
  return new rapier.World(gravity);
}
