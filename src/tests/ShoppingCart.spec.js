/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
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
            const randomNumber = _.random(0, numbersOfItems - 1);
            // get title of item
            const item = app.inventory.itemTitle.nth(randomNumber);
            const parent = item.locator('xpath=..');
            // get is
            const linkId = await parent.getAttribute('id');
            const itemTitle = await app.inventory.itemTitle.nth(randomNumber).textContent();
            const itemDesc = await app.inventory.itemDesc.nth(randomNumber).textContent();
            const itemPrice = await app.inventory.itemPrice.nth(randomNumber).textContent();
            await app.inventory.addItemToCartById(randomNumber);
            linkIds.push({ linkId, itemTitle, itemDesc, itemPrice });
        }
        // navigate to cart
        await app.inventory.shoppingCart.click();
        // check item title in cart
        const cartItemDetails = [];
        for (let i = 0; i < linkIds.length; i++) {
            const cartItem = await app.shoppingCart.getItemNameById(linkIds[i].linkId);
            cartItemDetails.push(cartItem);
        }
        expect(linkIds).toEqual(cartItemDetails);
    });
});
