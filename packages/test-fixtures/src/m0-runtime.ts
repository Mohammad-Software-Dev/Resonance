import {
  M0_ATTRACT_CONFIG,
  M0_MOVEMENT_CONFIG,
  M0_REPEL_CONFIG,
  asAuthoredTargetGuid,
  asEntityId,
  type AttractArrivalMode,
  type EntityId,
  type Vec3,
} from "@resonance/game-data";
import {
  applyMovementCollision,
  cancelAttract,
  createAttractRuntimeState,
  createRepelRuntimeState,
  recordAttractCollision,
  recoverMovementState,
  stepAttract,
  stepMovement,
  stepRepel,
  stepRepelRecovery,
  type AttractRuntimeState,
  type RepelRuntimeState,
} from "@resonance/movement";
import {
  RapierCharacterWorld,
  type CharacterCollisionResult,
} from "@resonance/physics";
import {
  FixedStepClock,
  Simulation,
  dequantizeAxis,
  deserializeSimInput,
  type ReplayArtifact,
  type ReplayCheckpoint,
  type ReplayTelemetryValue,
  type SimInput,
} from "@resonance/simulation";
import { TargetRegistry } from "@resonance/targeting";

export const M0_REPLAY_FIXTURE_ID = "m0-representative-course";
export const M0_REPLAY_FIXTURE_VERSION = 1;
export const M0_REPLAY_CHECKPOINT_INTERVAL = 30;
export const M0_REPLAY_DURATION_TICKS = 360;
export const M0_PLAYER_ID = asEntityId(1);
export const M0_START: Vec3 = { x: -5, y: 2.2, z: 0 };

const FLOOR_ID = asEntityId(100);
const LEFT_WALL_ID = asEntityId(101);
const RIGHT_WALL_ID = asEntityId(102);
const SLOPE_ID = asEntityId(103);
const PLATFORM_ID = asEntityId(104);
const ATTRACT_PILLAR_ID = asEntityId(105);

export interface M0ReplayStepSnapshot {
  readonly tick: number;
  readonly gameplayHash: string;
  readonly simulationHash: string;
  readonly telemetry: Readonly<Record<string, ReplayTelemetryValue>>;
  readonly collision: CharacterCollisionResult;
}

export interface ReplayDivergence {
  readonly tick: number;
  readonly expectedHash: string;
  readonly actualHash: string;
  readonly input: SimInput;
  readonly expectedTelemetry?: Readonly<Record<string, ReplayTelemetryValue>>;
  readonly actualTelemetry: Readonly<Record<string, ReplayTelemetryValue>>;
}

export interface ReplayVerificationResult {
  readonly ok: boolean;
  readonly finalHash: string;
  readonly checkpoints: readonly ReplayCheckpoint[];
  readonly divergence: ReplayDivergence | null;
}

function platformPositionAtTick(tick: number): Vec3 {
  const periodTicks = 240;
  const phase = (tick % periodTicks) / periodTicks;
  const triangle = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
  return { x: -2 + triangle * 3, y: 1.15, z: 0 };
}

function mixString(hash: number, value: string): number {
  let next = hash >>> 0;
  for (let index = 0; index < value.length; index += 1) {
    next ^= value.charCodeAt(index);
    next = Math.imul(next, 0x01000193) >>> 0;
  }
  return next;
}

function gameplayHash(
  simulationHash: string,
  attract: AttractRuntimeState,
  repel: RepelRuntimeState,
): string {
  let hash = 0x811c9dc5;
  for (const value of [
    simulationHash,
    String(Number(attract.targetId)),
    String(Number(attract.targetRevision)),
    String(attract.ticksActive),
    String(attract.blockedTicks),
    attract.arrived ? "1" : "0",
    attract.requiresRelease ? "1" : "0",
    String(Number(repel.lastTargetId)),
    String(repel.uses),
  ]) {
    hash = mixString(hash, value);
    hash = mixString(hash, "|");
  }
  return hash.toString(16).padStart(8, "0");
}

function telemetry(
  simulation: Simulation,
  attract: AttractRuntimeState,
  repel: RepelRuntimeState,
  collision: CharacterCollisionResult,
): Readonly<Record<string, ReplayTelemetryValue>> {
  const state = simulation.getWayfarer(M0_PLAYER_ID);
  if (!state) throw new Error("M0 replay Wayfarer is missing.");
  return {
    simulationHash: simulation.stateHash(),
    positionX: state.position.x,
    positionY: state.position.y,
    velocityX: state.velocity.x,
    velocityY: state.velocity.y,
    movementMode: state.movementMode,
    grounded: state.grounded,
    groundEntityId: Number(state.groundEntityId),
    attractTargetId: Number(attract.targetId),
    attractTicks: attract.ticksActive,
    attractBlockedTicks: attract.blockedTicks,
    attractRequiresRelease: attract.requiresRelease,
    repelLastTargetId: Number(repel.lastTargetId),
    repelUses: repel.uses,
    collisionCount: collision.collisionCount,
    maximumCorrection: collision.maximumCorrection,
  };
}

function arrivalModeFromArtifact(artifact: ReplayArtifact): AttractArrivalMode {
  const value = artifact.settings.attractArrivalMode;
  return value === "passThrough" || value === "softCapture" || value === "radiusBlend"
    ? value
    : M0_ATTRACT_CONFIG.arrivalMode;
}

export class M0ReplayRuntime {
  public readonly simulation = new Simulation();
  public readonly targets = new TargetRegistry();
  public readonly attract = createAttractRuntimeState();
  public readonly repel = createRepelRuntimeState();

  private constructor(
    private readonly physics: RapierCharacterWorld,
    private readonly arrivalMode: AttractArrivalMode,
  ) {}

  public static async create(artifact: ReplayArtifact): Promise<M0ReplayRuntime> {
    if (
      artifact.fixture.id !== M0_REPLAY_FIXTURE_ID
      || artifact.fixture.version !== M0_REPLAY_FIXTURE_VERSION
    ) {
      throw new Error(
        `Unsupported replay fixture ${artifact.fixture.id}@${artifact.fixture.version}.`,
      );
    }

    const physics = await RapierCharacterWorld.create();
    physics.addStaticBox(FLOOR_ID, { x: 0, y: -0.25, z: 0 }, { x: 8, y: 0.25, z: 1 });
    physics.addStaticBox(LEFT_WALL_ID, { x: -8, y: 2, z: 0 }, { x: 0.15, y: 2, z: 1 });
    physics.addStaticBox(RIGHT_WALL_ID, { x: 8, y: 2, z: 0 }, { x: 0.15, y: 2, z: 1 });
    physics.addStaticBox(
      SLOPE_ID,
      { x: 4.9, y: 0.45, z: 0 },
      { x: 1.8, y: 0.15, z: 1 },
      Math.PI / 12,
    );
    physics.addStaticBox(
      ATTRACT_PILLAR_ID,
      { x: 0.25, y: 1.2, z: 0 },
      { x: 0.35, y: 1.2, z: 1 },
    );
    physics.addMovingBox(
      PLATFORM_ID,
      { x: -2, y: 1.15, z: 0 },
      { x: 1.25, y: 0.175, z: 1 },
    );

    const runtime = new M0ReplayRuntime(physics, arrivalModeFromArtifact(artifact));
    runtime.targets.activate([
      {
        guid: asAuthoredTargetGuid("m0-anchor-a"),
        entityId: asEntityId(301),
        position: { x: 3.5, y: 4.4, z: 0 },
        priority: 0.02,
      },
      {
        guid: asAuthoredTargetGuid("m0-anchor-b"),
        entityId: asEntityId(302),
        position: { x: 1.5, y: 1.8, z: 0 },
      },
      {
        guid: asAuthoredTargetGuid("m0-anchor-moving"),
        entityId: asEntityId(303),
        position: { x: -2, y: 2.45, z: 0 },
        priority: 0.04,
      },
      {
        guid: asAuthoredTargetGuid("m0-anchor-low-repel"),
        entityId: asEntityId(304),
        position: { x: -4.2, y: 0.38, z: 0 },
        priority: 0.03,
      },
      {
        guid: asAuthoredTargetGuid("m0-anchor-wall-repel"),
        entityId: asEntityId(305),
        position: { x: 7.25, y: 2.1, z: 0 },
        priority: 0.03,
      },
    ]);

    runtime.simulation.restoreSnapshot(artifact.initialSnapshot);
    const state = runtime.simulation.getWayfarer(M0_PLAYER_ID);
    if (!state) throw new Error("Replay initial snapshot does not contain player entity 1.");
    physics.createCharacter(state.position);
    return runtime;
  }

  public step(input: SimInput): M0ReplayStepSnapshot {
    const tick = Number(input.tick);
    const platformPosition = platformPositionAtTick(tick);
    this.physics.setMovingBoxPosition(PLATFORM_ID, platformPosition);

    const movingTarget = this.targets.getByGuid(asAuthoredTargetGuid("m0-anchor-moving"));
    if (movingTarget) {
      this.targets.update(movingTarget.id, {
        position: {
          x: platformPosition.x,
          y: platformPosition.y + 1.3,
          z: 0,
        },
      });
    }

    this.simulation.step(new Map<EntityId, SimInput>([[M0_PLAYER_ID, input]]));
    const state = this.simulation.getWayfarer(M0_PLAYER_ID);
    if (!state) throw new Error("M0 replay Wayfarer disappeared.");

    if (
      !input.attractPressed
      && this.attract.targetId === 0
      && this.attract.requiresRelease
    ) {
      cancelAttract(state, this.attract, "released");
    }

    const previousGroundEntityId = state.groundEntityId;
    const attractConfig = { ...M0_ATTRACT_CONFIG, arrivalMode: this.arrivalMode };
    let desiredTranslation: Vec3;

    if (input.repelPressed) {
      const target = input.targetId === 0 ? undefined : this.targets.get(input.targetId);
      const repel = stepRepel(state, this.repel, target, M0_REPEL_CONFIG);
      if (repel.applied) {
        if (this.attract.targetId !== 0) {
          cancelAttract(state, this.attract, "repel");
          this.simulation.cancelAttract(M0_PLAYER_ID);
        }
        this.simulation.recordRepel(M0_PLAYER_ID);
        desiredTranslation = repel.desiredTranslation;
      } else if (state.repelRecoveryTicksRemaining > 0) {
        desiredTranslation = stepRepelRecovery(
          state,
          this.repel,
          dequantizeAxis(input.moveX),
          M0_MOVEMENT_CONFIG,
          M0_REPEL_CONFIG,
        ).desiredTranslation;
      } else {
        desiredTranslation = this.stepNormalMovement(state, input);
      }
    } else if (state.repelRecoveryTicksRemaining > 0) {
      desiredTranslation = stepRepelRecovery(
        state,
        this.repel,
        dequantizeAxis(input.moveX),
        M0_MOVEMENT_CONFIG,
        M0_REPEL_CONFIG,
      ).desiredTranslation;
    } else if (
      input.attractPressed
      && input.targetId !== 0
      && !this.attract.requiresRelease
    ) {
      const attract = stepAttract(
        state,
        this.attract,
        this.targets.get(input.targetId),
        dequantizeAxis(input.moveX),
        attractConfig,
      );
      desiredTranslation = attract.desiredTranslation;
      if (this.attract.targetId === 0) {
        this.simulation.cancelAttract(M0_PLAYER_ID);
      }
    } else {
      if (
        !input.attractPressed
        && (this.attract.targetId !== 0 || this.attract.requiresRelease)
      ) {
        cancelAttract(state, this.attract, "released");
      }
      desiredTranslation = this.stepNormalMovement(state, input);
    }

    const collision = this.physics.moveCharacter(
      desiredTranslation,
      previousGroundEntityId,
      state.up,
    );
    applyMovementCollision(state, collision);

    if (this.attract.targetId !== 0) {
      const event = recordAttractCollision(
        state,
        this.attract,
        collision.blockedX
          || collision.hitCeiling
          || (collision.grounded && desiredTranslation.y < -0.01),
        attractConfig,
      );
      if (event) this.simulation.cancelAttract(M0_PLAYER_ID);
    }

    if (state.position.y < -6 || Math.abs(state.position.x) > 20) {
      recoverMovementState(state, M0_START);
      this.physics.setCharacterPosition(M0_START);
    }

    const simulationHash = this.simulation.stateHash();
    const hash = gameplayHash(simulationHash, this.attract, this.repel);
    return {
      tick,
      gameplayHash: hash,
      simulationHash,
      telemetry: telemetry(this.simulation, this.attract, this.repel, collision),
      collision,
    };
  }

  public free(): void {
    this.physics.free();
  }

  private stepNormalMovement(
    state: NonNullable<ReturnType<Simulation["getWayfarer"]>>,
    input: SimInput,
  ): Vec3 {
    return stepMovement(
      state,
      {
        moveX: dequantizeAxis(input.moveX),
        jumpPressed: input.jumpPressed,
        jumpHeld: input.jumpHeld,
        evadePressed: input.evadePressed,
      },
      {
        grounded: state.grounded,
        groundEntityId: state.groundEntityId,
      },
      M0_MOVEMENT_CONFIG,
    ).desiredTranslation;
  }
}

export async function verifyM0Replay(
  artifact: ReplayArtifact,
): Promise<ReplayVerificationResult> {
  const runtime = await M0ReplayRuntime.create(artifact);
  const expected = new Map(artifact.checkpoints.map((checkpoint) => [checkpoint.tick, checkpoint]));
  const actual: ReplayCheckpoint[] = [];
  let divergence: ReplayDivergence | null = null;
  let finalHash = "";

  try {
    for (const serialized of artifact.inputs) {
      const input = deserializeSimInput(serialized);
      const step = runtime.step(input);
      finalHash = step.gameplayHash;
      const checkpoint = expected.get(step.tick);
      if (checkpoint) {
        actual.push({
          tick: step.tick,
          hash: step.gameplayHash,
          telemetry: step.telemetry,
        });
        if (!divergence && checkpoint.hash !== step.gameplayHash) {
          divergence = {
            tick: step.tick,
            expectedHash: checkpoint.hash,
            actualHash: step.gameplayHash,
            input,
            expectedTelemetry: checkpoint.telemetry,
            actualTelemetry: step.telemetry,
          };
          break;
        }
      }
    }
  } finally {
    runtime.free();
  }

  if (!divergence && artifact.finalHash && artifact.finalHash !== finalHash) {
    const last = artifact.inputs.at(-1);
    if (last) {
      divergence = {
        tick: last.tick,
        expectedHash: artifact.finalHash,
        actualHash: finalHash,
        input: deserializeSimInput(last),
        actualTelemetry: {},
      };
    }
  }

  return {
    ok: divergence === null,
    finalHash,
    checkpoints: actual,
    divergence,
  };
}


export interface RenderCadenceReplayResult {
  readonly renderFps: number;
  readonly ok: boolean;
  readonly finalHash: string;
  readonly divergenceTick: number | null;
}

export async function verifyM0ReplayAtRenderFps(
  artifact: ReplayArtifact,
  renderFps: number,
): Promise<RenderCadenceReplayResult> {
  const runtime = await M0ReplayRuntime.create(artifact);
  const clock = new FixedStepClock();
  const expected = new Map(artifact.checkpoints.map((checkpoint) => [checkpoint.tick, checkpoint.hash]));
  let finalHash = "";
  let divergenceTick: number | null = null;

  try {
    let frames = 0;
    const maxFrames = Math.ceil((artifact.inputs.length / 60) * renderFps) + renderFps;
    while (Number(clock.tick) < artifact.inputs.length && frames < maxFrames) {
      frames += 1;
      for (const fixed of clock.advance(1 / renderFps)) {
        const serialized = artifact.inputs[Number(fixed.tick) - 1];
        if (!serialized) break;
        const step = runtime.step(deserializeSimInput(serialized));
        finalHash = step.gameplayHash;
        const checkpointHash = expected.get(step.tick);
        if (checkpointHash && checkpointHash !== step.gameplayHash) {
          divergenceTick = step.tick;
          break;
        }
      }
      if (divergenceTick !== null) break;
    }
  } finally {
    runtime.free();
  }

  return {
    renderFps,
    ok: divergenceTick === null && finalHash === artifact.finalHash,
    finalHash,
    divergenceTick,
  };
}

export async function verifyM0ReplayRenderMatrix(
  artifact: ReplayArtifact,
  renderFpsValues: readonly number[] = [30, 45, 60, 90, 120, 144],
): Promise<readonly RenderCadenceReplayResult[]> {
  const results: RenderCadenceReplayResult[] = [];
  for (const renderFps of renderFpsValues) {
    results.push(await verifyM0ReplayAtRenderFps(artifact, renderFps));
  }
  return results;
}
