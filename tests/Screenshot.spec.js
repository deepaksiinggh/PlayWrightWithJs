import {expect, test} from'@playwright/test';

test('my test',async ({page})=>{
await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
// visible screen
//  await page.screenshot({path:'landing.png'});

//full page
// await page.screenshot({path:'fullpage.png',fullPage:true});

//element
const checkbox = page.locator('#checkBoxOption1');
await checkbox.screenshot({path:'element.jpg'});
})


test.only('visual testing',async ({page})=>{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  expect(await page.screenshot()).toMatchSnapshot('match.png');
})