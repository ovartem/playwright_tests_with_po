/* eslint-disable no-case-declarations */
import { expect } from '@playwright/test';
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

    async sortItemBy(type) {
        await this.sortButton.selectOption({ label: `${type}` });
    }

    async getProductsNames() {
        const productNames = await this.itemTitle.allTextContents();
        return productNames;
    }

    async getProductPrices() {
        const productPrices = await this.itemPrice.allTextContents();
        return productPrices.map((price) => parseFloat(price.replace('$', '').trim()));
    }

    async expectSortedProducts(sortBy, productNames, productPrices) {
        switch (sortBy) {
            case 'Name (A to Z)':
                const sortedNamesAZ = await this.getProductsNames();
                const expectedNamesAZ = productNames.sort();
                expect(sortedNamesAZ).toEqual(expectedNamesAZ);
                break;
            case 'Name (Z to A)':
                const sortedNamesZA = await this.getProductsNames();
                const expectedNamesZA = productNames.sort().reverse();
                expect(sortedNamesZA).toEqual(expectedNamesZA);
                break;
            case 'Price (low to high)':
                const sortedPricesLowHigh = await this.getProductPrices();
                const expectedPricesLowHigh = productPrices.sort((a, b) => a - b);
                expect(sortedPricesLowHigh).toEqual(expectedPricesLowHigh);
                break;
            case 'Price (high to low)':
                const sortedPricesHighLow = await this.getProductPrices();
                const expectedPricesHighLow = productPrices.sort((a, b) => b - a);
                expect(sortedPricesHighLow).toEqual(expectedPricesHighLow);
                break;
            default:
                throw new Error('Sort option is not correct');
        }
    }
}
