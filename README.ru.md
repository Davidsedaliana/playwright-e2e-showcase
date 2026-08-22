# Playwright E2E Showcase

[![E2E](https://github.com/Davidsedaliana/playwright-e2e-showcase/actions/workflows/e2e.yml/badge.svg)](https://github.com/Davidsedaliana/playwright-e2e-showcase/actions/workflows/e2e.yml)
[![Allure Report](https://img.shields.io/badge/allure-live%20report-orange.svg)](https://davidsedaliana.github.io/playwright-e2e-showcase/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Набор E2E- и API-автотестов, который сам о себе отчитывается: каждый прогон
публикует живой [Allure-отчёт](https://davidsedaliana.github.io/playwright-e2e-showcase/)
с историей запусков — обновляется автоматически каждый день через CI.**

[English version →](README.md)

## Что внутри

- **19 UI-сценариев** на [saucedemo.com](https://www.saucedemo.com) — логин
  (позитив и негатив), сортировки каталога, корзина, полное оформление заказа
  с проверкой суммы — параллельно в **chromium, firefox и webkit**
- **11 API-тестов** на [dummyjson.com](https://dummyjson.com) — токен
  авторизации, защищённые ресурсы, CRUD, негативные кейсы — отдельным
  проектом в том же конфиге
- **Page Object Model** + свои фикстуры (`loggedIn` даёт каждому сценарию
  залогиненное состояние без копипасты шагов входа)
- **Трейс, видео и скриншоты** сохраняются на падениях
- **Allure-отчёт на GitHub Pages** с историей и трендами — деплоится CI
  на каждый push и раз в сутки по крону

## Быстрый старт

```
npm ci
npx playwright install
npm test              # все проекты: 3 браузера + API
```

Ещё команды:

```
npm run test:ui       # только UI (3 браузера)
npm run test:api      # только API
npm run test:headed   # посмотреть глазами, как ходит браузер
npm run allure:generate && npm run allure:open   # локальный отчёт
```

## Структура

```
pages/                Page Object'ы + фикстуры (LoginPage, InventoryPage, ...)
tests/ui/             E2E-сценарии: логин, каталог, корзина, оформление
tests/api/            API-тесты: авторизация, CRUD товаров
playwright.config.ts  4 проекта: ui-chromium / ui-firefox / ui-webkit / api
.github/workflows/    ежедневный cron -> тесты -> Allure -> GitHub Pages
```

## Лицензия

[MIT](LICENSE)
