import { expect } from '@playwright/test';
import { BaseSwagLabPage } from './BaseSwagLab.page';
import { getRandomProducts } from '../utils/helpers';
import { Headers } from '../components/Headers';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    header;

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortSelector = this.page.getByTestId('product-sort-container');

    itemPrices = this.page.getByTestId('inventory-item-price');

    itemTitles = this.page.getByTestId('inventory-item-name');

    constructor(page) {
        super(page); // Виклик конструктора батьківського класу
        this.header = new Headers(page); // Ініціалізація заголовка
    }

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async selectSortOption(type) {
        await this.sortSelector.selectOption({ label: type });
    }

    async getItemPrices() {
        const prices = await this.itemPrices.allTextContents();
        return prices.map((price) => parseFloat(price.replace('$', '').trim()));
    }

    async getItemNames() {
        const productNames = await this.page.locator('[class^="inventory_item_name"]').allInnerTexts();
        return productNames.map((name) => name.trim());
    }

    async verifySortedItemsByOption(sortBy) {
        switch (sortBy) {
            case 'Name (A to Z)': {
                const sortedNamesAZ = await this.getItemNames();
                const expectedNamesAZ = sortedNamesAZ.sort();
                expect(sortedNamesAZ).toEqual(expectedNamesAZ);
                break; }
            case 'Name (Z to A)': {
                const sortedNamesZA = await this.getItemNames();
                const expectedNamesZA = sortedNamesZA.sort((a, b) => b.localeCompare(a));
                expect(sortedNamesZA).toEqual(expectedNamesZA);
                break; }
            case 'Price (low to high)': {
                const sortedPricesLowHigh = await this.getItemPrices();
                const expectedPricesLowHigh = sortedPricesLowHigh.sort((a, b) => a - b);
                expect(sortedPricesLowHigh).toEqual(expectedPricesLowHigh);
                break; }
            case 'Price (high to low)': {
                const sortedPricesHighLow = await this.getItemPrices();
                const expectedPricesHighLow = sortedPricesHighLow.sort((a, b) => b - a);
                expect(sortedPricesHighLow).toEqual(expectedPricesHighLow);
                break; }
            default:
                throw new Error('Sort option is not correct');
        }
    }

    async getProducts() {
        const productElements = await this.inventoryItems.all();
        return productElements;
    }

    async addRandomProductsToCart() {
        const allProducts = await this.getProducts();
        const randomCount = Math.floor(Math.random() * allProducts.length) + 1;
        const randomProducts = getRandomProducts(allProducts, randomCount);
        const products = [];
        for (const element of randomProducts) {
            const title = await element.locator('.inventory_item_name').innerText();
            const desc = await element.locator('.inventory_item_desc').innerText();
            const price = await element.locator('.inventory_item_price').innerText();
            products.push({ title, desc, price });
            await element.locator('[id^="add-to-cart"]').click();
        }

        return products;
    }
}
