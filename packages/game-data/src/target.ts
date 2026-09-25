import type { Brand, EntityId, Revision, TargetId, Vec3 } from "./index";

export type AuthoredTargetGuid = Brand<string, "AuthoredTargetGuid">;
export type ResonanceAbility = "attract" | "repel";
export type MassClass = "light" | "standard" | "heavy" | "fixed";

export interface AuthoredTargetDefinition {
  readonly guid: AuthoredTargetGuid;
  readonly entityId: EntityId;
  readonly position: Vec3;
  readonly velocity?: Vec3;
  readonly active?: boolean;
  readonly attractable?: boolean;
  readonly repelable?: boolean;
  readonly anchored?: boolean;
  readonly massClass?: MassClass;
  readonly priority?: number;
  readonly designerBias?: number;
}

export interface ResonanceTargetState {
  readonly id: TargetId;
  readonly guid: AuthoredTargetGuid;
  readonly entityId: EntityId;
  position: Vec3;
  velocity: Vec3;
  active: boolean;
  attractable: boolean;
  repelable: boolean;
  anchored: boolean;
  massClass: MassClass;
  priority: number;
  designerBias: number;
  revision: Revision;
}

export const asAuthoredTargetGuid = (value: string): AuthoredTargetGuid =>
  value as AuthoredTargetGuid;
