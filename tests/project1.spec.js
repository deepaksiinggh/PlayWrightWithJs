import { test, expect } from "@playwright/test";

let emails = "tdeepakxyz@gmail.com";
let pwds = "Deepak@1234";
// test.skip("signup page", async ({ page }) => {
//   await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
//   await expect(page).toHaveTitle("Let's Shop");

//   const name = page.locator("#firstName");
//   const lName = page.locator("#lastName");
//   const email = page.locator("#userEmail");
//   const phone = page.locator("#userMobile");
//   const occupation = page.locator("[formcontrolname='occupation']");
//   const gender = page.locator("[formcontrolname='gender'][value='Male']");

//   const pwd = page.locator("#userPassword");
//   const cnfPwd = page.locator("#confirmPassword");
//   const terms = page.locator("[type='checkbox']");
//   const submitbtn = page.locator("#login");

//   const sucess = page.locator(".headcolor");

//   await name.fill("Deepak");
//   await lName.fill("Singh");
//   await email.fill(emails);
//   await phone.fill("9981410004");
//   await occupation.selectOption("2: Student");
//   await gender.click();
//   await pwd.fill(pwds);
//   await cnfPwd.fill(pwds);
//   await terms.click();
//   await submitbtn.click();
//   await expect(sucess).toHaveText("Account Created Successfully");
// });

test.beforeEach("login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const email = page.locator("#userEmail");
  await email.fill(emails);
  const pwd = page.locator("#userPassword");
  await pwd.fill(pwds);
  const login = page.locator("#login");
  await login.click();
  await expect(page).toHaveURL(/dashboard/);
});

test("add product in cart", async ({ page }) => {
  const productname = "ZARA COAT 3";
  const products = page.locator(".card");
  await products.nth(0).waitFor();
  let productCount = await products.count();
  for (let i = 0; i < productCount; i++) {
    const productName = await products.locator("b").nth(i).textContent();
    if (productName == productname) {
      await products.nth(i).locator("text=' Add To Cart'").click();
      break;
    }
  }

  await page.locator(':text-is("Cart")').click();

  await page.locator("div ul").nth(0).waitFor();

  const isProductPresent = await page
    .locator("h3:has-text('ZARA COAT 3')")
    .isVisible();
  expect(isProductPresent).toBeTruthy();

  // click cheackout

  await page.locator("button:has-text('Checkout')").click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  const dropdown = page.locator("section .ta-results");
  await dropdown.waitFor();
  const countries = dropdown.locator("button");
  const count = await countries.count();
  console.log(count);
  for (let i = 0; i < count; i++) {
    const country = await countries.nth(i).textContent();
    console.log(country);
    if (country === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await page.locator(".action__submit").click();

  const sucessOrder = page.locator(".hero-primary");
  await expect(sucessOrder).toHaveText(" Thankyou for the order. ");
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();

  console.log(orderId);

  const myorder = page.locator("li [routerlink*='myorders']");
  await myorder.click();
  await page.locator("tbody").waitFor();
  // verify order by order id

  const allOrderHistory = page.locator("tbody .ng-star-inserted");
  const allOrderHistoryCount = await allOrderHistory.count();
  page.pause();
  for (let i = 0; i < allOrderHistoryCount; i++) {
    const orderid = await allOrderHistory.nth(i).locator("th").textContent();
    console.log(orderId);
    if (orderId.includes(orderid)) {
      await allOrderHistory.nth(i).locator("td .btn-primary").click();
      break;
    }
  }

  await expect(page.locator("div .tagline")).toHaveText(
    "Thank you for Shopping With Us",
  );
});
