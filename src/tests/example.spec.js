// @ts-check
// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('SauceDemo Tests', () => {
    test('Perform login', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        await expect(inventoryPage.headerTitle).toBeVisible();

        expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('Add and remove product from the cart', async ({ loginPage, inventoryPage, shopingCartPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCartById(0);
        expect(await inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await inventoryPage.shopingCart.click();
        expect(await shopingCartPage.cartItems.count()).toBeGreaterThanOrEqual(1);

        await shopingCartPage.removeCartItemById(0);
        await expect(shopingCartPage.cartItems).not.toBeAttached();
    });

    test('Perform and verify sorting on the Inventory page', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        let firstItem = await inventoryPage.getFirstItemName();
        expect(firstItem).toBe('Sauce Labs Backpack');

        await inventoryPage.sortItems('za');
        firstItem = await inventoryPage.getFirstItemName();
        expect(firstItem).toBe('Test.allTheThings() T-Shirt (Red)');

        await inventoryPage.sortItems('lohi');
        firstItem = await inventoryPage.getFirstItemName();
        expect(firstItem).toBe('Sauce Labs Onesie');

        await inventoryPage.sortItems('hilo');
        firstItem = await inventoryPage.getFirstItemName();
        expect(firstItem).toBe('Sauce Labs Fleece Jacket');
    });
});
