const { InventoryPage } = require('./Inventory.page');


export class CheckoutInfoPage extends InventoryPage {

    url = "/checkout-step-one.html";


    get firstName() { return this.page.locator('#first-name'); }

    get lastName() { return this.page.locator('#last-name'); }

    get postalCode() { return this.page.locator('#postal-code'); }

    get continueBtn(){return this.page.locator('#continue')}

    async performCheckoutInfo(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueBtn.click();
    }
}
