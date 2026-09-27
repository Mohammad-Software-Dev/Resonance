export const REQUIRED_VISUAL_LANDMARKS = [
  "wayfarer-helmet",
  "wayfarer-visor",
  "Mara_Helmet",
  "Mara_GauntletEmitter",
  "gameplay-deck-edge",
  "moving-platform-identity-panel",
  "hazard-identity-panel",
  "scar-relay-core",
  "relay-beacon-column",
  "world-sign-transit",
  "world-sign-relay",
  "story-prop-cargo-stack",
  "repel-impact-shockwave",
  "scrapper-damaged-torso",
  "scrapper-hostile-eye",
  "scrapper-loose-forearm-plate",
  "scrapper-threat-ring",
  "wreck-spark-source",
  "wreck-hanging-cable",
  "wreck-air-leak-vent",
  "wreck-fault-light",
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
