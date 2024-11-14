// import { expect } from '@playwright/test';
import { BasePage } from './Base.page';

export class CheckOut extends BasePage {
    url = '/checkout-step-one.html';

    headerTitle = this.page.locator('.title');

    firstNameInput = this.page.locator('#first-name');

    lastNameInput = this.page.locator('#last-name');

    postCodeInput = this.page.locator('#postal-code');

    continueButton = this.page.getByTestId('continue');

    async fillCheckoutData(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postCodeInput.fill(postalCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
}
