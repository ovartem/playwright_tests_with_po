import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';

const { username, password } = users.standardUser;

test.describe('Inventory sorting', () => {
    test.beforeEach(async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        await test.step('Open login page', async () => {
            await app.login.navigate();
        });

        await test.step('Login as a standard user role', async () => {
            await app.login.performLogin(username, password);
        });

        await test.step('Get initial data for sorting', () => app.inventory.getProductData());
        await test.step('Checking products count', async () => {
            const products = await app.inventory.getOptionValues();
            expect(products.length).toBeGreaterThan(1);
        });

        await test.step('Checking sort option count', async () => {
            const options = await app.inventory.getOptionValues();
            expect(options).toHaveLength();
        });
    });
});
