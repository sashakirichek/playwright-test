import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/homePage";

test("has title", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.verifyPageTitle();
});

test("get started link", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.verifyShareButtonIsVisible();
  await homePage.verifyShareButtonText("Share");
  await homePage.shareAndVerifyConfirmation();
});

test("verify page loads successfully", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.waitForPageToLoad();
  const title = await homePage.getPageTitle();
  expect(title).toContain("visual-programming");
});

test("share button functionality", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.verifyShareButtonIsVisible();
  await homePage.clickShareButton();
  await homePage.verifyURLCopiedConfirmation();
});

test("addJsonElement_showsSuccessfully", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.waitForPageToLoad();

  // Verify JSON palette item is visible in the palette
  await homePage.verifyJsonPaletteItemIsVisible();
  await homePage.verifyJsonPaletteItemLabel("JSON");
  await homePage.verifyJsonPaletteItemDescription("JSON operations");

  // Click JSON palette item to add it to the canvas
  await homePage.clickJsonPaletteItem();

  // Verify a new JSON node appeared on the canvas
  await homePage.verifyJsonNodeAppearedOnCanvas();
});

test("json_palette_item_has_correct_styling", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.waitForPageToLoad();

  // Verify JSON palette item exists and has palette-item class
  const jsonItem = await homePage.getJsonPaletteItem();
  await expect(jsonItem).toHaveClass(/palette-item/);
});

test("json_node_persists_after_addition", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.waitForPageToLoad();

  // Add JSON element
  await homePage.clickJsonPaletteItem();
  await homePage.verifyJsonNodeAppearedOnCanvas();

  // Verify node still exists after a small delay
  await page.waitForTimeout(1000);
  await homePage.verifyJsonNodeAppearedOnCanvas();

  // Verify the node contains expected content
  const jsonNode = await homePage.getJsonNodeFromCanvas();
  await expect(jsonNode).toBeVisible();
});
