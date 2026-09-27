import type { WayfarerScarStage } from "../slice-progression";

export interface ObjectiveStagePresentation {
  readonly kicker: string;
  readonly title: string;
  readonly detail: string;
  readonly tone: "neutral" | "resonance" | "repel" | "relay" | "complete";
}

const STAGE_PRESENTATION: Readonly<Record<WayfarerScarStage, ObjectiveStagePresentation>> = {
  breach: {
    kicker: "WAYFARER SCAR",
    title: "CLEAR THE BREACH",
    detail: "Transit deck access restored",
    tone: "neutral",
  },
  resonance: {
    kicker: "FIELD SYSTEM",
    title: "ANCHOR SIGNAL FOUND",
    detail: "Resonance control available",
    tone: "resonance",
  },
  repel: {
    kicker: "FIELD SYSTEM",
    title: "ATTRACT CONFIRMED",
    detail: "Repel discharge unlocked for this route",
    tone: "resonance",
  },
  relay: {
    kicker: "TRANSIT 07",
    title: "REPEL CONFIRMED",
    detail: "Emergency Relay 07 is now reachable",
    tone: "repel",
  },
  complete: {
    kicker: "RELAY 07",
    title: "SIGNAL RESTORED",
    detail: "The wreck is transmitting again",
    tone: "complete",
  },
};

export function objectiveStagePresentation(stage: WayfarerScarStage): ObjectiveStagePresentation {
  return STAGE_PRESENTATION[stage];
}
