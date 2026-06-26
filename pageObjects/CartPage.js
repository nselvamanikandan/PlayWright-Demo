import {expect} from '@playwright/test'
class CartPage{

    constructor(page){
        this.page=page;
        this.cartSection=page.locator('div li').first()
        this.checkoutBtn=page.locator('text=Checkout')
       
    }
    
async verifyProductDisplay(productName){
     await this.cartSection.waitFor()
     await expect(this.getProductLocator(productName)).toBeVisible()
    
}

async clickCheckout(){
    await this.checkoutBtn.click()  
}

getProductLocator(productName){

    return  this.page.locator("h3:has-text('"+productName+"')")

}





}
module.exports={CartPage}