/* eslint-disable brace-style */
/* eslint-disable block-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-trailing-spaces */
/* eslint-disable playwright/expect-expect */
/* eslint-disable linebreak-style */
// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('', () => {
    test.beforeEach('login', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
    });
    test('Perform login', async ({ inventoryPage }) => {
        await expect(inventoryPage.headerTitle).toBeVisible();

        expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('Add and remove product from the cart', async ({ inventoryPage, shopingCartPage }) => {
        await inventoryPage.addItemToCartById(0);
        expect(await inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await inventoryPage.shopingCart.click();
        expect(await shopingCartPage.cartItems.count()).toBeGreaterThanOrEqual(1);

        await shopingCartPage.removeCartItemById(0);
        await expect(shopingCartPage.cartItems).not.toBeAttached();
    });

    const sortingDirections = ['az', 'za', 'lohi', 'hilo'];

    for (const direction of sortingDirections){
        if (direction === 'az'){
            test('Verify sorting by name in ASC', async ({ inventoryPage }) => {
                // Get the initial order of product by name 
                const productInitialOrder = await inventoryPage.inventoryItemName.allTextContents();

                // Sort and verify products by name in ascending order ('A to Z')
                await inventoryPage.sortingSelect.selectOption({ value: 'az' });
                const actualProductNamesAscending = await inventoryPage.inventoryItemName.allTextContents();
                const expectedProductNamesAscending = productInitialOrder.sort();
                expect(expectedProductNamesAscending).toEqual(actualProductNamesAscending);
            });} else if (direction === 'za'){
            test('Verify sorting by name in DESC', async ({ inventoryPage }) => {
                // Get the initial order of product by name 
                const productInitialOrder = await inventoryPage.inventoryItemName.allTextContents();

                // Sort and verify products by name in descending order ('Z to A')                
                await inventoryPage.sortingSelect.selectOption({ value: 'za' });
                const actualProductsNamesDescending = await inventoryPage.inventoryItemName.allTextContents();
                const expectedProductNamesDescending = productInitialOrder.sort((a, b) => b.localeCompare(a));
                expect(expectedProductNamesDescending).toEqual(actualProductsNamesDescending);
            });} else if (direction === 'lohi'){
            test('Verify sorting by price in ASC', async ({ inventoryPage }) => {
                // Get the initial order of product by price
                const productPriceInitialOrder = await inventoryPage.itemPrice.allTextContents();
                const productPriceInitialOrderToNumbers = productPriceInitialOrder.map((str) => parseFloat(str.replace('$', '')));
    
                // Sort and verify products by price in ascending order ('Low to High')
                await inventoryPage.sortingSelect.selectOption({ value: 'lohi' });
                const actualProductsPricesAscending = ((await inventoryPage.itemPrice.allTextContents()).map((str) => parseFloat(str.replace('$', ''))));
                const expectedProductPricesAscending = productPriceInitialOrderToNumbers.sort((a, b) => {return Number(a) - Number(b)});
                expect(expectedProductPricesAscending).toEqual(actualProductsPricesAscending);
            });} else {
            test('Verify sorting by price in DESC', async ({ inventoryPage }) => {
                // Get the initial order of product by price
                const productPriceInitialOrder = await inventoryPage.itemPrice.allTextContents();
                const productPriceInitialOrderToNumbers = productPriceInitialOrder.map((str) => parseFloat(str.replace('$', '')));
    
                // Sort and verify products by price in descending order ('High to Low')
                await inventoryPage.sortingSelect.selectOption({ value: 'hilo' });
                const actualProductsPricesDescending = ((await inventoryPage.itemPrice.allTextContents()).map((str) => parseFloat(str.replace('$', ''))));
                const expectedProductPricesDescending = productPriceInitialOrderToNumbers.sort((a, b) => {return Number(b) - Number(a)});
                expect(expectedProductPricesDescending).toEqual(actualProductsPricesDescending);
            });}
    };

    test('Add and verify several random products to the cart', async ({ inventoryPage, shopingCartPage }) => {
        const productsAvailable = await inventoryPage.addItemToCartBtns.all();

        //Generate random number of products to add
        const randomTries = Math.floor(Math.random() * productsAvailable.length);

        // Populate array woth all products data
        const products = await inventoryPage.getAllProductsData();
        
        //Add to cart n-number of random products
        const randomItems = products.sort(() => 0.5 - Math.random()).slice(0, randomTries);
        for (let i = 0; i < randomItems.length; i++) {
            await inventoryPage.addToCartButtonByName(randomItems[i].name);
        };
    
        await inventoryPage.openCart();

        // Verify poducts added by Name, Description and price
        for (let i = 0; i < randomItems.length; i++) {
            await expect(shopingCartPage.cartItemByName(randomItems[i].name)).toBeVisible();
            await expect(shopingCartPage.cartItemDescriptionByName(randomItems[i].name)).toHaveText(randomItems[i].description);
            await expect(shopingCartPage.cartItemPriceByName(randomItems[i].name)).toHaveText(randomItems[i].price);
        }
    });

    test.only('Add product and checkout', async ({ inventoryPage, shopingCartPage, checkoutPage, checkoutPage2 }) => {
        const productsAvailable = await inventoryPage.addItemToCartBtns.all();

        //Generate random number of products to add
        const randomTries = Math.floor(Math.random() * productsAvailable.length);

        // Populate array woth all products data
        const products = await inventoryPage.getAllProductsData();

        // Add to cart n-number of random products
        const randomItems = products.sort(() => 0.5 - Math.random()).slice(0, randomTries);
        for (let i = 0; i < randomItems.length; i++) {
            await inventoryPage.addToCartButtonByName(randomItems[i].name);
        }
    
        await inventoryPage.openCart();
        await shopingCartPage.checkoutButton.click();

        // Fill customer data
        await checkoutPage.fillCustomerData('Olha', 'Tovarnitska', '79000');

        let countTotal = [];

        // Verify poducts added by Name, Description and price and adding selected elements to array
        for (let i = 0; i < randomItems.length; i++) {
            await expect(checkoutPage2.checkoutItemByName(randomItems[i].name)).toBeVisible();
            await expect(checkoutPage2.checkoutItemDescriptionByName(randomItems[i].name)).toHaveText(randomItems[i].description);
            await expect(checkoutPage2.checkoutItemPriceByName(randomItems[i].name)).toHaveText(randomItems[i].price);
            countTotal.push(randomItems[i].price);
        };

        // Extracting number values and calculating sum
        const finalTotal = countTotal.reduce((accumulator, price) => {
            const numericValue = parseFloat(price.replace('$', ''));
            return accumulator + numericValue;
        }, 0);

        const roundedTotal = finalTotal.toFixed(2);

        // Finding total calculated by application
        const expectedTotal = await checkoutPage2.finalPrice.allTextContents();

        // Extracting number value 
        const extractedTotal = expectedTotal.reduce((accumulator, price) => {
            const numericValue = parseFloat(price.replace('Item total: $', ''));
            return accumulator + numericValue;
        }, 0);

        const expectedRoundedTotal = extractedTotal.toFixed(2);

        // Comparing calculted totals
        expect(roundedTotal).toBe(expectedRoundedTotal);
    });
});
