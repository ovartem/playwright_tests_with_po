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
        const linkIds = []; 
        // generate random number
    for (let i = 0; i < 3; i++) {
        const  randomNumber = _.random(0, numbersOfItems - 1);
        // get title of item
        const item = app.inventory.itemTitle.nth(randomNumber);
        const parent = item.locator('xpath=..');
      // get is
        const linkId = await parent.getAttribute('id');
        const itemTitle = await app.inventory.itemTitle.nth(randomNumber).textContent();
        const itemDesct = await app.inventory.itemDesc.nth(randomNumber).textContent();
        const itemPrice = await app.inventory.itemPrice.nth(randomNumber).textContent();
        await app.inventory.addItemToCartById(randomNumber);
        // navigate to cart
        await app.inventory.shoppingCart.click();
        // check item title in cart
        const itemLocator  = await app.shoppingCart.getItemPropertyById(linkId);
        const  Title2 = await itemLocator.textContent();
        expect(Title2).toEqual(itemTitle);   
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
