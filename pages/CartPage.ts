import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;

  constructor(readonly page: Page) {
    this.items = page.locator(".cart_item");
    this.itemNames = page.locator(".inventory_item_name");
    this.checkoutButton = page.locator("[data-test=\"checkout\"]");
    this.continueShopping = page.locator("[data-test=\"continue-shopping\"]");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectItems(names: string[]) {
    await expect(this.itemNames).toHaveText(names);
  }

  async removeItem(slug: string) {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
