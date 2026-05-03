import { test, expect } from "@playwright/test";

test("Handling ui", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");
  const option = page.locator("select.form-control");
  await option.selectOption("consult");
  await expect(option).toHaveValue("consult");
  await page.locator(".radiotextsty").nth(1).click();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.pause();
});
