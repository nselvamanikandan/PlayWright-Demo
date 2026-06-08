const {test, expect,request} = require('@playwright/test');
const loginPayload = {userEmail: "nselvamanikandan@gmail.com", userPassword: "Test@1234567"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let token;
let orderID;


test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: loginPayload
        }
    )
    expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson = await loginResponse.json()
     token = loginResponseJson.token
    console.log(token)

    //
   const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers:{
                Authorization: token,
                contentType: 'application/json'

            }
        }
    )
    const orderResponseJson = await orderResponse.json()
    console.log(orderResponseJson)
   orderID =  orderResponseJson.orders[0]






    

})

test('Client Login App',async({page}) => {

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value)

    }, token)   

 
    await page.goto('https://rahulshettyacademy.com/client/')
     
     await page.locator("[routerlink*='myorders']").first().click()

      const orderidList = await page.locator('tbody tr th')
      await orderidList.last().waitFor()
      const orderCount = await orderidList.count()
         for(let i=0;i<orderCount;++i)
    {   
        const text =await page.locator('tbody tr th').nth(i).textContent()
        console.log(text)
        if(text.trim() === orderID){
            console.log('Order ID matched')
            await page.locator('td button.btn-primary').nth(i).click()
            break;
        }

     }
       await expect(page.locator('div.-main')).toContainText(orderID)


 await page.pause()


})
    