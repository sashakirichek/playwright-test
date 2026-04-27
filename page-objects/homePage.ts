import { Page, expect } from "@playwright/test";

export class HomePage {
  private page: Page;
  private readonly baseURL = "https://visual-programming-4jx.pages.dev/";

  // Selectors
  private readonly shareButton = { title: "Copy shareable URL to clipboard" };
  private readonly jsonPaletteItem = { title: "JSON operations" };
  private readonly solutionsButton = { text: "Solutions" };
  private readonly solutionsPanelSelector = '[class*="solutions-panel"]';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the home page
   */
  async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.baseURL);
  }

  /**
   * Internal helper: Get the share button element
   */
  private async getShareButton() {
    return this.page.getByTitle(this.shareButton.title);
  }

  /**
   * Verify share button is visible
   */
  async verifyShareButtonIsVisible(): Promise<void> {
    const button = await this.getShareButton();
    await expect(button).toBeVisible();
  }

  /**
   * Wait for the page to load (wait for share button to be visible)
   */
  async waitForPageToLoad(): Promise<void> {
    const button = await this.getShareButton();
    await button.waitFor({ state: "visible" });
  }

  /**
   * Internal helper: Get the JSON palette item element
   */
  private async getJsonPaletteItem() {
    return this.page.getByTitle(this.jsonPaletteItem.title);
  }

  /**
   * Click the JSON palette item to add it to the canvas
   */
  async clickJsonPaletteItem(): Promise<void> {
    const jsonItem = await this.getJsonPaletteItem();
    await jsonItem.click();
  }

  /**
   * Verify a JSON node was created on the canvas (checks for element with "JSON" in text)
   */
  async verifyJsonNodeAppearedOnCanvas(): Promise<void> {
    const jsonNode = this.page.locator('[class*="react-node"]').filter({ hasText: /JSON/ });
    await expect(jsonNode).toBeVisible({ timeout: 5000 });
  }

  /**
   * Click the Solutions button to open the solutions panel
   */
  async clickSolutionsButton(): Promise<void> {
    const button = this.page.getByRole('button', { name: 'Solutions' });
    await button.click();
  }

  /**
   * Verify the solutions panel is visible
   */
  async verifySolutionsPanelIsVisible(): Promise<void> {
    const panel = this.page.locator(this.solutionsPanelSelector);
    await expect(panel).toBeVisible({ timeout: 5000 });
  }

  /**
   * Verify the save solution button is visible within the solutions panel
   */
  async verifySaveSolutionButtonIsVisible(): Promise<void> {
    const saveButton = this.page.getByRole('button', { name: /Save|save/i });
    await expect(saveButton).toBeVisible();
  }

  /**
   * Click the save solution button
   */
  async clickSaveSolutionButton(): Promise<void> {
    const saveButton = this.page.getByRole('button', { name: /Save|save/i });
    await saveButton.click();
  }
}
