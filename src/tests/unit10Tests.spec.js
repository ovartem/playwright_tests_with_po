const { expect } = require('@playwright/test');
const { test: fixtureTest } = require('../fixture');
require('dotenv').config();

const standardUser = process.env.STANDARD_USER;
const standardPass = process.env.STANDARD_PASS;

const sortingTests = [
    { sortOption: 'az', getItems: (inventoryPage) => inventoryPage.getNameValues(), compareFunction: (a, b) => a.localeCompare(b) },
    { sortOption: 'za', getItems: (inventoryPage) => inventoryPage.getNameValues(), compareFunction: (a, b) => b.localeCompare(a) },
    { sortOption: 'lohi', getItems: (inventoryPage) => inventoryPage.getPriceValues(), compareFunction: (a, b) => a - b },
    { sortOption: 'hilo', getItems: (inventoryPage) => inventoryPage.getPriceValues(), compareFunction: (a, b) => b - a },
];

fixtureTest.describe('Unit 10', () => {
    fixtureTest.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(standardUser, standardPass);
        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    sortingTests.forEach(({ sortOption, getItems, compareFunction }) => {
        fixtureTest(`Perform and verify ${sortOption} sorting on the Inventory page`, async ({ inventoryPage }) => {
            await inventoryPage.productSorting.click();
            await inventoryPage.selectSortOption(sortOption);
            const items = await getItems(inventoryPage);
            const sortedItems = [...items].sort(compareFunction);
            expect(items).toEqual(sortedItems);
        });
    });
});
