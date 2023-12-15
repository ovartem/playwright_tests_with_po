/* eslint-disable no-extra-semi */
/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutPage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    get firstName() { return this.page.locator('#first-name'); }

    get lastName() { return this.page.locator('#last-name'); }

    get zipCode() { return this.page.locator('#postal-code'); }

    get continueBtn() { return this.page.locator('.submit-button'); }

    // eslint-disable-next-line linebreak-style
    async fillCustomerData(firstName, lastName, zipCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
        await this.continueBtn.click();
    };
};
