import {
  Color3,
  Color4,
  CubeTexture,
  DirectionalLight,
  DynamicTexture,
  GlowLayer,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  NodeMaterial,
  ParticleSystem,
  PBRMaterial,
  Scene,
  ShadowGenerator,
  StandardMaterial,
  Vector3,
  type AbstractEngine,
} from "@babylonjs/core";
import {
  GRAPHICS_PRESETS,
  hardwareScalingLevel,
  type GraphicsPresetName,
} from "./presets";

const TEMPORARY_M0_ENVIRONMENT_URL =
  "https://assets.babylonjs.com/environments/environmentSpecular.env";

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
  applyPreset(name: GraphicsPresetName): void;
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
  material.environmentIntensity = 0.85;
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

  const backPlate = MeshBuilder.CreateBox(
    "orbital-backplate",
    { width: 21, height: 8.5, depth: 0.45 },
    scene,
  );
  backPlate.position.set(0, 3.3, 4.7);
  backPlate.material = darkMetal;
  distantMeshes.push(backPlate);

  for (let x = -7.2; x <= 7.2; x += 2.4) {
    const rib = MeshBuilder.CreateBox(
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
    const conduit = MeshBuilder.CreateBox(
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
    const machine = MeshBuilder.CreateBox(
      `service-machine-${x}`,
      { width: 1.15, height: 1.75, depth: 0.85 },
      scene,
    );
    machine.position.set(x, 1.05, 3.45);
    machine.material = paintedMetal;
    distantMeshes.push(machine);

    const status = MeshBuilder.CreateBox(
      `service-status-${x}`,
      { width: 0.62, height: 0.08, depth: 0.04 },
      scene,
    );
    status.position.set(x, 1.45, 2.98);
    status.material = emissive;
    distantMeshes.push(status);
    emissiveMeshes.push(status);
  }

  const overhead = MeshBuilder.CreateBox(
    "overhead-spine",
    { width: 18, height: 0.28, depth: 0.55 },
    scene,
  );
  overhead.position.set(0, 6.75, 2.7);
  overhead.material = darkMetal;
  distantMeshes.push(overhead);

  return { distantMeshes, emissiveMeshes };
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

  const planet = MeshBuilder.CreateSphere(
    "gas-giant",
    { diameter: 12, segments: 32 },
    scene,
  );
  planet.position.set(7.8, 5.4, 15);
  planet.scaling.y = 0.92;
  planet.material = planetMaterial;

  const atmosphere = MeshBuilder.CreateSphere(
    "gas-giant-atmosphere",
    { diameter: 12.35, segments: 24 },
    scene,
  );
  atmosphere.position.copyFrom(planet.position);
  atmosphere.scaling.y = 0.92;
  atmosphere.material = atmosphereMaterial;

  const limb = MeshBuilder.CreateTorus(
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
  suit: PBRMaterial,
  accent: PBRMaterial,
): Mesh[] {
  player.material = suit;
  player.scaling.set(0.88, 1, 0.78);

  const head = MeshBuilder.CreateSphere(
    "wayfarer-helmet",
    { diameter: 0.56, segments: 16 },
    scene,
  );
  head.parent = player;
  head.position.set(0, 0.88, 0);
  head.scaling.set(1, 0.9, 0.88);
  head.material = suit;

  const visor = MeshBuilder.CreateBox(
    "wayfarer-visor",
    { width: 0.34, height: 0.14, depth: 0.08 },
    scene,
  );
  visor.parent = head;
  visor.position.set(0, 0.02, -0.27);
  visor.material = accent;

  const pack = MeshBuilder.CreateBox(
    "wayfarer-field-pack",
    { width: 0.42, height: 0.62, depth: 0.18 },
    scene,
  );
  pack.parent = player;
  pack.position.set(0, 0.16, 0.34);
  pack.material = suit;

  const emitter = MeshBuilder.CreateSphere(
    "wayfarer-field-emitter",
    { diameter: 0.18, segments: 10 },
    scene,
  );
  emitter.parent = pack;
  emitter.position.set(0, 0.08, 0.12);
  emitter.material = accent;

  return [player, head, visor, pack, emitter];
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
    ambient.intensity = 0.42;
  }

  scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(
    TEMPORARY_M0_ENVIRONMENT_URL,
    scene,
  );

  const darkMetal = pbr(
    "orbital-dark-metal",
    scene,
    new Color3(0.055, 0.075, 0.1),
    0.82,
    0.42,
  );
  const paintedMetal = pbr(
    "orbital-painted-metal",
    scene,
    new Color3(0.105, 0.16, 0.19),
    0.58,
    0.48,
  );
  const floorMaterial = pbr(
    "orbital-floor",
    scene,
    new Color3(0.075, 0.095, 0.11),
    0.74,
    0.34,
  );
  const hazardMaterial = pbr(
    "orbital-hazard",
    scene,
    new Color3(0.34, 0.17, 0.055),
    0.45,
    0.42,
  );
  const emissive = pbr(
    "orbital-emissive",
    scene,
    new Color3(0.015, 0.08, 0.095),
    0.18,
    0.28,
    new Color3(0.08, 0.72, 0.9),
  );
  const suit = pbr(
    "wayfarer-suit",
    scene,
    new Color3(0.075, 0.085, 0.11),
    0.32,
    0.5,
  );
  const suitAccent = pbr(
    "wayfarer-accent",
    scene,
    new Color3(0.02, 0.13, 0.16),
    0.2,
    0.3,
    new Color3(0.06, 0.75, 0.92),
  );

  meshes.ground.material = floorMaterial;
  meshes.leftWall.material = darkMetal;
  meshes.rightWall.material = darkMetal;
  meshes.slope.material = hazardMaterial;
  meshes.attractPillar.material = paintedMetal;
  meshes.platform.material = paintedMetal;

  meshes.ground.receiveShadows = true;
  meshes.leftWall.receiveShadows = true;
  meshes.rightWall.receiveShadows = true;
  meshes.slope.receiveShadows = true;
  meshes.attractPillar.receiveShadows = true;
  meshes.platform.receiveShadows = true;

  const resonanceMaterial = createResonanceNodeMaterial(scene);
  for (const target of meshes.targets) target.material = resonanceMaterial;

  const backdrop = addIndustrialBackdrop(scene, darkMetal, paintedMetal, emissive);
  const vista = addGasGiantVista(scene);
  const wayfarerMeshes = addWayfarerSilhouette(scene, meshes.player, suit, suitAccent);

  const keyLight = new DirectionalLight(
    "orbital-key",
    new Vector3(-0.42, -1, 0.36),
    scene,
  );
  keyLight.position.set(5.5, 9.5, -5);
  keyLight.diffuse = new Color3(0.78, 0.9, 1);
  keyLight.intensity = 2.15;
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
  const colorInput = resonanceMaterial.getInputBlockByPredicate(
    (block) => block.name.toLowerCase().includes("color"),
  );

  function applyPreset(name: GraphicsPresetName): void {
    const preset = GRAPHICS_PRESETS[name];
    presetName = name;
    engine.setHardwareScalingLevel(hardwareScalingLevel(preset.renderScale));
    shadowGenerator.mapSize = preset.shadowMapSize;
    shadowGenerator.getShadowMap()?.resize(preset.shadowMapSize);
    shadowGenerator.getShadowMap()?.setRefreshRate(
      preset.shadowEnabled ? 1 : 0,
    );
    particles.emitRate = preset.particleEmitRate;
    glow.intensity = preset.glowIntensity;
    scene.fogDensity = preset.fogDensity;
    scene.environmentIntensity = preset.environmentIntensity;
    for (const mesh of [...backdrop.distantMeshes, ...vista]) {
      mesh.setEnabled(preset.distantDetail);
    }
  }

  applyPreset(initialPreset);

  return {
    keyLight,
    shadowGenerator,
    resonanceMaterial,
    getPreset: () => presetName,
    applyPreset,
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
        mesh.scaling.y = 0.85 + 0.15 * Math.sin(elapsedSeconds * 1.4 + i * 0.7);
      }
    },
    stats: (): GraphicsRoomStats => {
      const preset = GRAPHICS_PRESETS[presetName];
      return {
        preset: presetName,
        renderScale: preset.renderScale,
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
