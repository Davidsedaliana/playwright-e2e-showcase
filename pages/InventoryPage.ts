import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortSelect: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(readonly page: Page) {
    this.items = page.locator(".inventory_item");
    this.itemNames = page.locator(".inventory_item_name");
    this.itemPrices = page.locator(".inventory_item_price");
    this.sortSelect = page.locator("[data-test=\"product-sort-container\"]");
    this.cartBadge = page.locator("[data-test=\"shopping-cart-badge\"]");
    this.cartLink = page.locator("[data-test=\"shopping-cart-link\"]");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.items.first()).toBeVisible();
  }

  async sortBy(value: "az" | "za" | "lohi" | "hilo") {
    await this.sortSelect.selectOption(value);
  }

  async names(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async prices(): Promise<number[]> {
    const raw = await this.itemPrices.allTextContents();
    return raw.map((p) => parseFloat(p.replace("$", "")));
  }

  /** slug — часть data-test: sauce-labs-backpack, sauce-labs-bike-light... */
  async addToCart(slug: string) {
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  async removeFromCart(slug: string) {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async openCart() {
    await this.cartLink.click();
  }
}
