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

    test('Verify sorting', async ({ inventoryPage }) => {
        // Get the initial order of product by name and price
        const productInitialOrder = await inventoryPage.inventoryItemName.allTextContents();
        const productPriceInitialOrder = await inventoryPage.itemPrice.allTextContents();
    
        // Sort and verify products by name in ascending order ('A to Z')
        await inventoryPage.sortingSelect.selectOption({ value: 'az' });
        const productNamesAscending = productInitialOrder.sort();
        expect(productInitialOrder).toEqual([...productNamesAscending]);
    
        // Sort and verify products by name in descending order ('Z to A')
        await inventoryPage.sortingSelect.selectOption({ value: 'za' });
        const productNamesDescending = productInitialOrder.sort((a, b) => b.localeCompare(a));
        expect(productInitialOrder).toEqual([...productNamesDescending]);
    
        // Sort and verify products by price in ascending order ('Low to High')
        await inventoryPage.sortingSelect.selectOption({ value: 'lohi' });
        const productPricesAscending = productPriceInitialOrder.sort();
        expect(productPriceInitialOrder).toEqual([...productPricesAscending]);
    
        // Sort and verify products by price in descending order ('High to Low')
        await inventoryPage.sortingSelect.selectOption({ value: 'hilo' });
        const productPricesDescending = productPriceInitialOrder.sort((a, b) => b.localeCompare(a));
        expect(productPriceInitialOrder).toEqual([...productPricesDescending]);
    });

    test('Add and verify several random products to the cart', async ({ inventoryPage, shopingCartPage }) => {
        const products = [
            {
                name: 'Sauce Labs Backpack',
                description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
                price: '$29.99',
            },
            {
                name: 'Sauce Labs Bike Light',
                description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
                price: '$9.99',
            },
            {
                name: 'Sauce Labs Fleece Jacket',
                description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
                price: '$49.99',
            },
            {
                name: 'Sauce Labs Bolt T-Shirt',
                description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
                price: '$15.99',
            },
            {
                name: 'Sauce Labs Onesie',
                description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
                price: '$7.99',
            },
            {
                name: 'Test.allTheThings() T-Shirt (Red)',
                description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
                price: '$15.99',
            },
        ];
        //Add to cart 2 random products
        const randomItems = products.sort(() => 0.5 - Math.random()).slice(0, 2);
        for (let i = 0; i < randomItems.length; i+=1) {
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

    test('Add product and checkout', async ({ inventoryPage, shopingCartPage, checkoutPage, checkoutPage2 }) => {
        const products = [
            {
                name: 'Sauce Labs Backpack',
                description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
                price: '$29.99',
            },
            {
                name: 'Sauce Labs Bike Light',
                description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
                price: '$9.99',
            },
            {
                name: 'Sauce Labs Fleece Jacket',
                description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
                price: '$49.99',
            },
            {
                name: 'Sauce Labs Bolt T-Shirt',
                description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
                price: '$15.99',
            },
            {
                name: 'Sauce Labs Onesie',
                description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
                price: '$7.99',
            },
            {
                name: 'Test.allTheThings() T-Shirt (Red)',
                description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
                price: '$15.99',
            },
        ];

        // Add to cart 2 random products
        const randomItems = products.sort(() => 0.5 - Math.random()).slice(0, 2);
        for (let i = 0; i < randomItems.length; i++) {
            await inventoryPage.addToCartButtonByName(randomItems[i].name);
        }
    
        await inventoryPage.openCart();
        await shopingCartPage.checkoutButton.click();

        // Fill customer data
        await checkoutPage.fillCustomerData('Olha', 'Tovarnitska', '79000');

        let countTotal = [];

        // Verify poducts added by Name, Description and price and adding selected elements to array
        for (let i = 0; i < randomItems.length; i += 1) {
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
