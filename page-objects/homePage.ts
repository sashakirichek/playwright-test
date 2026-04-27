import { Page, expect } from "@playwright/test";

export class HomePage {
  private page: Page;
  private readonly baseURL = "https://visual-programming-4jx.pages.dev/";

  // Selectors
  private readonly shareButton = { title: "Copy shareable URL to clipboard" };
  private readonly jsonPaletteItem = { title: "JSON operations" };

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
}
