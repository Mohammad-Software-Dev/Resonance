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
const MEANINGFUL_TARGET_TICKS = 6;
const MEANINGFUL_REPLAY_TICKS = 120;
const MEANINGFUL_REPLAY_DISTANCE = 2;

function downloadJson(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.hidden = true;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
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
  private readonly selectedTargetTicks = new Map<number, number>();
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
  private lastTick = 0;
  private lastSample: BlindTestTickSample | null = null;
  private questionnaireCaptured = false;
  private replayAttempt: {
    readonly startTick: number;
    readonly startPosition: Vec3;
    readonly repelUses: number;
  } | null = null;

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

  public get inputBlocked(): boolean {
    return this.enabled && this.form !== null;
  }

  public recordTick(sample: BlindTestTickSample): void {
    if (!this.enabled) return;
    this.lastTick = sample.tick;
    this.lastSample = {
      ...sample,
      position: { ...sample.position },
      velocity: { ...sample.velocity },
    };

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
      const seenTicks = (this.selectedTargetTicks.get(sample.selectedTargetId) ?? 0) + 1;
      this.selectedTargetTicks.set(sample.selectedTargetId, seenTicks);
      if (seenTicks === MEANINGFUL_TARGET_TICKS) {
        this.distinctTargets.add(sample.selectedTargetId);
        this.recordEvent(sample.tick, "target-observed", String(sample.selectedTargetId));
        if (!this.tasks.targetChoiceFork && this.distinctTargets.size >= 3) {
          this.tasks.targetChoiceFork = true;
          this.recordEvent(sample.tick, "task-complete", "target-choice-fork");
        }
      }
    }

    const replayAttempt = this.replayAttempt;
    if (replayAttempt) {
      const elapsedTicks = sample.tick - replayAttempt.startTick;
      const replayDistance = Math.hypot(
        sample.position.x - replayAttempt.startPosition.x,
        sample.position.y - replayAttempt.startPosition.y,
      );
      const replayAbilityUsed = sample.attractTargetId !== 0
        || sample.repelUses > replayAttempt.repelUses;
      if (
        elapsedTicks >= MEANINGFUL_REPLAY_TICKS
        && (replayDistance >= MEANINGFUL_REPLAY_DISTANCE || replayAbilityUsed)
      ) {
        this.questionnaire.voluntaryReplay = true;
        this.replayAttempt = null;
        this.recordEvent(sample.tick, "voluntary-replay-complete");
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

    if (this.questionnaireCaptured) {
      if (this.replayAttempt) {
        this.replayAttempt = null;
        this.questionnaire.voluntaryReplay = false;
        this.recordEvent(this.lastTick, "voluntary-replay-abandoned");
      }
      this.completeAndExport();
      return;
    }

    const form = document.createElement("form");
    form.id = "blind-questionnaire";
    form.innerHTML = "<h2>M0 movement check</h2><p>Answer from first impressions. 1 = poor/confusing, 5 = excellent/clear.</p>";
    form.append(
      ratingSelect("responsiveness", "Movement responsiveness"),
      ratingSelect("targetingClarity", "Targeting clarity"),
      ratingSelect("repelPredictability", "Repel predictability"),
    );

    const notes = document.createElement("label");
    notes.textContent = "What felt confusing or unpredictable?";
    const textarea = document.createElement("textarea");
    textarea.name = "confusionNotes";
    textarea.rows = 4;
    notes.append(textarea);
    form.append(notes);

    const actions = document.createElement("div");
    actions.className = "blind-questionnaire-actions";

    const finishButton = document.createElement("button");
    finishButton.type = "submit";
    finishButton.name = "sessionAction";
    finishButton.value = "finish";
    finishButton.textContent = "Finish & export";

    const replayButton = document.createElement("button");
    replayButton.type = "submit";
    replayButton.name = "sessionAction";
    replayButton.value = "replay";
    replayButton.textContent = "Replay a challenge";

    actions.append(finishButton, replayButton);
    form.append(actions);

    form.addEventListener("keydown", (event) => event.stopPropagation());
    form.addEventListener("keyup", (event) => event.stopPropagation());
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const rating = (name: string): number | null => {
        const raw = data.get(name);
        return typeof raw === "string" && raw ? Number(raw) : null;
      };
      const submitter = event.submitter;
      const sessionAction = submitter instanceof HTMLButtonElement
        ? submitter.value
        : "finish";
      this.questionnaire = {
        responsiveness: rating("responsiveness"),
        targetingClarity: rating("targetingClarity"),
        repelPredictability: rating("repelPredictability"),
        voluntaryReplay: sessionAction === "finish" ? false : null,
        confusionNotes: String(data.get("confusionNotes") ?? "").trim(),
      };
      this.questionnaireCaptured = true;
      this.recordEvent(this.lastTick, "questionnaire-captured");
      form.remove();
      this.form = null;

      if (sessionAction === "replay") {
        const sample = this.lastSample;
        this.replayAttempt = {
          startTick: this.lastTick,
          startPosition: sample ? { ...sample.position } : { ...this.startPosition },
          repelUses: sample?.repelUses ?? 0,
        };
        this.recordEvent(this.lastTick, "voluntary-replay-start");
        this.refreshPrompt();
        return;
      }

      this.completeAndExport();
    });

    document.body.append(form);
    this.form = form;
    form.querySelector<HTMLSelectElement>('select[name="responsiveness"]')?.focus();
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
      events: this.events.map((event) => ({ ...event })),
      samples: this.samples.map((sample) => ({
        ...sample,
        position: { ...sample.position },
        velocity: { ...sample.velocity },
      })),
      privacy: "Local export only; no tester identity is collected by this harness.",
    });
  }

  private completeAndExport(): void {
    if (this.questionnaire.voluntaryReplay === null) {
      this.questionnaire.voluntaryReplay = false;
    }
    this.recordEvent(this.lastTick, "questionnaire-complete");
    this.export();
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
      this.replayAttempt
        ? "Voluntary replay in progress • F7 finish without counting replay"
        : this.questionnaire.voluntaryReplay === true
          ? "Voluntary replay observed • F7 finish & export"
          : "F7 questionnaire • F8 export current report",
    ].join("\n");
    if (summary !== this.lastTaskSummary) {
      this.prompt.textContent = summary;
      this.lastTaskSummary = summary;
    }
  }
}
