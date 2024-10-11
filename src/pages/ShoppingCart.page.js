import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    headerTitle = this.page.locator('.title');

    cartItems = this.page.locator(this.cartItemSelector);
    
    goToCheckout = this.page.locator('[data-test="checkout"]');

    // async below added to show the function returns a promise
    async getCartItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name });
    }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    cartItemsNameRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-name"])[${index}]`)};

    cartItemsDescRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-desc"])[${index}]`)};

    cartItemsPriceRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-price"])[${index}]`)};
}
