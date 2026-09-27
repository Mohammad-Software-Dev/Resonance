import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.M0_EVIDENCE_URL;
const expectedBuildId = process.env.M0_EVIDENCE_BUILD_SHA;
if (!baseUrl) throw new Error("M0_EVIDENCE_URL is required");
if (!expectedBuildId) throw new Error("M0_EVIDENCE_BUILD_SHA is required");

const artifactDir = path.resolve("artifacts/m0-evidence-smoke");
await mkdir(artifactDir, { recursive: true });

async function gotoWithRetry(page, url) {
  let lastError;
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    try {
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15_000 });
      if (response?.ok()) return response;
      lastError = new Error(`HTTP ${response?.status() ?? "no-response"} for ${url}`);
    } catch (error) {
      lastError = error;
    }
    await page.waitForTimeout(5_000);
  }
  throw lastError ?? new Error(`Unable to load ${url}`);
}

async function readDownloadJson(download) {
  const filePath = await download.path();
  if (!filePath) throw new Error("Playwright download did not produce a local path");
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function snapshotPage(page, prefix) {
  if (!page) return;
  await page.screenshot({ path: path.join(artifactDir, `${prefix}.png`) }).catch(() => {});
  await writeFile(path.join(artifactDir, `${prefix}.html`), await page.content()).catch(() => {});
}

function unexpectedConsoleErrors(messages) {
  return messages.filter(
    (message) => !message.includes("A fatal error occurred during WebGPU creation/initialization."),
  );
}

const report = {
  schema: "resonance.m0.deployed-smoke.v1",
  baseUrl,
  expectedBuildId,
  checkedAt: new Date().toISOString(),
  root: {},
  blind: {},
  failure: null,
};

let browser;
let context;
let root;
let blind;
const rootErrors = [];
const rootConsoleErrors = [];
const rootRequestFailures = [];
const rootHttpFailures = [];
const blindErrors = [];
const blindConsoleErrors = [];
const blindRequestFailures = [];
const blindHttpFailures = [];

try {
  browser = await chromium.launch({
    headless: true,
    args: [
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--ignore-gpu-blocklist",
    ],
  });
  context = await browser.newContext({ acceptDownloads: true });

  root = await context.newPage();
  root.on("pageerror", (error) => rootErrors.push(String(error)));
  root.on("console", (message) => {
    if (message.type() === "error") rootConsoleErrors.push(message.text());
  });
  root.on("requestfailed", (request) => {
    rootRequestFailures.push({ url: request.url(), error: request.failure()?.errorText ?? "unknown" });
  });
  root.on("response", (response) => {
    if (!response.ok()) rootHttpFailures.push({ url: response.url(), status: response.status() });
  });

  const rootResponse = await gotoWithRetry(root, `${baseUrl}/?backend=webgl2`);
  const webgl2Available = await root.evaluate(() => {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  });
  if (!webgl2Available) throw new Error("Headless Chromium has no WebGL2 context");

  await root.waitForSelector("#game", { state: "attached", timeout: 30_000 });
  await root.waitForFunction(
    () => document.body.dataset.resonanceBoot === "ready",
    undefined,
    { timeout: 120_000 },
  );
  const rootBackendPreference = await root.locator("body").getAttribute(
    "data-resonance-backend-preference",
  );
  if (rootBackendPreference !== "webgl2") {
    throw new Error(`Forced WebGL2 preference was not retained: ${rootBackendPreference}`);
  }
  const authoredVisualAssets = await root.locator("body").getAttribute(
    "data-resonance-authored-visual-assets",
  );
  if (authoredVisualAssets !== "authored") {
    throw new Error(`Authored visual asset mode is not active: ${authoredVisualAssets}`);
  }
  const authoredWayfarer = await root.locator("body").getAttribute(
    "data-resonance-authored-wayfarer",
  );
  if (authoredWayfarer !== "authored") {
    throw new Error(`Authored Wayfarer GLB did not load: ${authoredWayfarer}`);
  }
  const authoredScrapper = await root.locator("body").getAttribute(
    "data-resonance-authored-scrapper",
  );
  if (authoredScrapper !== "authored") {
    throw new Error(`Authored Scrapper GLB did not load: ${authoredScrapper}`);
  }
  const visualLandmarks = await root.locator("body").getAttribute(
    "data-resonance-visual-landmarks",
  );
  if (visualLandmarks !== "ready") {
    throw new Error(`Recognizable-game visual landmark audit failed: ${visualLandmarks}`);
  }
  await root.waitForFunction(
    () => ["idle", "locked", "attract", "repel"].includes(
      document.body.dataset.resonanceInteractionState ?? "",
    ),
    undefined,
    { timeout: 15_000 },
  );
  const interactionState = await root.locator("body").getAttribute(
    "data-resonance-interaction-state",
  );
  const interactionHudDisplay = await root.locator("#hud-resonance").evaluate(
    (element) => getComputedStyle(element).display,
  );
  if (interactionHudDisplay === "none") {
    throw new Error("Normal route Resonance interaction HUD is hidden");
  }
  const objectiveStage = await root.locator("body").getAttribute(
    "data-resonance-objective-event",
  );
  if (!["breach", "resonance", "repel", "relay", "complete"].includes(objectiveStage ?? "")) {
    throw new Error(`Objective choreography state is missing: ${objectiveStage}`);
  }
  const objectiveEventDisplay = await root.locator("#objective-event").evaluate(
    (element) => getComputedStyle(element).display,
  );
  if (objectiveEventDisplay === "none") {
    throw new Error("Normal route objective event surface is hidden");
  }
  await root.waitForFunction(
    () => document.querySelector("#diagnostics")?.textContent?.includes("RESONANCE M0.9"),
    undefined,
    { timeout: 15_000 },
  );
  await snapshotPage(root, "root");

  const performanceDownload = root.waitForEvent("download");
  await root.keyboard.press("p");
  const performance = await readDownloadJson(await performanceDownload);
  if (performance.schema !== "resonance.m0.performance-capture.v1") {
    throw new Error(`Unexpected performance schema: ${performance.schema}`);
  }
  if (performance.buildId !== expectedBuildId) {
    throw new Error(`Performance buildId mismatch: ${performance.buildId} != ${expectedBuildId}`);
  }
  if (performance.backend !== "webgl2" || performance.backendPreference !== "webgl2") {
    throw new Error(
      `Forced WebGL2 export mismatch: backend=${performance.backend}, requested=${performance.backendPreference}`,
    );
  }
  const frameSummary = performance.frameSummary;
  if (
    !frameSummary
    || typeof frameSummary.captureDurationMs !== "number"
    || typeof frameSummary.cpuFrameP95Ms !== "number"
    || (frameSummary.gpuFrameP95Ms !== null && typeof frameSummary.gpuFrameP95Ms !== "number")
    || typeof frameSummary.drawCallsMin !== "number"
    || typeof frameSummary.drawCallsMax !== "number"
  ) {
    throw new Error("Performance export is missing full-window physical-signoff telemetry");
  }
  if (
    !performance.samples
    || !Array.isArray(performance.samples.cpuFrameMs)
    || !Array.isArray(performance.samples.gpuFrameMs)
    || !Array.isArray(performance.samples.drawCalls)
  ) {
    throw new Error("Performance export is missing full-window raw telemetry arrays");
  }
  if (performance.graphics?.materials > 24) {
    throw new Error(
      `M0 presentation material budget exceeded: ${performance.graphics.materials} > 24`,
    );
  }

  report.root = {
    status: rootResponse.status(),
    title: await root.title(),
    webgl2Available,
    diagnosticsPresent: true,
    bootPhase: await root.locator("body").getAttribute("data-resonance-boot"),
    backendPreference: rootBackendPreference,
    activeBackend: performance.backend,
    visualLandmarks,
    authoredVisualAssets,
    authoredWayfarer,
    authoredScrapper,
    interactionState,
    interactionHudVisible: true,
    objectiveStage,
    objectiveEventSurfacePresent: true,
    buildIdMarker: await root.locator("body").getAttribute("data-resonance-build-id"),
    shaderWarmupMs: await root.locator("body").getAttribute("data-resonance-shader-warmup-ms"),
    performanceSchema: performance.schema,
    performanceBuildId: performance.buildId,
    performanceCaptureDurationMs: frameSummary.captureDurationMs,
    performanceCpuFrameP95Ms: frameSummary.cpuFrameP95Ms,
    performanceGpuFrameP95Ms: frameSummary.gpuFrameP95Ms,
    performanceDrawCallsRange: [frameSummary.drawCallsMin, frameSummary.drawCallsMax],
    materials: performance.graphics?.materials ?? null,
    textures: performance.graphics?.textures ?? null,
    diagnosticsText: await root.locator("#diagnostics").textContent(),
    pageErrors: rootErrors,
    consoleErrors: rootConsoleErrors,
    requestFailures: rootRequestFailures,
    httpFailures: rootHttpFailures,
  };

  blind = await context.newPage();
  blind.on("pageerror", (error) => blindErrors.push(String(error)));
  blind.on("console", (message) => {
    if (message.type() === "error") blindConsoleErrors.push(message.text());
  });
  blind.on("requestfailed", (request) => {
    blindRequestFailures.push({ url: request.url(), error: request.failure()?.errorText ?? "unknown" });
  });
  blind.on("response", (response) => {
    if (!response.ok()) blindHttpFailures.push({ url: response.url(), status: response.status() });
  });

  const blindResponse = await gotoWithRetry(blind, `${baseUrl}/?blind=1&backend=webgl2`);
  await blind.waitForSelector("body.blind-test", { timeout: 30_000 });
  await blind.waitForSelector("#blind-test-prompt", { timeout: 30_000 });
  const blindBackendPreference = await blind.locator("body").getAttribute(
    "data-resonance-backend-preference",
  );
  if (blindBackendPreference !== "webgl2") {
    throw new Error(`Blind route forced WebGL2 preference mismatch: ${blindBackendPreference}`);
  }
  const prompt = (await blind.locator("#blind-test-prompt").textContent()) ?? "";
  if (!prompt.includes("BLIND MOVEMENT TEST")) {
    throw new Error("Blind-test prompt did not initialize");
  }
  const diagnosticsDisplay = await blind.locator("#diagnostics").evaluate(
    (element) => getComputedStyle(element).display,
  );
  if (diagnosticsDisplay !== "none") {
    throw new Error(`Blind mode diagnostics are visible: display=${diagnosticsDisplay}`);
  }
  const blindGameHudDisplay = await blind.locator("#game-hud").evaluate(
    (element) => getComputedStyle(element).display,
  );
  if (blindGameHudDisplay !== "none") {
    throw new Error(`Blind mode game HUD is visible: display=${blindGameHudDisplay}`);
  }
  const blindObjectiveEventDisplay = await blind.locator("#objective-event").evaluate(
    (element) => getComputedStyle(element).display,
  );
  if (blindObjectiveEventDisplay !== "none") {
    throw new Error(
      `Blind mode objective event is visible: display=${blindObjectiveEventDisplay}`,
    );
  }

  const blindDownload = blind.waitForEvent("download");
  await blind.keyboard.press("F8");
  const blindReport = await readDownloadJson(await blindDownload);
  if (blindReport.schema !== "resonance.m0.blind-test.v1") {
    throw new Error(`Unexpected blind report schema: ${blindReport.schema}`);
  }
  if (blindReport.buildId !== expectedBuildId) {
    throw new Error(`Blind report buildId mismatch: ${blindReport.buildId} != ${expectedBuildId}`);
  }

  await blind.keyboard.press("F7");
  await blind.waitForSelector("#blind-questionnaire", { timeout: 10_000 });
  await snapshotPage(blind, "blind-questionnaire");

  report.blind = {
    status: blindResponse.status(),
    title: await blind.title(),
    bodyClassPresent: true,
    promptPresent: true,
    diagnosticsHidden: true,
    gameHudHidden: true,
    objectiveEventHidden: true,
    questionnairePresent: true,
    backendPreference: blindBackendPreference,
    blindSchema: blindReport.schema,
    blindBuildId: blindReport.buildId,
    pageErrors: blindErrors,
    consoleErrors: blindConsoleErrors,
    requestFailures: blindRequestFailures,
    httpFailures: blindHttpFailures,
  };

  const unexpectedRootConsoleErrors = unexpectedConsoleErrors(rootConsoleErrors);
  const unexpectedBlindConsoleErrors = unexpectedConsoleErrors(blindConsoleErrors);
  if (
    rootErrors.length
    || unexpectedRootConsoleErrors.length
    || blindErrors.length
    || unexpectedBlindConsoleErrors.length
  ) {
    throw new Error(`Deployed browser errors observed: ${JSON.stringify({
      rootErrors,
      unexpectedRootConsoleErrors,
      blindErrors,
      unexpectedBlindConsoleErrors,
    })}`);
  }
} catch (error) {
  report.failure = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : null,
  };
  if (root) {
    report.root = {
      ...report.root,
      bootPhase: await root.locator("body").getAttribute("data-resonance-boot").catch(() => null),
      buildIdMarker: await root.locator("body").getAttribute("data-resonance-build-id").catch(() => null),
      shaderWarmupMs: await root.locator("body").getAttribute("data-resonance-shader-warmup-ms").catch(() => null),
      diagnosticsText: await root.locator("#diagnostics").textContent().catch(() => null),
      bodyClass: await root.locator("body").getAttribute("class").catch(() => null),
      pageErrors: rootErrors,
      consoleErrors: rootConsoleErrors,
      requestFailures: rootRequestFailures,
      httpFailures: rootHttpFailures,
    };
    await snapshotPage(root, "root-failure");
  }
  if (blind) await snapshotPage(blind, "blind-failure");
  await writeFile(path.join(artifactDir, "smoke.json"), JSON.stringify(report, null, 2));
  console.error(JSON.stringify(report, null, 2));
  throw error;
} finally {
  if (!report.failure) {
    await writeFile(path.join(artifactDir, "smoke.json"), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  }
  await context?.close().catch(() => {});
  await browser?.close().catch(() => {});
}
