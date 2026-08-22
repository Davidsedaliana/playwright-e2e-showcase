import { expect, test } from "@playwright/test";

test.describe("API: авторизация", () => {
  test("логин с валидными кредами возвращает токен и профиль", async ({ request }) => {
    const resp = await request.post("/auth/login", {
      data: { username: "emilys", password: "emilyspass" },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.accessToken).toBeTruthy();
    expect(body.username).toBe("emilys");
    expect(body.email).toContain("@");
  });

  test("неверный пароль — 400 и сообщение об ошибке", async ({ request }) => {
    const resp = await request.post("/auth/login", {
      data: { username: "emilys", password: "totally-wrong" },
    });
    expect(resp.status()).toBe(400);
    const body = await resp.json();
    expect(body.message).toContain("Invalid credentials");
  });

  test("защищённый ресурс без токена не отдаётся", async ({ request }) => {
    const resp = await request.get("/auth/me");
    expect(resp.ok()).toBeFalsy();
  });

  test("защищённый ресурс с токеном отдаёт текущего пользователя", async ({ request }) => {
    const login = await request.post("/auth/login", {
      data: { username: "emilys", password: "emilyspass" },
    });
    const { accessToken } = await login.json();

    const me = await request.get("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(me.status()).toBe(200);
    expect((await me.json()).username).toBe("emilys");
  });
});
