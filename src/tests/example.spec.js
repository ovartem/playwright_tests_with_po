/* eslint-disable playwright/expect-expect */
/* eslint-disable linebreak-style */
// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('', () => {
    test.beforeEach('login', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
    });
    test('Perform login', async ({ inventoryPage }) => {
        await expect(inventoryPage.headerTitle).toBeVisible();

        expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('Add and remove product from the cart', async ({ inventoryPage, shopingCartPage }) => {
        await inventoryPage.addItemToCartById(0);
        expect(await inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await inventoryPage.shopingCart.click();
        expect(await shopingCartPage.cartItems.count()).toBeGreaterThanOrEqual(1);

        await shopingCartPage.removeCartItemById(0);
        await expect(shopingCartPage.cartItems).not.toBeAttached();
    });

    test('Verify sorting', async ({ inventoryPage }) => {
        // Get the initial order of product by name and price
        const productInitialOrder = await inventoryPage.inventoryItemName.allTextContents();
        const productPriceInitialOrder = await inventoryPage.itemPrice.allTextContents();
    
        // Sort and verify products by name in ascending order ('A to Z')
        await inventoryPage.sortingSelect.selectOption({ value: 'az' });
        const productNamesAscending = productInitialOrder.sort();
        expect(productInitialOrder).toEqual(productNamesAscending);
    
        // Sort and verify products by name in descending order ('Z to A')
        await inventoryPage.sortingSelect.selectOption({ value: 'za' });
        const productNamesDescending = productInitialOrder.sort((a, b) => b.localeCompare(a));
        expect(productInitialOrder).toEqual(productNamesDescending);
    
        // Sort and verify products by price in ascending order ('Low to High')
        await inventoryPage.sortingSelect.selectOption({ value: 'lohi' });
        const productPricesAscending = productPriceInitialOrder.sort();
        expect(productPriceInitialOrder).toEqual(productPricesAscending);
    
        // Sort and verify products by price in descending order ('High to Low')
        await inventoryPage.sortingSelect.selectOption({ value: 'hilo' });
        const productPricesDescending = productPriceInitialOrder.sort((a, b) => b.localeCompare(a));
        expect(productPriceInitialOrder).toEqual(productPricesDescending);
    });

    // eslint-disable-next-line playwright/expect-expect
    test('Add and verify several random products to the cart', async ({ inventoryPage, shopingCartPage }) => {
        const addedItems = await inventoryPage.addRandomProductsToCart();
        await inventoryPage.openCart();
        const cartProductInfo = await shopingCartPage.getInfoOnRandomProductsinCart();
        addedItems.forEach(async (elements) => {
            expect(elements).toMatchObject(cartProductInfo)
        });
    });
});
