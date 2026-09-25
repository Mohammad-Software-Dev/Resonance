import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
  WebGPUEngine,
} from "@babylonjs/core";
import {
  M0_MOVEMENT_CONFIG,
  asEntityId,
  asTargetId,
} from "@resonance/game-data";
import {
  applyMovementCollision,
  stepMovement,
} from "@resonance/movement";
import {
  RapierCharacterWorld,
} from "@resonance/physics";
import {
  FixedStepClock,
  InputLatch,
  Simulation,
  dequantizeAxis,
} from "@resonance/simulation";
import "./style.css";

type Backend = "webgpu" | "webgl2";

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Required M0 element is missing: ${selector}`);
  return element;
}

const canvas = requireElement<HTMLCanvasElement>("#game");
const diagnostics = requireElement<HTMLDivElement>("#diagnostics");

async function createEngine(): Promise<{ engine: Engine | WebGPUEngine; backend: Backend }> {
  if ("gpu" in navigator) {
    try {
      const engine = new WebGPUEngine(canvas, { antialias: true });
      await engine.initAsync();
      return { engine, backend: "webgpu" };
    } catch (error) {
      console.warn("WebGPU initialization failed; falling back to WebGL2.", error);
    }
  }
  return {
    engine: new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: true }),
    backend: "webgl2",
  };
}

const { engine, backend } = await createEngine();
const scene = new Scene(engine);
scene.clearColor.set(0.018, 0.027, 0.045, 1);

const camera = new FreeCamera("m0-camera", new Vector3(0, 3, -13), scene);
camera.setTarget(new Vector3(0, 1.5, 0));

const light = new HemisphericLight("ambient", new Vector3(0.2, 1, -0.2), scene);
light.intensity = 0.8;

const FLOOR_ID = asEntityId(100);
const LEFT_WALL_ID = asEntityId(101);
const RIGHT_WALL_ID = asEntityId(102);
const SLOPE_ID = asEntityId(103);
const PLATFORM_ID = asEntityId(104);

const ground = MeshBuilder.CreateBox("ground", { width: 16, height: 0.5, depth: 2 }, scene);
ground.position.set(0, -0.25, 0);

const leftWall = MeshBuilder.CreateBox("left-wall", { width: 0.3, height: 4, depth: 2 }, scene);
leftWall.position.set(-8, 2, 0);
const rightWall = MeshBuilder.CreateBox("right-wall", { width: 0.3, height: 4, depth: 2 }, scene);
rightWall.position.set(8, 2, 0);

const slope = MeshBuilder.CreateBox("slope", { width: 3.6, height: 0.3, depth: 2 }, scene);
slope.position.set(4.9, 0.45, 0);
slope.rotation.z = Math.PI / 12;

const platformMesh = MeshBuilder.CreateBox("moving-platform", { width: 2.5, height: 0.35, depth: 2 }, scene);
platformMesh.position.set(-2, 1.15, 0);

const playerMesh = MeshBuilder.CreateCapsule(
  "wayfarer-proxy",
  { height: 1.8, radius: 0.35 },
  scene,
);
const anchor = MeshBuilder.CreateSphere("resonance-anchor", { diameter: 0.7 }, scene);
anchor.position.set(3.5, 2.8, 0);

const physics = await RapierCharacterWorld.create();
physics.addStaticBox(FLOOR_ID, { x: 0, y: -0.25, z: 0 }, { x: 8, y: 0.25, z: 1 });
physics.addStaticBox(LEFT_WALL_ID, { x: -8, y: 2, z: 0 }, { x: 0.15, y: 2, z: 1 });
physics.addStaticBox(RIGHT_WALL_ID, { x: 8, y: 2, z: 0 }, { x: 0.15, y: 2, z: 1 });
physics.addStaticBox(SLOPE_ID, { x: 4.9, y: 0.45, z: 0 }, { x: 1.8, y: 0.15, z: 1 }, Math.PI / 12);
physics.addMovingBox(PLATFORM_ID, { x: -2, y: 1.15, z: 0 }, { x: 1.25, y: 0.175, z: 1 });

const PLAYER_ID = asEntityId(1);
const ANCHOR_TARGET_ID = asTargetId(1);
const START = { x: -5, y: 2.2, z: 0 };
physics.createCharacter(START);

const clock = new FixedStepClock();
const simulation = new Simulation();
const input = new InputLatch();
const playerState = simulation.addWayfarer(PLAYER_ID);
playerState.position = { ...START };
input.setTarget(Number(ANCHOR_TARGET_ID));

const keys = new Set<string>();
function syncAxes(): void {
  const left = keys.has("KeyA") || keys.has("ArrowLeft");
  const right = keys.has("KeyD") || keys.has("ArrowRight");
  input.setMoveAxes(Number(right) - Number(left), 0);
}

window.addEventListener("keydown", (event) => {
  keys.add(event.code);
  syncAxes();
  if (event.code === "Space") input.setJumpHeld(true);
  if (event.code === "ShiftLeft" && !event.repeat) input.pressEvade();
  if (event.code === "KeyE") input.setAttractPressed(true);
  if (event.code === "KeyQ" && !event.repeat) input.pressRepel();
});
window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
  syncAxes();
  if (event.code === "Space") input.setJumpHeld(false);
  if (event.code === "KeyE") input.setAttractPressed(false);
});

function platformPositionAtTick(tick: number): { x: number; y: number; z: number } {
  const periodTicks = 240;
  const phase = (tick % periodTicks) / periodTicks;
  const triangle = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
  return { x: -2 + triangle * 3, y: 1.15, z: 0 };
}

let previousMs = performance.now();
let stepsThisFrame = 0;
let collisionCount = 0;
let maximumCorrection = 0;

engine.runRenderLoop(() => {
  const now = performance.now();
  const frameSeconds = (now - previousMs) / 1000;
  previousMs = now;

  const steps = clock.advance(frameSeconds);
  stepsThisFrame = steps.length;

  for (const step of steps) {
    const platformPosition = platformPositionAtTick(Number(step.tick));
    physics.setMovingBoxPosition(PLATFORM_ID, platformPosition);
    platformMesh.position.set(platformPosition.x, platformPosition.y, platformPosition.z);

    const simInput = input.consume(step.tick);
    simulation.step(new Map([[PLAYER_ID, simInput]]));

    const state = simulation.getWayfarer(PLAYER_ID);
    if (!state) continue;

    const previousGroundEntityId = state.groundEntityId;
    const movement = stepMovement(
      state,
      {
        moveX: dequantizeAxis(simInput.moveX),
        jumpPressed: simInput.jumpPressed,
        jumpHeld: simInput.jumpHeld,
        evadePressed: simInput.evadePressed,
      },
      {
        grounded: state.grounded,
        groundEntityId: state.groundEntityId,
      },
      M0_MOVEMENT_CONFIG,
    );

    const collision = physics.moveCharacter(
      movement.desiredTranslation,
      previousGroundEntityId,
      state.up,
    );
    applyMovementCollision(state, collision);
    collisionCount = collision.collisionCount;
    maximumCorrection = collision.maximumCorrection;
  }

  const state = simulation.getWayfarer(PLAYER_ID);
  if (state) {
    playerMesh.position.set(state.position.x, state.position.y, state.position.z);
  }

  const fps = engine.getFps();
  diagnostics.textContent = [
    "RESONANCE M0.4 — WAYFARER COLLISION",
    "A/D or arrows: move | Space: jump",
    "Left Shift: evade | E/Q: Resonance intent stubs",
    `backend: ${backend}`,
    `fps: ${fps.toFixed(1)}`,
    `sim tick: ${Number(simulation.tick)}`,
    `steps/frame: ${stepsThisFrame}`,
    `alpha: ${clock.alpha.toFixed(3)}`,
    `position: ${state ? `${state.position.x.toFixed(2)}, ${state.position.y.toFixed(2)}, ${state.position.z.toFixed(2)}` : "-"}`,
    `velocity: ${state ? `${state.velocity.x.toFixed(2)}, ${state.velocity.y.toFixed(2)}` : "-"}`,
    `grounded: ${state?.grounded ?? false}`,
    `ground entity: ${Number(state?.groundEntityId ?? 0)}`,
    `mode: ${state?.movementMode ?? "-"}`,
    `collisions: ${collisionCount}`,
    `max correction: ${maximumCorrection.toFixed(4)}`,
    `state hash: ${simulation.stateHash()}`,
  ].join("\n");

  scene.render();
});

window.addEventListener("resize", () => engine.resize());
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clock.clearAccumulator();
  } else {
    previousMs = performance.now();
  }
});
