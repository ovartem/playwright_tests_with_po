import { BaseSwagLabPage } from "./BaseSwagLab.page";

export class InformForm extends BaseSwagLabPage{

    firstNameInput = this.page.locator('[data-test="firstName"]');

    lastNameInput = this.page.locator('[data-test="lastName"]')

    zipCodeInput = this.page.locator('[data-test="postalCode"]');

    continueButton = this.page.locator('[data-test="continue"]');

    async applyForm(firstName, lastName, zipCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }


}