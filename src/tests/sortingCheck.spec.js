// test file (e.g., inventory.test.js)
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('Test 1', () => {
    test('Sort items on Inventory page', async ({ loginPage, inventoryPage, shopingCartPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

       await inventoryPage.sortItems('az');
        let itemNames = await inventoryPage.getItemNames();
        let sortedItemNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedItemNames);

       await inventoryPage.sortItems('za');
        itemNames = await inventoryPage.getItemNames();
        sortedItemNames = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedItemNames);

    });
});
