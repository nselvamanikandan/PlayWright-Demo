class LoginPage{

constructor(page){
    this.page = page
    this.Username= page.locator('#userEmail')
    this.Password= page.locator('#userPassword')
    this.LoginBtn= page.locator('#login')
}

async validLogin(username,password){
    await this.Username.fill(username)
    await this.Password.fill(password)
    await this.LoginBtn.click()
}

async loadUrl(url){
    await this.page.goto(url)

}

}
module.exports = {LoginPage}