import { mkdir } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("Wayfarer Scar game-facing presentation boots cleanly", async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "presentation screenshot is retained from Chromium");

  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/?backend=webgl2");
  try {
    await page.waitForFunction(
      () => document.body.dataset.resonanceBoot === "ready",
      undefined,
      { timeout: 45_000 },
    );
  } catch (error) {
    console.error("presentation boot diagnostics", JSON.stringify({
      boot: await page.locator("body").getAttribute("data-resonance-boot"),
      visualIdentity: await page.locator("body").getAttribute("data-resonance-visual-identity"),
      authoredWayfarer: await page.locator("body").getAttribute("data-resonance-authored-wayfarer"),
      authoredScrapper: await page.locator("body").getAttribute("data-resonance-authored-scrapper"),
      authoredSetdress: await page.locator("body").getAttribute("data-resonance-authored-setdress"),
      visualLandmarks: await page.locator("body").getAttribute("data-resonance-visual-landmarks"),
      shaderWarmupMs: await page.locator("body").getAttribute("data-resonance-shader-warmup-ms"),
      pageErrors,
      consoleErrors,
    }));
    throw error;
  }

  await expect(page).toHaveTitle(/Resonance — Wayfarer Scar/);
  await expect(page.locator("body")).toHaveAttribute(
    "data-resonance-backend-preference",
    "webgl2",
  );
  await expect(page.locator("body")).toHaveAttribute(
    "data-resonance-slice-stage",
    "breach",
  );
  await expect(page.locator("body")).toHaveAttribute(
    "data-resonance-presentation-hierarchy",
    "authored-subject-v1",
  );

  await expect(page.locator("#game-hud")).toBeVisible();
  await expect(page.locator(".hud-location strong")).toHaveText("WAYFARER SCAR");
  await expect(page.locator("#hud-objective-title")).toHaveText(
    "Move through the breach",
  );
  await expect(page.locator("#slice-complete")).not.toHaveClass(/visible/);
  await expect(page.locator("#objective-event")).not.toHaveClass(/visible/);
  await expect(page.locator("#diagnostics")).toHaveCSS("opacity", "0");

  const canvasBox = await page.locator("#game").boundingBox();
  expect(canvasBox?.width ?? 0).toBeGreaterThan(800);
  expect(canvasBox?.height ?? 0).toBeGreaterThan(500);
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);

  await mkdir("artifacts/presentation-smoke", { recursive: true });
  await page.screenshot({
    path: "artifacts/presentation-smoke/wayfarer-scar.png",
    fullPage: true,
  });
});
