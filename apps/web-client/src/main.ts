import { Camera } from "@babylonjs/core/Cameras/camera";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import type { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { CreateLines } from "@babylonjs/core/Meshes/Builders/linesBuilder";
import { CreateCapsule } from "@babylonjs/core/Meshes/Builders/capsuleBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import type { Material } from "@babylonjs/core/Materials/material";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Scene } from "@babylonjs/core/scene";
import {
  M0_ATTRACT_CONFIG,
  M0_MOVEMENT_CONFIG,
  M0_REPEL_CONFIG,
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
  createRepelRuntimeState,
  recoverMovementState,
  stepAttract,
  stepMovement,
  stepRepel,
  stepRepelRecovery,
  type AttractSemanticEvent,
  type RepelSemanticEvent,
} from "@resonance/movement";
import { RapierCharacterWorld } from "@resonance/physics";
import {
  FixedStepClock,
  InputLatch,
  ReplayRecorder,
  Simulation,
  dequantizeAxis,
  hashReplayState,
} from "@resonance/simulation";
import {
  M0_TARGET_SELECTION_CONFIG,
  TargetRegistry,
  resolveTargetAim,
  selectResonanceTarget,
  type TargetAimSource,
  type TargetCandidateDebug,
} from "@resonance/targeting";
import {
  GRAPHICS_PRESETS,
  initialGraphicsPreset,
  nextGraphicsPreset,
} from "./graphics/presets";
import { parseBackendPreference } from "./graphics/backend-preference";
import {
  AUTHORED_VISUAL_ASSETS,
  authoredVisualAssetMode,
  loadAuthoredVisualAsset,
} from "./graphics/authored-visual-assets";
import { auditVisualLandmarks } from "./graphics/visual-landmarks";
import { resonanceInteractionPresentation } from "./graphics/interaction-presentation";
import { objectiveStagePresentation } from "./graphics/objective-presentation";
import {
  cameraSmoothingFactor,
  presentationCameraGoal,
} from "./graphics/presentation-camera";
import {
  BrowserPerformanceMonitor,
  warmCriticalShaders,
} from "./performance/browser-performance";
import { DynamicResolutionGovernor } from "./performance/dynamic-resolution";
import { FrameCaptureBuffer } from "./performance/frame-capture";
import { BlindMovementTestSession } from "./blind-test";
import {
  WayfarerScarProgress,
  type WayfarerScarProgressSnapshot,
} from "./slice-progression";
import "./style.css";

type Backend = "webgpu" | "webgl2";

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Required M0 element is missing: ${selector}`);
  return element;
}

const canvas = requireElement<HTMLCanvasElement>("#game");
const diagnostics = requireElement<HTMLDivElement>("#diagnostics");
const objectiveTitle = requireElement<HTMLElement>("#hud-objective-title");
const objectiveDetail = requireElement<HTMLElement>("#hud-objective-detail");
const objectiveProgress = requireElement<HTMLElement>("#hud-progress");
const sliceComplete = requireElement<HTMLElement>("#slice-complete");
const resonanceHud = requireElement<HTMLElement>("#hud-resonance");
const resonanceHudTitle = requireElement<HTMLElement>("#hud-resonance-title");
const resonanceHudDetail = requireElement<HTMLElement>("#hud-resonance-detail");
const objectiveEvent = requireElement<HTMLElement>("#objective-event");
const objectiveEventKicker = requireElement<HTMLElement>("#objective-event-kicker");
const objectiveEventTitle = requireElement<HTMLElement>("#objective-event-title");
const objectiveEventDetail = requireElement<HTMLElement>("#objective-event-detail");
const backendPreference = parseBackendPreference(location.search);
const query = new URLSearchParams(location.search);
document.body.classList.toggle("debug", query.get("debug") === "1");
document.body.dataset.resonanceBoot = "dom-ready";
document.body.dataset.resonanceBuildId = import.meta.env.VITE_BUILD_ID ?? "dev";
document.body.dataset.resonanceBackendPreference = backendPreference;
document.body.dataset.resonanceAuthoredVisualAssets = authoredVisualAssetMode();
document.body.dataset.resonanceAuthoredWayfarer = "loading";
document.body.dataset.resonanceAuthoredScrapper = "loading";

async function createEngine(): Promise<{ engine: AbstractEngine; backend: Backend }> {
  if (backendPreference !== "webgl2" && "gpu" in navigator) {
    try {
      const { WebGPUEngine } = await import("@babylonjs/core/Engines/webgpuEngine");
      const engine = new WebGPUEngine(canvas, { antialias: true });
      await engine.initAsync();
      return { engine, backend: "webgpu" };
    } catch (error) {
      if (backendPreference === "webgpu") {
        throw new Error("WebGPU was explicitly required for this evidence run but failed to initialize.", {
          cause: error,
        });
      }
      console.warn("WebGPU initialization failed; falling back to WebGL2.", error);
    }
  } else if (backendPreference === "webgpu") {
    throw new Error("WebGPU was explicitly required for this evidence run but navigator.gpu is unavailable.");
  }

  return {
    engine: new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: true }),
    backend: "webgl2",
  };
}

let engineResult: { engine: AbstractEngine; backend: Backend };
try {
  engineResult = await createEngine();
} catch (error) {
  document.body.dataset.resonanceBoot = "backend-error";
  const detail = error instanceof Error ? error.message : String(error);
  diagnostics.textContent = `RESONANCE M0 — BACKEND SELECTION FAILED\n${detail}`;
  throw error;
}
const { engine, backend } = engineResult;
document.body.dataset.resonanceBoot = `engine-ready:${backend}`;
const scene = new Scene(engine);
scene.clearColor.set(0.018, 0.027, 0.045, 1);

const camera = new FreeCamera("m0-camera", new Vector3(-2.2, 3.0, -10.9), scene);
camera.setTarget(new Vector3(-2.2, 1.55, 0));
camera.fov = 0.52;
camera.minZ = 0.1;
camera.maxZ = 80;
let cameraMode: "perspective" | "orthographic" = "perspective";

function applyCameraMode(): void {
  if (cameraMode === "perspective") {
    camera.mode = Camera.PERSPECTIVE_CAMERA;
    return;
  }

  const aspect = Math.max(0.5, engine.getRenderWidth() / Math.max(1, engine.getRenderHeight()));
  const halfHeight = 4.6;
  camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
  camera.orthoTop = halfHeight;
  camera.orthoBottom = -halfHeight;
  camera.orthoLeft = -halfHeight * aspect;
  camera.orthoRight = halfHeight * aspect;
}

const light = new HemisphericLight("ambient", new Vector3(0.2, 1, -0.2), scene);
light.intensity = 0.8;

const FLOOR_ID = asEntityId(100);
const LEFT_WALL_ID = asEntityId(101);
const RIGHT_WALL_ID = asEntityId(102);
const SLOPE_ID = asEntityId(103);
const PLATFORM_ID = asEntityId(104);
const ATTRACT_PILLAR_ID = asEntityId(105);
const MID_FLOOR_ID = asEntityId(106);
const RIGHT_FLOOR_ID = asEntityId(107);

const groundLeft = CreateBox("ground-left", { width: 4.7, height: 0.5, depth: 2 }, scene);
groundLeft.position.set(-5.65, -0.25, 0);

const groundCenter = CreateBox("ground-center", { width: 2.7, height: 0.5, depth: 2 }, scene);
groundCenter.position.set(-0.25, -0.25, 0);

const groundRight = CreateBox("ground-right", { width: 5.8, height: 0.5, depth: 2 }, scene);
groundRight.position.set(5.1, -0.25, 0);

const leftWall = CreateBox("left-wall", { width: 0.3, height: 4, depth: 2 }, scene);
leftWall.position.set(-8, 2, 0);
const rightWall = CreateBox("right-wall", { width: 0.3, height: 4, depth: 2 }, scene);
rightWall.position.set(8, 2, 0);

const slope = CreateBox("slope", { width: 3.6, height: 0.3, depth: 2 }, scene);
slope.position.set(4.9, 0.45, 0);
slope.rotation.z = Math.PI / 12;

const attractPillar = CreateBox("attract-pillar", { width: 0.7, height: 2.4, depth: 2 }, scene);
attractPillar.position.set(0.25, 1.2, 0);

const platformMesh = CreateBox("moving-platform", { width: 2.5, height: 0.35, depth: 2 }, scene);
platformMesh.position.set(-2, 1.15, 0);

const playerMesh = CreateCapsule(
  "wayfarer-proxy",
  { height: 1.8, radius: 0.35 },
  scene,
);

const anchorA = CreateSphere("anchor-a", { diameter: 0.7 }, scene);
anchorA.position.set(3.5, 4.4, 0);
const anchorB = CreateSphere("anchor-b", { diameter: 0.7 }, scene);
anchorB.position.set(1.5, 1.8, 0);
const movingAnchor = CreateSphere("anchor-moving", { diameter: 0.7 }, scene);
movingAnchor.position.set(-2, 2.45, 0);
const lowRepelAnchor = CreateSphere("anchor-low-repel", { diameter: 0.62 }, scene);
lowRepelAnchor.position.set(-4.2, 0.38, 0);
const wallRepelAnchor = CreateSphere("anchor-wall-repel", { diameter: 0.62 }, scene);
wallRepelAnchor.position.set(7.25, 2.1, 0);

const physics = await RapierCharacterWorld.create();
physics.addStaticBox(FLOOR_ID, { x: -5.65, y: -0.25, z: 0 }, { x: 2.35, y: 0.25, z: 1 });
physics.addStaticBox(MID_FLOOR_ID, { x: -0.25, y: -0.25, z: 0 }, { x: 1.35, y: 0.25, z: 1 });
physics.addStaticBox(RIGHT_FLOOR_ID, { x: 5.1, y: -0.25, z: 0 }, { x: 2.9, y: 0.25, z: 1 });
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
  {
    guid: asAuthoredTargetGuid("m0-anchor-low-repel"),
    entityId: asEntityId(304),
    position: { x: -4.2, y: 0.38, z: 0 },
    priority: 0.03,
  },
  {
    guid: asAuthoredTargetGuid("m0-anchor-wall-repel"),
    entityId: asEntityId(305),
    position: { x: 7.25, y: 2.1, z: 0 },
    priority: 0.03,
  },
]);

const targetMeshes = new Map<number, typeof anchorA>();
for (const [guid, mesh] of [
  [asAuthoredTargetGuid("m0-anchor-a"), anchorA],
  [asAuthoredTargetGuid("m0-anchor-b"), anchorB],
  [asAuthoredTargetGuid("m0-anchor-moving"), movingAnchor],
  [asAuthoredTargetGuid("m0-anchor-low-repel"), lowRepelAnchor],
  [asAuthoredTargetGuid("m0-anchor-wall-repel"), wallRepelAnchor],
] as const) {
  const target = targetRegistry.getByGuid(guid);
  if (target) targetMeshes.set(Number(target.id), mesh);
}

const targetLabelsByMeshName: Readonly<Record<string, string>> = {
  "anchor-a": "OVERHEAD ANCHOR",
  "anchor-b": "BREACH ANCHOR",
  "anchor-moving": "MOVING ANCHOR",
  "anchor-low-repel": "LOW REPEL NODE",
  "anchor-wall-repel": "RELAY NODE",
};
const targetLabels = new Map<number, string>();
for (const [id, mesh] of targetMeshes) {
  targetLabels.set(id, targetLabelsByMeshName[mesh.name] ?? "RESONANCE ANCHOR");
}

const feedbackSeed = [
  new Vector3(0, 0, -0.45),
  new Vector3(0.25, 0.2, -0.35),
  new Vector3(0.5, 0.1, -0.25),
  new Vector3(0.75, 0.2, -0.15),
  new Vector3(1, 0, -0.05),
];
const resonanceTether = CreateLines(
  "resonance-field-tether",
  { points: feedbackSeed, updatable: true },
  scene,
);
resonanceTether.color = new Color3(0.12, 0.92, 1);
resonanceTether.isPickable = false;
resonanceTether.isVisible = false;

function circularFieldPoints(center: Vector3, radius: number): Vector3[] {
  return Array.from({ length: 33 }, (_, index) => {
    const angle = (index / 32) * Math.PI * 2;
    return new Vector3(
      center.x + Math.cos(angle) * radius,
      center.y + Math.sin(angle) * radius,
      center.z - 0.38,
    );
  });
}

const repelShockwave = CreateLines(
  "repel-impact-shockwave",
  { points: circularFieldPoints(Vector3.Zero(), 0.1), updatable: true },
  scene,
);
repelShockwave.color = new Color3(1, 0.46, 0.12);
repelShockwave.isPickable = false;
repelShockwave.isVisible = false;

const { createRepresentativeGraphicsRoom } = await import(
  "./graphics/representative-room"
);
const graphicsRoom = createRepresentativeGraphicsRoom(
  scene,
  engine,
  {
    grounds: [groundLeft, groundCenter, groundRight],
    leftWall,
    rightWall,
    slope,
    attractPillar,
    platform: platformMesh,
    player: playerMesh,
    targets: [...targetMeshes.values()],
  },
  initialGraphicsPreset(backend),
);

function remapImportedMaterials(
  meshes: readonly AbstractMesh[],
  mapping: Readonly<Record<string, Material>>,
): void {
  const replaced = new Set<Material>();
  for (const mesh of meshes) {
    const current = mesh.material;
    if (!current) continue;
    const target = mapping[current.name];
    if (!target || target === current) continue;
    replaced.add(current);
    mesh.material = target;
  }
  for (const material of replaced) {
    material.dispose();
  }
}

const wayfarerVisualSpec = AUTHORED_VISUAL_ASSETS.find(
  (spec) => spec.slot === "wayfarer-player",
);
if (!wayfarerVisualSpec) {
  throw new Error("Authored visual slot wayfarer-player is missing");
}
const wayfarerVisualResult = await loadAuthoredVisualAsset(scene, wayfarerVisualSpec);
let authoredWayfarerRoot: AbstractMesh | null = null;
if (wayfarerVisualResult.status === "authored") {
  authoredWayfarerRoot =
    wayfarerVisualResult.meshes.find((mesh) => mesh.parent === null)
    ?? wayfarerVisualResult.meshes[0]
    ?? null;
  if (!authoredWayfarerRoot) {
    throw new Error("Authored Wayfarer GLB loaded without a root mesh");
  }
  authoredWayfarerRoot.position.copyFrom(playerMesh.position);
  authoredWayfarerRoot.scaling.setAll(0.82);
  remapImportedMaterials(wayfarerVisualResult.meshes, {
    Mara_Suit: graphicsRoom.authoredPalette.shell,
    Mara_Ceramic: graphicsRoom.authoredPalette.ceramic,
    Mara_Resonance: graphicsRoom.authoredPalette.resonance,
    Mara_Dark: graphicsRoom.authoredPalette.dark,
    Mara_Fabric: graphicsRoom.authoredPalette.dark,
  });
  for (const mesh of wayfarerVisualResult.meshes) {
    mesh.isPickable = false;
    graphicsRoom.shadowGenerator.addShadowCaster(mesh);
  }
  graphicsRoom.setProceduralWayfarerEnabled(false);
  graphicsRoom.releaseProceduralWayfarerFallback();
  document.body.dataset.resonanceAuthoredWayfarer = "authored";
} else {
  document.body.dataset.resonanceAuthoredWayfarer = "fallback";
  console.warn(
    "Authored Wayfarer failed to load; procedural fallback remains active.",
    wayfarerVisualResult.reason,
  );
}

const scrapperVisualSpec = AUTHORED_VISUAL_ASSETS.find(
  (spec) => spec.slot === "scrapper-damaged",
);
if (!scrapperVisualSpec) {
  throw new Error("Authored visual slot scrapper-damaged is missing");
}
const scrapperVisualResult = await loadAuthoredVisualAsset(scene, scrapperVisualSpec);
let authoredScrapperRoot: AbstractMesh | null = null;
let authoredScrapperEye: AbstractMesh | null = null;
let authoredScrapperDamagedArm: AbstractMesh | null = null;
let authoredScrapperLoosePlate: AbstractMesh | null = null;
if (scrapperVisualResult.status === "authored") {
  authoredScrapperRoot =
    scrapperVisualResult.meshes.find((mesh) => mesh.parent === null)
    ?? scrapperVisualResult.meshes[0]
    ?? null;
  if (!authoredScrapperRoot) {
    throw new Error("Authored Scrapper GLB loaded without a root mesh");
  }
  authoredScrapperRoot.position.set(5.75, 0.93, 0.25);
  authoredScrapperRoot.rotation.z = -0.08;
  remapImportedMaterials(scrapperVisualResult.meshes, {
    Scrapper_Shell: graphicsRoom.authoredPalette.shell,
    Scrapper_Joint: graphicsRoom.authoredPalette.dark,
    Scrapper_Hostile: graphicsRoom.authoredPalette.hostile,
    Scrapper_Damage: graphicsRoom.authoredPalette.damage,
  });
  authoredScrapperEye =
    scrapperVisualResult.meshes.find((mesh) => mesh.name === "Scrapper_HostileEye")
    ?? null;
  authoredScrapperDamagedArm =
    scrapperVisualResult.meshes.find((mesh) => mesh.name === "Scrapper_DamagedArm")
    ?? null;
  authoredScrapperLoosePlate =
    scrapperVisualResult.meshes.find((mesh) => mesh.name === "Scrapper_LooseForearmPlate")
    ?? null;
  for (const mesh of scrapperVisualResult.meshes) {
    mesh.isPickable = false;
    graphicsRoom.shadowGenerator.addShadowCaster(mesh);
  }
  graphicsRoom.setProceduralScrapperEnabled(false);
  graphicsRoom.releaseProceduralScrapperFallback();
  document.body.dataset.resonanceAuthoredScrapper = "authored";
} else {
  document.body.dataset.resonanceAuthoredScrapper = "fallback";
  console.warn(
    "Authored Scrapper failed to load; procedural fallback remains active.",
    scrapperVisualResult.reason,
  );
}

const visualLandmarkAudit = auditVisualLandmarks(scene.meshes.map((mesh) => mesh.name));
document.body.dataset.resonanceVisualLandmarks = visualLandmarkAudit.ready
  ? "ready"
  : `missing:${visualLandmarkAudit.missing.join(",")}`;
if (!visualLandmarkAudit.ready) {
  throw new Error(
    `Recognizable-game visual landmarks missing: ${visualLandmarkAudit.missing.join(", ")}`,
  );
}
document.body.dataset.resonanceTraversalCourse = "v2";
applyCameraMode();

const scarProgress = new WayfarerScarProgress();
let lastScarStage = "";
let objectiveEventTimer = 0;
const scarProgressBars = [...objectiveProgress.querySelectorAll("i")];

function renderScarProgress(snapshot: WayfarerScarProgressSnapshot): void {
  if (snapshot.stage === lastScarStage) return;
  lastScarStage = snapshot.stage;
  objectiveTitle.textContent = snapshot.title;
  objectiveDetail.textContent = snapshot.detail;
  for (let index = 0; index < scarProgressBars.length; index += 1) {
    scarProgressBars[index]?.classList.toggle("active", index < snapshot.step);
  }

  const stagePresentation = objectiveStagePresentation(snapshot.stage);
  objectiveEvent.dataset.tone = stagePresentation.tone;
  objectiveEventKicker.textContent = stagePresentation.kicker;
  objectiveEventTitle.textContent = stagePresentation.title;
  objectiveEventDetail.textContent = stagePresentation.detail;
  objectiveEvent.classList.add("visible");
  window.clearTimeout(objectiveEventTimer);
  objectiveEventTimer = window.setTimeout(() => {
    objectiveEvent.classList.remove("visible");
  }, snapshot.complete ? 2200 : 1450);

  sliceComplete.classList.toggle("visible", snapshot.complete);
  document.body.dataset.resonanceSliceStage = snapshot.stage;
  document.body.dataset.resonanceObjectiveEvent = snapshot.stage;
  graphicsRoom.setRelayActivated(snapshot.complete);
}

renderScarProgress(scarProgress.snapshot());
document.body.dataset.resonanceBoot = "graphics-room-ready";

const shaderWarmupStartMs = performance.now();
document.body.dataset.resonanceBoot = "shader-warmup";
const warmedShaderBindings = await warmCriticalShaders(scene);
const shaderWarmupMs = performance.now() - shaderWarmupStartMs;
document.body.dataset.resonanceBoot = "shader-warmup-complete";
document.body.dataset.resonanceShaderWarmupMs = shaderWarmupMs.toFixed(1);
const performanceMonitor = new BrowserPerformanceMonitor(scene, engine);
const dynamicResolution = new DynamicResolutionGovernor(graphicsRoom.getRenderScale());
const frameCapture = new FrameCaptureBuffer();
let recoveryStatus: "ready" | "lost" | "restored" = "ready";

engine.onContextLostObservable.add(() => {
  recoveryStatus = "lost";
  clock.clearAccumulator();
});

engine.onContextRestoredObservable.add(() => {
  recoveryStatus = "restored";
  previousMs = performance.now();
  const preset = graphicsRoom.getPreset();
  graphicsRoom.applyPreset(preset);
  graphicsRoom.applyRenderScale(
    dynamicResolution.setBaseScale(GRAPHICS_PRESETS[preset].renderScale),
  );
});

const movingTargetId = targetRegistry.getByGuid(asAuthoredTargetGuid("m0-anchor-moving"))?.id;
const PLAYER_ID = asEntityId(1);
const START = { x: -5, y: 2.2, z: 0 };
const blindTest = new BlindMovementTestSession(
  import.meta.env.VITE_BUILD_ID ?? "dev",
  START,
  Number(PLATFORM_ID),
);
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
  if (["F7", "F8", "F9", "F10"].includes(event.code)) event.preventDefault();
  if (event.code === "Space") input.setJumpHeld(true);
  if (event.code === "ShiftLeft" && !event.repeat) input.pressEvade();
  if (event.code === "KeyE") input.setAttractPressed(true);
  if (event.code === "KeyQ" && !event.repeat) {
    input.pressRepel();
    repelRequested = true;
  }
  if (event.code === "Digit1") setArrivalMode("passThrough");
  if (event.code === "Digit2") setArrivalMode("softCapture");
  if (event.code === "Digit3") setArrivalMode("radiusBlend");
  if (event.code === "KeyG" && !event.repeat) {
    const nextPreset = nextGraphicsPreset(graphicsRoom.getPreset());
    graphicsRoom.applyPreset(nextPreset);
    graphicsRoom.applyRenderScale(
      dynamicResolution.setBaseScale(GRAPHICS_PRESETS[nextPreset].renderScale),
    );
  }
  if (event.code === "KeyR" && !event.repeat) {
    const resetScale = dynamicResolution.setEnabled(!dynamicResolution.isEnabled());
    if (resetScale !== null) graphicsRoom.applyRenderScale(resetScale);
  }
  if (event.code === "KeyP" && !event.repeat) exportPerformanceCapture();
  if (event.code === "KeyX" && !event.repeat) frameCapture.reset();
  if (event.code === "F9" && !event.repeat) startReplayCapture();
  if (event.code === "F10" && !event.repeat) exportReplayCapture();
  if (event.code === "F7" && !event.repeat) {
    keys.clear();
    syncAxes();
    input.clear();
    repelRequested = false;
    blindTest.showQuestionnaire();
  }
  if (event.code === "F8" && !event.repeat) blindTest.export();
  if (event.code === "KeyC" && !event.repeat) {
    cameraMode = cameraMode === "perspective" ? "orthographic" : "perspective";
    applyCameraMode();
  }
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

function readGamepadAttractHeld(): boolean {
  for (const gamepad of navigator.getGamepads?.() ?? []) {
    if (!gamepad?.connected) continue;
    const rightTrigger = gamepad.buttons[7];
    if (rightTrigger && (rightTrigger.pressed || rightTrigger.value > 0.25)) return true;
  }
  return false;
}

function readGamepadRepelHeld(): boolean {
  for (const gamepad of navigator.getGamepads?.() ?? []) {
    if (!gamepad?.connected) continue;
    const leftTrigger = gamepad.buttons[6];
    if (leftTrigger && (leftTrigger.pressed || leftTrigger.value > 0.25)) return true;
  }
  return false;
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
const repelRuntime = createRepelRuntimeState();
let replayRecorder: ReplayRecorder | null = null;
let replayCaptureStatus = "idle";

function replayHash(): string {
  return hashReplayState(simulation.stateHash(), [
    Number(attractRuntime.targetId),
    Number(attractRuntime.targetRevision),
    attractRuntime.ticksActive,
    attractRuntime.blockedTicks,
    attractRuntime.arrived,
    attractRuntime.requiresRelease,
    Number(repelRuntime.lastTargetId),
    repelRuntime.uses,
  ]);
}

function replayTelemetry() {
  const state = simulation.getWayfarer(PLAYER_ID);
  return {
    simulationHash: simulation.stateHash(),
    positionX: state?.position.x ?? 0,
    positionY: state?.position.y ?? 0,
    velocityX: state?.velocity.x ?? 0,
    velocityY: state?.velocity.y ?? 0,
    movementMode: state?.movementMode ?? "missing",
    grounded: state?.grounded ?? false,
    groundEntityId: Number(state?.groundEntityId ?? 0),
    attractTargetId: Number(attractRuntime.targetId),
    attractTicks: attractRuntime.ticksActive,
    attractBlockedTicks: attractRuntime.blockedTicks,
    attractRequiresRelease: attractRuntime.requiresRelease,
    repelLastTargetId: Number(repelRuntime.lastTargetId),
    repelUses: repelRuntime.uses,
    collisionCount,
    maximumCorrection,
  };
}

function setArrivalMode(mode: AttractArrivalMode): void {
  if (replayRecorder) {
    replayRecorder = null;
    replayCaptureStatus = "cancelled: arrival mode changed";
  }
  arrivalMode = mode;
}

function startReplayCapture(): void {
  const state = simulation.getWayfarer(PLAYER_ID);
  if (!state) {
    replayCaptureStatus = "blocked: player missing";
    return;
  }
  if (
    attractRuntime.targetId !== 0
    || attractRuntime.requiresRelease
    || state.repelRecoveryTicksRemaining > 0
  ) {
    replayCaptureStatus = "blocked: start from neutral ability state";
    return;
  }

  Object.assign(attractRuntime, createAttractRuntimeState());
  Object.assign(repelRuntime, createRepelRuntimeState());

  replayRecorder = new ReplayRecorder({
    buildId: import.meta.env.VITE_BUILD_ID ?? "dev",
    fixture: { id: "m0-representative-course", version: 2 },
    initialSeed: 0,
    settings: { attractArrivalMode: arrivalMode },
    checkpointIntervalTicks: 30,
    initialSnapshot: simulation.createSnapshot(),
  });
  replayCaptureStatus = `recording from tick ${Number(simulation.tick)}`;
}

function exportReplayCapture(): void {
  if (!replayRecorder) {
    replayCaptureStatus = "nothing to export; press F9 first";
    return;
  }
  replayRecorder.setFinalHash(replayHash());
  const artifact = replayRecorder.artifact();
  if (artifact.inputs.length === 0) {
    replayCaptureStatus = "nothing to export: no fixed ticks recorded";
    return;
  }

  const blob = new Blob([JSON.stringify(artifact, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `resonance-replay-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  replayCaptureStatus = `exported ${artifact.inputs.length} ticks`;
  replayRecorder = null;
}

let lastRepelEvent: RepelSemanticEvent | null = null;
let repelRequested = false;
let gamepadRepelWasHeld = false;
let nextDiagnosticsUpdateMs = 0;
let lastVisualRepelUses = 0;
let repelFlashTargetId = 0;
let repelFlashUntilMs = 0;
let repelShockwaveStartedMs = -1;
const repelShockwaveCenter = new Vector3();

function exportPerformanceCapture(): void {
  const payload = {
    schema: "resonance.m0.performance-capture.v1",
    buildId: import.meta.env.VITE_BUILD_ID ?? "dev",
    capturedAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    backend,
    backendPreference,
    cameraMode,
    graphics: graphicsRoom.stats(),
    dynamicResolution: dynamicResolution.snapshot(),
    performance: performanceMonitor.snapshot(),
    frameSummary: frameCapture.summary(),
    samples: frameCapture.exportSamples(),
    shaderWarmupMs,
    warmedShaderBindings,
    simulationTick: Number(simulation.tick),
    deterministicStateHash: simulation.stateHash(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `resonance-m0-performance-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

document.body.dataset.resonanceBoot = "ready";

engine.runRenderLoop(() => {
  const now = performance.now();
  const frameSeconds = (now - previousMs) / 1000;
  previousMs = now;

  if (blindTest.inputBlocked) clock.clearAccumulator();
  const steps = blindTest.inputBlocked ? [] : clock.advance(frameSeconds);
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
    const gamepadRepelHeld = readGamepadRepelHeld();
    if (gamepadRepelHeld && !gamepadRepelWasHeld) {
      input.pressRepel();
      repelRequested = true;
    }
    gamepadRepelWasHeld = gamepadRepelHeld;

    const previousSelectedTargetId = selectedTargetId;
    const selection = selectResonanceTarget({
      playerPosition: beforeStep.position,
      aim: aim.vector,
      ability: repelRequested ? "repel" : "attract",
      previousTargetId: selectedTargetId,
      targets: targetRegistry.queryNearby(
        beforeStep.position,
        M0_TARGET_SELECTION_CONFIG.retainRange,
      ),
    });
    selectedTargetId = selection.selectedTargetId;
    blindTest.recordTargetChange(Number(step.tick), previousSelectedTargetId, selectedTargetId);
    targetDebug = selection.candidates;

    const lockedTargetId = beforeStep.repelRecoveryTicksRemaining > 0
      ? 0
      : attractRuntime.requiresRelease && !repelRequested
        ? 0
        : attractRuntime.targetId !== 0
          ? attractRuntime.targetId
          : selectedTargetId;
    input.setTarget(Number(lockedTargetId));

    input.setAttractPressed(keys.has("KeyE") || readGamepadAttractHeld());
    const simInput = input.consume(step.tick);
    repelRequested = false;
    replayRecorder?.recordInput(simInput);
    simulation.step(new Map([[PLAYER_ID, simInput]]));

    const state = simulation.getWayfarer(PLAYER_ID);
    if (!state) continue;

    if (
      !simInput.attractPressed
      && attractRuntime.targetId === 0
      && attractRuntime.requiresRelease
    ) {
      cancelAttract(state, attractRuntime, "released");
    }

    const previousGroundEntityId = state.groundEntityId;
    const attractConfig = { ...M0_ATTRACT_CONFIG, arrivalMode };
    let desiredTranslation: Vec3;

    if (simInput.repelPressed) {
      const repelTarget = simInput.targetId === 0
        ? undefined
        : targetRegistry.get(simInput.targetId);
      const repel = stepRepel(
        state,
        repelRuntime,
        repelTarget,
        M0_REPEL_CONFIG,
      );
      lastRepelEvent = repel.event;
      if (repel.applied) {
        if (attractRuntime.targetId !== 0) {
          const comboCancel = cancelAttract(state, attractRuntime, "repel");
          if (comboCancel) lastAttractEvent = comboCancel;
          simulation.cancelAttract(PLAYER_ID);
        }
        simulation.recordRepel(PLAYER_ID);
        desiredTranslation = repel.desiredTranslation;
      } else if (state.repelRecoveryTicksRemaining > 0) {
        const recovery = stepRepelRecovery(
          state,
          repelRuntime,
          dequantizeAxis(simInput.moveX),
          M0_MOVEMENT_CONFIG,
          M0_REPEL_CONFIG,
        );
        desiredTranslation = recovery.desiredTranslation;
        if (recovery.event) lastRepelEvent = recovery.event;
      } else {
        desiredTranslation = stepMovement(
          state,
          {
            moveX: dequantizeAxis(simInput.moveX),
            jumpPressed: simInput.jumpPressed,
            jumpHeld: simInput.jumpHeld,
            evadePressed: simInput.evadePressed,
          },
          { grounded: state.grounded, groundEntityId: state.groundEntityId },
          M0_MOVEMENT_CONFIG,
        ).desiredTranslation;
      }
      attractDistance = 0;
      attractAcceleration = 0;
    } else if (state.repelRecoveryTicksRemaining > 0) {
      const recovery = stepRepelRecovery(
        state,
        repelRuntime,
        dequantizeAxis(simInput.moveX),
        M0_MOVEMENT_CONFIG,
        M0_REPEL_CONFIG,
      );
      desiredTranslation = recovery.desiredTranslation;
      if (recovery.event) lastRepelEvent = recovery.event;
      attractDistance = 0;
      attractAcceleration = 0;
    } else if (
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
        simulation.cancelAttract(PLAYER_ID);
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
        collision.blockedX
          || collision.hitCeiling
          || (collision.grounded && desiredTranslation.y < -0.01),
        attractConfig,
      );
      if (collisionEvent) {
        lastAttractEvent = collisionEvent;
        simulation.cancelAttract(PLAYER_ID);
      }
    }

    if (state.position.y < -6 || Math.abs(state.position.x) > 20) {
      blindTest.recordRecovery(Number(step.tick));
      recoverMovementState(state, START);
      physics.setCharacterPosition(START);
    }

    collisionCount = collision.collisionCount;
    maximumCorrection = collision.maximumCorrection;

    blindTest.recordTick({
      tick: Number(step.tick),
      position: { ...state.position },
      velocity: { ...state.velocity },
      grounded: state.grounded,
      groundEntityId: Number(state.groundEntityId),
      selectedTargetId: Number(selectedTargetId),
      attractTargetId: Number(attractRuntime.targetId),
      repelUses: repelRuntime.uses,
      collisionCount,
      maximumCorrection,
    });

    if (replayRecorder) {
      const hash = replayHash();
      if (replayRecorder.shouldCheckpoint(simulation.tick)) {
        replayRecorder.recordCheckpoint(simulation.tick, hash, replayTelemetry());
      }
      replayRecorder.setFinalHash(hash);
    }
  }

  const state = simulation.getWayfarer(PLAYER_ID);
  if (state) {
    playerMesh.position.set(state.position.x, state.position.y, state.position.z);
    if (authoredWayfarerRoot) {
      authoredWayfarerRoot.position.set(
        state.position.x,
        state.position.y,
        state.position.z,
      );
      authoredWayfarerRoot.scaling.x = Math.abs(authoredWayfarerRoot.scaling.x)
        * state.facing;
    }
    renderScarProgress(scarProgress.update({
      positionX: state.position.x,
      attractActive: attractRuntime.ticksActive > 0 || lastAttractEvent !== null,
      repelUses: repelRuntime.uses,
    }));

    const cameraGoal = presentationCameraGoal({
      playerX: state.position.x,
      playerY: state.position.y,
      velocityX: state.velocity.x,
    });
    const cameraEase = cameraSmoothingFactor(frameSeconds);
    camera.position.x += (cameraGoal.x - camera.position.x) * cameraEase;
    camera.position.y += (cameraGoal.y - camera.position.y) * cameraEase;
    camera.position.z += (cameraGoal.z - camera.position.z) * cameraEase;
    camera.setTarget(new Vector3(camera.position.x, cameraGoal.targetY, 0));
  }

  if (repelRuntime.uses > lastVisualRepelUses) {
    lastVisualRepelUses = repelRuntime.uses;
    repelFlashTargetId = Number(repelRuntime.lastTargetId);
    repelFlashUntilMs = now + 210;
    const repelOrigin = targetMeshes.get(repelFlashTargetId)?.position
      ?? (state ? new Vector3(state.position.x, state.position.y, state.position.z) : Vector3.Zero());
    repelShockwaveCenter.copyFrom(repelOrigin);
    repelShockwaveStartedMs = now;
  }

  const repelShockwaveAge = repelShockwaveStartedMs < 0
    ? 1
    : Math.min(1, (now - repelShockwaveStartedMs) / 320);
  if (repelShockwaveAge < 1) {
    const easedAge = 1 - Math.pow(1 - repelShockwaveAge, 2);
    const radius = 0.22 + easedAge * 1.72;
    CreateLines(
      "repel-impact-shockwave",
      {
        points: circularFieldPoints(repelShockwaveCenter, radius),
        instance: repelShockwave,
      },
      scene,
    );
    repelShockwave.isVisible = true;
  } else {
    repelShockwave.isVisible = false;
  }

  const activeAttractTargetId = Number(attractRuntime.targetId);
  const visualTargetId = now < repelFlashUntilMs
    ? repelFlashTargetId
    : activeAttractTargetId;
  const visualTarget = visualTargetId === 0 ? undefined : targetMeshes.get(visualTargetId);

  const interactionTargetId = activeAttractTargetId !== 0
    ? activeAttractTargetId
    : Number(selectedTargetId);
  const interactionPresentation = resonanceInteractionPresentation({
    selectedTargetId: Number(selectedTargetId),
    attractTargetId: activeAttractTargetId,
    repelActive: (state?.repelRecoveryTicksRemaining ?? 0) > 0 || now < repelFlashUntilMs,
    targetLabel: interactionTargetId === 0
      ? null
      : targetLabels.get(interactionTargetId) ?? null,
  });
  if (resonanceHud.dataset.mode !== interactionPresentation.mode) {
    resonanceHud.dataset.mode = interactionPresentation.mode;
  }
  if (resonanceHudTitle.textContent !== interactionPresentation.title) {
    resonanceHudTitle.textContent = interactionPresentation.title;
  }
  if (resonanceHudDetail.textContent !== interactionPresentation.detail) {
    resonanceHudDetail.textContent = interactionPresentation.detail;
  }
  document.body.dataset.resonanceInteractionState = interactionPresentation.mode;

  if (state && visualTarget) {
    const start = new Vector3(state.position.x, state.position.y + 0.15, -0.42);
    const end = new Vector3(
      visualTarget.position.x,
      visualTarget.position.y,
      visualTarget.position.z - 0.18,
    );
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const wave = now < repelFlashUntilMs ? 0.34 : 0.18;
    const points = [0, 0.25, 0.5, 0.75, 1].map((t, index) => new Vector3(
      start.x + dx * t,
      start.y + dy * t + Math.sin(t * Math.PI) * wave * (index % 2 === 0 ? 1 : -0.65),
      start.z + (end.z - start.z) * t,
    ));
    CreateLines(
      "resonance-field-tether",
      { points, instance: resonanceTether },
      scene,
    );
    resonanceTether.color = now < repelFlashUntilMs
      ? new Color3(1, 0.46, 0.12)
      : new Color3(0.12, 0.92, 1);
    resonanceTether.isVisible = true;
  } else {
    resonanceTether.isVisible = false;
  }

  for (const [id, mesh] of targetMeshes) {
    const selected = id === Number(selectedTargetId);
    const active = id === activeAttractTargetId;
    const repelFlash = now < repelFlashUntilMs && id === repelFlashTargetId;
    const scale = repelFlash ? 0.76 : active ? 0.7 : selected ? 0.59 : 0.5;
    mesh.scaling.setAll(scale);
  }

  if (authoredScrapperRoot) {
    const elapsedSeconds = now / 1000;
    const scrapperDrift = Math.sin(elapsedSeconds * 0.9) * 0.18;
    authoredScrapperRoot.position.x = 5.75 + scrapperDrift;
    authoredScrapperRoot.rotation.z = -0.08 + Math.sin(elapsedSeconds * 1.3) * 0.025;
    if (authoredScrapperDamagedArm) {
      authoredScrapperDamagedArm.rotation.z =
        -0.48 + Math.sin(elapsedSeconds * 2.1) * 0.08;
    }
    if (authoredScrapperLoosePlate) {
      authoredScrapperLoosePlate.rotation.z =
        0.22 + Math.sin(elapsedSeconds * 4.2) * 0.08;
    }
    if (authoredScrapperEye) {
      const hostilePulse = 0.82 + 0.18 * Math.sin(elapsedSeconds * 6.2);
      authoredScrapperEye.scaling.x = 1.35 * hostilePulse;
      authoredScrapperEye.scaling.y = 0.65 * hostilePulse;
    }
  }

  graphicsRoom.update(now / 1000);
  scene.render();

  const performanceStats = performanceMonitor.snapshot();
  frameCapture.push(
    frameSeconds * 1000,
    graphicsRoom.getRenderScale(),
    performanceStats.cpuFrameMs,
    performanceStats.gpuFrameMs,
    performanceStats.drawCalls,
  );

  const adaptiveScale = dynamicResolution.sample(frameSeconds * 1000);
  if (adaptiveScale !== null) {
    graphicsRoom.applyRenderScale(adaptiveScale);
    applyCameraMode();
  }

  if (now < nextDiagnosticsUpdateMs) return;
  nextDiagnosticsUpdateMs = now + 250;

  const graphicsStats = graphicsRoom.stats();
  const dynamicStats = dynamicResolution.snapshot();
  const candidateLines = targetDebug.map((candidate) => {
    const score = candidate.score === null ? candidate.rejectedReason : candidate.score.toFixed(3);
    return `T${Number(candidate.id)} ${candidate.retained ? "*" : " "} d=${candidate.distance.toFixed(2)} a=${candidate.alignment.toFixed(2)} s=${score}`;
  });

  const fps = engine.getFps();
  diagnostics.textContent = [
    "RESONANCE M0.9 — PERFORMANCE PASS",
    "Move/steer: A/D or arrows | Jump: Space | Evade: Left Shift",
    "Attract: hold E / gamepad RT | Repel: Q / gamepad LT",
    "Graphics: G presets | R dynamic resolution | C camera | P export perf | X reset perf",
    "Replay: F9 start from neutral state | F10 export deterministic replay",
    "Aim: mouse or gamepad right stick; facing is keyboard fallback",
    "Arrival experiment: 1 pass-through | 2 soft-capture | 3 radius-blend",
    `backend: ${backend} | requested: ${backendPreference} | fps: ${fps.toFixed(1)} | camera: ${cameraMode}`,
    `graphics: ${graphicsStats.preset} | render scale: ${graphicsStats.renderScale.toFixed(2)} | dynamic: ${dynamicStats.enabled ? "on" : "off"}`,
    `frame: cpu ${performanceStats.cpuFrameMs.toFixed(2)} ms | render ${performanceStats.renderMs.toFixed(2)} ms | gpu ${performanceStats.gpuFrameMs === null ? "n/a" : performanceStats.gpuFrameMs.toFixed(2) + " ms"}`,
    `draw calls: ${performanceStats.drawCalls} | active-mesh eval: ${performanceStats.activeMeshesEvaluationMs.toFixed(2)} ms | particles: ${performanceStats.particlesRenderMs.toFixed(2)} ms`,
    `adaptive: avg ${dynamicStats.averageFrameMs.toFixed(2)} ms | cooldown ${dynamicStats.cooldownRemaining} | changes ${dynamicStats.changes}`,
    `heap: ${performanceStats.usedHeapMb === null ? "n/a" : performanceStats.usedHeapMb.toFixed(1) + " MB"} / ${performanceStats.totalHeapMb === null ? "n/a" : performanceStats.totalHeapMb.toFixed(1) + " MB"}`,
    `render: meshes ${graphicsStats.activeMeshes}/${graphicsStats.meshes} | vertices ${graphicsStats.vertices} | particles ${graphicsStats.activeParticles}`,
    `resources: materials ${graphicsStats.materials} | textures ${graphicsStats.textures} | warmed bindings ${warmedShaderBindings}`,
    `shader warmup: ${shaderWarmupMs.toFixed(1)} ms | runtime compile: ${performanceStats.runtimeShaderCompilationMs.toFixed(1)} ms`,
    `graphics recovery: ${recoveryStatus} | replay: ${replayCaptureStatus}`,
    `sim tick: ${Number(simulation.tick)} | steps/frame: ${stepsThisFrame} | alpha: ${clock.alpha.toFixed(3)}`,
    `position: ${state ? `${state.position.x.toFixed(2)}, ${state.position.y.toFixed(2)}, ${state.position.z.toFixed(2)}` : "-"}`,
    `grounded: ${state?.grounded ?? false} | ground entity: ${Number(state?.groundEntityId ?? 0)}`,
    `selected target: ${Number(selectedTargetId)} | locked attract target: ${Number(attractRuntime.targetId)} | aim: ${aimSource}`,
    `attract mode: ${arrivalMode} | distance: ${attractDistance.toFixed(2)} | accel: ${attractAcceleration.toFixed(2)}`,
    `attract event: ${lastAttractEvent ? JSON.stringify(lastAttractEvent) : "-"}`,
    `repel recovery: ${state?.repelRecoveryTicksRemaining ?? 0} ticks | uses: ${repelRuntime.uses}`,
    `repel event: ${lastRepelEvent ? JSON.stringify(lastRepelEvent) : "-"}`,
    `collisions: ${collisionCount} | max correction: ${maximumCorrection.toFixed(4)}`,
    ...candidateLines,
    `state hash: ${simulation.stateHash()}`,
  ].join("\n");

});

window.addEventListener("resize", () => {
  engine.resize();
  applyCameraMode();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clock.clearAccumulator();
  } else {
    previousMs = performance.now();
  }
});

