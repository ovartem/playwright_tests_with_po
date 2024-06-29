// InventoryPage.js
const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get sortDropdown() { return this.page.locator('.product_sort_container'); }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async sortItems(option) {
        await this.sortDropdown.selectOption(option);
    }

    async getItemNames() {
        return this.inventoryItems.locator('.inventory_item_name').allTextContents();
    }
}
