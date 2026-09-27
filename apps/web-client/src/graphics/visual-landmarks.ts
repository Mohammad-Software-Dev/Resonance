export const REQUIRED_VISUAL_LANDMARKS = [
  "wayfarer-helmet",
  "wayfarer-visor",
  "gameplay-deck-edge",
  "moving-platform-identity-panel",
  "hazard-identity-panel",
  "scar-relay-core",
  "relay-beacon-column",
  "world-sign-transit",
  "world-sign-relay",
  "story-prop-cargo-stack",
] as const;

export interface VisualLandmarkAudit {
  readonly ready: boolean;
  readonly missing: readonly string[];
}

export function auditVisualLandmarks(names: Iterable<string>): VisualLandmarkAudit {
  const available = new Set(names);
  const missing = REQUIRED_VISUAL_LANDMARKS.filter((name) => !available.has(name));
  return { ready: missing.length === 0, missing };
}
