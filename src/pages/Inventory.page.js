const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get sortDropdown() { return this.page.locator('.product_sort_container'); }

    getFirstItemName() {
        return this.page.locator('.inventory_item_name').first().innerText();
    }

    async sortItems(order) {
        await this.sortDropdown.selectOption(order);
    }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }
}
