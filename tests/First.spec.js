import { test, expect } from "@playwright/test";

test("frist playwright test ", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/practice");
  const pageTitle = await page.title();
  console.log(pageTitle);
});

test("google", async ({ page }) => {
  await page.goto("https://www.google.com");
  await expect(page).toHaveTitle("Google");
});
