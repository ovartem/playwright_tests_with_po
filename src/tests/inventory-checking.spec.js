import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';

const { username, password } = users.standardUser;

let initialProducts = [];
let selectedProducts = [];

test.describe('Inventory checking', () => {
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
    });

    // We need to test
    // Add several random products to the Shopping Cart
    // Verify products are displayed correctly (check Name, Description, and Price values)
    test('should add products to the "Your Cart" section', async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        selectedProducts = initialProducts.slice(0, 3);

        // eslint-disable-next-line no-restricted-syntax
        for (const product of selectedProducts) {
            // eslint-disable-next-line no-await-in-loop
            await app.inventory.addToCart(product);
        }

        await app.shoppingCart.navigate();

        expect(await app.shoppingCart.cartItems.count()).toBe(selectedProducts.length);

        const actualProducts = await app.shoppingCart.getCartData();
        const clearSelectedProducts = selectedProducts.map(({ cartButton, ...rest }) => ({ ...rest }));

        // Variant 1
        clearSelectedProducts.forEach(async (expectedProduct, index) => {
            const actualProduct = actualProducts[index];

            // Variant 1.1
            await test.step(`check ${index + 1} product name`, () => {
                expect(actualProduct.name).toBe(expectedProduct.name);
            });

            await test.step(`check ${index + 1} product description`, () => {
                expect(actualProduct.description).toBe(expectedProduct.description);
            });

            await test.step(`check ${index + 1} product price`, () => {
                expect(actualProduct.price).toBe(expectedProduct.price);
            });

            // Variant 1.2
            await test.step(`check product ${index + 1} - ${actualProduct.name}`, async () => {
                expect(actualProduct).toStrictEqual(expectedProduct);
            });
        });
    });
});
