import { expect } from '@playwright/test';
import { BasePage } from './Base.page';

export class CheckOut2 extends BasePage {
    url = '/checkout-step-two.html';

    headerTitle = this.page.locator('.title');

    cartItemSelector = '.cart_item';

    cartItems = this.page.locator(this.cartItemSelector);

    cartItemTitles = this.page.locator('.inventory_item_name');

    cartItemDesc = this.page.locator('.inventory_item_desc');

    cartItemPrices = this.page.locator('.inventory_item_price');

    subTotal = this.page.getByTestId('subtotal-label');

    total = this.page.getByTestId('total-label');

    async getProductsInCart() {
        const cartElements = await this.cartItems.all();
        const products = [];
        for (const element of cartElements) {
            const title = await element.locator('.inventory_item_name').innerText();
            const desc = await element.locator('.inventory_item_desc').innerText();
            const price = await element.locator('.inventory_item_price').innerText();
            const quantity = parseInt(await element.getByTestId('item-quantity').innerText());
            const numberPrice = parseFloat(price.replace('$', ''));
            const totalProductSum = parseFloat((quantity * numberPrice).toFixed(2));
            products.push({
                title, desc, price, quantity, totalProductSum,
            });
        }
        return products;
    }

    async verifyProducts(addedProducts) {
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
