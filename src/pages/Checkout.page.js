import { BaseSwagLabPage } from "./BaseSwagLab.page";

export class CheckoutPage extends BaseSwagLabPage{

totalCheckoutSelector = this.page.locator('[data-test="total-label"]');

taxCheckoutSelector = this.page.locator('[data-test="tax-label"]');

checkoutItems = this.page.locator('.cart_item');



checkoutItemsNameRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-name"])[${index}]`)};

checkoutItemsDescRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-desc"])[${index}]`)};

checkoutItemsPriceRandom(index) {return this.page.locator(`(//div[@data-test="inventory-item-price"])[${index}]`) };

}