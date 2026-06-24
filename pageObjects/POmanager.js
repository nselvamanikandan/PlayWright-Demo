const {LoginPage} = require('./LoginPage')
const {DashboardPage} = require('./DashboardPage')
const {Cartpage} = require('./Cartpage')

class POmanager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new Cartpage(this.page);
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
}
module.exports = {POmanager}