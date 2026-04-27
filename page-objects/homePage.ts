import { Page, expect } from "@playwright/test";

export class HomePage {
  private page: Page;
  private readonly baseURL = "https://visual-programming-4jx.pages.dev/";

  // Selectors
  private readonly shareButton = { title: "Copy shareable URL to clipboard" };
  private readonly titleText = /visual-programming/;

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
}
