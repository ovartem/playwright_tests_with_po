import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    cartItemTitle = this.page.getByTestId('inventory-item-name');

    cartDescTitle = this.page.getByTestId('inventory-item-desc');

    cartItemPrice = this.page.getByTestId('inventory-item-price');

    headerTitle = this.page.locator('.title');

    cartItems = this.page.locator(this.cartItemSelector);

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

    async getItemNameById(linkId) {
        const itemTitle = await this.page.locator(`#${linkId} >> [data-test='inventory-item-name']`).textContent();
        const itemDesc = await this.page.locator(`#${linkId} + div[data-test='inventory-item-desc']`).textContent();
        const itemPrice = await this.page.locator(`#${linkId} ~ div[class='item_pricebar'] > div[data-test='inventory-item-price'] `).textContent();
        return { linkId, itemTitle, itemDesc, itemPrice};
    }

    async getItemDescId(id) {
        return this.page.locator(`#${id} >> [data-test='inventory-item-desc]`);
    }

    async getItemPriceId(id) {
        return this.page.locator(`#${id} >> [data-test='inventory-item-price']`);
    }
}
