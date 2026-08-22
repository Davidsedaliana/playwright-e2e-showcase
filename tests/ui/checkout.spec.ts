import { expect, test } from "../../pages/fixtures";

test.describe("Оформление заказа", () => {
  test.beforeEach(async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart("sauce-labs-backpack");
    await loggedIn.addToCart("sauce-labs-bike-light");
    await loggedIn.openCart();
    await cartPage.checkout();
  });

  test("полный happy path: сумма = товары + налог", async ({ checkoutPage }) => {
    await checkoutPage.fillInfo("Давид", "Тираян", "0001");

    const subtotal = await checkoutPage.moneyOf(checkoutPage.subtotal);
    const tax = await checkoutPage.moneyOf(checkoutPage.tax);
    const total = await checkoutPage.moneyOf(checkoutPage.total);
    expect(subtotal).toBeCloseTo(29.99 + 9.99, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);

    await checkoutPage.finish();
  });

  test("без имени дальше не пускает", async ({ checkoutPage }) => {
    await checkoutPage.fillInfo("", "Тираян", "0001");
    await expect(checkoutPage.error).toContainText("First Name is required");
  });

  test("без индекса дальше не пускает", async ({ checkoutPage }) => {
    await checkoutPage.fillInfo("Давид", "Тираян", "");
    await expect(checkoutPage.error).toContainText("Postal Code is required");
  });

  test("cancel возвращает в корзину", async ({ checkoutPage, cartPage }) => {
    await checkoutPage.cancelButton.click();
    await cartPage.expectLoaded();
  });
});
