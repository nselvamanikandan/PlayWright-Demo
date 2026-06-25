import {LoginPage} from './LoginPage'
import {DashboardPage} from './DashboardPage'
import {CartPage} from './CartPage'
import {CheckOutPage} from './CheckOutPage'
import {OrderSuccessPage} from './OrderSuccessPage'
import {MyOrdersPage} from './MyOrdersPage'


class POmanager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckOutPage(this.page);
        this.orderSuccessPage = new OrderSuccessPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getOrderSuccessPage(){

        return this.orderSuccessPage
    }

    getMyOrdersPage(){
        
        return this.myOrdersPage
    }


}
module.exports = {POmanager}