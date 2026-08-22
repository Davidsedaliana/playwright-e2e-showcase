import { defineConfig, devices } from "@playwright/test";

/**
 * Два независимых блока:
 *  - ui-*  — E2E-сценарии магазина saucedemo.com в трёх браузерах
 *  - api   — тесты REST API dummyjson.com через APIRequestContext
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [
    ["list"],
    ["allure-playwright", { resultsDir: "allure-results" }],
  ],
  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "ui-chromium",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Chrome"], baseURL: "https://www.saucedemo.com" },
    },
    {
      name: "ui-firefox",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Firefox"], baseURL: "https://www.saucedemo.com" },
    },
    {
      name: "ui-webkit",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Safari"], baseURL: "https://www.saucedemo.com" },
    },
    {
      name: "api",
      testDir: "./tests/api",
      use: { baseURL: "https://dummyjson.com" },
    },
  ],
});
