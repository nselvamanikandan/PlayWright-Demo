const{test, expect} =require('@playwright/test');
const { get } = require('node:http');
const { text } = require('node:stream/consumers');




test('Client Login App',async({page}) => {

    const email = "nselvamanikandan@gmail.com"
    const Username= page.getByPlaceholder('email@example.com')
    const Password= page.getByPlaceholder('enter your passsword')
    const LoginBtn= page.getByRole('button', { name: 'Login' })
   // const Products= page.locator('.card-body')
    const ProductName= page.locator('ZARA COAT 3')
    const CouponSuccess = page.locator('.ng-dirty p')
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop")
    await Username.fill(email)
    await Password.fill('Test@1234567')
    await LoginBtn.click() 
    await page.waitForLoadState('networkidle')

    await page.locator('.card-body').filter({ hasText: 'ZARA COAT 3' })
    .getByRole('button', { name: 'Add To Cart' }).click()
    await page.locator('button.btn-custom').nth(2).click()

     await page.locator('div li').last().waitFor()
     await page.getByText('ZARA COAT 3').isVisible()
     await page.getByRole('button', { name: 'Checkout' }).click()
     await page.getByPlaceholder('Select Country').pressSequentially('Ind')
     await page.getByRole('button', { name: 'India'}).nth(1).click()
     await page.getByLabel('nselvamanikandan@gmail.com').isVisible()
    
     await page.locator('.ng-untouched input').first().fill('1111 2222 3333 4444')
     await page.locator('.ng-untouched select').first().selectOption('03')
     await page.locator('.ng-untouched select').last().selectOption('15')
     await page.locator('.ng-untouched input').nth(2).fill('Selvamanikandan')
     await page.locator('.ng-untouched input').nth(1).fill('123')
     await page.locator('.ng-untouched input').last().fill('rahulshettyacademy')
     await page.getByRole('button', { name: 'Apply Coupon' }).click()
     await page.getByText('* Coupon Applied').waitFor()
     await page.getByText('Place Order ').click()


     await page.getByText(' Thankyou for the order. ').waitFor()
     const orderID = await page.locator('.em-spacer-1 label').last().textContent()
    console.log(orderID)
     await page.getByRole('button', { name: '  ORDERS' }).click()
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


//  await page.pause()


})



