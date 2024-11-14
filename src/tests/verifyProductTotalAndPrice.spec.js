import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';
import { calculateSubTotal, calculateTotalSum } from '../utils/helpers';


test.describe('VerifyTotalAmount And Price', () => {
    test.beforeEach(async ({ app }) => {
        const { username, password } = users.standardUser;
        await app.login.navigate();
        await app.login.performLogin(username, password);
    });

    test('VerifyTotalAmount And Price', async (/** @type {{ app: import('../pages/Application').Application }} */ { app }) => {
        const addedProducts = await app.inventory.addRandomProductsToCart();

        const numberOfItemsInCart = await app.baseSwagLab.getNumberOfItemsInCart();

        expect(numberOfItemsInCart).toBe(String(addedProducts.length));

        await app.inventory.header.navigateToCartFromHeader();

        const cartItem = await app.shoppingCart.getProductsInCart();

        expect(cartItem.length).toBe(addedProducts.length);

        await app.shoppingCart.gotoCheckoutFromCart();

        await app.CheckOut.fillCheckoutData(users.standardUser.firstName, users.standardUser.lastName, users.standardUser.postalCode);

        await app.CheckOut.clickContinueButton();

        const cartItem2 = await app.CheckOut2.getProductsInCart();

        expect(cartItem2.length).toBe(addedProducts.length);

        await app.CheckOut2.verifyProducts(addedProducts);

        let subTotalSum;
        const itemsCheckout = await app.CheckOut2.getProductsInCart();
        subTotalSum = calculateSubTotal(itemsCheckout);
        const currentSum = await app.CheckOut2.subTotal.textContent()
        expect(`Item total: $${subTotalSum}`, 'Verify correct sub Total sum into the Checkout').toEqual(currentSum);
        
        const taxPercent = 0.08;
        const totalSum = calculateTotalSum(subTotalSum, taxPercent);
        const currentTotal = await app.CheckOut2.total.textContent();
        expect(`Total: $${totalSum}`, 'Verify correct Total sum into the Checkout').toEqual(currentTotal);
    });
});
