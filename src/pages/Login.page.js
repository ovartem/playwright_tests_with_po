const { BasePage } = require('./Base.page');

export class LoginPage extends BasePage {
    get userName() { return this.page.locator('#user-name'); }

    get password() { return this.page.locator('#password'); }

    get loginBtn() { return this.page.locator('#login-button'); }

    // eslint-disable-next-line linebreak-style
    async performLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
