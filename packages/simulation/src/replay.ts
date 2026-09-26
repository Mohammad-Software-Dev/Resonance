import {
  asTargetId,
  asTick,
  type TargetId,
  type Tick,
} from "@resonance/game-data";
import type { QuantizedAxis, SimInput } from "./input";
import type { SimSnapshot } from "./state";

export const REPLAY_SCHEMA = "resonance.replay.v1" as const;

export type ReplayTelemetryValue = string | number | boolean | null;

export interface SerializedSimInput {
  readonly tick: number;
  readonly moveX: number;
  readonly moveY: number;
  readonly jumpPressed: boolean;
  readonly jumpHeld: boolean;
  readonly evadePressed: boolean;
  readonly attractPressed: boolean;
  readonly repelPressed: boolean;
  readonly targetId: number;
}

export interface ReplayCheckpoint {
  readonly tick: number;
  readonly hash: string;
  readonly telemetry?: Readonly<Record<string, ReplayTelemetryValue>>;
}

export interface ReplayFixtureDescriptor {
  readonly id: string;
  readonly version: number;
}

export interface ReplayArtifact {
  readonly schema: typeof REPLAY_SCHEMA;
  readonly buildId: string;
  readonly fixture: ReplayFixtureDescriptor;
  readonly initialSeed: number;
  readonly checkpointIntervalTicks: number;
  readonly initialSnapshot: SimSnapshot;
  readonly inputs: readonly SerializedSimInput[];
  readonly checkpoints: readonly ReplayCheckpoint[];
  readonly finalHash: string;
}

export function serializeSimInput(input: SimInput): SerializedSimInput {
  return {
    tick: Number(input.tick),
    moveX: Number(input.moveX),
    moveY: Number(input.moveY),
    jumpPressed: input.jumpPressed,
    jumpHeld: input.jumpHeld,
    evadePressed: input.evadePressed,
    attractPressed: input.attractPressed,
    repelPressed: input.repelPressed,
    targetId: Number(input.targetId),
  };
}

export function deserializeSimInput(input: SerializedSimInput): SimInput {
  return {
    tick: asTick(input.tick),
    moveX: input.moveX as QuantizedAxis,
    moveY: input.moveY as QuantizedAxis,
    jumpPressed: input.jumpPressed,
    jumpHeld: input.jumpHeld,
    evadePressed: input.evadePressed,
    attractPressed: input.attractPressed,
    repelPressed: input.repelPressed,
    targetId: input.targetId === 0 ? 0 : asTargetId(input.targetId),
  };
}

export interface ReplayRecorderOptions {
  readonly buildId: string;
  readonly fixture: ReplayFixtureDescriptor;
  readonly initialSeed: number;
  readonly checkpointIntervalTicks: number;
  readonly initialSnapshot: SimSnapshot;
}

export class ReplayRecorder {
  private readonly inputs: SerializedSimInput[] = [];
  private readonly checkpoints: ReplayCheckpoint[] = [];
  private finalHash = "";

  public constructor(private readonly options: ReplayRecorderOptions) {
    if (options.checkpointIntervalTicks <= 0) {
      throw new Error("Replay checkpoint interval must be positive.");
    }
  }

  public recordInput(input: SimInput): void {
    const expectedTick = this.inputs.length + Number(this.options.initialSnapshot.tick) + 1;
    if (Number(input.tick) !== expectedTick) {
      throw new Error(
        `Replay input tick ${Number(input.tick)} does not match expected tick ${expectedTick}.`,
      );
    }
    this.inputs.push(serializeSimInput(input));
  }

  public shouldCheckpoint(tick: Tick): boolean {
    const value = Number(tick);
    return value % this.options.checkpointIntervalTicks === 0;
  }

  public recordCheckpoint(
    tick: Tick,
    hash: string,
    telemetry?: Readonly<Record<string, ReplayTelemetryValue>>,
  ): void {
    const value = Number(tick);
    const previous = this.checkpoints.at(-1);
    if (previous && value <= previous.tick) {
      throw new Error("Replay checkpoints must be recorded in increasing tick order.");
    }
    this.checkpoints.push({
      tick: value,
      hash,
      ...(telemetry ? { telemetry: { ...telemetry } } : {}),
    });
    this.finalHash = hash;
  }

  public setFinalHash(hash: string): void {
    this.finalHash = hash;
  }

  public artifact(): ReplayArtifact {
    return {
      schema: REPLAY_SCHEMA,
      buildId: this.options.buildId,
      fixture: { ...this.options.fixture },
      initialSeed: this.options.initialSeed,
      checkpointIntervalTicks: this.options.checkpointIntervalTicks,
      initialSnapshot: this.options.initialSnapshot,
      inputs: this.inputs.map((input) => ({ ...input })),
      checkpoints: this.checkpoints.map((checkpoint) => ({
        ...checkpoint,
        ...(checkpoint.telemetry
          ? { telemetry: { ...checkpoint.telemetry } }
          : {}),
      })),
      finalHash: this.finalHash,
    };
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseReplayArtifact(value: unknown): ReplayArtifact {
  if (!isRecord(value) || value.schema !== REPLAY_SCHEMA) {
    throw new Error(`Unsupported replay schema; expected ${REPLAY_SCHEMA}.`);
  }
  if (typeof value.buildId !== "string" || value.buildId.length === 0) {
    throw new Error("Replay buildId is missing.");
  }
  if (!isRecord(value.fixture)
    || typeof value.fixture.id !== "string"
    || typeof value.fixture.version !== "number") {
    throw new Error("Replay fixture descriptor is invalid.");
  }
  if (!Array.isArray(value.inputs) || !Array.isArray(value.checkpoints)) {
    throw new Error("Replay inputs/checkpoints are invalid.");
  }
  if (typeof value.finalHash !== "string") {
    throw new Error("Replay finalHash is invalid.");
  }
  return value as unknown as ReplayArtifact;
}

export function targetIdFromReplay(value: number): TargetId | 0 {
  return value === 0 ? 0 : asTargetId(value);
}
