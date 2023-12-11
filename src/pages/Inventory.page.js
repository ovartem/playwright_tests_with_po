/* eslint-disable no-dupe-class-members */
/* eslint-disable no-restricted-syntax */
/* eslint-disable spaced-comment */
/* eslint-disable space-before-blocks */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable arrow-body-style */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-extra-semi */
/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } 

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get itemPrice() { return this.page.locator('.inventory_item_price'); }

    get inventoryItemName() { return this.page.locator('.inventory_item_name'); }

    get itemDescription() { return this.page.locator('.inventory_item_desc'); }

    get shoppingCartLink() { return this.page.locator('.shopping_cart_link') }

    get alreadySelectedProduct() { return this.page.locator('#remove-sauce-labs-bike-light')}

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }
    async openCart() {
        await this.shoppingCartLink.click();
    }

    get sortingSelect() { return this.page.locator('.product_sort_container'); }

    async getNameOfItembyId(id) {
        await this.inventoryItemName.nth(id).textContent();
    };

    async getDescriptionOfItembyId(id) {
        await this.itemDescription.nth(id).textContent();
    };

    async getPriceOfItembyId(id) {
        await this.itemPrice.nth(id).textContent();
    };

    async addRandomProductsToCart(desiredProductNumber) {
        const pickedItems = [];
            while (pickedItems.length < desiredProductNumber) {
            const allProductButtons = await this.addItemToCartBtns.all();
            //console.log (allProductButtons)
            const randomProductNumber = Math.floor(Math.random() * allProductButtons.length);
            //console.log (randomProductNumber)
            await this.addItemToCartById(randomProductNumber);
            pickedItems.push({
                name: await this.getNameOfItembyId(randomProductNumber),
                desc: await this.getDescriptionOfItembyId(randomProductNumber),
                price: await this.getPriceOfItembyId(randomProductNumber),
            });
        };

    };
}