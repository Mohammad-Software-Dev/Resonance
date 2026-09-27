export type ResonanceInteractionMode = "idle" | "locked" | "attract" | "repel";

export interface ResonanceInteractionPresentation {
  readonly mode: ResonanceInteractionMode;
  readonly title: string;
  readonly detail: string;
}

export function resonanceInteractionPresentation(input: {
  readonly selectedTargetId: number;
  readonly attractTargetId: number;
  readonly repelActive: boolean;
  readonly targetLabel: string | null;
}): ResonanceInteractionPresentation {
  const label = input.targetLabel ?? "RESONANCE ANCHOR";

  if (input.repelActive) {
    return {
      mode: "repel",
      title: "REPEL BURST",
      detail: `${label} · recovery engaged`,
    };
  }
  if (input.attractTargetId !== 0) {
    return {
      mode: "attract",
      title: "ATTRACT FIELD",
      detail: `${label} · hold E to maintain pull`,
    };
  }
  if (input.selectedTargetId !== 0) {
    return {
      mode: "locked",
      title: "ANCHOR LOCK",
      detail: `${label} · E attract · Q repel`,
    };
  }
  return {
    mode: "idle",
    title: "SCAN FOR ANCHOR",
    detail: "Aim toward a Resonance node to establish a lock",
  };
}
