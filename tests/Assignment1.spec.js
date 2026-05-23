import { test, expect } from "@playwright/test";

const email = "deepak@mailinator.com";
const pwd = "Deepak@1234";
// registeration
test("Assignment 1", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/register");
  await page.getByTestId("register-email").fill(email);
  await page.getByTestId("register-password").fill(pwd);
  await page.getByPlaceholder("Repeat your password").fill(pwd);
  await page.getByRole("button", { name: "Create Account" }).click();
  const home = page.locator("#nav-home");
  await expect(home).toHaveText("Home");
});

//login

test.only("login", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("password").fill(pwd);
  await page.locator("#login-btn").click();
  const home = page.getByText('Browse Events').nth(1);
  await expect(home).toBeVisible();
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.locator('.relative a').nth(0).click();
  await page.getByTestId('event-title-input').fill('Deepak Event');
  await page.getByPlaceholder('Describe the event…').fill('hello this  is oraganized by deepak');
  await page.locator('#category').selectOption({label:'Concert'});
  await page.locator('#city').fill("Rewa");
  await page.locator('#venue').fill('village post ghopi district rewa madhyapradesh');
  const now = new Date();

const formattedDate =
  now.getFullYear() + '-' +
  String(now.getMonth() + 1).padStart(2, '0') + '-' +
  String(now.getDate()).padStart(2, '0') + 'T' +
  String(now.getHours()).padStart(2, '0') + ':' +
  String(now.getMinutes()).padStart(2, '0');
console.log(formattedDate);
await page.locator('[id="event-date-&-time"]').fill(formattedDate);
await page.locator('[id="price-($)"]').fill('200');
await page.locator('#total-seats').fill('1200');
await page.locator('[id="image-url-(optional)"]').fill("https://pixabay.com/photos/bird-blue-clouds-weather-pen-8788491/");
await page.getByRole('button', { name: 'Add Event' }).click();


  
});
