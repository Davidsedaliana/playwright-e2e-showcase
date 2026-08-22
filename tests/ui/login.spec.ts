import { expect, test, USERS } from "../../pages/fixtures";

test.describe("Авторизация", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test("успешный вход стандартным пользователем", async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();
  });

  test("неверный пароль — понятная ошибка", async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, "wrong_password");
    await loginPage.expectError("Username and password do not match");
  });

  test("заблокированный пользователь не входит", async ({ loginPage }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectError("Sorry, this user has been locked out");
  });

  test("пустой логин — ошибка Username is required", async ({ loginPage }) => {
    await loginPage.login("", USERS.standard.password);
    await loginPage.expectError("Username is required");
  });

  test("пустой пароль — ошибка Password is required", async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, "");
    await loginPage.expectError("Password is required");
  });

  test("выход возвращает на форму логина", async ({ loginPage, page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator("[data-test=\"logout-sidebar-link\"]").click();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
