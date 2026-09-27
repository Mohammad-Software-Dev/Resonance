import type { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { CreateTorus } from "@babylonjs/core/Meshes/Builders/torusBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import { Scene } from "@babylonjs/core/scene";
import {
  GRAPHICS_PRESETS,
  hardwareScalingLevel,
  type GraphicsPresetName,
} from "./presets";

const M0_ENVIRONMENT_URL =
  "/assets/environment/resonance-m0-orbital.env";

export interface RepresentativeRoomMeshes {
  readonly ground: Mesh;
  readonly leftWall: Mesh;
  readonly rightWall: Mesh;
  readonly slope: Mesh;
  readonly attractPillar: Mesh;
  readonly platform: Mesh;
  readonly player: Mesh;
  readonly targets: readonly Mesh[];
}

export interface GraphicsRoomStats {
  readonly preset: GraphicsPresetName;
  readonly renderScale: number;
  readonly meshes: number;
  readonly activeMeshes: number;
  readonly vertices: number;
  readonly activeParticles: number;
  readonly materials: number;
  readonly textures: number;
}

export interface RepresentativeGraphicsRoom {
  readonly keyLight: DirectionalLight;
  readonly shadowGenerator: ShadowGenerator;
  readonly resonanceMaterial: NodeMaterial;
  getPreset(): GraphicsPresetName;
  getRenderScale(): number;
  applyPreset(name: GraphicsPresetName): void;
  applyRenderScale(scale: number): void;
  setRelayActivated(active: boolean): void;
  update(elapsedSeconds: number): void;
  stats(): GraphicsRoomStats;
}

function pbr(
  name: string,
  scene: Scene,
  albedo: Color3,
  metallic: number,
  roughness: number,
  emissive = Color3.Black(),
): PBRMaterial {
  const material = new PBRMaterial(name, scene);
  material.albedoColor = albedo;
  material.metallic = metallic;
  material.roughness = roughness;
  material.emissiveColor = emissive;
  material.environmentIntensity = 0.38;
  return material;
}

function semanticMaterial(
  name: string,
  scene: Scene,
  diffuse: Color3,
  emissive = Color3.Black(),
): StandardMaterial {
  const material = new StandardMaterial(name, scene);
  material.diffuseColor = diffuse;
  material.emissiveColor = emissive;
  material.specularColor = new Color3(0.03, 0.04, 0.05);
  return material;
}

function createParticleTexture(scene: Scene): DynamicTexture {
  const texture = new DynamicTexture(
    "resonance-particle-texture",
    { width: 64, height: 64 },
    scene,
    false,
  );
  const context = texture.getContext();
  const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 31);
  gradient.addColorStop(0, "rgba(210,255,255,1)");
  gradient.addColorStop(0.28, "rgba(92,235,255,0.9)");
  gradient.addColorStop(1, "rgba(20,95,130,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  texture.update();
  return texture;
}

function createResonanceNodeMaterial(scene: Scene): NodeMaterial {
  NodeMaterial.UseNativeShaderLanguageOfEngine = true;
  const material = NodeMaterial.CreateDefault("resonance-node-material", scene);
  const colorInput = material.getInputBlockByPredicate(
    (block) => block.name.toLowerCase().includes("color"),
  );
  if (colorInput) {
    colorInput.value = new Color4(0.12, 0.9, 1, 1);
  }
  material.ignoreAlpha = true;
  return material;
}

function addIndustrialBackdrop(
  scene: Scene,
  darkMetal: PBRMaterial,
  paintedMetal: PBRMaterial,
  emissive: PBRMaterial,
): { distantMeshes: Mesh[]; emissiveMeshes: Mesh[] } {
  const distantMeshes: Mesh[] = [];
  const emissiveMeshes: Mesh[] = [];

  for (const panel of [
    { name: "orbital-frame-top", width: 21, height: 1.1, x: 0, y: 7.35 },
    { name: "orbital-frame-bottom", width: 21, height: 0.8, x: 0, y: -0.05 },
    { name: "orbital-frame-left", width: 1.25, height: 6.7, x: -9.7, y: 3.55 },
    { name: "orbital-frame-right", width: 1.25, height: 6.7, x: 9.7, y: 3.55 },
  ]) {
    const frame = CreateBox(
      panel.name,
      { width: panel.width, height: panel.height, depth: 0.45 },
      scene,
    );
    frame.position.set(panel.x, panel.y, 4.7);
    frame.material = darkMetal;
    distantMeshes.push(frame);
  }

  for (let x = -7.2; x <= 7.2; x += 2.4) {
    const rib = CreateBox(
      `orbital-rib-${x.toFixed(1)}`,
      { width: 0.22, height: 8, depth: 0.5 },
      scene,
    );
    rib.position.set(x, 3.4, 4.35);
    rib.rotation.z = x % 4.8 === 0 ? 0.08 : -0.08;
    rib.material = paintedMetal;
    distantMeshes.push(rib);
  }

  for (const y of [1.1, 3.1, 5.1, 7.1]) {
    const conduit = CreateBox(
      `service-conduit-${y}`,
      { width: 18, height: 0.1, depth: 0.12 },
      scene,
    );
    conduit.position.set(0, y, 4.05);
    conduit.material = emissive;
    distantMeshes.push(conduit);
    emissiveMeshes.push(conduit);
  }

  for (const x of [-6.4, -3.2, 3.2, 6.4]) {
    const machine = CreateBox(
      `service-machine-${x}`,
      { width: 1.15, height: 1.75, depth: 0.85 },
      scene,
    );
    machine.position.set(x, 1.05, 3.45);
    machine.material = paintedMetal;
    distantMeshes.push(machine);

    const status = CreateBox(
      `service-status-${x}`,
      { width: 0.62, height: 0.08, depth: 0.04 },
      scene,
    );
    status.position.set(x, 1.45, 2.98);
    status.material = emissive;
    distantMeshes.push(status);
    emissiveMeshes.push(status);
  }

  const overhead = CreateBox(
    "overhead-spine",
    { width: 18, height: 0.28, depth: 0.55 },
    scene,
  );
  overhead.position.set(0, 6.75, 2.7);
  overhead.material = darkMetal;
  distantMeshes.push(overhead);

  return { distantMeshes, emissiveMeshes };
}


function addWayfarerScarSet(
  scene: Scene,
  hull: PBRMaterial,
  ceramic: PBRMaterial,
  emergency: PBRMaterial,
  resonance: PBRMaterial,
): {
  readonly distantMeshes: Mesh[];
  readonly emergencyLights: Mesh[];
  readonly relayRings: Mesh[];
} {
  const distantMeshes: Mesh[] = [];
  const emergencyLights: Mesh[] = [];
  const relayRings: Mesh[] = [];

  // Broken transit hull: layered ribs and torn deck sections sit behind the gameplay plane.
  for (const segment of [
    { name: "scar-hull-left", x: -6.8, y: 2.2, width: 3.3, height: 0.42, rotation: -0.09 },
    { name: "scar-hull-mid", x: -1.8, y: 4.95, width: 4.8, height: 0.34, rotation: 0.05 },
    { name: "scar-hull-right", x: 5.0, y: 5.55, width: 5.3, height: 0.38, rotation: -0.05 },
    { name: "scar-deck-left", x: -5.3, y: 0.58, width: 4.0, height: 0.28, rotation: 0.03 },
    { name: "scar-deck-right", x: 4.5, y: 0.72, width: 4.8, height: 0.26, rotation: -0.04 },
  ]) {
    const mesh = CreateBox(
      segment.name,
      { width: segment.width, height: segment.height, depth: 0.46 },
      scene,
    );
    mesh.position.set(segment.x, segment.y, 2.2);
    mesh.rotation.z = segment.rotation;
    mesh.material = hull;
    distantMeshes.push(mesh);
  }

  for (const rib of [
    { x: -7.2, y: 3.25, h: 5.1, r: 0.16 },
    { x: -4.8, y: 3.55, h: 4.7, r: -0.12 },
    { x: -0.2, y: 3.75, h: 5.0, r: 0.11 },
    { x: 3.35, y: 3.55, h: 4.9, r: -0.12 },
    { x: 6.65, y: 3.2, h: 5.0, r: 0.15 },
  ]) {
    const mesh = CreateBox(
      `scar-rib-${rib.x.toFixed(2)}`,
      { width: 0.3, height: rib.h, depth: 0.38 },
      scene,
    );
    mesh.position.set(rib.x, rib.y, 2.35);
    mesh.rotation.z = rib.r;
    mesh.material = ceramic;
    distantMeshes.push(mesh);
  }

  // Cargo and maintenance pods communicate scale and the wreck's former function.
  for (const cargo of [
    { x: -6.2, y: 0.55, w: 0.9, h: 0.72 },
    { x: -5.25, y: 0.48, w: 0.72, h: 0.58 },
    { x: 3.0, y: 0.52, w: 0.82, h: 0.68 },
  ]) {
    const crate = CreateBox(
      `scar-cargo-${cargo.x.toFixed(2)}`,
      { width: cargo.w, height: cargo.h, depth: 0.7 },
      scene,
    );
    crate.position.set(cargo.x, cargo.y, 1.35);
    crate.material = hull;
    distantMeshes.push(crate);

    const latch = CreateBox(
      `scar-cargo-latch-${cargo.x.toFixed(2)}`,
      { width: cargo.w * 0.58, height: 0.06, depth: 0.04 },
      scene,
    );
    latch.position.set(cargo.x, cargo.y + 0.08, 0.98);
    latch.material = emergency;
    distantMeshes.push(latch);
    emergencyLights.push(latch);
  }

  // Repeating emergency lamps create a readable route toward the relay.
  for (const x of [-6.7, -3.7, -0.7, 2.3, 5.3]) {
    const lamp = CreateBox(
      `scar-emergency-lamp-${x}`,
      { width: 0.52, height: 0.08, depth: 0.08 },
      scene,
    );
    lamp.position.set(x, 5.85, 1.72);
    lamp.material = emergency;
    distantMeshes.push(lamp);
    emergencyLights.push(lamp);
  }

  // Destination landmark: a damaged emergency relay frame at the far right.
  for (const postX of [6.6, 7.55]) {
    const post = CreateBox(
      `scar-relay-post-${postX}`,
      { width: 0.2, height: 3.0, depth: 0.44 },
      scene,
    );
    post.position.set(postX, 2.1, 1.55);
    post.material = ceramic;
    distantMeshes.push(post);
  }
  const relayCap = CreateBox(
    "scar-relay-cap",
    { width: 1.18, height: 0.18, depth: 0.44 },
    scene,
  );
  relayCap.position.set(7.08, 3.55, 1.55);
  relayCap.material = ceramic;
  distantMeshes.push(relayCap);

  for (const diameter of [0.92, 1.3]) {
    const ring = CreateTorus(
      `scar-relay-ring-${diameter}`,
      { diameter, thickness: diameter === 0.92 ? 0.07 : 0.035, tessellation: 36 },
      scene,
    );
    ring.position.set(7.08, 2.55, 1.25);
    ring.rotation.x = Math.PI / 2;
    ring.material = resonance;
    relayRings.push(ring);
  }

  const relayCore = CreateSphere(
    "scar-relay-core",
    { diameter: 0.24, segments: 12 },
    scene,
  );
  relayCore.position.set(7.08, 2.55, 1.2);
  relayCore.material = resonance;
  relayRings.push(relayCore);

  // Sparse distant stars: points, not a bright white background.
  for (let index = 0; index < 22; index += 1) {
    const star = CreateSphere(
      `scar-star-${index}`,
      { diameter: 0.018 + (index % 3) * 0.008, segments: 6 },
      scene,
    );
    const x = -8.5 + ((index * 37) % 170) / 10;
    const y = 0.8 + ((index * 53) % 62) / 10;
    star.position.set(x, y, 9 + (index % 4) * 0.25);
    star.material = resonance;
    distantMeshes.push(star);
  }

  return { distantMeshes, emergencyLights, relayRings };
}

function decorateResonanceTargets(
  scene: Scene,
  targets: readonly Mesh[],
  material: NodeMaterial,
): Mesh[] {
  const rings: Mesh[] = [];
  for (let index = 0; index < targets.length; index += 1) {
    const target = targets[index];
    if (!target) continue;
    target.scaling.setAll(0.5);

    const outer = CreateTorus(
      `anchor-ring-outer-${index}`,
      { diameter: 1.45, thickness: 0.075, tessellation: 28 },
      scene,
    );
    outer.parent = target;
    outer.position.set(0, 0, 0);
    outer.rotation.x = Math.PI / 2;
    outer.material = material;

    const inner = CreateTorus(
      `anchor-ring-inner-${index}`,
      { diameter: 1.05, thickness: 0.038, tessellation: 24 },
      scene,
    );
    inner.parent = target;
    inner.position.set(0, 0, 0);
    inner.rotation.x = Math.PI / 2;
    inner.material = material;

    const spine = CreateBox(
      `anchor-spine-${index}`,
      { width: 0.08, height: 1.05, depth: 0.08 },
      scene,
    );
    spine.parent = target;
    spine.position.set(0, 0, 0);
    spine.material = material;

    rings.push(outer, inner, spine);
  }
  return rings;
}

function addGameplayReadabilityLayer(
  scene: Scene,
  meshes: RepresentativeRoomMeshes,
  deckAccent: StandardMaterial,
  hazardAccent: StandardMaterial,
  movingAccent: StandardMaterial,
  anchorAccent: StandardMaterial,
): { staticMeshes: Mesh[]; dynamicMeshes: Mesh[] } {
  const staticMeshes: Mesh[] = [];
  const dynamicMeshes: Mesh[] = [];

  const deckLip = CreateBox(
    "gameplay-deck-edge",
    { width: 15.7, height: 0.07, depth: 2.05 },
    scene,
  );
  deckLip.position.set(0, 0.035, -0.03);
  deckLip.material = deckAccent;
  staticMeshes.push(deckLip);

  for (const x of [-6.8, -5.2, -3.6, -0.8, 1.8, 3.4]) {
    const marker = CreateBox(
      `deck-route-marker-${x}`,
      { width: 0.68, height: 0.035, depth: 2.08 },
      scene,
    );
    marker.position.set(x, 0.075, 0);
    marker.material = deckAccent;
    staticMeshes.push(marker);
  }

  for (let index = -2; index <= 2; index += 1) {
    const band = CreateBox(
      `hazard-band-${index}`,
      { width: 0.18, height: 0.055, depth: 2.12 },
      scene,
    );
    band.parent = meshes.slope;
    band.position.set(index * 0.55, 0.19, 0);
    band.rotation.z = -0.42;
    band.material = hazardAccent;
    staticMeshes.push(band);
  }

  for (const x of [-0.9, 0.9]) {
    const rail = CreateBox(
      `moving-platform-rail-${x}`,
      { width: 0.12, height: 0.16, depth: 2.12 },
      scene,
    );
    rail.parent = meshes.platform;
    rail.position.set(x, 0.22, 0);
    rail.material = movingAccent;
    dynamicMeshes.push(rail);
  }

  const pillarStripe = CreateBox(
    "attract-pillar-resonance-stripe",
    { width: 0.13, height: 2.12, depth: 2.08 },
    scene,
  );
  pillarStripe.parent = meshes.attractPillar;
  pillarStripe.position.set(0, 0, 0);
  pillarStripe.material = anchorAccent;
  staticMeshes.push(pillarStripe);

  for (let index = 0; index < meshes.targets.length; index += 1) {
    const target = meshes.targets[index];
    if (!target) continue;
    for (let fin = 0; fin < 4; fin += 1) {
      const marker = CreateBox(
        `anchor-fin-${index}-${fin}`,
        { width: fin % 2 === 0 ? 1.0 : 0.11, height: fin % 2 === 0 ? 0.11 : 1.0, depth: 0.08 },
        scene,
      );
      marker.parent = target;
      marker.position.set(0, 0, -0.43);
      marker.material = anchorAccent;
      dynamicMeshes.push(marker);
    }
  }

  const playerMarker = CreateTorus(
    "wayfarer-ground-marker",
    { diameter: 1.05, thickness: 0.035, tessellation: 40 },
    scene,
  );
  playerMarker.parent = meshes.player;
  playerMarker.position.set(0, -0.92, 0.08);
  playerMarker.rotation.x = Math.PI / 2;
  playerMarker.material = deckAccent;
  dynamicMeshes.push(playerMarker);

  return { staticMeshes, dynamicMeshes };
}

function addGasGiantVista(scene: Scene): Mesh[] {
  const planetMaterial = new StandardMaterial("gas-giant-material", scene);
  planetMaterial.diffuseColor = new Color3(0.32, 0.18, 0.12);
  planetMaterial.emissiveColor = new Color3(0.12, 0.055, 0.035);
  planetMaterial.specularColor = Color3.Black();

  const atmosphereMaterial = new StandardMaterial("gas-giant-atmosphere", scene);
  atmosphereMaterial.diffuseColor = new Color3(0.08, 0.17, 0.24);
  atmosphereMaterial.emissiveColor = new Color3(0.025, 0.09, 0.13);
  atmosphereMaterial.alpha = 0.32;
  atmosphereMaterial.backFaceCulling = false;

  const planet = CreateSphere(
    "gas-giant",
    { diameter: 12, segments: 32 },
    scene,
  );
  planet.position.set(7.8, 5.4, 15);
  planet.scaling.y = 0.92;
  planet.material = planetMaterial;

  const atmosphere = CreateSphere(
    "gas-giant-atmosphere",
    { diameter: 12.35, segments: 24 },
    scene,
  );
  atmosphere.position.copyFrom(planet.position);
  atmosphere.scaling.y = 0.92;
  atmosphere.material = atmosphereMaterial;

  const limb = CreateTorus(
    "gas-giant-limb-band",
    { diameter: 9.8, thickness: 0.08, tessellation: 64 },
    scene,
  );
  limb.position.copyFrom(planet.position);
  limb.rotation.x = Math.PI / 2;
  limb.rotation.z = 0.22;
  limb.material = atmosphereMaterial;

  return [planet, atmosphere, limb];
}

function addWayfarerSilhouette(
  scene: Scene,
  player: Mesh,
  suit: StandardMaterial,
  accent: StandardMaterial,
): Mesh[] {
  player.material = suit;
  player.scaling.set(0.88, 1, 0.78);

  const head = CreateSphere(
    "wayfarer-helmet",
    { diameter: 0.56, segments: 16 },
    scene,
  );
  head.parent = player;
  head.position.set(0, 0.88, 0);
  head.scaling.set(1, 0.9, 0.88);
  head.material = suit;

  const visor = CreateBox(
    "wayfarer-visor",
    { width: 0.34, height: 0.14, depth: 0.08 },
    scene,
  );
  visor.parent = head;
  visor.position.set(0, 0.02, -0.27);
  visor.material = accent;

  const pack = CreateBox(
    "wayfarer-field-pack",
    { width: 0.42, height: 0.62, depth: 0.18 },
    scene,
  );
  pack.parent = player;
  pack.position.set(0, 0.16, 0.34);
  pack.material = suit;

  const emitter = CreateSphere(
    "wayfarer-field-emitter",
    { diameter: 0.18, segments: 10 },
    scene,
  );
  emitter.parent = pack;
  emitter.position.set(0, 0.08, 0.12);
  emitter.material = accent;

  const chest = CreateBox(
    "wayfarer-chest-plate",
    { width: 0.58, height: 0.72, depth: 0.22 },
    scene,
  );
  chest.parent = player;
  chest.position.set(0, 0.1, -0.22);
  chest.material = suit;

  const leftArm = CreateBox(
    "wayfarer-left-arm",
    { width: 0.16, height: 0.58, depth: 0.18 },
    scene,
  );
  leftArm.parent = player;
  leftArm.position.set(-0.38, 0.08, -0.02);
  leftArm.material = suit;

  const rightArm = CreateBox(
    "wayfarer-right-arm",
    { width: 0.18, height: 0.58, depth: 0.2 },
    scene,
  );
  rightArm.parent = player;
  rightArm.position.set(0.39, 0.08, -0.02);
  rightArm.material = suit;

  const leftLeg = CreateBox(
    "wayfarer-left-leg",
    { width: 0.2, height: 0.66, depth: 0.22 },
    scene,
  );
  leftLeg.parent = player;
  leftLeg.position.set(-0.15, -0.66, 0);
  leftLeg.material = suit;

  const rightLeg = CreateBox(
    "wayfarer-right-leg",
    { width: 0.2, height: 0.66, depth: 0.22 },
    scene,
  );
  rightLeg.parent = player;
  rightLeg.position.set(0.15, -0.66, 0);
  rightLeg.material = suit;

  const gauntlet = CreateBox(
    "wayfarer-resonance-gauntlet",
    { width: 0.24, height: 0.22, depth: 0.26 },
    scene,
  );
  gauntlet.parent = rightArm;
  gauntlet.position.set(0.03, -0.23, -0.07);
  gauntlet.material = accent;

  const shoulderMark = CreateBox(
    "wayfarer-shoulder-mark",
    { width: 0.24, height: 0.09, depth: 0.04 },
    scene,
  );
  shoulderMark.parent = leftArm;
  shoulderMark.position.set(0, 0.2, -0.12);
  shoulderMark.material = accent;

  const fabricTab = CreateBox(
    "wayfarer-fabric-tab",
    { width: 0.08, height: 0.55, depth: 0.04 },
    scene,
  );
  fabricTab.parent = player;
  fabricTab.position.set(-0.29, -0.12, 0.13);
  fabricTab.rotation.z = -0.18;
  fabricTab.material = accent;

  return [
    player,
    head,
    visor,
    pack,
    emitter,
    chest,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    gauntlet,
    shoulderMark,
    fabricTab,
  ];
}

export function createRepresentativeGraphicsRoom(
  scene: Scene,
  engine: AbstractEngine,
  meshes: RepresentativeRoomMeshes,
  initialPreset: GraphicsPresetName,
): RepresentativeGraphicsRoom {
  scene.clearColor = new Color4(0.008, 0.013, 0.025, 1);
  scene.fogMode = Scene.FOGMODE_EXP2;
  scene.fogColor = new Color3(0.025, 0.055, 0.08);

  const ambient = scene.getLightByName("ambient") as HemisphericLight | null;
  if (ambient) {
    ambient.diffuse = new Color3(0.32, 0.43, 0.55);
    ambient.groundColor = new Color3(0.025, 0.03, 0.045);
    ambient.intensity = 0.28;
  }

  scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(
    M0_ENVIRONMENT_URL,
    scene,
  );

  const darkMetal = pbr(
    "orbital-dark-metal",
    scene,
    new Color3(0.055, 0.075, 0.1),
    0.42,
    0.58,
  );
  const paintedMetal = pbr(
    "orbital-painted-metal",
    scene,
    new Color3(0.105, 0.16, 0.19),
    0.28,
    0.58,
  );
  const emissive = pbr(
    "orbital-emissive",
    scene,
    new Color3(0.015, 0.08, 0.095),
    0.18,
    0.28,
    new Color3(0.08, 0.72, 0.9),
  );
  const hullCeramic = pbr(
    "scar-hull-ceramic",
    scene,
    new Color3(0.12, 0.15, 0.16),
    0.16,
    0.72,
  );
  const emergency = pbr(
    "scar-emergency",
    scene,
    new Color3(0.19, 0.075, 0.025),
    0.05,
    0.5,
    new Color3(0.95, 0.24, 0.055),
  );
  const relayMaterial = pbr(
    "scar-relay-emissive",
    scene,
    new Color3(0.018, 0.12, 0.12),
    0.08,
    0.3,
    new Color3(0.08, 0.88, 0.72),
  );

  const gameplayDeck = semanticMaterial(
    "gameplay-deck",
    scene,
    new Color3(0.08, 0.13, 0.17),
    new Color3(0.015, 0.035, 0.045),
  );
  const gameplayWall = semanticMaterial(
    "gameplay-wall",
    scene,
    new Color3(0.055, 0.085, 0.11),
  );
  const gameplayHazard = semanticMaterial(
    "gameplay-hazard",
    scene,
    new Color3(0.32, 0.105, 0.03),
    new Color3(0.2, 0.045, 0.008),
  );
  const gameplayMover = semanticMaterial(
    "gameplay-mover",
    scene,
    new Color3(0.11, 0.24, 0.25),
    new Color3(0.015, 0.12, 0.13),
  );
  const deckAccent = semanticMaterial(
    "gameplay-route-accent",
    scene,
    new Color3(0.03, 0.28, 0.28),
    new Color3(0.02, 0.34, 0.34),
  );
  const hazardAccent = semanticMaterial(
    "gameplay-hazard-accent",
    scene,
    new Color3(0.48, 0.16, 0.025),
    new Color3(0.7, 0.15, 0.02),
  );
  const anchorAccent = semanticMaterial(
    "gameplay-anchor-accent",
    scene,
    new Color3(0.03, 0.35, 0.42),
    new Color3(0.03, 0.55, 0.72),
  );

  const suit = semanticMaterial(
    "wayfarer-suit",
    scene,
    new Color3(0.31, 0.34, 0.33),
    new Color3(0.018, 0.024, 0.03),
  );
  const suitAccent = semanticMaterial(
    "wayfarer-accent",
    scene,
    new Color3(0.02, 0.18, 0.2),
    new Color3(0.04, 0.72, 0.88),
  );

  meshes.ground.material = gameplayDeck;
  meshes.leftWall.material = gameplayWall;
  meshes.rightWall.material = gameplayWall;
  meshes.slope.material = gameplayHazard;
  meshes.attractPillar.material = gameplayMover;
  meshes.platform.material = gameplayMover;

  meshes.ground.receiveShadows = true;
  meshes.leftWall.receiveShadows = true;
  meshes.rightWall.receiveShadows = true;
  meshes.slope.receiveShadows = true;
  meshes.attractPillar.receiveShadows = true;
  meshes.platform.receiveShadows = true;

  const resonanceMaterial = createResonanceNodeMaterial(scene);
  for (const target of meshes.targets) target.material = resonanceMaterial;

  const backdrop = addIndustrialBackdrop(scene, darkMetal, paintedMetal, emissive);
  const scar = addWayfarerScarSet(
    scene,
    darkMetal,
    hullCeramic,
    emergency,
    relayMaterial,
  );
  const vista = addGasGiantVista(scene);
  const wayfarerMeshes = addWayfarerSilhouette(scene, meshes.player, suit, suitAccent);
  const anchorRings = decorateResonanceTargets(scene, meshes.targets, resonanceMaterial);
  const readability = addGameplayReadabilityLayer(
    scene,
    meshes,
    deckAccent,
    hazardAccent,
    gameplayMover,
    anchorAccent,
  );

  const leftArm = scene.getMeshByName("wayfarer-left-arm") as Mesh | null;
  const rightArm = scene.getMeshByName("wayfarer-right-arm") as Mesh | null;
  const leftLeg = scene.getMeshByName("wayfarer-left-leg") as Mesh | null;
  const rightLeg = scene.getMeshByName("wayfarer-right-leg") as Mesh | null;
  const fabricTab = scene.getMeshByName("wayfarer-fabric-tab") as Mesh | null;
  let lastPlayerX = meshes.player.position.x;

  scene.skipPointerMovePicking = true;
  for (const mesh of scene.meshes) mesh.isPickable = false;
  for (const mesh of [
    ...backdrop.distantMeshes,
    ...scar.distantMeshes,
    ...vista,
    ...readability.staticMeshes,
  ]) {
    mesh.freezeWorldMatrix();
  }
  for (const material of [
    darkMetal,
    paintedMetal,
    emissive,
    hullCeramic,
    emergency,
    relayMaterial,
    gameplayDeck,
    gameplayWall,
    gameplayHazard,
    gameplayMover,
    deckAccent,
    hazardAccent,
    anchorAccent,
    suit,
    suitAccent,
  ]) {
    material.freeze();
  }

  const keyLight = new DirectionalLight(
    "orbital-key",
    new Vector3(-0.42, -1, 0.36),
    scene,
  );
  keyLight.position.set(5.5, 9.5, -5);
  keyLight.diffuse = new Color3(0.78, 0.9, 1);
  keyLight.intensity = 1.15;
  keyLight.shadowMinZ = 1;
  keyLight.shadowMaxZ = 28;

  const shadowGenerator = new ShadowGenerator(
    GRAPHICS_PRESETS[initialPreset].shadowMapSize,
    keyLight,
  );
  shadowGenerator.usePercentageCloserFiltering = true;
  shadowGenerator.bias = 0.0006;
  shadowGenerator.normalBias = 0.025;
  shadowGenerator.setDarkness(0.42);

  for (const caster of [
    meshes.player,
    meshes.platform,
    meshes.attractPillar,
    ...wayfarerMeshes.slice(1),
  ]) {
    shadowGenerator.addShadowCaster(caster);
  }

  const glow = new GlowLayer("resonance-glow", scene, {
    blurKernelSize: 32,
  });

  const particles = new ParticleSystem("resonance-field-dust", 420, scene);
  particles.particleTexture = createParticleTexture(scene);
  particles.emitter = new Vector3(0, 2.7, 0.8);
  particles.minEmitBox = new Vector3(-7.2, -1.2, -0.6);
  particles.maxEmitBox = new Vector3(7.2, 2.4, 0.6);
  particles.color1 = new Color4(0.1, 0.75, 1, 0.42);
  particles.color2 = new Color4(0.34, 1, 0.88, 0.28);
  particles.colorDead = new Color4(0.02, 0.1, 0.16, 0);
  particles.minSize = 0.025;
  particles.maxSize = 0.085;
  particles.minLifeTime = 1.2;
  particles.maxLifeTime = 3.8;
  particles.direction1 = new Vector3(-0.08, 0.12, -0.02);
  particles.direction2 = new Vector3(0.08, 0.34, 0.02);
  particles.minEmitPower = 0.05;
  particles.maxEmitPower = 0.3;
  particles.updateSpeed = 0.016;
  particles.blendMode = ParticleSystem.BLENDMODE_ADD;
  particles.start();

  let presetName = initialPreset;
  let currentRenderScale = GRAPHICS_PRESETS[initialPreset].renderScale;
  let relayActivated = false;
  const colorInput = resonanceMaterial.getInputBlockByPredicate(
    (block) => block.name.toLowerCase().includes("color"),
  );

  function applyRenderScale(scale: number): void {
    currentRenderScale = Math.max(0.5, Math.min(1, scale));
    engine.setHardwareScalingLevel(hardwareScalingLevel(currentRenderScale));
  }

  function applyPreset(name: GraphicsPresetName): void {
    const preset = GRAPHICS_PRESETS[name];
    presetName = name;
    applyRenderScale(preset.renderScale);
    shadowGenerator.mapSize = preset.shadowMapSize;
    shadowGenerator.getShadowMap()?.resize(preset.shadowMapSize);
    keyLight.shadowEnabled = preset.shadowEnabled;
    particles.emitRate = preset.particleEmitRate;
    glow.intensity = preset.glowIntensity;
    scene.fogDensity = preset.fogDensity;
    scene.environmentIntensity = preset.environmentIntensity;
    for (const mesh of [...backdrop.distantMeshes, ...scar.distantMeshes, ...vista]) {
      mesh.setEnabled(preset.distantDetail);
    }
    for (const mesh of scar.relayRings) mesh.setEnabled(true);
  }

  applyPreset(initialPreset);

  return {
    keyLight,
    shadowGenerator,
    resonanceMaterial,
    getPreset: () => presetName,
    getRenderScale: () => currentRenderScale,
    applyPreset,
    applyRenderScale,
    setRelayActivated(active: boolean): void {
      relayActivated = active;
    },
    update(elapsedSeconds: number): void {
      const pulse = 0.5 + 0.5 * Math.sin(elapsedSeconds * 3.1);
      if (colorInput) {
        colorInput.value = new Color4(
          0.08 + pulse * 0.06,
          0.72 + pulse * 0.2,
          0.92 + pulse * 0.08,
          1,
        );
      }
      for (let i = 0; i < backdrop.emissiveMeshes.length; i += 1) {
        const mesh = backdrop.emissiveMeshes[i];
        if (!mesh) continue;
        mesh.scaling.y = 0.85 + 0.15 * Math.sin(elapsedSeconds * 1.4 + i * 0.7);
      }

      for (let i = 0; i < scar.emergencyLights.length; i += 1) {
        const lamp = scar.emergencyLights[i];
        if (!lamp) continue;
        const flash = 0.86 + 0.14 * Math.sin(elapsedSeconds * 3.8 + i * 0.9);
        lamp.scaling.x = flash;
      }

      for (let i = 0; i < scar.relayRings.length; i += 1) {
        const ring = scar.relayRings[i];
        if (!ring) continue;
        const direction = i % 2 === 0 ? 1 : -1;
        const speed = relayActivated ? 1.55 : 0.18;
        ring.rotation.z = elapsedSeconds * speed * direction;
        const pulse = relayActivated
          ? 1 + Math.sin(elapsedSeconds * 5.5 + i) * 0.07
          : 1;
        ring.scaling.setAll(pulse);
      }

      for (let i = 0; i < anchorRings.length; i += 1) {
        const ring = anchorRings[i];
        if (!ring || !ring.name.includes("ring")) continue;
        ring.rotation.z = elapsedSeconds * (i % 2 === 0 ? 0.42 : -0.31);
      }
      for (let i = 0; i < readability.dynamicMeshes.length; i += 1) {
        const mesh = readability.dynamicMeshes[i];
        if (!mesh || !mesh.name.startsWith("anchor-fin")) continue;
        const pulseScale = 0.94 + 0.06 * Math.sin(elapsedSeconds * 2.8 + i * 0.35);
        mesh.scaling.z = pulseScale;
      }

      const dx = meshes.player.position.x - lastPlayerX;
      lastPlayerX = meshes.player.position.x;
      const moving = Math.abs(dx) > 0.0015;
      const gait = moving ? Math.sin(elapsedSeconds * 10.5) * 0.38 : Math.sin(elapsedSeconds * 2.2) * 0.035;
      if (leftArm) leftArm.rotation.z = gait;
      if (rightArm) rightArm.rotation.z = -gait * 0.8;
      if (leftLeg) leftLeg.rotation.z = -gait * 0.72;
      if (rightLeg) rightLeg.rotation.z = gait * 0.72;
      if (fabricTab) fabricTab.rotation.z = -0.18 - Math.min(0.32, Math.abs(dx) * 12);
    },
    stats: (): GraphicsRoomStats => {
      const preset = GRAPHICS_PRESETS[presetName];
      return {
        preset: presetName,
        renderScale: currentRenderScale,
        meshes: scene.meshes.length,
        activeMeshes: scene.getActiveMeshes().length,
        vertices: scene.getTotalVertices(),
        activeParticles: scene.getActiveParticles(),
        materials: scene.materials.length,
        textures: scene.textures.length,
      };
    },
  };
}
