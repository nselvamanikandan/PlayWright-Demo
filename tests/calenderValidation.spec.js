const{test,expect}=require('@playwright/test')
const { text } = require('node:stream/consumers')

test('Verify Calendar Validation',async({page})=>{

    const Year = '2027'
    const Month = '11'
    const Date = '16'
    const expectedList = [Month,Date,Year]

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    await page.locator('div.react-date-picker__inputGroup').click()
    await page.locator('.react-calendar__navigation__label__labelText').click()
    await page.locator('.react-calendar__navigation__label__labelText').click()
    await page.getByText(Year).click()
    await page.locator('.react-calendar__year-view__months__month').nth(Number(Month)-1).click()
    await page.locator("//abbr[text()='" + Date + "']").click()

   const actualList = await page.locator('.react-date-picker__inputGroup__input')
   for(let i=0;i<expectedList.length;i++){
     
    const actualValue = await actualList.nth(i).inputValue()
    expect(actualValue).toEqual(expectedList[i])
   }


})