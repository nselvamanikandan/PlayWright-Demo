import {expect} from '@playwright/test'
class CartPage{

    constructor(page){
        this.page=page;
        this.cartSection=page.locator('div li').first()
        this.checkoutBtn=page.locator('text=Checkout')
        this.productName=page.locator("h3:has-text('ZARA COAT 3')")
    }
    
async verifyProductDisplay(productName){
     await this.cartSection.waitFor()
     await expect(this.productName).toBeVisible()
    
}

async clickCheckout(){
    await this.checkoutBtn.click()  
}





}
module.exports={CartPage}