import { expect, test } from "@playwright/test";

test.describe("API: товары", () => {
  test("список товаров: пагинация и обязательные поля", async ({ request }) => {
    const resp = await request.get("/products?limit=10&skip=20");
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.products).toHaveLength(10);
    expect(body.skip).toBe(20);
    expect(body.total).toBeGreaterThan(100);
    for (const p of body.products) {
      expect(p.id).toEqual(expect.any(Number));
      expect(p.title).toEqual(expect.any(String));
      expect(p.price).toBeGreaterThan(0);
    }
  });

  test("товар по id", async ({ request }) => {
    const resp = await request.get("/products/1");
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
  });

  test("несуществующий id — 404 с сообщением", async ({ request }) => {
    const resp = await request.get("/products/999999");
    expect(resp.status()).toBe(404);
    expect((await resp.json()).message).toContain("not found");
  });

  test("поиск возвращает только релевантные товары", async ({ request }) => {
    const resp = await request.get("/products/search?q=phone");
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("создание товара возвращает id и присланные поля", async ({ request }) => {
    const resp = await request.post("/products/add", {
      data: { title: "Тестовый товар", price: 42 },
    });
    expect(resp.status()).toBe(201);
    const body = await resp.json();
    expect(body.id).toEqual(expect.any(Number));
    expect(body.title).toBe("Тестовый товар");
    expect(body.price).toBe(42);
  });

  test("обновление товара меняет только присланное поле", async ({ request }) => {
    const resp = await request.put("/products/1", {
      data: { title: "Переименованный товар" },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.id).toBe(1);
    expect(body.title).toBe("Переименованный товар");
  });

  test("удаление товара помечает его isDeleted", async ({ request }) => {
    const resp = await request.delete("/products/1");
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.isDeleted).toBe(true);
    expect(body.deletedOn).toBeTruthy();
  });
});
