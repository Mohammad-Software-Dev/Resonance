export type Brand<T, Name extends string> = T & { readonly __brand: Name };

export type Tick = Brand<number, "Tick">;
export type EntityId = Brand<number, "EntityId">;
export type TargetId = Brand<number, "TargetId">;
export type Revision = Brand<number, "Revision">;
export type RoomId = Brand<string, "RoomId">;

export interface Vec3 { x: number; y: number; z: number; }

export const SIM_HZ = 60;
export const SIM_DT_SECONDS = 1 / SIM_HZ;

export const asTick = (value: number): Tick => value as Tick;
export const asEntityId = (value: number): EntityId => value as EntityId;
export const asTargetId = (value: number): TargetId => value as TargetId;
export const asRevision = (value: number): Revision => value as Revision;
