const { BasePage } = require('./Base.page');

// eslint-disable-next-line import/prefer-default-export
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
