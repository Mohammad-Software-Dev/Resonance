import { describe, expect, it } from "vitest";
import {
  REQUIRED_VISUAL_LANDMARKS,
  auditVisualLandmarks,
} from "./visual-landmarks";

describe("auditVisualLandmarks", () => {
  it("passes when every recognizable-game landmark is present", () => {
    expect(auditVisualLandmarks(REQUIRED_VISUAL_LANDMARKS)).toEqual({
      ready: true,
      missing: [],
    });
  });

  it("reports missing semantic landmarks", () => {
    const names = REQUIRED_VISUAL_LANDMARKS.filter(
      (name) => name !== "world-sign-relay" && name !== "Mara_Helmet",
    );
    expect(auditVisualLandmarks(names)).toEqual({
      ready: false,
      missing: ["Mara_Helmet", "world-sign-relay"],
    });
  });
});
