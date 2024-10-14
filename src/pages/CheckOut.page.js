// import { expect } from '@playwright/test';
import { BasePage } from './Base.page';

export class CheckOut extends BasePage {
    url = '/checkout-step-one.html';

    headerTitle = this.page.locator('.title');

    firstNameInput = this.page.locator('#first-name');

    lastNameInput = this.page.locator('#last-name');

    postCodeInput = this.page.locator('#postal-code');

    continueButton = this.page.locator('button[name="continue"]');

    async fillCheckoutData(firstName, lastName, postalCode) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', postalCode);
        await this.page.click('#continue');
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
}
