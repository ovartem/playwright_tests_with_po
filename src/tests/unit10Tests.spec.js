const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('Unit 10', () => {
    test('Perform and verify sorting on the Inventory page', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        await expect(inventoryPage.headerTitle).toBeVisible();

        await inventoryPage.productSorting.click();

        await inventoryPage.selectSortOption('az');
        const itemNameAZ = await inventoryPage.assertSortingNames();
        const sortedNamesAZ = [...itemNameAZ].sort();
        expect(itemNameAZ).toEqual(sortedNamesAZ);

        await inventoryPage.selectSortOption('za');
        const itemNameZA = await inventoryPage.assertSortingNames();
        const sortedNamesZA = [...itemNameZA].sort().reverse();
        expect(itemNameZA).toEqual(sortedNamesZA);

        await inventoryPage.selectSortOption('lohi');
        const itemPriceLOHI = await inventoryPage.assertSortingPrices();
        const sortedPricesLOHI = [...itemPriceLOHI].sort((a, b) => a - b);
        expect(itemPriceLOHI).toEqual(sortedPricesLOHI);

        await inventoryPage.selectSortOption('hilo');
        const itemPricesHILO = await inventoryPage.assertSortingPrices();
        const sortedPricesHILO = [...itemPricesHILO].sort((a, b) => b - a);
        expect(itemPricesHILO).toEqual(sortedPricesHILO);
    });
});
