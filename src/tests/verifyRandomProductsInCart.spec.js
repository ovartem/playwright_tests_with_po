const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { getRndInteger, getProductInfo } = require('./utils/utils');

test.describe('Basic tests', () => {
    test('Verify random products in a cart', async ({loginPage, inventoryPage, shopingCartPage}) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        await inventoryPage.navigate();

        // Get random numbers
        const currentState = await inventoryPage.inventoryItemsNames()
        const numberOfProducts = currentState.length;

        const numberOfProductsToSelect = getRndInteger(1, numberOfProducts);

        let productKeys = [];
        let productKey;
        for (let i = 1; i <= numberOfProductsToSelect;) {
            productKey = getRndInteger(0, numberOfProducts - 1);
            if (productKeys.includes(productKey) == false) {
                productKeys.push(productKey);
                i++;
            } else i = i;
        }

        // Add products to cart according to random numbers

        let productOnPageLocator;

        let productInPage = new Object();
        productInPage.name;
        productInPage.description;
        productInPage.price;

        let productsToSelect = [];        

        for (let el of productKeys) {
            productOnPageLocator = await inventoryPage.itemOnPageById(el);
            productInPage = await getProductInfo(productOnPageLocator);

            await inventoryPage.addItemToCartByItemId(el);

            productsToSelect.push(productInPage);
        }

        // Go to shopping cart
        await shopingCartPage.navigate();
        let numberOfCartItems = await shopingCartPage.getCartItems().length;
        console.log('numberOfCartIems = ' + numberOfCartItems);

    });
});