export type WayfarerScarStage =
  | "breach"
  | "resonance"
  | "repel"
  | "relay"
  | "complete";

export interface WayfarerScarProgressInput {
  readonly positionX: number;
  readonly attractActive: boolean;
  readonly repelUses: number;
}

export interface WayfarerScarProgressSnapshot {
  readonly stage: WayfarerScarStage;
  readonly step: number;
  readonly totalSteps: number;
  readonly title: string;
  readonly detail: string;
  readonly complete: boolean;
}

const COPY: Readonly<Record<WayfarerScarStage, Pick<WayfarerScarProgressSnapshot, "title" | "detail">>> = {
  breach: {
    title: "Move through the breach",
    detail: "Get clear of the wrecked arrival bay.",
  },
  resonance: {
    title: "Engage a Resonance anchor",
    detail: "Hold E near a luminous ring to pull toward it.",
  },
  repel: {
    title: "Discharge Repel",
    detail: "Use Q near an anchor to kick away from the field.",
  },
  relay: {
    title: "Reach the emergency relay",
    detail: "Follow the amber emergency lamps to the relay frame.",
  },
  complete: {
    title: "Emergency relay stabilized",
    detail: "Transit Wreck 07 is transmitting again.",
  },
};

const ORDER: readonly WayfarerScarStage[] = [
  "breach",
  "resonance",
  "repel",
  "relay",
  "complete",
];

export class WayfarerScarProgress {
  private stage: WayfarerScarStage = "breach";
  private attractObserved = false;
  private repelObserved = false;

  update(input: WayfarerScarProgressInput): WayfarerScarProgressSnapshot {
    if (input.attractActive) this.attractObserved = true;
    if (input.repelUses > 0) this.repelObserved = true;

    // Progress is monotonic and only observes gameplay; it never alters simulation.
    let changed = true;
    while (changed) {
      changed = false;
      if (this.stage === "breach" && input.positionX >= -4.15) {
        this.stage = "resonance";
        changed = true;
      } else if (this.stage === "resonance" && this.attractObserved) {
        this.stage = "repel";
        changed = true;
      } else if (this.stage === "repel" && this.repelObserved) {
        this.stage = "relay";
        changed = true;
      } else if (this.stage === "relay" && input.positionX >= 6.25) {
        this.stage = "complete";
        changed = true;
      }
    }

    return this.snapshot();
  }

  snapshot(): WayfarerScarProgressSnapshot {
    const index = ORDER.indexOf(this.stage);
    const copy = COPY[this.stage];
    return {
      stage: this.stage,
      step: Math.min(index + 1, ORDER.length - 1),
      totalSteps: ORDER.length - 1,
      title: copy.title,
      detail: copy.detail,
      complete: this.stage === "complete",
    };
  }
}
