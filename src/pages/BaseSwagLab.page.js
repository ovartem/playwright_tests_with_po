const { BasePage } = require('./Base.page');

export class BaseSwagLabPage extends BasePage {
    // header
    get mainMenuBtn() { return this.page.locator('#react-burger-menu-btn'); }

    get shopingCart() { return this.page.locator('.shopping_cart_link'); }

    get shopingCartBadge() { return this.page.locator('.shopping_cart_badge'); }

    async getNumberOfItemsInCart() {
        return this.shopingCartBadge.textContent();
    }
}
