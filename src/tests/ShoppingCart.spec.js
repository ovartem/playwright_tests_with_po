import { expect } from '@playwright/test';
import _ from 'lodash';
import { test } from '../fixtures/base';

test.describe('Verify Shopping Cart', () => {
    test('2   Add Random Products', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        // get numbers of items
        const numbersOfItems = await app.inventory.inventoryItems.count();
        // generate random number
        const randomNumber = _.random(0, numbersOfItems - 1);
        // get title of item
        const item = await app.inventory.itemTitle.nth(randomNumber);
        const parent = await item.locator('xpath=..');
        const linkId = await parent.getAttribute('id');
        const itemTitle = await app.inventory.itemTitle.nth(randomNumber).textContent();
        const itemDesct = await app.inventory.itemDesc.nth(2).textContent();
        const itemPrice = await app.inventory.itemPrice.nth(2).textContent();
        await app.inventory.addItemToCartById(2);
        // navigate to cart
        await app.inventory.shoppingCart.click();
        // check item title in cart
        const itemCartTitle = await app.shoppingCart.cartItemTitle.nth(2).textContent();
        const itemCartDesct = await app.shoppingCart.cartDescTitle.nth(2).textContent();
        const itemCartPrice = await app.shoppingCart.cartItemPrice.nth(2).textContent();
        await expect(itemCartTitle).toBeEqual(itemTitle);
        await expect(itemCartDesct).toBeEqual(itemDesct);
        await expect(itemCartPrice).toBeEqual(itemPrice);
    });

    test('should add and remove product from the cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        await app.inventory.addItemToCartById(0);
        expect(await app.inventory.getNumberOfItemsInCart()).toBe('1');

        await app.inventory.shoppingCart.click();
        expect(await app.shoppingCart.cartItems.count()).toBeGreaterThanOrEqual(1);

        await app.shoppingCart.removeCartItemById(0);
        await expect(app.shoppingCart.cartItems).not.toBeAttached();
    });
});
