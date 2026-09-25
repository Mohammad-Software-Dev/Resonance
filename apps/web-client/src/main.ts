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
  M0_ATTRACT_CONFIG,
  M0_MOVEMENT_CONFIG,
  type AttractArrivalMode,
  asAuthoredTargetGuid,
  asEntityId,
  type TargetId,
  type Vec3,
} from "@resonance/game-data";
import {
  applyMovementCollision,
  cancelAttract,
  createAttractRuntimeState,
  recordAttractCollision,
  recoverMovementState,
  stepAttract,
  stepMovement,
  type AttractSemanticEvent,
} from "@resonance/movement";
import { RapierCharacterWorld } from "@resonance/physics";
import {
  FixedStepClock,
  InputLatch,
  Simulation,
  dequantizeAxis,
} from "@resonance/simulation";
import {
  M0_TARGET_SELECTION_CONFIG,
  TargetRegistry,
  resolveTargetAim,
  selectResonanceTarget,
  type TargetAimSource,
  type TargetCandidateDebug,
} from "@resonance/targeting";
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
const ATTRACT_PILLAR_ID = asEntityId(105);

const ground = MeshBuilder.CreateBox("ground", { width: 16, height: 0.5, depth: 2 }, scene);
ground.position.set(0, -0.25, 0);

const leftWall = MeshBuilder.CreateBox("left-wall", { width: 0.3, height: 4, depth: 2 }, scene);
leftWall.position.set(-8, 2, 0);
const rightWall = MeshBuilder.CreateBox("right-wall", { width: 0.3, height: 4, depth: 2 }, scene);
rightWall.position.set(8, 2, 0);

const slope = MeshBuilder.CreateBox("slope", { width: 3.6, height: 0.3, depth: 2 }, scene);
slope.position.set(4.9, 0.45, 0);
slope.rotation.z = Math.PI / 12;

const attractPillar = MeshBuilder.CreateBox("attract-pillar", { width: 0.7, height: 2.4, depth: 2 }, scene);
attractPillar.position.set(0.25, 1.2, 0);

const platformMesh = MeshBuilder.CreateBox("moving-platform", { width: 2.5, height: 0.35, depth: 2 }, scene);
platformMesh.position.set(-2, 1.15, 0);

const playerMesh = MeshBuilder.CreateCapsule(
  "wayfarer-proxy",
  { height: 1.8, radius: 0.35 },
  scene,
);

const anchorA = MeshBuilder.CreateSphere("anchor-a", { diameter: 0.7 }, scene);
anchorA.position.set(3.5, 4.4, 0);
const anchorB = MeshBuilder.CreateSphere("anchor-b", { diameter: 0.7 }, scene);
anchorB.position.set(1.5, 1.8, 0);
const movingAnchor = MeshBuilder.CreateSphere("anchor-moving", { diameter: 0.7 }, scene);
movingAnchor.position.set(-2, 2.45, 0);

const physics = await RapierCharacterWorld.create();
physics.addStaticBox(FLOOR_ID, { x: 0, y: -0.25, z: 0 }, { x: 8, y: 0.25, z: 1 });
physics.addStaticBox(LEFT_WALL_ID, { x: -8, y: 2, z: 0 }, { x: 0.15, y: 2, z: 1 });
physics.addStaticBox(RIGHT_WALL_ID, { x: 8, y: 2, z: 0 }, { x: 0.15, y: 2, z: 1 });
physics.addStaticBox(SLOPE_ID, { x: 4.9, y: 0.45, z: 0 }, { x: 1.8, y: 0.15, z: 1 }, Math.PI / 12);
physics.addStaticBox(ATTRACT_PILLAR_ID, { x: 0.25, y: 1.2, z: 0 }, { x: 0.35, y: 1.2, z: 1 });
physics.addMovingBox(PLATFORM_ID, { x: -2, y: 1.15, z: 0 }, { x: 1.25, y: 0.175, z: 1 });

const targetRegistry = new TargetRegistry();
targetRegistry.activate([
  {
    guid: asAuthoredTargetGuid("m0-anchor-a"),
    entityId: asEntityId(301),
    position: { x: 3.5, y: 4.4, z: 0 },
    priority: 0.02,
  },
  {
    guid: asAuthoredTargetGuid("m0-anchor-b"),
    entityId: asEntityId(302),
    position: { x: 1.5, y: 1.8, z: 0 },
  },
  {
    guid: asAuthoredTargetGuid("m0-anchor-moving"),
    entityId: asEntityId(303),
    position: { x: -2, y: 2.45, z: 0 },
    priority: 0.04,
  },
]);

const targetMeshes = new Map<number, typeof anchorA>();
for (const [guid, mesh] of [
  [asAuthoredTargetGuid("m0-anchor-a"), anchorA],
  [asAuthoredTargetGuid("m0-anchor-b"), anchorB],
  [asAuthoredTargetGuid("m0-anchor-moving"), movingAnchor],
] as const) {
  const target = targetRegistry.getByGuid(guid);
  if (target) targetMeshes.set(Number(target.id), mesh);
}

const movingTargetId = targetRegistry.getByGuid(asAuthoredTargetGuid("m0-anchor-moving"))?.id;
const PLAYER_ID = asEntityId(1);
const START = { x: -5, y: 2.2, z: 0 };
physics.createCharacter(START);

const clock = new FixedStepClock();
const simulation = new Simulation();
const input = new InputLatch();
const playerState = simulation.addWayfarer(PLAYER_ID);
playerState.position = { ...START };

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
  if (event.code === "Digit1") arrivalMode = "passThrough";
  if (event.code === "Digit2") arrivalMode = "softCapture";
  if (event.code === "Digit3") arrivalMode = "radiusBlend";
});
window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
  syncAxes();
  if (event.code === "Space") input.setJumpHeld(false);
  if (event.code === "KeyE") input.setAttractPressed(false);
});

let mouseAim: Vec3 = { x: 1, y: 0, z: 0 };
let hasMouseAim = false;
canvas.addEventListener("pointermove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  const magnitude = Math.hypot(x, y);
  if (magnitude > 0.08) {
    mouseAim = { x: x / magnitude, y: y / magnitude, z: 0 };
    hasMouseAim = true;
  }
});
canvas.addEventListener("pointerleave", () => {
  hasMouseAim = false;
});

function readAim(facing: -1 | 1) {
  let gamepadX = 0;
  let gamepadY = 0;
  let strongestGamepadMagnitude = 0;

  for (const gamepad of navigator.getGamepads?.() ?? []) {
    if (!gamepad?.connected) continue;
    const x = gamepad.axes[2] ?? 0;
    const y = -(gamepad.axes[3] ?? 0);
    const magnitude = Math.hypot(x, y);
    if (magnitude > strongestGamepadMagnitude) {
      strongestGamepadMagnitude = magnitude;
      gamepadX = x;
      gamepadY = y;
    }
  }

  return resolveTargetAim({
    gamepadX,
    gamepadY,
    mouseX: mouseAim.x,
    mouseY: mouseAim.y,
    hasMouse: hasMouseAim,
    facing,
  });
}

function platformPositionAtTick(tick: number): Vec3 {
  const periodTicks = 240;
  const phase = (tick % periodTicks) / periodTicks;
  const triangle = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
  return { x: -2 + triangle * 3, y: 1.15, z: 0 };
}

let previousMs = performance.now();
let stepsThisFrame = 0;
let collisionCount = 0;
let maximumCorrection = 0;
let selectedTargetId: TargetId | 0 = 0;
let targetDebug: readonly TargetCandidateDebug[] = [];
let aimSource: TargetAimSource = "facing";
let arrivalMode: AttractArrivalMode = M0_ATTRACT_CONFIG.arrivalMode;
const attractRuntime = createAttractRuntimeState();
let lastAttractEvent: AttractSemanticEvent | null = null;
let attractDistance = 0;
let attractAcceleration = 0;

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

    const movingTargetPosition = {
      x: platformPosition.x,
      y: platformPosition.y + 1.3,
      z: 0,
    };
    movingAnchor.position.set(movingTargetPosition.x, movingTargetPosition.y, movingTargetPosition.z);
    if (movingTargetId) {
      targetRegistry.update(movingTargetId, { position: movingTargetPosition });
    }

    const beforeStep = simulation.getWayfarer(PLAYER_ID);
    if (!beforeStep) continue;

    const aim = readAim(beforeStep.facing);
    aimSource = aim.source;
    const selection = selectResonanceTarget({
      playerPosition: beforeStep.position,
      aim: aim.vector,
      ability: "attract",
      previousTargetId: selectedTargetId,
      targets: targetRegistry.queryNearby(
        beforeStep.position,
        M0_TARGET_SELECTION_CONFIG.retainRange,
      ),
    });
    selectedTargetId = selection.selectedTargetId;
    targetDebug = selection.candidates;

    const lockedTargetId = attractRuntime.requiresRelease
      ? 0
      : attractRuntime.targetId !== 0
        ? attractRuntime.targetId
        : selectedTargetId;
    input.setTarget(Number(lockedTargetId));

    const simInput = input.consume(step.tick);
    simulation.step(new Map([[PLAYER_ID, simInput]]));

    const state = simulation.getWayfarer(PLAYER_ID);
    if (!state) continue;

    const previousGroundEntityId = state.groundEntityId;
    const attractConfig = { ...M0_ATTRACT_CONFIG, arrivalMode };
    let desiredTranslation: Vec3;

    if (
      simInput.attractPressed
      && simInput.targetId !== 0
      && !attractRuntime.requiresRelease
    ) {
      const attract = stepAttract(
        state,
        attractRuntime,
        targetRegistry.get(simInput.targetId),
        dequantizeAxis(simInput.moveX),
        attractConfig,
      );
      desiredTranslation = attract.desiredTranslation;
      attractDistance = attract.distance;
      attractAcceleration = attract.radialAcceleration;
      if (attract.event) lastAttractEvent = attract.event;

      if (attractRuntime.targetId === 0) {
        state.attractTargetId = 0;
      }
    } else {
      if (!simInput.attractPressed && (attractRuntime.targetId !== 0 || attractRuntime.requiresRelease)) {
        const releaseEvent = cancelAttract(state, attractRuntime, "released");
        if (releaseEvent) lastAttractEvent = releaseEvent;
      }
      attractDistance = 0;
      attractAcceleration = 0;

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
      desiredTranslation = movement.desiredTranslation;
    }

    const collision = physics.moveCharacter(
      desiredTranslation,
      previousGroundEntityId,
      state.up,
    );
    applyMovementCollision(state, collision);

    if (attractRuntime.targetId !== 0) {
      const collisionEvent = recordAttractCollision(
        state,
        attractRuntime,
        collision.maximumCorrection > 0.03,
        attractConfig,
      );
      if (collisionEvent) {
        lastAttractEvent = collisionEvent;
        state.attractTargetId = 0;
      }
    }

    if (state.position.y < -6 || Math.abs(state.position.x) > 20) {
      recoverMovementState(state, START);
      physics.setCharacterPosition(START);
    }

    collisionCount = collision.collisionCount;
    maximumCorrection = collision.maximumCorrection;
  }

  const state = simulation.getWayfarer(PLAYER_ID);
  if (state) playerMesh.position.set(state.position.x, state.position.y, state.position.z);

  for (const [id, mesh] of targetMeshes) {
    const selected = id === Number(selectedTargetId);
    const scale = selected ? 1.35 : 1;
    mesh.scaling.set(scale, scale, scale);
  }

  const candidateLines = targetDebug.map((candidate) => {
    const score = candidate.score === null ? candidate.rejectedReason : candidate.score.toFixed(3);
    return `T${Number(candidate.id)} ${candidate.retained ? "*" : " "} d=${candidate.distance.toFixed(2)} a=${candidate.alignment.toFixed(2)} s=${score}`;
  });

  const fps = engine.getFps();
  diagnostics.textContent = [
    "RESONANCE M0.6 — ATTRACT",
    "Move/steer: A/D or arrows | Jump: Space | Evade: Left Shift | Hold E: Attract",
    "Aim: mouse or gamepad right stick; facing is keyboard fallback",
    "Arrival experiment: 1 pass-through | 2 soft-capture | 3 radius-blend",
    `backend: ${backend} | fps: ${fps.toFixed(1)}`,
    `sim tick: ${Number(simulation.tick)} | steps/frame: ${stepsThisFrame} | alpha: ${clock.alpha.toFixed(3)}`,
    `position: ${state ? `${state.position.x.toFixed(2)}, ${state.position.y.toFixed(2)}, ${state.position.z.toFixed(2)}` : "-"}`,
    `grounded: ${state?.grounded ?? false} | ground entity: ${Number(state?.groundEntityId ?? 0)}`,
    `selected target: ${Number(selectedTargetId)} | locked attract target: ${Number(attractRuntime.targetId)} | aim: ${aimSource}`,
    `attract mode: ${arrivalMode} | distance: ${attractDistance.toFixed(2)} | accel: ${attractAcceleration.toFixed(2)}`,
    `attract event: ${lastAttractEvent ? JSON.stringify(lastAttractEvent) : "-"}`,
    `collisions: ${collisionCount} | max correction: ${maximumCorrection.toFixed(4)}`,
    ...candidateLines,
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
