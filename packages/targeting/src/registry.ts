import {
  asRevision,
  asTargetId,
  type AuthoredTargetDefinition,
  type AuthoredTargetGuid,
  type ResonanceTargetState,
  type TargetId,
} from "@resonance/game-data";

function cloneTarget(target: ResonanceTargetState): ResonanceTargetState {
  return {
    ...target,
    position: { ...target.position },
    velocity: { ...target.velocity },
  };
}

export class TargetRegistry {
  private readonly byId = new Map<TargetId, ResonanceTargetState>();
  private readonly idByGuid = new Map<AuthoredTargetGuid, TargetId>();

  activate(definitions: readonly AuthoredTargetDefinition[]): void {
    this.byId.clear();
    this.idByGuid.clear();

    const ordered = [...definitions].sort((a, b) => String(a.guid).localeCompare(String(b.guid)));
    const seenEntities = new Set<number>();

    for (const [index, definition] of ordered.entries()) {
      if (this.idByGuid.has(definition.guid)) {
        throw new Error(`Duplicate authored target GUID: ${String(definition.guid)}`);
      }
      if (seenEntities.has(Number(definition.entityId))) {
        throw new Error(`Duplicate target entity: ${Number(definition.entityId)}`);
      }

      const id = asTargetId(index + 1);
      const state: ResonanceTargetState = {
        id,
        guid: definition.guid,
        entityId: definition.entityId,
        position: { ...definition.position },
        velocity: { ...(definition.velocity ?? { x: 0, y: 0, z: 0 }) },
        active: definition.active ?? true,
        attractable: definition.attractable ?? true,
        repelable: definition.repelable ?? true,
        anchored: definition.anchored ?? true,
        massClass: definition.massClass ?? "fixed",
        priority: definition.priority ?? 0,
        designerBias: definition.designerBias ?? 0,
        revision: asRevision(0),
      };

      this.byId.set(id, state);
      this.idByGuid.set(definition.guid, id);
      seenEntities.add(Number(definition.entityId));
    }
  }

  get(id: TargetId): ResonanceTargetState | undefined {
    return this.byId.get(id);
  }

  getByGuid(guid: AuthoredTargetGuid): ResonanceTargetState | undefined {
    const id = this.idByGuid.get(guid);
    return id ? this.byId.get(id) : undefined;
  }

  all(): readonly ResonanceTargetState[] {
    return [...this.byId.values()]
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map(cloneTarget);
  }

  update(
    id: TargetId,
    patch: Partial<Omit<ResonanceTargetState, "id" | "guid" | "entityId" | "revision">>,
  ): ResonanceTargetState {
    const target = this.byId.get(id);
    if (!target) throw new Error(`Unknown TargetId ${Number(id)}.`);

    if (patch.position) target.position = { ...patch.position };
    if (patch.velocity) target.velocity = { ...patch.velocity };
    if (patch.active !== undefined) target.active = patch.active;
    if (patch.attractable !== undefined) target.attractable = patch.attractable;
    if (patch.repelable !== undefined) target.repelable = patch.repelable;
    if (patch.anchored !== undefined) target.anchored = patch.anchored;
    if (patch.massClass !== undefined) target.massClass = patch.massClass;
    if (patch.priority !== undefined) target.priority = patch.priority;
    if (patch.designerBias !== undefined) target.designerBias = patch.designerBias;
    target.revision = asRevision(Number(target.revision) + 1);
    return target;
  }
}
