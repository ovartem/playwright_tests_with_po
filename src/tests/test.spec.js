import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';

test.describe('Inventory Sorting Tests', () => {
    test.beforeEach(async ({ app }) => {
        const { username, password } = users.standardUser;
        await app.login.navigate();
        await app.login.performLogin(username, password);
    });

    const sortOptions = [
        'Name (A to Z)',
        'Name (Z to A)',
        `Price (low to high)`,
        'Price (high to low)'

        ];

     sortOptions.forEach(([sortByLabel, sortByValue]) => {

        test('Inventory Sorting Tests', async ( 
            /** @type {{ app: import('../pages/Application').Application }} */ 
            { app }) => {
    
            const originalNames = await app.inventory.getItemNames();
            const originalPrices = await app.inventory.getItemPrices(); 
    
            await app.inventory.selectSortOption(sortByLabel);
            await app.inventory.verifySortedItemsByOption(sortByValue);
        });
    });
});
