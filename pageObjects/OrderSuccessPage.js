import {expect} from '@playwright/test'
class OrderSuccessPage{

constructor(page){
    this.page=page;
    this.orderSuccessMsg=page.locator('.hero-primary')
    this.orderID=page.locator('.em-spacer-1 label').last()  
    this.myOrdersLink= page.locator("[routerlink*='myorders']").first()

}

async verifyOrderSuccessMsg(){
    await expect(this.orderSuccessMsg).toHaveText(' Thankyou for the order. ')
    const orderNum = await this.orderID.textContent()
    console.log(orderNum)
    const getOrderNumber = orderNum.replaceAll('|','').trim()
    console.log(getOrderNumber)

    return getOrderNumber
}

async navigateToOrdersPage(){
    expect(this.myOrdersLink).toBeVisible()
    await this.myOrdersLink.click()
    
}

}
module.exports={OrderSuccessPage}
