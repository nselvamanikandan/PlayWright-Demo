import {test, expect} from '@playwright/test'
const { text } = require('node:stream/consumers');
import {POmanager} from '../pageObjects/POmanager' 
import {OrderSuccessPage} from '../pageObjects/OrderSuccessPage'
const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')))


test('@Smoke Verify Google homepage url',async({page})=>{
    await page.goto('https://www.google.com/')
    await expect(page).toHaveURL('https://www.google.com/')
    console.log('URL is correct '+page.url())
})

// test('Verify Rahul Shetty Academy Login',async({page})=>{
     
//     const Username= page.locator('#username')
//     const Password= page.locator('#password')
//     const SignInBtn= page.locator('#signInBtn')
//     const CardTitles= page.locator('.card-body a')

    
//     await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
//     await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
//     console.log(await page.title())
//     await Username.fill('rahulshettyacademy')
//     await Password.fill('12345678')
//     await SignInBtn.click()
//     console.log(await page.locator("[style*='block']").textContent())
//     await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    
//     await Username.clear()
//     await Username.fill('rahulshettyacademy')
//     await Password.fill('Learning@830$3mK2')
//     await SignInBtn.click()
//    console.log( await CardTitles.first().textContent())
//    console.log( await CardTitles.nth(1).textContent())
//    const Alltextcontents = await CardTitles.allTextContents()
//    console.log(Alltextcontents)

// })


for (const data of dataset) {
test(`@Smoke Client Login App - ${data.productName}`, async ({ page }) => {

    const poManager = new POmanager(page)

    const loginPage = poManager.getLoginPage()
    await loginPage.loadUrl('https://rahulshettyacademy.com/client/#/auth/login')
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop")
    await loginPage.validLogin(data.email,data.password)

    //await page.waitForLoadState('networkidle')
    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProductAddtoCart(data.productName)
    await dashboardPage.navigateToCart()

    const cartPage = poManager.getCartPage()
    await cartPage.verifyProductDisplay(data.productName)
    await cartPage.clickCheckout()

    const checkoutPage = poManager.getCheckoutPage()
    await checkoutPage.fillPersonalDetails('4111111111111111','11','15','N Selva Manikandan','123','rahulshettyacademy')
    await checkoutPage.validateCouponSuccess()
    await checkoutPage.fillShippingDetails('India')
    await checkoutPage.placeOrderBtn.click()

    const orderSuccessPage = poManager.getOrderSuccessPage()
    // Step 1: verify success and capture order number
    const order =await orderSuccessPage.verifyOrderSuccessMsg()
    // Step 2: navigate to Orders page
    await orderSuccessPage.navigateToOrdersPage()
    // Step 3: validate order number in Orders page
    const myOrdersPage = poManager.getMyOrdersPage()
    await myOrdersPage.validateOrderID(order)

  


})
}

// test('Test UI controls',async({page}) => {

//     const Username= page.locator('#username')
//     const Password= page.locator('#password')
//     const Dropdown= page.locator('select.form-control')
//     const radioBtn= page.locator('.radiotextsty')
//     const chckbox= page.locator('#terms')
//     const webpopup= page.locator('#okayBtn')
//     const blinklink= page.locator("[href*='documents-request']")

//    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
//    await Dropdown.selectOption('consult')
//    await radioBtn.last().click()
//    await webpopup.click()
//    await expect(radioBtn.last()).toBeChecked()
//    await chckbox.click()
//    await expect(blinklink).toHaveAttribute('class','blinkingText')

// })

// test('Test Child Windows handle',async({ browser }) => {


//     const context = await browser.newContext()
//     const page = await context.newPage()
//     const blinklink= page.locator("[href*='documents-request']")
//     const Username= page.locator('#username')

//        await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
      
//        const [newPage] = await Promise.all([
//         context.waitForEvent('page'),
//         blinklink.click(),
//        ])

//        const text =await newPage.locator('.red').textContent()
//        console.log(text)
//        const domainText = text.split('@')[1].split(' ')[0].split('.')[0]
//          console.log(domainText)
//          await page.locator('#username').fill(domainText)
//          console.log(await page.locator('#username').inputValue())
//          await page.pause()




// })