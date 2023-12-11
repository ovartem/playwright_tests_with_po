/* eslint-disable lines-between-class-members */
/* eslint-disable no-extra-semi */
/* eslint-disable no-restricted-syntax */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
const { BaseSwagLabPage } = require('./BaseSwagLab.page');

// eslint-disable-next-line import/prefer-default-export
export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    get itemPrice() { return this.page.locator('.inventory_item_price'); }

    get inventoryItemName() { return this.page.locator('.inventory_item_name'); }

    get itemDescription() { return this.page.locator('.inventory_item_desc'); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async getCartItemByDesc(desc) { return this.page.locator(this.cartItemSelector, { hasText: desc }); }

    async getCartItemByPrice(price) { return this.page.locator(this.cartItemSelector, { hasText: price }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    };
    async getInfoOnRandomProductsinCart() {
        const productsInCart = await this.cartItems.all();
        const productsfullInfo = [];
        productsInCart.forEach(async (item) => {
            productsfullInfo.push({
                name: await this.getCartItemByName(item.name),
                desc: await this.getCartItemByDesc(item.desc),
                price: await this.getCartItemByPrice(item.price),
            });
        });
        return productsfullInfo;
    };

}
