import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.getByTestId('.title');

    inventoryProducts = this.page.getByTestId('.inventory_item');

    addItemToCartButton = this.page.getByTestId('data-test="add-to-cart-sauce-labs-backpack"');

    // find dropdown and all options

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }
}
const getProductData = async () => {
    const products = await this.inventoryProducts.all();

    const data = await Promise.all(
        products.map(async (product) => {
            const object = {
                name: await product.getByTestId('inventory-item-name').textContent(),
                price: parseFloat((await product.getByTestId('inventory-item-price').textContent()).replace('$', '')),
            };
            return object;
        }),
    );

    return data;
};
const getOptionValues = async () => {
    const options = await this.options.all();

    const values = await Promise.all(options.map((option) => option.getAttribute('value')));

    return values;
};
