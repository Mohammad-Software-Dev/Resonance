import { describe, expect, it } from "vitest";
import {
  AUTHORED_VISUAL_ASSETS,
  authoredVisualAssetMode,
  splitVisualAssetUrl,
  validateAuthoredVisualAssetSpec,
} from "./authored-visual-assets";

describe("authored visual asset contract", () => {
  it("publishes authored mode once the first reviewed runtime slot is assigned", () => {
    expect(authoredVisualAssetMode()).toBe("authored");
    expect(
      AUTHORED_VISUAL_ASSETS.find((spec) => spec.slot === "wayfarer-player")?.url,
    ).toBe("/assets/visual/characters/wayfarer-mara-m0.glb");
    expect(
      AUTHORED_VISUAL_ASSETS.find((spec) => spec.slot === "scrapper-damaged")?.url,
    ).toBe("/assets/visual/enemies/scrapper-damaged-m0.glb");
    expect(AUTHORED_VISUAL_ASSETS.every((spec) => spec.fallback === "procedural")).toBe(true);
  });

  it("splits local asset URLs for Babylon SceneLoader", () => {
    expect(splitVisualAssetUrl("/assets/visual/characters/wayfarer.glb")).toEqual({
      rootUrl: "/assets/visual/characters/",
      fileName: "wayfarer.glb",
    });
  });

  it("rejects runtime art outside the canonical GLB asset root", () => {
    expect(validateAuthoredVisualAssetSpec({
      slot: "wayfarer-player",
      url: "/images/wayfarer.png",
      fallback: "procedural",
    })).toEqual([
      "wayfarer-player: authored visual URL must live under /assets/visual/",
      "wayfarer-player: runtime authored visual asset must be a .glb",
    ]);
  });

  it("accepts canonical local GLB URLs", () => {
    expect(validateAuthoredVisualAssetSpec({
      slot: "scrapper-damaged",
      url: "/assets/visual/enemies/scrapper-damaged.glb",
      fallback: "procedural",
    })).toEqual([]);
  });
});
