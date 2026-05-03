import { test } from "@playwright/test";

test("childwindow", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const link = page.locator(".float-right a");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    link.nth(0).click(),
  ]);
    await newPage.waitForLoadState();
  const email = await newPage.locator(".im-para  strong a").textContent();
  const emailinput = page.locator("#username");
  await emailinput.fill(email);
  page.pause();
  console.log(await emailinput.inputValue());
});
