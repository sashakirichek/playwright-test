import { Page, expect } from "@playwright/test";

export class HomePage {
  private page: Page;
  private readonly baseURL = "https://visual-programming-4jx.pages.dev/";

  // Selectors
  private readonly shareButton = { title: "Copy shareable URL to clipboard" };
  private readonly titleText = /visual-programming/;
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
   * Verify the page title contains the expected text
   */
  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(this.titleText);
  }

  /**
   * Get the share button element
   */
  async getShareButton() {
    return this.page.getByTitle(this.shareButton.title);
  }

  /**
   * Click the share button to copy URL to clipboard
   */
  async clickShareButton(): Promise<void> {
    const button = await this.getShareButton();
    await button.click();
  }

  /**
   * Verify share button is visible
   */
  async verifyShareButtonIsVisible(): Promise<void> {
    const button = await this.getShareButton();
    await expect(button).toBeVisible();
  }

  /**
   * Verify share button contains expected text
   */
  async verifyShareButtonText(expectedText: string): Promise<void> {
    const button = await this.getShareButton();
    await expect(button).toContainText(expectedText);
  }

  /**
   * Verify the URL was copied to clipboard (button shows confirmation)
   */
  async verifyURLCopiedConfirmation(): Promise<void> {
    const button = await this.getShareButton();
    await expect(button).toContainText("URL copied!");
  }

  /**
   * Click share button and verify confirmation message
   */
  async shareAndVerifyConfirmation(): Promise<void> {
    await this.clickShareButton();
    await this.verifyURLCopiedConfirmation();
  }

  /**
   * Get the page title text
   */
  async getPageTitle(): Promise<string | null> {
    return await this.page.title();
  }

  /**
   * Wait for the page to load (wait for share button to be visible)
   */
  async waitForPageToLoad(): Promise<void> {
    const button = await this.getShareButton();
    await button.waitFor({ state: "visible" });
  }

  /**
   * Verify the share button is not visible
   */
  async verifyShareButtonIsNotVisible(): Promise<void> {
    const button = await this.getShareButton();
    await expect(button).not.toBeVisible();
  }

  /**
   * Get the JSON palette item element
   */
  async getJsonPaletteItem() {
    return this.page.getByTitle(this.jsonPaletteItem.title);
  }

  /**
   * Verify JSON palette item is visible
   */
  async verifyJsonPaletteItemIsVisible(): Promise<void> {
    const jsonItem = await this.getJsonPaletteItem();
    await expect(jsonItem).toBeVisible();
  }

  /**
   * Click the JSON palette item to add it to the canvas
   */
  async clickJsonPaletteItem(): Promise<void> {
    const jsonItem = await this.getJsonPaletteItem();
    await jsonItem.click();
  }

  /**
   * Verify JSON palette item contains the expected label text
   */
  async verifyJsonPaletteItemLabel(expectedLabel: string): Promise<void> {
    const jsonItem = await this.getJsonPaletteItem();
    const labelElement = jsonItem.locator(".palette-label");
    await expect(labelElement).toContainText(expectedLabel);
  }

  /**
   * Verify JSON palette item contains the expected description
   */
  async verifyJsonPaletteItemDescription(expectedDesc: string): Promise<void> {
    const jsonItem = await this.getJsonPaletteItem();
    const descElement = jsonItem.locator(".palette-desc");
    await expect(descElement).toContainText(expectedDesc);
  }

  /**
   * Verify a JSON node was created on the canvas (checks for element with "JSON" in text)
   */
  async verifyJsonNodeAppearedOnCanvas(): Promise<void> {
    const jsonNode = this.page.locator('[class*="react-node"]').filter({ hasText: /JSON/ });
    await expect(jsonNode).toBeVisible({ timeout: 5000 });
  }

  /**
   * Get JSON node from canvas
   */
  async getJsonNodeFromCanvas() {
    return this.page.locator('[class*="react-node"]').filter({ hasText: /JSON/ });
  }
}
