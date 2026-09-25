import { describe, expect, it } from "vitest";
import {
  asAuthoredTargetGuid,
  asEntityId,
  asTargetId,
  type AuthoredTargetDefinition,
} from "@resonance/game-data";
import { TargetRegistry } from "./registry";
import { M0_TARGET_SELECTION_CONFIG, selectResonanceTarget } from "./selector";

function definition(guid: string, entity: number, x: number, y = 0): AuthoredTargetDefinition {
  return {
    guid: asAuthoredTargetGuid(guid),
    entityId: asEntityId(entity),
    position: { x, y, z: 0 },
  };
}

describe("TargetRegistry", () => {
  it("assigns stable runtime TargetIds independent of authored insertion order", () => {
    const first = new TargetRegistry();
    const second = new TargetRegistry();
    const a = definition("anchor-a", 1, 3);
    const b = definition("anchor-b", 2, 4);
    const c = definition("anchor-c", 3, 5);

    first.activate([c, a, b]);
    second.activate([b, c, a]);

    expect(first.getByGuid(a.guid)?.id).toBe(second.getByGuid(a.guid)?.id);
    expect(first.getByGuid(b.guid)?.id).toBe(second.getByGuid(b.guid)?.id);
    expect(first.getByGuid(c.guid)?.id).toBe(second.getByGuid(c.guid)?.id);
  });

  it("rejects duplicate authored GUIDs", () => {
    const registry = new TargetRegistry();
    const a = definition("same-guid", 1, 3);
    const b = definition("same-guid", 2, 4);
    expect(() => registry.activate([a, b])).toThrow(/Duplicate authored target GUID/);
  });
});

describe("selectResonanceTarget", () => {
  it("chooses the strongest in-cone target", () => {
    const registry = new TargetRegistry();
    registry.activate([
      definition("center", 1, 4, 0),
      definition("upper", 2, 4, 2),
    ]);

    const result = selectResonanceTarget({
      playerPosition: { x: 0, y: 0, z: 0 },
      aim: { x: 1, y: 0, z: 0 },
      ability: "attract",
      previousTargetId: 0,
      targets: registry.all(),
    });

    expect(result.selectedTargetId).toBe(registry.getByGuid(asAuthoredTargetGuid("center"))?.id);
  });

  it("retains the previous target until a challenger clears the switch threshold", () => {
    const registry = new TargetRegistry();
    registry.activate([
      definition("left", 1, 5, 0.25),
      definition("right", 2, 5, -0.25),
    ]);
    const left = registry.getByGuid(asAuthoredTargetGuid("left"))?.id ?? asTargetId(1);

    const result = selectResonanceTarget({
      playerPosition: { x: 0, y: 0, z: 0 },
      aim: { x: 1, y: -0.02, z: 0 },
      ability: "attract",
      previousTargetId: left,
      targets: registry.all(),
    });

    expect(result.selectedTargetId).toBe(left);
    expect(result.switched).toBe(false);
  });

  it("switches when the challenger meaningfully beats the retained target", () => {
    const registry = new TargetRegistry();
    registry.activate([
      definition("old", 1, 5, 4.5),
      definition("new", 2, 4, 0),
    ]);
    const old = registry.getByGuid(asAuthoredTargetGuid("old"))?.id ?? asTargetId(1);
    const fresh = registry.getByGuid(asAuthoredTargetGuid("new"))?.id ?? asTargetId(2);

    const result = selectResonanceTarget({
      playerPosition: { x: 0, y: 0, z: 0 },
      aim: { x: 1, y: 0, z: 0 },
      ability: "attract",
      previousTargetId: old,
      targets: registry.all(),
    });

    expect(result.selectedTargetId).toBe(fresh);
    expect(result.switched).toBe(true);
  });

  it("applies active, ability, range, depth, and visibility filters", () => {
    const registry = new TargetRegistry();
    registry.activate([
      { ...definition("inactive", 1, 3), active: false },
      { ...definition("wrong-ability", 2, 3), attractable: false },
      definition("far", 3, M0_TARGET_SELECTION_CONFIG.maxRange + 2),
      { ...definition("depth", 4, 3), position: { x: 3, y: 0, z: 3 } },
      definition("hidden", 5, 3),
    ]);

    const result = selectResonanceTarget({
      playerPosition: { x: 0, y: 0, z: 0 },
      aim: { x: 1, y: 0, z: 0 },
      ability: "attract",
      previousTargetId: 0,
      targets: registry.all(),
      isVisible: () => false,
    }, { ...M0_TARGET_SELECTION_CONFIG, requireVisibility: true });

    expect(result.selectedTargetId).toBe(0);
    expect(new Set(result.candidates.map((candidate) => candidate.rejectedReason))).toEqual(
      new Set(["inactive", "ability", "range", "depth", "visibility"]),
    );
  });


  it("does not flicker between near-equal targets under small aim jitter", () => {
    const registry = new TargetRegistry();
    registry.activate([
      definition("upper", 1, 5, 0.35),
      definition("lower", 2, 5, -0.35),
    ]);

    let selected: ReturnType<typeof asTargetId> | 0 = 0;
    let switches = 0;
    for (let tick = 0; tick < 240; tick += 1) {
      const jitter = Math.sin(tick * 0.73) * 0.025;
      const result = selectResonanceTarget({
        playerPosition: { x: 0, y: 0, z: 0 },
        aim: { x: 1, y: jitter, z: 0 },
        ability: "attract",
        previousTargetId: selected,
        targets: registry.all(),
      });
      if (selected !== 0 && result.selectedTargetId !== selected) switches += 1;
      selected = result.selectedTargetId;
    }

    expect(selected).not.toBe(0);
    expect(switches).toBe(0);
  });

  it("does not acquire a new target without aim intent", () => {
    const registry = new TargetRegistry();
    registry.activate([definition("anchor", 1, 3)]);

    const result = selectResonanceTarget({
      playerPosition: { x: 0, y: 0, z: 0 },
      aim: { x: 0, y: 0, z: 0 },
      ability: "attract",
      previousTargetId: 0,
      targets: registry.all(),
    });

    expect(result.selectedTargetId).toBe(0);
    expect(result.candidates[0]?.rejectedReason).toBe("zero-aim");
  });
});
