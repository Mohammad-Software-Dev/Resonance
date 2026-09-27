import { describe, expect, it } from "vitest";
import { resonanceInteractionPresentation } from "./interaction-presentation";

describe("resonanceInteractionPresentation", () => {
  it("prioritizes a repel burst over the current lock", () => {
    expect(resonanceInteractionPresentation({
      selectedTargetId: 4,
      attractTargetId: 0,
      repelActive: true,
      targetLabel: "RELAY NODE",
    }).mode).toBe("repel");
  });

  it("shows an active attract field before a passive selection", () => {
    expect(resonanceInteractionPresentation({
      selectedTargetId: 4,
      attractTargetId: 3,
      repelActive: false,
      targetLabel: "MOVING ANCHOR",
    })).toEqual({
      mode: "attract",
      title: "ATTRACT FIELD",
      detail: "MOVING ANCHOR · hold E to maintain pull",
    });
  });

  it("distinguishes passive lock from no target", () => {
    expect(resonanceInteractionPresentation({
      selectedTargetId: 2,
      attractTargetId: 0,
      repelActive: false,
      targetLabel: "BREACH ANCHOR",
    }).mode).toBe("locked");
    expect(resonanceInteractionPresentation({
      selectedTargetId: 0,
      attractTargetId: 0,
      repelActive: false,
      targetLabel: null,
    }).mode).toBe("idle");
  });
});
