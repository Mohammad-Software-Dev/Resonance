import { Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, Vector3, WebGPUEngine } from "@babylonjs/core";
import { asEntityId, asTargetId } from "@resonance/game-data";
import { FixedStepClock, InputLatch, Simulation } from "@resonance/simulation";
import "./style.css";

type Backend = "webgpu" | "webgl2";

const canvas = document.querySelector<HTMLCanvasElement>("#game");
const diagnostics = document.querySelector<HTMLDivElement>("#diagnostics");
if (!canvas || !diagnostics) throw new Error("M0 shell elements are missing.");

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

const camera = new FreeCamera("m0-camera", new Vector3(0, 2.5, -11), scene);
camera.setTarget(new Vector3(0, 1.5, 0));

const light = new HemisphericLight("ambient", new Vector3(0.2, 1, -0.2), scene);
light.intensity = 0.8;

const ground = MeshBuilder.CreateGround("ground", { width: 18, height: 6 }, scene);
ground.position.y = -0.05;
const playerMesh = MeshBuilder.CreateCapsule("wayfarer-proxy", { height: 1.8, radius: 0.35 }, scene);
playerMesh.position.y = 0.9;
const anchor = MeshBuilder.CreateSphere("resonance-anchor", { diameter: 0.7 }, scene);
anchor.position.set(3.5, 2.2, 0);

const PLAYER_ID = asEntityId(1);
const ANCHOR_TARGET_ID = asTargetId(1);
const clock = new FixedStepClock();
const simulation = new Simulation();
const input = new InputLatch();
simulation.addWayfarer(PLAYER_ID);
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

let previousMs = performance.now();
let stepsThisFrame = 0;

engine.runRenderLoop(() => {
  const now = performance.now();
  const frameSeconds = (now - previousMs) / 1000;
  previousMs = now;

  const steps = clock.advance(frameSeconds);
  stepsThisFrame = steps.length;

  for (const step of steps) {
    simulation.step(new Map([[PLAYER_ID, input.consume(step.tick)]]));
  }

  const playerState = simulation.getWayfarer(PLAYER_ID);
  const fps = engine.getFps();
  diagnostics.textContent = [
    "RESONANCE M0",
    "A/D or arrows: facing input",
    "E: hold Attract intent | Q: Repel edge",
    `backend: ${backend}`,
    `fps: ${fps.toFixed(1)}`,
    `sim tick: ${Number(simulation.tick)}`,
    `steps/frame: ${stepsThisFrame}`,
    `alpha: ${clock.alpha.toFixed(3)}`,
    `facing: ${playerState?.facing ?? "-"}`,
    `mode: ${playerState?.movementMode ?? "-"}`,
    `target: ${Number(playerState?.attractTargetId ?? 0)}`,
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
