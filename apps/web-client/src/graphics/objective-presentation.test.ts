import { describe, expect, it } from "vitest";
import { objectiveStagePresentation } from "./objective-presentation";

describe("objectiveStagePresentation", () => {
  it("gives each course stage a readable event callout", () => {
    expect(objectiveStagePresentation("resonance")).toMatchObject({
      title: "ANCHOR SIGNAL FOUND",
      tone: "resonance",
    });
    expect(objectiveStagePresentation("relay")).toMatchObject({
      title: "REPEL CONFIRMED",
      tone: "repel",
    });
    expect(objectiveStagePresentation("complete")).toMatchObject({
      title: "SIGNAL RESTORED",
      tone: "complete",
    });
  });
});
