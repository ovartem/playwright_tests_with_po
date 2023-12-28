import { test as base } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { InventoryPage } from './pages/Inventory.page';
import { ShopingCartPage } from './pages/ShopingCart.page';
import { CheckoutPage } from './pages/Checkout.page';
import { CheckoutStepTwoPage } from './pages/CheckoutStepTwo.page';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    shopingCartPage: async ({ page }, use) => {
        await use(new ShopingCartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    checkoutStepTwoPage: async ({ page }, use) => {
        await use(new CheckoutStepTwoPage(page));
    },
});
