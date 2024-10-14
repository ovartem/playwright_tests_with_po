import { expect } from '@playwright/test';
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    headerTitle = this.page.locator('.title');

    cartItems = this.page.locator(this.cartItemSelector);

    cartItemTitles = this.page.locator('.inventory_item_name');

    cartItemDesc = this.page.locator('.inventory_item_desc');

    cartItemPrices = this.page.locator('.inventory_item_price');

    async getProductsInCart() {
        const cartElements = await this.cartItems.all();
        const products = [];
        for (const element of cartElements) {
            const title = await element.locator('.inventory_item_name').innerText();
            const desc = await element.locator('.inventory_item_desc').innerText();
            const price = await element.locator('.inventory_item_price').innerText();
            products.push({ title, desc, price });
        }
        return products;
    }

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

    async verifyProductsInCart(addedProducts) {
        const cartItemTitles = await this.cartItemTitles.allInnerTexts();
        const cartItemDesc = await this.cartItemDesc.allInnerTexts();
        const cartItemPrices = await this.cartItemPrices.allInnerTexts();

        const expectedTitles = addedProducts.map(({ title }) => title);
        const expectedDesc = addedProducts.map(({ desc }) => desc);
        const expectedPrices = addedProducts.map(({ price }) => price);

        await expect(cartItemTitles).toEqual(expectedTitles);
        await expect(cartItemDesc).toEqual(expectedDesc);
        await expect(cartItemPrices).toEqual(expectedPrices);
    }
}
