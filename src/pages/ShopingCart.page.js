const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }


    get productElementName() {  return this.page.locator(".inventory_item_name "); }
    
    get productPrice() {return this.page.locator(".inventory_item_price");}
    
    get productDescription() { return this.page.locator('.inventory_item_desc')}

    get checkoutbtn(){ return this.page.locator("#checkout")}
    
    getNameByIndex(i) {
        return this.productElementName.nth(i).textContent();
    };
    
    getDescriptionByIndex(i) {
        return this.productDescription.nth(i).textContent();
    };
    
    getPricebyIndex(i) {
        return this.productPrice.nth(i).textContent();
    };

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getCartProductsInformation() {
       
        const numberOfProduct = await this.productElementName.count()
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
    async selectPriceNumber (elem){
        return elem.map((el) =>  Number(el.substr(1))  )
    }
}
