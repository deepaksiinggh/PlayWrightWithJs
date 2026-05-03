import { test, expect } from "@playwright/test";
import { sign } from "node:crypto";
test("fourth class", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  console.log(title);

  const userName = page.locator("#username");
  const password = page.locator("[name='password']");
  const signin = page.locator("#signInBtn");

  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK21");
  await signin.click();

  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await password.clear();
  await password.fill("Learning@830$3mK2");
  await signin.click();

  const productName = page.locator(".card-body a");
  console.log(await productName.nth(1).textContent());
  console.log(await productName.first().textContent());
});
