import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';
import { SORT_OPTIONS } from '../utils/sort.util';

const { username, password } = users.standardUser;

let initialProducts = [];

test.describe('Inventory sorting', () => {
    test.beforeEach(async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        await test.step('Open login page', async () => {
            await app.login.navigate();
        });

        await test.step('Login as a standard user role', async () => {
            await app.login.performLogin(username, password);
        });

        initialProducts = await test.step('Get initial data for sorting', () => app.inventory.getProductData());

        await test.step('Checking products count', async () => {
            expect(initialProducts.length).toBeGreaterThan(1);
        });

        await test.step('Checking sort option count', async () => {
            const options = await app.inventory.getOptionValues();
            expect(options).toHaveLength(4);
        });
    });

    // We need to test
    // 1. Sorting by name (A to Z)
    // 2. Sorting by name (Z to A)
    // 3. Sorting by price (low to high)
    // 4. Sorting by price (high to low)

    Object.entries(SORT_OPTIONS).forEach(([sortOption, sortFunction]) => {
        test(`should sort products by ${sortOption}`, async (
            /** @type {{ app: import('../pages/Application').Application }} */{ app },
        ) => {
            await app.inventory.select.selectOption({ value: sortOption });
            const currentProducts = await app.inventory.getProductData();
            const sortedProducts = [...initialProducts].sort(sortFunction);

            expect(currentProducts).toEqual(sortedProducts);
        });
    });
});
