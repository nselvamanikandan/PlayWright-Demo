import {expect} from '@playwright/test'

class CheckOutPage{

    constructor(page) {
       this.page = page;
       this.couponSuccess = page.locator('.ng-dirty p')
       this.emailLbl = page.locator('.user__name  label')
       this.cardNumber = page.locator('.ng-untouched input').first()
       this.month = page.locator('.ng-untouched select').first()
       this.year = page.locator('.ng-untouched select').last()
       this.name = page.locator('.ng-untouched input').nth(2)
       this.cvv = page.locator('.ng-untouched input').nth(1)
       this.promoCode = page.locator('.ng-untouched input').last()
       this.selectCountry = page.locator("[placeholder*='Country']")
       this.dropdown = page.locator('.ta-results')
       this.placeOrderBtn = page.locator('.payment__shipping a')
       this.applyCouponBtn = page.locator('.btn-primary')


    }

    async fillPersonalDetails(cardNumber,month,day,name,cvv,promoCode)
    {
        await expect(this.cardNumber).toBeVisible()
        await this.cardNumber.fill(cardNumber)
        await this.month.selectOption(month)
        await this.year.selectOption(day)
        await this.name.fill(name)
        await this.cvv.fill(cvv)
        await this.promoCode.fill(promoCode)
        
    }

    async validateCouponSuccess()
    {

        await this.applyCouponBtn.click()
        await expect(this.couponSuccess).toBeVisible()
        await expect(this.couponSuccess).toHaveText('* Coupon Applied')
    }

    async fillShippingDetails(country)
    {
        await this.selectCountry.pressSequentially('Ind')
        await expect(this.dropdown).toBeVisible()
        const ddCount = await this.dropdown.locator('button').count()

            for(let i=0;i<ddCount;++i)
            {
            const text = await this.dropdown.locator('button').nth(i).textContent()
            if(text.trim() === 'India')
            {
            await this.dropdown.locator('button').nth(i).click()
            break;
            }

          }

    } 

    async clickPlaceOrder()
    {
        await expect(this.placeOrderBtn).toBeVisible()
        await this.placeOrderBtn.click()
    }   
    
}
module.exports = {CheckOutPage}