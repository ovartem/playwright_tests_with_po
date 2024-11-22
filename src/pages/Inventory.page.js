import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    itemTitle = this.page.getByTestId('inventory-item-name');

    itemPrice = this.page.getByTestId('inventory-item-price');

    sortButton = this.page.getByTestId('product-sort-container');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async sortItemBy(value) {
        await this.sortButton.selectOption(value);
    }
}
