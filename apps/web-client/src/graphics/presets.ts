export type GraphicsPresetName = "low" | "medium" | "high" | "ultra";

export interface GraphicsPreset {
  readonly name: GraphicsPresetName;
  readonly renderScale: number;
  readonly shadowMapSize: number;
  readonly shadowEnabled: boolean;
  readonly particleEmitRate: number;
  readonly glowIntensity: number;
  readonly fogDensity: number;
  readonly environmentIntensity: number;
  readonly distantDetail: boolean;
}

export const GRAPHICS_PRESETS: Readonly<Record<GraphicsPresetName, GraphicsPreset>> = {
  low: {
    name: "low",
    renderScale: 0.72,
    shadowMapSize: 512,
    shadowEnabled: true,
    particleEmitRate: 28,
    glowIntensity: 0.22,
    fogDensity: 0.016,
    environmentIntensity: 0.58,
    distantDetail: false,
  },
  medium: {
    name: "medium",
    renderScale: 0.85,
    shadowMapSize: 1024,
    shadowEnabled: true,
    particleEmitRate: 55,
    glowIntensity: 0.32,
    fogDensity: 0.018,
    environmentIntensity: 0.72,
    distantDetail: true,
  },
  high: {
    name: "high",
    renderScale: 1,
    shadowMapSize: 1536,
    shadowEnabled: true,
    particleEmitRate: 85,
    glowIntensity: 0.42,
    fogDensity: 0.02,
    environmentIntensity: 0.82,
    distantDetail: true,
  },
  ultra: {
    name: "ultra",
    renderScale: 1,
    shadowMapSize: 2048,
    shadowEnabled: true,
    particleEmitRate: 120,
    glowIntensity: 0.5,
    fogDensity: 0.021,
    environmentIntensity: 0.9,
    distantDetail: true,
  },
};

export const GRAPHICS_PRESET_ORDER: readonly GraphicsPresetName[] = [
  "low",
  "medium",
  "high",
  "ultra",
];

export function initialGraphicsPreset(
  backend: "webgpu" | "webgl2",
): GraphicsPresetName {
  return backend === "webgpu" ? "medium" : "low";
}

export function nextGraphicsPreset(current: GraphicsPresetName): GraphicsPresetName {
  const index = GRAPHICS_PRESET_ORDER.indexOf(current);
  return GRAPHICS_PRESET_ORDER[(index + 1) % GRAPHICS_PRESET_ORDER.length] ?? "medium";
}

export function hardwareScalingLevel(renderScale: number): number {
  const safeScale = Math.max(0.5, Math.min(1, renderScale));
  return 1 / safeScale;
}
