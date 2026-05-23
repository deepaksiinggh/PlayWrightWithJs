import { test, expect, request } from '@playwright/test';
const { ApiUtils } = require('./utils/ApiUtils');

const loginPayload = {
    userEmail: "tdeepakxyz@gmail.com",
    userPassword: "Deepak@1234"
};

const orderPayload = {
    orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }]
};

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();

    const apiUtils = new ApiUtils(apiContext, loginPayload);

    response = await apiUtils.createOrder(orderPayload);

});

test('API Test', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    await page.getByRole('listitem')
        .getByRole('button', { name: 'ORDERS' })
        .click();

    await page.getByText('Your Orders').waitFor();

    const allOrderHistory = page.locator("tbody tr");

    const count = await allOrderHistory.count();

    for (let i = 0; i < count; i++) {

        const orderIdText = await allOrderHistory
            .nth(i)
            .locator("th")
            .textContent();

        if (orderIdText.includes(response.orderId)) {

            await allOrderHistory
                .nth(i)
                .locator(".btn-primary")
                .click();

            break;
        }
    }

    await expect(page.locator(".tagline"))
        .toHaveText("Thank you for Shopping With Us");

});