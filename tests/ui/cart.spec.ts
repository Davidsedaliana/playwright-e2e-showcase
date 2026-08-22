import { test } from "../../pages/fixtures";

test.describe("Корзина", () => {
  test("добавленные товары видны в корзине", async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart("sauce-labs-backpack");
    await loggedIn.addToCart("sauce-labs-onesie");
    await loggedIn.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItems(["Sauce Labs Backpack", "Sauce Labs Onesie"]);
  });

  test("удаление в корзине обновляет список и счётчик", async ({ loggedIn, cartPage, inventoryPage }) => {
    await loggedIn.addToCart("sauce-labs-backpack");
    await loggedIn.addToCart("sauce-labs-onesie");
    await loggedIn.openCart();
    await cartPage.removeItem("sauce-labs-backpack");
    await cartPage.expectItems(["Sauce Labs Onesie"]);
    await inventoryPage.expectCartCount(1);
  });

  test("continue shopping возвращает в каталог, корзина не теряется", async ({ loggedIn, cartPage, inventoryPage }) => {
    await loggedIn.addToCart("sauce-labs-backpack");
    await loggedIn.openCart();
    await cartPage.continueShopping.click();
    await inventoryPage.expectLoaded();
    await inventoryPage.expectCartCount(1);
  });
});
