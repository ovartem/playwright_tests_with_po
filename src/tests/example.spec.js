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

    const testOptions = [
        {direction: "az", getExpectedResult: (productInitialOrder) => {
            return productInitialOrder.sort();
        }},
        {direction: "za", getExpectedResult: (productInitialOrder) => {
            return productInitialOrder.sort((a, b) => b.localeCompare(a));
        }},
        {direction: "lohi", getExpectedResultPrice: (productPriceInitialOrderToNumbers) => {
            return productPriceInitialOrderToNumbers.sort((a, b) => Number(a) - Number(b));;
        }},
        {direction: "hilo", getExpectedResultPrice: (productPriceInitialOrderToNumbers) => {
            return productPriceInitialOrderToNumbers.sort((a, b) => Number(b) - Number(a));
        }},
        
    ];

    for (const option of testOptions) {
        test(`Verify sorting by name in ${option.direction}`, async ({ inventoryPage }) => {
            if (option.getExpectedResult){        
                const productInitialOrder = await inventoryPage.inventoryItemName.allTextContents();
                await inventoryPage.sortingSelect.selectOption({ value: option.direction});
                const actualProductNames = await inventoryPage.inventoryItemName.allTextContents();
                const expectedProductNames = option.getExpectedResult(productInitialOrder)
                expect(actualProductNames).toEqual(expectedProductNames);
            }
            if (option.getExpectedResultPrice){
                const productPriceInitialOrder = await inventoryPage.itemPrice.allTextContents();
                await inventoryPage.sortingSelect.selectOption({ value: option.direction});
                const productPriceInitialOrderToNumbers = productPriceInitialOrder.map((str) => parseFloat(str.replace('$', '')));
                const actualProductsPrices = ((await inventoryPage.itemPrice.allTextContents()).map((str) => parseFloat(str.replace('$', ''))));
                const expectedProductPrices = option.getExpectedResultPrice(productPriceInitialOrderToNumbers)
                expect(actualProductsPrices).toEqual(expectedProductPrices);
            }
        });
    }

    test('Add and verify several random products to the cart', async ({ inventoryPage, shopingCartPage }) => {
        const productsAvailable = await inventoryPage.addItemToCartBtns.all();

        // Generate random number of products to add
        const randomTries = Math.floor(Math.random() * productsAvailable.length);

        // Populate array woth all products data
        const products = await inventoryPage.getAllProductsData();

        // Add to cart n-number of random products
        const randomItems = products.sort(() => 0.5 - Math.random()).slice(0, randomTries);
        for (let i = 0; i < randomItems.length; i++) {
            await inventoryPage.addToCartButtonByName (randomItems[i].name);
        }

        await inventoryPage.openCart();

        // Verify poducts added by Name, Description and price
        for (let i = 0; i < randomItems.length; i++) {
            await expect(shopingCartPage.cartItemByName(randomItems[i].name)).toBeVisible();
            await expect(shopingCartPage.cartItemDescriptionByName(randomItems[i].name))
         .toHaveText(randomItems[i].description);
            await expect(shopingCartPage.cartItemPriceByName(randomItems[i].name)).toHaveText(randomItems[i].price);
        }
    });

    test('Add product and checkout', async ({
        inventoryPage, shopingCartPage, checkoutPage, checkoutStepTwoPage,
    }) => {
        const productsAvailable = await inventoryPage.addItemToCartBtns.all();

        // Generate random number of products to add
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
        await checkoutPage.fillAndSendCustomerData('Olha', 'Tovarnitska', '79000');

        const countTotal = [];

        // Verify poducts added by Name, Description and price and adding selected elements to array
        for (let i = 0; i < randomItems.length; i++) {
            await expect(checkoutStepTwoPage.checkoutItemByName(randomItems[i].name)).toBeVisible();
            await expect(checkoutStepTwoPage.checkoutItemDescriptionByName(randomItems[i].name)).toHaveText(randomItems[i].description);
            await expect(checkoutStepTwoPage.checkoutItemPriceByName(randomItems[i].name)).toHaveText(randomItems[i].price);
            countTotal.push(randomItems[i].price);
        }

        // Extracting number values and calculating sum
        const finalTotal = countTotal.reduce((accumulator, price) => {
            const numericValue = parseFloat(price.replace('$', ''));
            return accumulator + numericValue;
        }, 0);

        const roundedTotal = finalTotal.toFixed(2);

        // Finding total calculated by application
        const expectedTotal = await checkoutStepTwoPage.finalPrice.allTextContents();

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
