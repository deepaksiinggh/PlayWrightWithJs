import { test, expect } from "@playwright/test";

test("assignment", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const pageTitle = await page.title();
  console.log(pageTitle);

  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const login = page.locator("#login");

  await userName.fill("anshika@gmail.com");
  await password.fill("Iamking@000");
  await login.click();

  await page.waitForLoadState("networkidle");
  const productNames = await page.locator(".card-body b").allTextContents();

  console.log(productNames);
});
