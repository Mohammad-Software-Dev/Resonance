export const REQUIRED_VISUAL_LANDMARKS = [
  "Mara_Helmet",
  "Mara_GauntletEmitter",
  "orbital-parallax-ring",
  "gas-giant",
  "gameplay-deck-edge-left",
  "gameplay-deck-edge-center",
  "gameplay-deck-edge-right",
  "scar-gap-field-left",
  "scar-gap-field-right",
  "moving-platform-identity-panel",
  "hazard-identity-panel",
  "scar-relay-core",
  "relay-beacon-column",
  "world-sign-transit",
  "world-sign-relay",
  "Scar_TransitBulkhead",
  "Scar_CargoCluster",
  "Scar_ServiceSpine",
  "repel-impact-shockwave",
  "scrapper-threat-ring",
  "Scrapper_Torso",
  "Scrapper_HostileEye",
  "Scrapper_LooseForearmPlate",
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
