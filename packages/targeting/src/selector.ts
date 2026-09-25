import type {
  ResonanceAbility,
  ResonanceTargetState,
  TargetId,
  Vec3,
} from "@resonance/game-data";

export interface TargetSelectionConfig {
  readonly maxRange: number;
  readonly retainRange: number;
  readonly acquireMinDot: number;
  readonly retainMinDot: number;
  readonly depthTolerance: number;
  readonly angleWeight: number;
  readonly distanceWeight: number;
  readonly stickinessBonus: number;
  readonly switchThreshold: number;
  readonly requireVisibility: boolean;
}

export const M0_TARGET_SELECTION_CONFIG: TargetSelectionConfig = {
  maxRange: 9,
  retainRange: 10.5,
  acquireMinDot: 0.45,
  retainMinDot: 0.2,
  depthTolerance: 1.25,
  angleWeight: 1,
  distanceWeight: 0.55,
  stickinessBonus: 0.18,
  switchThreshold: 0.12,
  requireVisibility: false,
};

export type TargetRejectReason =
  | "inactive"
  | "ability"
  | "range"
  | "depth"
  | "cone"
  | "visibility"
  | "zero-aim";

export interface TargetCandidateDebug {
  readonly id: TargetId;
  readonly score: number | null;
  readonly distance: number;
  readonly alignment: number;
  readonly retained: boolean;
  readonly rejectedReason: TargetRejectReason | null;
}

export interface TargetSelectionResult {
  readonly selectedTargetId: TargetId | 0;
  readonly switched: boolean;
  readonly candidates: readonly TargetCandidateDebug[];
}

export interface TargetSelectionQuery {
  readonly playerPosition: Vec3;
  readonly aim: Vec3;
  readonly ability: ResonanceAbility;
  readonly previousTargetId: TargetId | 0;
  readonly targets: readonly ResonanceTargetState[];
  readonly isVisible?: (target: ResonanceTargetState) => boolean;
}

function magnitude(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z);
}

function normalized(v: Vec3): Vec3 {
  const m = magnitude(v);
  return m > 1e-8 ? { x: v.x / m, y: v.y / m, z: v.z / m } : { x: 0, y: 0, z: 0 };
}

function canUse(target: ResonanceTargetState, ability: ResonanceAbility): boolean {
  return ability === "attract" ? target.attractable : target.repelable;
}

export function selectResonanceTarget(
  query: TargetSelectionQuery,
  config: TargetSelectionConfig = M0_TARGET_SELECTION_CONFIG,
): TargetSelectionResult {
  const aimMagnitude = magnitude(query.aim);
  const aim = normalized(query.aim);
  const debug: TargetCandidateDebug[] = [];
  const scored = new Map<TargetId, number>();

  for (const target of [...query.targets].sort((a, b) => Number(a.id) - Number(b.id))) {
    const retained = target.id === query.previousTargetId;
    const delta = {
      x: target.position.x - query.playerPosition.x,
      y: target.position.y - query.playerPosition.y,
      z: target.position.z - query.playerPosition.z,
    };
    const distance = magnitude(delta);
    const direction = normalized(delta);
    const alignment = direction.x * aim.x + direction.y * aim.y + direction.z * aim.z;
    const range = retained ? config.retainRange : config.maxRange;
    const cone = retained ? config.retainMinDot : config.acquireMinDot;

    let rejectedReason: TargetRejectReason | null = null;
    if (!target.active) rejectedReason = "inactive";
    else if (!canUse(target, query.ability)) rejectedReason = "ability";
    else if (distance > range) rejectedReason = "range";
    else if (Math.abs(delta.z) > config.depthTolerance) rejectedReason = "depth";
    else if (aimMagnitude <= 1e-8 && !retained) rejectedReason = "zero-aim";
    else if (aimMagnitude > 1e-8 && alignment < cone) rejectedReason = "cone";
    else if (
      config.requireVisibility
      && query.isVisible
      && !query.isVisible(target)
    ) rejectedReason = "visibility";

    let score: number | null = null;
    if (!rejectedReason) {
      const distanceScore = 1 - Math.min(distance / range, 1);
      score =
        alignment * config.angleWeight
        + distanceScore * config.distanceWeight
        + target.priority
        + target.designerBias
        + (retained ? config.stickinessBonus : 0);
      scored.set(target.id, score);
    }

    debug.push({
      id: target.id,
      score,
      distance,
      alignment,
      retained,
      rejectedReason,
    });
  }

  const previousScore = query.previousTargetId === 0
    ? undefined
    : scored.get(query.previousTargetId);

  let selectedTargetId: TargetId | 0 = previousScore === undefined ? 0 : query.previousTargetId;
  let selectedScore = previousScore ?? -Infinity;

  for (const [id, score] of [...scored.entries()].sort(([a], [b]) => Number(a) - Number(b))) {
    if (id === query.previousTargetId) continue;
    const required = selectedTargetId === 0 ? selectedScore : selectedScore + config.switchThreshold;
    if (score > required) {
      selectedTargetId = id;
      selectedScore = score;
    }
  }

  return {
    selectedTargetId,
    switched: selectedTargetId !== query.previousTargetId,
    candidates: debug,
  };
}
