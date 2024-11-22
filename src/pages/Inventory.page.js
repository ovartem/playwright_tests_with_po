import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    itemTitle = this.page.getByTestId('inventory-item-name');

    itemDesc = this.page.getByTestId('inventory-item-desc');

    itemPrice = this.page.getByTestId('inventory-item-price');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }
}
