import { Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, Vector3, WebGPUEngine } from "@babylonjs/core";
import { FixedStepClock } from "@resonance/simulation";
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
  return { engine: new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: true }), backend: "webgl2" };
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
const player = MeshBuilder.CreateCapsule("wayfarer-proxy", { height: 1.8, radius: 0.35 }, scene);
player.position.y = 0.9;
const anchor = MeshBuilder.CreateSphere("resonance-anchor", { diameter: 0.7 }, scene);
anchor.position.set(3.5, 2.2, 0);

const clock = new FixedStepClock();
let previousMs = performance.now();
let stepsThisFrame = 0;
let fps = 0;

engine.runRenderLoop(() => {
  const now = performance.now();
  const frameSeconds = (now - previousMs) / 1000;
  previousMs = now;

  const steps = clock.advance(frameSeconds);
  stepsThisFrame = steps.length;

  // M0.3 boundary: authoritative gameplay will advance only inside these fixed steps.
  for (const step of steps) {
    void step;
  }

  fps = engine.getFps();
  diagnostics.textContent = [
    "RESONANCE M0",
    `backend: ${backend}`,
    `fps: ${fps.toFixed(1)}`,
    `sim tick: ${Number(clock.tick)}`,
    `steps/frame: ${stepsThisFrame}`,
    `alpha: ${clock.alpha.toFixed(3)}`,
  ].join("\n");

  scene.render();
});

window.addEventListener("resize", () => engine.resize());
document.addEventListener("visibilitychange", () => {
  if (document.hidden) clock.reset();
});
