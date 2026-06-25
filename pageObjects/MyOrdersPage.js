import {expect} from '@playwright/test'
class MyOrdersPage{

    constructor(page){
        this.page=page;
        this.orderidList = page.locator('tbody tr th')
        

    }
 
    async validateOrderID(order){
              await this.orderidList.last().waitFor()
            const orderCount = await this.orderidList.count()
            for(let i=0;i<orderCount;++i)
    {
            const text =await this.page.locator('tbody tr th').nth(i).textContent()
            console.log(text)
        if(text.trim() === order){
            console.log('Order ID matched')
            await this.page.locator('td button.btn-primary').nth(i).click()
            break;
        }

     }
     await expect(this.page.locator('div.-main')).toContainText(order)
    }

        

}
module.exports={MyOrdersPage}
