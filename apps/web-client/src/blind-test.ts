import type { TargetId, Vec3 } from "@resonance/game-data";

export interface BlindTestTickSample {
  readonly tick: number;
  readonly position: Vec3;
  readonly velocity: Vec3;
  readonly grounded: boolean;
  readonly groundEntityId: number;
  readonly selectedTargetId: number;
  readonly attractTargetId: number;
  readonly repelUses: number;
  readonly collisionCount: number;
  readonly maximumCorrection: number;
}

export interface BlindTestQuestionnaire {
  responsiveness: number | null;
  targetingClarity: number | null;
  repelPredictability: number | null;
  voluntaryReplay: boolean | null;
  confusionNotes: string;
}

interface BlindTestEvent {
  readonly tick: number;
  readonly type: string;
  readonly detail?: string;
}

interface BlindTestTasks {
  basicTraversal: boolean;
  movingAnchor: boolean;
  attract: boolean;
  repel: boolean;
  targetChoiceFork: boolean;
  recovery: boolean;
}

const SAMPLE_INTERVAL_TICKS = 30;

function downloadJson(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function ratingSelect(name: string, label: string): HTMLLabelElement {
  const wrapper = document.createElement("label");
  wrapper.textContent = label;
  const select = document.createElement("select");
  select.name = name;
  select.innerHTML = '<option value="">—</option>'
    + [1, 2, 3, 4, 5].map((value) => `<option value="${value}">${value}</option>`).join("");
  wrapper.append(select);
  return wrapper;
}

export class BlindMovementTestSession {
  public readonly enabled: boolean;

  private readonly startedAt = new Date().toISOString();
  private readonly sessionId = crypto.randomUUID();
  private readonly samples: BlindTestTickSample[] = [];
  private readonly events: BlindTestEvent[] = [];
  private readonly distinctTargets = new Set<number>();
  private readonly tasks: BlindTestTasks = {
    basicTraversal: false,
    movingAnchor: false,
    attract: false,
    repel: false,
    targetChoiceFork: false,
    recovery: false,
  };
  private questionnaire: BlindTestQuestionnaire = {
    responsiveness: null,
    targetingClarity: null,
    repelPredictability: null,
    voluntaryReplay: null,
    confusionNotes: "",
  };
  private prompt: HTMLDivElement | null = null;
  private form: HTMLFormElement | null = null;
  private lastTaskSummary = "";

  public constructor(
    private readonly buildId: string,
    private readonly startPosition: Vec3,
    private readonly movingPlatformEntityId: number,
  ) {
    this.enabled = new URLSearchParams(location.search).get("blind") === "1";
    if (!this.enabled) return;
    document.body.classList.add("blind-test");
    this.mountPrompt();
    this.recordEvent(0, "session-start");
  }

  public recordTick(sample: BlindTestTickSample): void {
    if (!this.enabled) return;

    if (sample.tick % SAMPLE_INTERVAL_TICKS === 0) {
      this.samples.push({
        ...sample,
        position: { ...sample.position },
        velocity: { ...sample.velocity },
      });
    }

    if (!this.tasks.basicTraversal
      && Math.abs(sample.position.x - this.startPosition.x) >= 4) {
      this.tasks.basicTraversal = true;
      this.recordEvent(sample.tick, "task-complete", "basic-traversal");
    }
    if (!this.tasks.movingAnchor
      && sample.grounded
      && sample.groundEntityId === this.movingPlatformEntityId) {
      this.tasks.movingAnchor = true;
      this.recordEvent(sample.tick, "task-complete", "moving-anchor");
    }
    if (!this.tasks.attract && sample.attractTargetId !== 0) {
      this.tasks.attract = true;
      this.recordEvent(sample.tick, "task-complete", "attract");
    }
    if (!this.tasks.repel && sample.repelUses > 0) {
      this.tasks.repel = true;
      this.recordEvent(sample.tick, "task-complete", "repel");
    }
    if (sample.selectedTargetId !== 0) {
      this.distinctTargets.add(sample.selectedTargetId);
      if (!this.tasks.targetChoiceFork && this.distinctTargets.size >= 3) {
        this.tasks.targetChoiceFork = true;
        this.recordEvent(sample.tick, "task-complete", "target-choice-fork");
      }
    }

    this.refreshPrompt();
  }

  public recordRecovery(tick: number): void {
    if (!this.enabled) return;
    this.tasks.recovery = true;
    this.recordEvent(tick, "task-complete", "recovery");
    this.refreshPrompt();
  }

  public recordTargetChange(tick: number, previous: TargetId | 0, next: TargetId | 0): void {
    if (!this.enabled || previous === next) return;
    this.recordEvent(tick, "target-change", `${Number(previous)}->${Number(next)}`);
  }

  public showQuestionnaire(): void {
    if (!this.enabled || this.form) return;
    const form = document.createElement("form");
    form.id = "blind-questionnaire";
    form.innerHTML = "<h2>M0 movement check</h2><p>Answer from first impressions. 1 = poor/confusing, 5 = excellent/clear.</p>";
    form.append(
      ratingSelect("responsiveness", "Movement responsiveness"),
      ratingSelect("targetingClarity", "Targeting clarity"),
      ratingSelect("repelPredictability", "Repel predictability"),
    );

    const replay = document.createElement("label");
    replay.textContent = "Would you voluntarily replay a movement challenge?";
    const replaySelect = document.createElement("select");
    replaySelect.name = "voluntaryReplay";
    replaySelect.innerHTML = '<option value="">—</option><option value="yes">Yes</option><option value="no">No</option>';
    replay.append(replaySelect);
    form.append(replay);

    const notes = document.createElement("label");
    notes.textContent = "What felt confusing or unpredictable?";
    const textarea = document.createElement("textarea");
    textarea.name = "confusionNotes";
    textarea.rows = 4;
    notes.append(textarea);
    form.append(notes);

    const exportButton = document.createElement("button");
    exportButton.type = "submit";
    exportButton.textContent = "Save & export blind-test report";
    form.append(exportButton);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const rating = (name: string): number | null => {
        const raw = data.get(name);
        return typeof raw === "string" && raw ? Number(raw) : null;
      };
      const replayValue = data.get("voluntaryReplay");
      this.questionnaire = {
        responsiveness: rating("responsiveness"),
        targetingClarity: rating("targetingClarity"),
        repelPredictability: rating("repelPredictability"),
        voluntaryReplay: replayValue === "yes" ? true : replayValue === "no" ? false : null,
        confusionNotes: String(data.get("confusionNotes") ?? "").trim(),
      };
      this.recordEvent(this.samples.at(-1)?.tick ?? 0, "questionnaire-complete");
      this.export();
      form.remove();
      this.form = null;
    });

    document.body.append(form);
    this.form = form;
  }

  public export(): void {
    if (!this.enabled) return;
    downloadJson(`resonance-m0-blind-${this.sessionId}.json`, {
      schema: "resonance.m0.blind-test.v1",
      buildId: this.buildId,
      sessionId: this.sessionId,
      startedAt: this.startedAt,
      exportedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      tasks: { ...this.tasks },
      taskCompletionCount: Object.values(this.tasks).filter(Boolean).length,
      distinctTargetCount: this.distinctTargets.size,
      questionnaire: { ...this.questionnaire },
      events: this.events,
      samples: this.samples,
      privacy: "Local export only; no tester identity is collected by this harness.",
    });
  }

  private recordEvent(tick: number, type: string, detail?: string): void {
    this.events.push({ tick, type, ...(detail ? { detail } : {}) });
  }

  private mountPrompt(): void {
    const prompt = document.createElement("div");
    prompt.id = "blind-test-prompt";
    document.body.append(prompt);
    this.prompt = prompt;
    this.refreshPrompt();
  }

  private refreshPrompt(): void {
    if (!this.prompt) return;
    const complete = Object.values(this.tasks).filter(Boolean).length;
    const summary = [
      "BLIND MOVEMENT TEST",
      "Discover the course without coaching.",
      "Move: A/D or arrows • Jump: Space • Evade: Left Shift",
      "Attract: hold E / RT • Repel: Q / LT • Aim: mouse/right stick",
      `Observed challenges: ${complete}/6`,
      "F7 questionnaire • F8 export current report",
    ].join("\n");
    if (summary !== this.lastTaskSummary) {
      this.prompt.textContent = summary;
      this.lastTaskSummary = summary;
    }
  }
}
