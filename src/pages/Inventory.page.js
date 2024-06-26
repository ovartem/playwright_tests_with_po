const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } //

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get inventoryItemName() { return this.page.locator('.inventory_item_name '); }

    get inventoryItemPrice() { return this.page.locator('.inventory_item_price'); }

    async selectSortOption(value) {
        await this.productSorting.selectOption(value);
    }

    async verifySortingNames() {
        return this.inventoryItemName.allTextContents();
    }

    async verifySortingPrices() {
        const price = await this.inventoryItemPrice.allTextContents();
        return price.map((priceText) => parseFloat(priceText.replace('$', '')));
    }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }
}
