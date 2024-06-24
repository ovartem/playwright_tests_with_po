const { BasePage } = require('./Base.page');

export class BaseSwagLabPage extends BasePage {
    // header
    get mainMenuBtn() { return this.page.locator('TBD'); }

    get shopingCart() { return this.page.locator('.shopping_cart_link'); }

    get shopingCartBadge() { return this.page.locator('.shopping_cart_badge'); }

    get productSorting() { return this.page.locator('.product_sort_container'); }

    async getNumberOfItemsInCart() {
        return this.shopingCartBadge.textContent();
    }

    async performSorting() {
        return this.productSorting.click();
    }
}
