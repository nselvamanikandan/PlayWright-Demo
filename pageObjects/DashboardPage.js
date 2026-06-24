import {expect} from '@playwright/test'
class DashboardPage {
    

    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
       // this.productName = page.locator('.card-body b');
        this.ProductName = page.locator('ZARA COAT 3');
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddtoCart(productName) {

        await expect(this.products.first()).toBeVisible()
        const Count = await this.products.count()
    
            for(let i=0;i<Count;++i)
            { 
                
               if(await this.products.nth(i).locator('b').textContent() === productName) 
               {
                    await this.products.nth(i).locator('text=Add To Cart').click()
                    break;
        
                }
            }


    }  
    
    async navigateToCart() {
       await this.cart.click();
    }

}
module.exports = {DashboardPage}


