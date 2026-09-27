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

const browser = await chromium.launch({
  headless: true,
  args: ["--enable-webgl", "--use-angle=swiftshader"],
});
const context = await browser.newContext({ acceptDownloads: true });
const report = {
  schema: "resonance.m0.deployed-smoke.v1",
  baseUrl,
  expectedBuildId,
  checkedAt: new Date().toISOString(),
  root: {},
  blind: {},
};

try {
  const root = await context.newPage();
  const rootErrors = [];
  root.on("pageerror", (error) => rootErrors.push(String(error)));

  const rootResponse = await gotoWithRetry(root, `${baseUrl}/`);
  await root.waitForSelector("#game", { state: "attached", timeout: 30_000 });
  await root.waitForFunction(
    () => document.querySelector("#diagnostics")?.textContent?.includes("RESONANCE M0.9"),
    undefined,
    { timeout: 30_000 },
  );
  await root.screenshot({ path: path.join(artifactDir, "root.png") });

  const performanceDownload = root.waitForEvent("download");
  await root.keyboard.press("p");
  const performance = await readDownloadJson(await performanceDownload);
  if (performance.schema !== "resonance.m0.performance-capture.v1") {
    throw new Error(`Unexpected performance schema: ${performance.schema}`);
  }
  if (performance.buildId !== expectedBuildId) {
    throw new Error(`Performance buildId mismatch: ${performance.buildId} != ${expectedBuildId}`);
  }

  report.root = {
    status: rootResponse.status(),
    title: await root.title(),
    diagnosticsPresent: true,
    performanceSchema: performance.schema,
    performanceBuildId: performance.buildId,
    pageErrors: rootErrors,
  };

  const blind = await context.newPage();
  const blindErrors = [];
  blind.on("pageerror", (error) => blindErrors.push(String(error)));

  const blindResponse = await gotoWithRetry(blind, `${baseUrl}/?blind=1`);
  await blind.waitForSelector("body.blind-test", { timeout: 30_000 });
  await blind.waitForSelector("#blind-test-prompt", { timeout: 30_000 });
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
  await blind.screenshot({ path: path.join(artifactDir, "blind-questionnaire.png") });

  report.blind = {
    status: blindResponse.status(),
    title: await blind.title(),
    bodyClassPresent: true,
    promptPresent: true,
    diagnosticsHidden: true,
    questionnairePresent: true,
    blindSchema: blindReport.schema,
    blindBuildId: blindReport.buildId,
    pageErrors: blindErrors,
  };

  if (rootErrors.length || blindErrors.length) {
    throw new Error(`Deployed page errors observed: ${JSON.stringify({ rootErrors, blindErrors })}`);
  }

  await writeFile(path.join(artifactDir, "smoke.json"), JSON.stringify(report, null, 2));
} finally {
  await context.close();
  await browser.close();
}

console.log(JSON.stringify(report, null, 2));
