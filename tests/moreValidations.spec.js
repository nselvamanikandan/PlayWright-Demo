const {test,expect}= require('@playwright/test')

//test.describe.configure({mode: 'parallel'})
test('Validate form fields',async({page})=>{

    
    // await page.goto('https://www.amazon.in/')
    // await page.goBack()
    // await page.goForward()
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed-text')).toBeHidden()
    page.on('dialog', dialog => dialog.accept())
    await page.locator('#confirmbtn').click()
    await page.locator('#mousehover').hover()
   const childFrame = page.frameLocator('#courses-iframe')
   await childFrame.locator("a[href*='lifetime-access']:visible").click()
   const gettext =  await childFrame.locator('.text h2').textContent()
   console.log(gettext.split(' ')[1])


})

test('Validate Screenshot',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await page.screenshot({path:'screenshot.png'})

})

test('Validate Visual testing',async({page})=>{

    await page.goto('https://www.stable.work/')
    expect(await page.screenshot()).toMatchSnapshot('Screenshot1.png')


})