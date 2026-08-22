import { expect, test } from "../../pages/fixtures";

test.describe("Каталог", () => {
  test("показывает все 6 товаров с названием и ценой", async ({ loggedIn }) => {
    await expect(loggedIn.items).toHaveCount(6);
    const prices = await loggedIn.prices();
    expect(prices).toHaveLength(6);
    expect(prices.every((p) => p > 0)).toBe(true);
  });

  test("сортировка по цене: от дешёвых к дорогим", async ({ loggedIn }) => {
    await loggedIn.sortBy("lohi");
    const prices = await loggedIn.prices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test("сортировка по цене: от дорогих к дешёвым", async ({ loggedIn }) => {
    await loggedIn.sortBy("hilo");
    const prices = await loggedIn.prices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test("сортировка по имени Z→A", async ({ loggedIn }) => {
    await loggedIn.sortBy("za");
    const names = await loggedIn.names();
    expect(names).toEqual([...names].sort().reverse());
  });

  test("добавление товара увеличивает счётчик корзины", async ({ loggedIn }) => {
    await loggedIn.addToCart("sauce-labs-backpack");
    await loggedIn.expectCartCount(1);
    await loggedIn.addToCart("sauce-labs-bike-light");
    await loggedIn.expectCartCount(2);
  });

  test("удаление товара из каталога очищает счётчик", async ({ loggedIn }) => {
    await loggedIn.addToCart("sauce-labs-backpack");
    await loggedIn.expectCartCount(1);
    await loggedIn.removeFromCart("sauce-labs-backpack");
    await loggedIn.expectCartCount(0);
  });
});
