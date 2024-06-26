const { expect } = require('@playwright/test');
const { test } = require('../fixture');
require('dotenv').config();

const standardUser = process.env.STANDARD_USER;
const standardPass = process.env.STANDARD_PASS;

test.describe('Unit 10', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(standardUser, standardPass);
        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Perform and verify AZ sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.productSorting.click();
        await inventoryPage.selectSortOption('az');
        const itemNameAZ = await inventoryPage.verifySortingNames();
        const sortedNamesAZ = [...itemNameAZ].sort();
        expect(itemNameAZ).toEqual(sortedNamesAZ);
    });

    test('Perform and verify ZA sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.productSorting.click();
        await inventoryPage.selectSortOption('za');
        const itemNameZA = await inventoryPage.verifySortingNames();
        const sortedNamesZA = [...itemNameZA].sort().reverse();
        expect(itemNameZA).toEqual(sortedNamesZA);
    });

    test('Perform and verify LOHI sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.productSorting.click();
        await inventoryPage.selectSortOption('lohi');
        const itemPriceLOHI = await inventoryPage.verifySortingPrices();
        const sortedPricesLOHI = [...itemPriceLOHI].sort((a, b) => a - b);
        expect(itemPriceLOHI).toEqual(sortedPricesLOHI);
    });

    test('Perform and verify HILO sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.productSorting.click();
        await inventoryPage.selectSortOption('hilo');
        const itemPricesHILO = await inventoryPage.verifySortingPrices();
        const sortedPricesHILO = [...itemPricesHILO].sort((a, b) => b - a);
        expect(itemPricesHILO).toEqual(sortedPricesHILO);
    });
});
