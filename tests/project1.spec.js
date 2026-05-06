import { test, expect } from "@playwright/test";

let emails = "tdeepakxyz@gmail.com";
let pwds = "Deepak@1234";
test("signup page", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
  await expect(page).toHaveTitle("Let's Shop");

  const name = page.locator("#firstName");
  const lName = page.locator("#lastName");
  const email = page.locator("#userEmail");
  const phone = page.locator("#userMobile");
  const occupation = page.locator("[formcontrolname='occupation']");
  const gender = page.locator("[formcontrolname='gender'][value='Male']");

  const pwd = page.locator("#userPassword");
  const cnfPwd = page.locator("#confirmPassword");
  const terms = page.locator("[type='checkbox']");
  const submitbtn = page.locator("#login");

  const sucess = page.locator(".headcolor");

  await name.fill("Deepak");
  await lName.fill("Singh");
  await email.fill(emails);
  await phone.fill("9981410004");
  await occupation.selectOption("2: Student");
  await gender.click();
  await pwd.fill(pwds);
  await cnfPwd.fill(pwds);
  await terms.click();
  await submitbtn.click();
  await expect(sucess).toHaveText("Account Created Successfully");
});

test.only("login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const email = page.locator("#userEmail");
  await email.fill(emails);
  const pwd = page.locator("#userPassword");
  await pwd.fill(pwds);
  const login = page.locator("#login");
  await login.click();
  await expect(page).toHaveURL(/dashboard/);
});
