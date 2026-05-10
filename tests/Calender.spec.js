import {test,expect} from '@playwright/test';

test('Calender',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker--closed').click();
     const clickMultiple = page.locator('.react-calendar__navigation__label__labelText');
     await clickMultiple.click();
     await clickMultiple.click();

     const day ="16";
     const month="7";
     const year ="2029";

     const expectDate = [month,day,year];

     await page.getByText(year).click();
     await page.locator('abbr').nth(month-1).click();
     await page.locator(`//abbr[text()='${day}']`).click();


     const dates = page.locator('.react-date-picker__inputGroup input');
     for(let i=1;i<=expectDate.length;i++){
        const val=await dates.nth(i).inputValue();
        expect(val).toEqual(expectDate[i-1]);
     }


})