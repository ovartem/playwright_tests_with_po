export class Headers {
    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        this.page = page;
        this.shoppingCart = this.page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = this.page.getByTestId('shopping-cart-badge');
    }

    async navigateToCartFromHeader() {
        await this.shoppingCart.click();
    }
}
