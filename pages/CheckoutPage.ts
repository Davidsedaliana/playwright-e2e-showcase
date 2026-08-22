import { expect, type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly error: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly completeHeader: Locator;

  constructor(readonly page: Page) {
    this.firstName = page.locator("[data-test=\"firstName\"]");
    this.lastName = page.locator("[data-test=\"lastName\"]");
    this.postalCode = page.locator("[data-test=\"postalCode\"]");
    this.continueButton = page.locator("[data-test=\"continue\"]");
    this.cancelButton = page.locator("[data-test=\"cancel\"]");
    this.finishButton = page.locator("[data-test=\"finish\"]");
    this.error = page.locator("[data-test=\"error\"]");
    this.subtotal = page.locator("[data-test=\"subtotal-label\"]");
    this.tax = page.locator("[data-test=\"tax-label\"]");
    this.total = page.locator("[data-test=\"total-label\"]");
    this.completeHeader = page.locator("[data-test=\"complete-header\"]");
  }

  async fillInfo(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async moneyOf(locator: Locator): Promise<number> {
    const text = (await locator.textContent()) ?? "";
    return parseFloat(text.replace(/[^\d.]/g, ""));
  }

  async finish() {
    await this.finishButton.click();
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }
}
