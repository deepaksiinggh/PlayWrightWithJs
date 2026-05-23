import {test,expect} from '@playwright/test';

test('navigation and hidden ',async({page})=>{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
//   await page.goto('https://www.google.com/');
//   await page.goBack();
//   await page.goForward();
//   await page.goBack();
await page.pause();
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();

  await expect(page.locator('#displayed-text')).toBeHidden();
  page.on('dialog',dialog=>{
    dialog.dismiss();
  })
  
  await page.locator('#confirmbtn').click();
  await page.locator('#mousehover').hover();

  const frame1=  page.frameLocator('#courses-iframe');
  const text = await frame1.locator('.count-text').nth(0).textContent();
  console.log(text);
})