const{test, expect} =require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Verify Google homepage url',async({page})=>{
    await page.goto('https://www.google.com/')
    await expect(page).toHaveURL('https://www.google.com/')
    console.log('URL is correct '+page.url())
})

test('Verify Rahul Shetty Academy Login',async({page})=>{
     
    const Username= page.locator('#username')
    const Password= page.locator('#password')
    const SignInBtn= page.locator('#signInBtn')
    const CardTitles= page.locator('.card-body a')

    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    console.log(await page.title())
    await Username.fill('rahulshettyacademy')
    await Password.fill('12345678')
    await SignInBtn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    
    await Username.clear()
    await Username.fill('rahulshettyacademy')
    await Password.fill('Learning@830$3mK2')
    await SignInBtn.click()
   console.log( await CardTitles.first().textContent())
   console.log( await CardTitles.nth(1).textContent())
   const Alltextcontents = await CardTitles.allTextContents()
   console.log(Alltextcontents)

})

test('Client Login App',async({page}) => {

    const email = "nselvamanikandan@gmail.com"
    const Username= page.locator('#userEmail')
    const Password= page.locator('#userPassword')
    const LoginBtn= page.locator('#login')
    const Products= page.locator('.card-body')
    const ProductName= page.locator('ZARA COAT 3')
    const CouponSuccess = page.locator('.ng-dirty p')
    //const CardNumber = page.locator("[fdprocessedid='5xwkwa']")
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop")
    await Username.fill(email)
    await Password.fill('Test@1234567')
    await LoginBtn.click() 
    await page.waitForLoadState('networkidle')
    //await page.CardTitles.first().waitFor() 
    const Alltextcontents = await page.locator('.card-body').allTextContents()
    console.log(Alltextcontents)

    const Count = await Products.count()
    await page.waitForLoadState('networkidle')
    for(let i=0;i<Count;++i)
    {
        const text = await Products.nth(i).locator('b').textContent()
        console.log(text)
        if(text.includes(ProductName)) 
        {
            await Products.nth(i).locator('text=Add To Cart').click()
            break;

        }
    }
     await page.locator("[routerlink*='cart']").click()
     await page.locator('div li').first().waitFor()
     await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible()
     await page.locator('text=Checkout').click()
     await page.locator("[placeholder*='Country']").pressSequentially('Ind')
     const dropdown = page.locator('.ta-results')
     await dropdown.waitFor()
     const ddCount = await dropdown.locator('button').count()
     for(let i=0;i<ddCount;++i)
     {
        const text = await dropdown.locator('button').nth(i).textContent()
        if(text.trim() === 'India'){
            await dropdown.locator('button').nth(i).click()
            break;
        }


    }
     await expect(page.locator('.user__name  label')).toHaveText(email)
     await page.locator('.ng-untouched input').first().fill('1111 2222 3333 4444')
    await page.locator('.ng-untouched select').first().selectOption('03')
     await page.locator('.ng-untouched select').last().selectOption('15')
     await page.locator('.ng-untouched input').nth(2).fill('Selvamanikandan')
     await page.locator('.ng-untouched input').nth(1).fill('123')
     await page.locator('.ng-untouched input').last().fill('rahulshettyacademy')
     await page.locator('.btn-primary').click()
     await CouponSuccess.waitFor()
     await expect(CouponSuccess).toHaveText('* Coupon Applied')
     const PlaceOrderBtn = page.locator('.payment__shipping a')
     const enabled = await PlaceOrderBtn.isEnabled()
     console.log(enabled)
     await PlaceOrderBtn.click()
     await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
     const orderID = await page.locator('.em-spacer-1 label').last().textContent()
    console.log(orderID)
   const order = orderID.replaceAll('|','').trim()
   console.log(order)
     
     await page.locator("[routerlink*='myorders']").first().click()

      const orderidList = await page.locator('tbody tr th')
      await orderidList.last().waitFor()
      const orderCount = await orderidList.count()
         for(let i=0;i<orderCount;++i)
    {
        const text =await page.locator('tbody tr th').nth(i).textContent()
        console.log(text)
        if(text.trim() === order){
            console.log('Order ID matched')
            await page.locator('td button.btn-primary').nth(i).click()
            break;
        }

     }
       await expect(page.locator('div.-main')).toContainText(order)


 await page.pause()


})

test('Test UI controls',async({page}) => {

    const Username= page.locator('#username')
    const Password= page.locator('#password')
    const Dropdown= page.locator('select.form-control')
    const radioBtn= page.locator('.radiotextsty')
    const chckbox= page.locator('#terms')
    const webpopup= page.locator('#okayBtn')
    const blinklink= page.locator("[href*='documents-request']")

   await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
   await Dropdown.selectOption('consult')
   await radioBtn.last().click()
   await webpopup.click()
   await expect(radioBtn.last()).toBeChecked()
   await chckbox.click()
   await expect(blinklink).toHaveAttribute('class','blinkingText')

})

test('Test Child Windows handle',async({ browser }) => {


    const context = await browser.newContext()
    const page = await context.newPage()
    const blinklink= page.locator("[href*='documents-request']")
    const Username= page.locator('#username')

       await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
      
       const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinklink.click(),
       ])

       const text =await newPage.locator('.red').textContent()
       console.log(text)
       const domainText = text.split('@')[1].split(' ')[0].split('.')[0]
         console.log(domainText)
         await page.locator('#username').fill(domainText)
         console.log(await page.locator('#username').inputValue())
         await page.pause()




})