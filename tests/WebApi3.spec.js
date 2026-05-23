import {test,expect} from '@playwright/test'

let emails = "tdeepakxyz@gmail.com";
let pwds = "Deepak@1234";
let webContext;
test('login trest',async({browser})=>{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const email = page.locator("#userEmail");
  await email.fill(emails);
  const pwd = page.locator("#userPassword");
  await pwd.fill(pwds);
  const login = page.locator("#login");
  await login.click();
  await expect(page).toHaveURL(/dashboard/);

  await context.storageState({path:'state.json'});
 webContext =  await browser.newContext({storageState:'state.json'})
})


test('test 2',async()=>{
const page =await webContext.newPage();
await page.goto('https://rahulshettyacademy.com/client');
     await page.locator('.card-body').filter({hasText:'ZARA COAT 3'}).getByRole('button',{name:'Add to cart'}).click();
  await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();
  await page.getByText('My Cart').waitFor();
  await expect(page.getByText('ZARA COAT 3')).toBeVisible();
  await page.getByRole('button',{name:'Checkout'}).click();


await page.locator('.container-fluid').waitFor();
await page.getByPlaceholder('Select Country').pressSequentially('ind');
await page.getByRole('button',{name:'India'}).nth(1).click();
await page.locator('.action__submit').click();

const idsshow=page.getByText(' Thankyou for the order. ');
await idsshow.waitFor();


const orderId=await page.locator('td label').nth(1).textContent();
await page.getByRole('listitem').getByRole('button',{name:'ORDERS'}).click();

await page.getByText('Your Orders').waitFor();


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
})