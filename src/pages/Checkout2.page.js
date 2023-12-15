const { BaseSwagLabPage } = require('./BaseSwagLab.page');

// eslint-disable-next-line import/prefer-default-export
export class CheckoutPage2 extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    cartItemSelector = '.cart_item';

    get itemPrice() { return this.page.locator('.inventory_item_price'); }

    get inventoryItemName() { return this.page.locator('.inventory_item_name'); }

    get itemDescription() { return this.page.locator('.inventory_item_desc'); }

    get finalPrice() { return this.page.locator('.summary_subtotal_label'); } 
    

    checkoutItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name });
    }

    checkoutItemDescriptionByName(name) {
        return this.checkoutItemByName(name).locator(this.itemDescription);
    }

    checkoutItemPriceByName(name) {
        return this.checkoutItemByName(name).locator(this.itemPrice);
    }
}