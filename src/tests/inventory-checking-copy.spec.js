import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';

const { username, password } = users.standardUser;

let initialProducts = [];
let selectedProducts = [];
let cartProducts = [];

test.describe('Inventory checking copy', () => {
    test.beforeEach(async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        await test.step('Open login page', async () => {
            await app.login.navigate();
        });

        await test.step('Login as a standard user role', async () => {
            await app.login.performLogin(username, password);
        });

        initialProducts = await test.step('Get initial data for sorting', () => app.inventory.getProductData());

        await test.step('Checking products count', async () => {
            expect(initialProducts.length).toBeGreaterThan(2);
        });

        selectedProducts = initialProducts.slice(0, 3);

        // eslint-disable-next-line no-restricted-syntax
        for (const product of selectedProducts) {
            // eslint-disable-next-line no-await-in-loop
            await app.inventory.addToCart(product);
        }

        await app.shoppingCart.navigate();

        cartProducts = await app.shoppingCart.cartItems.all();
    });

    // We need to test
    // Add several random products to the Shopping Cart
    // Verify products are displayed correctly (check Name, Description, and Price values)

    test('should check cart item count', async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        expect(cartProducts.length).toBe(selectedProducts.length);
    });

    cartProducts.forEach((product, index) => {
        test(`should include correct values for ${index + 1} product`, async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
            const name = await app.shoppingCart.getProductName(product);
            const description = await app.shoppingCart.getProductDescription(product);
            const price = await app.shoppingCart.getProductPrice(product);

            expect(name).toBe(selectedProducts[index].name);
            expect(description).toBe(selectedProducts[index].description);
            expect(price).toBe(selectedProducts[index].price);
        });
    });
});
