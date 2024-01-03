
const { CheckoutInfoPage } = require('./CheckOutInfo.page');


export class CheckoutOverviewPage extends CheckoutInfoPage {

    url = "/checkout-step-two.html";


    get cartItem() { return this.page.locator('.cart_item'); }

get itemTotal() {return this.page.locator('.summary_subtotal_label')}    

  get productElementName() {
    return this.page.locator(".inventory_item_name ");
  }

  get productPrice() {
    return this.page.locator(".inventory_item_price");
  }

  get productDescription() { return this.page.locator('.inventory_item_desc')}


getNameByIndex(i) {
    return this.productElementName.nth(i).textContent();
};

getDescriptionByIndex(i) {
    return this.productDescription.nth(i).textContent();
};

getPricebyIndex(i) {
    return this.productPrice.nth(i).textContent();
};

async getProductsInformation() {
    const numberOfProduct = await this.cartItem.count()
    const productsInfo = [];

    for (let i = 0; i < numberOfProduct; i += 1) {
        productsInfo.push({
            name: await this.getNameByIndex(i),
            description: await this.getDescriptionByIndex(i),
            price: await this.getPricebyIndex(i),
        });
    }
    return productsInfo;
}



}
