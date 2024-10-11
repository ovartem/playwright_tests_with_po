import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortField = this.page.locator('[data-test="product-sort-container"]');

    inventoryItemsName = this.page.locator('[data-test="inventory-item-name"]');

    inventoryItemsPrice = this.page.locator('[data-test="inventory-item-price"]');

    goToCart = this.page.locator('[data-test="shopping-cart-link"]');

    inventoryItemsNameRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-name"])[${index}]`)};

    inventoryItemsDescRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-desc"])[${index}]`)};

    inventoryItemsPriceRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-price"])[${index}]`) };

    inventoryItemsRandomButton(index) {return this.page.locator(`(//div[@data-test="inventory-item"])[${index}]//button`)};

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }
}
