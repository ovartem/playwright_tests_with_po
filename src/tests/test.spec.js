import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';

test.describe('Inventory Sorting Tests', () => {
    test.beforeEach(async ({ app }) => {
        const { username, password } = users.standardUser;
        await app.login.navigate();
        await app.login.performLogin(username, password);
    });

    test('Sort items by different criteria', async ( /** @type {{ app: import('../pages/Application').Application }} */ { app }) => {
        const originalNames = await app.inventory.getItemNames();
        const originalPrices = await app.inventory.getItemPrices(); 

        const sortOptions = [
        'Name (A to Z)',
        'Name (Z to A)',
        `Price (low to high)`,
        'Price (high to low)'

        ];

        for (const sortBy of sortOptions) {

            await app.inventory.selectSortOption(sortBy);
            await app.inventory.verifySortedItemsByOption(sortBy);

        }
    })
});
