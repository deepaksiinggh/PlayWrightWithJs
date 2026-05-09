import { test, expect } from "@playwright/test";

test("project 2", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("Deepak@1234");
  await page.locator("[name='email']").fill("Deepak@gmail.com");
  await page.getByRole("button", { name: "submit" }).click();
  const sucess = await page
    .getByText("The Form has been submitted successfully!.")
    .isVisible();
  expect(sucess).toBeTruthy();

  await page.getByRole("link", { name: "Shop" }).click();
  const shopPage = page.locator("div .navbar-brand");
  await expect(shopPage.last()).toHaveText("ProtoCommerce Home");
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});
