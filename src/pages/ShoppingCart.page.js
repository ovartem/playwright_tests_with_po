import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    headerTitle = this.page.locator('.title');

    cartItems = this.page.locator(this.cartItemSelector);

    async getCartData() {
        const products = await this.cartItems.all();

        return Promise.all(
            products.map(async (product) => ({
                name: await product.getByTestId('inventory-item-name').textContent(),
                description: await product.getByTestId('inventory-item-desc').textContent(),
                price: parseFloat((await product.getByTestId('inventory-item-price').textContent()).replace('$', '')),
            })),
        );
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
}
