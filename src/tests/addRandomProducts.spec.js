import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';

test.describe('Add random Products to the Cart', () => {
    test.beforeEach(async ({ app }) => {
        const { username, password } = users.standardUser;
        await app.login.navigate();
        await app.login.performLogin(username, password);
    });

    test('Add several random products to the Shopping Cart and verify details', async (/** @type {{ app: import('../pages/Application').Application }} */ { app }) => {
        // const getProducts = app.inventory.getProducts
        const addedProducts = await app.inventory.addRandomProductsToCart();

        const numberOfItemsInCart = await app.baseSwagLab.getNumberOfItemsInCart();

        expect(numberOfItemsInCart).toBe(String(addedProducts.length));

        await app.inventory.header.navigateToCartFromHeader();

        const cartItem = await app.shoppingCart.getProductsInCart();

        expect(cartItem.length).toBe(addedProducts.length);

        await app.shoppingCart.verifyProductsInCart(addedProducts);
    });
});
