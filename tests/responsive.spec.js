import { test, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 13']
});

test('mobile test', async ({ page }) => {

  await page.goto('https://www.makinfashion.com/');

  // Opens Playwright Inspector and pauses execution
  await page.pause();

});