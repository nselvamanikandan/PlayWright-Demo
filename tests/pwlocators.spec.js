const{test,expect} = require('@playwright/test')
const { type } = require('node:os')
test('Testing Playwright Locators',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.getByPlaceholder('Password').fill('Test')
    await page.getByLabel('Check me out if you Love IceCreams!').check()
    await page.getByLabel('Gender').selectOption('Female')
    await page.getByRole('button', { name: 'Submit' }).click()
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible()
    await page.getByRole('link', { name: 'Shop' }).click()
    await page.locator('div.card').filter({ hasText: 'Nokia Edge'}).getByRole('button').click()





})