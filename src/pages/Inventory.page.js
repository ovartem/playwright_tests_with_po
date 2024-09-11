import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.getByTestId('title');

    inventoryProducts = this.page.getByTestId('inventory-item');

    addItemToCartButton = this.page.getByTestId('add-to-cart-sauce-labs-backpack');

    select = this.page.getByTestId('product-sort-container');

    options = this.select.locator('option');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async getProductData() {
        const products = await this.inventoryProducts.all();

        return Promise.all(
            products.map(async (product) => ({
                name: await product.getByTestId('inventory-item-name').textContent(),
                price: parseFloat((await product.getByTestId('inventory-item-price').textContent()).replace('$', '')),
            })),
        );
    }

    async getOptionValues() {
        const options = await this.options.all();
        return Promise.all(options.map((option) => option.getAttribute('value')));
    }
}
