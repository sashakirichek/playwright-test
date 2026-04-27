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
  // test new functionality of added clickable element:
  /*
    <div class="palette-item" title="JSON operations" style="border-left-color: var(--sys-pink);"><span class="palette-label">JS  JSON</span><span class="palette-desc">JSON operations</span></div>
    */
  // new react node should apper on react-node pane with the name JSON
});
