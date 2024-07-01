const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } //

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get sortDropdown() { return this.page.locator('.product_sort_container'); }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    inventoryItemsNames() {
        return this.inventoryItems.locator('[data-test="inventory-item-name"]').allTextContents();
    }

    inventoryItemsPrices() {
        return this.inventoryItems.locator('div.pricebar > div').allTextContents();
    }

    async sortBy(sortLocator) {
        await this.sortDropdown.selectOption(sortLocator);
    }
}
