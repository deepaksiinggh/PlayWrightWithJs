import { test, expect, request } from '@playwright/test';

const loginPayload = {
    userEmail: "tdeepakxyz@gmail.com",
    userPassword: "Deepak@1234"
}

let token;

test.beforeAll(async () => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();

    token = loginResponseJson.token;
});

test('test1', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    await page.locator('.card-body').first().waitFor();

    await page
        .locator('.card-body')
        .filter({ hasText: 'ZARA COAT 3' })
        .getByRole('button', { name: 'Add to cart' })
        .click();

    await page.getByRole('listitem')
        .getByRole('button', { name: 'Cart' })
        .click();

    await page.getByText('My Cart').waitFor();

    await expect(page.getByText('ZARA COAT 3')).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.locator('.container-fluid').waitFor();

    await page.getByPlaceholder('Select Country')
        .pressSequentially('ind');

    await page.getByRole('button', { name: 'India' })
        .nth(1)
        .click();

    await page.locator('.action__submit').click();

    const idsshow = page.getByText(' Thankyou for the order. ');

    await idsshow.waitFor();

    const orderId = await page.locator('td label')
        .nth(1)
        .textContent();

    await page.getByRole('listitem')
        .getByRole('button', { name: 'ORDERS' })
        .click();

    await page.getByText('Your Orders').waitFor();

    const allOrderHistory = page.locator("tbody .ng-star-inserted");

    const allOrderHistoryCount = await allOrderHistory.count();

    await page.pause();

    for (let i = 0; i < allOrderHistoryCount; i++) {

        const orderid = await allOrderHistory
            .nth(i)
            .locator("th")
            .textContent();

        if (orderid && orderId.includes(orderid)) {

            await allOrderHistory
                .nth(i)
                .locator("td .btn-primary")
                .click();

            break;
        }
    }

    await expect(page.locator("div .tagline"))
        .toHaveText("Thank you for Shopping With Us");
});