import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";

export type AuthoredVisualSlot =
  | "wayfarer-player"
  | "scrapper-damaged"
  | "wayfarer-scar-setdress";

export interface AuthoredVisualAssetSpec {
  readonly slot: AuthoredVisualSlot;
  readonly url: string | null;
  readonly fallback: "procedural";
}

export interface AuthoredVisualLoadResult {
  readonly slot: AuthoredVisualSlot;
  readonly status: "authored" | "fallback";
  readonly meshes: readonly AbstractMesh[];
  readonly reason?: string;
}

export const AUTHORED_VISUAL_ASSETS: readonly AuthoredVisualAssetSpec[] = [
  {
    slot: "wayfarer-player",
    url: "/assets/visual/characters/wayfarer-mara-m0-v3.glb",
    fallback: "procedural",
  },
  {
    slot: "scrapper-damaged",
    url: "/assets/visual/enemies/scrapper-damaged-m0-v3.glb",
    fallback: "procedural",
  },
  {
    slot: "wayfarer-scar-setdress",
    url: "/assets/visual/environment/wayfarer-scar-setdress-m0-v3.glb",
    fallback: "procedural",
  },
];

export function authoredVisualAssetMode(
  specs: readonly AuthoredVisualAssetSpec[] = AUTHORED_VISUAL_ASSETS,
): "authored" | "fallback" {
  return specs.some((spec) => spec.url !== null) ? "authored" : "fallback";
}

export function splitVisualAssetUrl(url: string): {
  readonly rootUrl: string;
  readonly fileName: string;
} {
  const clean = url.trim();
  const lastSlash = clean.lastIndexOf("/");
  if (lastSlash < 0) return { rootUrl: "", fileName: clean };
  return {
    rootUrl: clean.slice(0, lastSlash + 1),
    fileName: clean.slice(lastSlash + 1),
  };
}

export function validateAuthoredVisualAssetSpec(
  spec: AuthoredVisualAssetSpec,
): readonly string[] {
  if (spec.url === null) return [];
  const errors: string[] = [];
  if (!spec.url.startsWith("/assets/visual/")) {
    errors.push(`${spec.slot}: authored visual URL must live under /assets/visual/`);
  }
  if (!spec.url.toLowerCase().endsWith(".glb")) {
    errors.push(`${spec.slot}: runtime authored visual asset must be a .glb`);
  }
  return errors;
}

export async function loadAuthoredVisualAsset(
  scene: Scene,
  spec: AuthoredVisualAssetSpec,
): Promise<AuthoredVisualLoadResult> {
  if (spec.url === null) {
    return {
      slot: spec.slot,
      status: "fallback",
      meshes: [],
      reason: "No authored GLB assigned; procedural presentation remains active.",
    };
  }

  const validationErrors = validateAuthoredVisualAssetSpec(spec);
  if (validationErrors.length > 0) {
    return {
      slot: spec.slot,
      status: "fallback",
      meshes: [],
      reason: validationErrors.join("; "),
    };
  }

  try {
    await import("@babylonjs/loaders/glTF");
    const { rootUrl, fileName } = splitVisualAssetUrl(spec.url);
    const result = await SceneLoader.ImportMeshAsync(null, rootUrl, fileName, scene);
    return {
      slot: spec.slot,
      status: "authored",
      meshes: result.meshes,
    };
  } catch (error) {
    return {
      slot: spec.slot,
      status: "fallback",
      meshes: [],
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}
