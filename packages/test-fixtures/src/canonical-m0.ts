import {
  asEntityId,
  asRevision,
  asTick,
  type TargetId,
} from "@resonance/game-data";
import {
  ReplayRecorder,
  quantizeAxis,
  type ReplayArtifact,
  type SimInput,
  type SimSnapshot,
} from "@resonance/simulation";
import {
  M0_PLAYER_ID,
  M0_REPLAY_CHECKPOINT_INTERVAL,
  M0_REPLAY_DURATION_TICKS,
  M0_REPLAY_FIXTURE_ID,
  M0_REPLAY_FIXTURE_VERSION,
  M0_START,
  M0ReplayRuntime,
} from "./m0-runtime";

export function createM0InitialSnapshot(): SimSnapshot {
  return {
    tick: asTick(0),
    wayfarers: [{
      entityId: M0_PLAYER_ID,
      position: { ...M0_START },
      velocity: { x: 0, y: 0, z: 0 },
      up: { x: 0, y: 1, z: 0 },
      facing: 1,
      movementMode: "airborne",
      grounded: false,
      groundEntityId: 0,
      coyoteTicksRemaining: 0,
      jumpBufferTicksRemaining: 0,
      evadeTicksRemaining: 0,
      repelRecoveryTicksRemaining: 0,
      attractTargetId: 0,
      stateRevision: asRevision(0),
    }],
  };
}

function target(value: number): TargetId | 0 {
  return value === 0 ? 0 : value as TargetId;
}

export function canonicalM0Input(tick: number): SimInput {
  const jumpHeld = (tick >= 38 && tick < 51) || (tick >= 250 && tick < 260);
  const attractPressed = tick >= 105 && tick < 176;
  const repelPressed = tick === 176 || tick === 276;
  const targetId = attractPressed || tick === 176
    ? target(4)
    : tick === 276
      ? target(3)
      : 0;

  let moveX = 0;
  if (tick < 95) moveX = 0.85;
  else if (tick < 176) moveX = tick < 140 ? 0.3 : -0.2;
  else if (tick < 235) moveX = -0.55;
  else if (tick < 300) moveX = 0.7;
  else moveX = -0.35;

  return {
    tick: asTick(tick),
    moveX: quantizeAxis(moveX),
    moveY: quantizeAxis(0),
    jumpPressed: tick === 38 || tick === 250,
    jumpHeld,
    evadePressed: tick === 72 || tick === 318,
    attractPressed,
    repelPressed,
    targetId,
  };
}

export async function generateCanonicalM0Replay(
  buildId = "m0.10-canonical",
): Promise<ReplayArtifact> {
  const initialSnapshot = createM0InitialSnapshot();
  const recorder = new ReplayRecorder({
    buildId,
    fixture: {
      id: M0_REPLAY_FIXTURE_ID,
      version: M0_REPLAY_FIXTURE_VERSION,
    },
    initialSeed: 0,
    settings: { attractArrivalMode: "radiusBlend" },
    checkpointIntervalTicks: M0_REPLAY_CHECKPOINT_INTERVAL,
    initialSnapshot,
  });

  const draft: ReplayArtifact = {
    schema: "resonance.replay.v1",
    buildId,
    fixture: {
      id: M0_REPLAY_FIXTURE_ID,
      version: M0_REPLAY_FIXTURE_VERSION,
    },
    initialSeed: 0,
    settings: { attractArrivalMode: "radiusBlend" },
    checkpointIntervalTicks: M0_REPLAY_CHECKPOINT_INTERVAL,
    initialSnapshot,
    inputs: Array.from(
      { length: M0_REPLAY_DURATION_TICKS },
      (_, index) => {
        const input = canonicalM0Input(index + 1);
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
      },
    ),
    checkpoints: [],
    finalHash: "",
  };

  const runtime = await M0ReplayRuntime.create(draft);
  try {
    for (let tick = 1; tick <= M0_REPLAY_DURATION_TICKS; tick += 1) {
      const input = canonicalM0Input(tick);
      recorder.recordInput(input);
      const step = runtime.step(input);
      if (recorder.shouldCheckpoint(input.tick)) {
        recorder.recordCheckpoint(input.tick, step.gameplayHash, step.telemetry);
      }
      recorder.setFinalHash(step.gameplayHash);
    }
  } finally {
    runtime.free();
  }

  return recorder.artifact();
}
