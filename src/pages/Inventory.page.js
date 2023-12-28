const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } 

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get itemPrice() { return this.page.locator('.inventory_item_price'); }

    get inventoryItemName() { return this.page.locator('.inventory_item_name'); }

    get itemDescription() { return this.page.locator('.inventory_item_desc'); }

    get shoppingCartLink() { return this.page.locator('.shopping_cart_link');}

    get alreadySelectedProduct() { return this.page.locator('#remove-sauce-labs-bike-light')}

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }
    async openCart() {
        await this.shoppingCartLink.click();
    };

    get sortingSelect() { return this.page.locator('.product_sort_container'); }

    getNameOfItembyIndex(index) {
        return this.page.locator('.inventory_item_name').nth(index).textContent();
    };

    getDescriptionOfItembyIndex(index) {
        return this.itemDescription.nth(index).textContent();
    };

    getPriceOfItembyIndex(index) {
        return this.itemPrice.nth(index).textContent();
    };

    async getAllProductsData() {
        const products = [];
        const allProductsCount = await this.inventoryItems.count();
        for (let i = 0; i < allProductsCount; i += 1) {
            products.push({
                name: await this.getNameOfItembyIndex(i),
                description: await this.getDescriptionOfItembyIndex(i),
                price: await this.getPriceOfItembyIndex(i),
            });
        }
        return products;
    }


    async addToCartButtonByName(name) {
        await this.page.locator('.inventory_item', { hasText: name }).locator('[id^="add-to-cart"]').click();
    }
}