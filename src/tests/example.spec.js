/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.describe('Saucedemo app basic tests', () => {
    test.beforeEach( async (/** @type {{ app: import('../pages/Application').Application }} */{ app },) =>{
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
    } );

    test('should login successfully', async ({app} ) => {

        await expect(app.inventory.headerTitle).toBeVisible();

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('should add and remove product from the cart', async ({app} ) => {
        await app.inventory.addItemToCartById(0);
        expect(await app.inventory.getNumberOfItemsInCart()).toBe('1');

        await app.inventory.shoppingCart.click();
        expect(await app.shoppingCart.cartItems.count()).toBeGreaterThanOrEqual(1);

        await app.shoppingCart.removeCartItemById(0);
        await expect(app.shoppingCart.cartItems).not.toBeAttached();
    });
});



test.describe('Saucedemo UNIT 10', () => {
        test.beforeEach( async (/** @type {{ app: import('../pages/Application').Application }} */{ app },) =>{
            await app.login.navigate();
            await app.login.performLogin('standard_user', 'secret_sauce');
        } );


        test('1. Check sorting by Name A Z', async ({app})=> {
                  await app.inventory.sortField.selectOption('az');
                  const goodsName = await app.inventory.inventoryItemsName.allTextContents();
                  await expect([...goodsName].sort()).toEqual(goodsName);
          });

        test('1. Check sorting by Name Z A', async ({app})=> {
                await app.inventory.sortField.selectOption('za');
                const goodsName = await app.inventory.inventoryItemsName.allTextContents();
 //             await expect([...goodsName].sort().reverse()).toEqual(goodsName);
                await expect([...goodsName].sort((a, b) => b.localeCompare(a))).toEqual(goodsName);
        });

        test('1. Check sorting by Price Low to high', async ({app}) => {
                await app.inventory.sortField.selectOption('lohi');
                const goodsPriceText = await app.inventory.inventoryItemsPrice.allTextContents();
                const goodsPrice = goodsPriceText.map(price => parseFloat(price.replace('$', '')));     
                await expect([...goodsPrice].sort((a, b) => a - b)).toEqual(goodsPrice);
        });

        test('1. Check sorting by Price High to Low', async ({app}) => {
                await app.inventory.sortField.selectOption('hilo');
                const goodsPriceText = await app.inventory.inventoryItemsPrice.allTextContents();
                const goodsPrice = goodsPriceText.map(price => parseFloat(price.replace('$', '')));     
                await expect([...goodsPrice].sort((a, b) => b - a)).toEqual(goodsPrice);
        });



        test('test2 Add several random products to the Shopping Cart ana Verify  Name, Description, Price', async ({app}) =>{
 //find quantity of goods on page
                const goodsCount = await app.inventory.inventoryItems.count();
//select 3 random goods and save their data
                        function GoodsData (goodName, description, price){
                                this.goodName = goodName;
                                this.description = description;
                                this.price= price;
                                };
                        let goodsArray=[];
                        let selectedGoods = [];
                        let randomGood = 0;
                        for (let i=0; i<3; i++){
                                        do {
                                                randomGood = Math.floor(Math.random() * goodsCount) + 1;
                                        } while (goodsArray.includes(randomGood));
                                goodsArray.push(randomGood);
                                const goodsTemp = new GoodsData(
                                await app.inventory.inventoryItemsNameRandom(randomGood).textContent(), 
                                await app.inventory.inventoryItemsDescRandom(randomGood).textContent(),
                                await app.inventory.inventoryItemsPriceRandom(randomGood).textContent(),
                                );      
                        selectedGoods.push(goodsTemp);
                        await app.inventory.inventoryItemsRandomButton(randomGood).click();
                        };
// go to shopping cart
                        await app.inventory.goToCart.click();
  //find quantity of goods on page
                        const goodsCountBasket = await app.shoppingCart.cartItems.count();  
//get goods data 
                function GoodsData (goodName, description, price){
                        this.goodName = goodName;
                        this.description = description;
                        this.price= price;
                        };
                        let basketGoods = [];
                        for (let i=1; i<=3; i++){
                                const goodsTemp = new GoodsData(
                                await app.shoppingCart.cartItemsNameRandom(i).textContent(),
                                await app.shoppingCart.cartItemsDescRandom(i).textContent(),
                                await app.shoppingCart.cartItemsPriceRandom(i).textContent(),
                                 );      
                                basketGoods.push(goodsTemp);
                                }
        //                        console.log(basketGoods);
          //                      console.log(selectedGoods);
                        expect(goodsCountBasket).toEqual(3);
                        expect(basketGoods).toEqual(selectedGoods);

        });
   


        test('test3 Select random goods, verify, calculate total', async ({app}) => {
                const goodsCount = await app.inventory.inventoryItems.count();
//select random goods and get info
                function GoodsData (goodName, description, price){
                this.goodName = goodName;
                this.description = description;
                this.price= price;
                };
                let goodsArray=[];
                let selectedGoods = [];
                let randomGood = 0;
                for (let i=0; i<3; i++){
                                do {
                                        randomGood = Math.floor(Math.random() * goodsCount) + 1;
                                } while (goodsArray.includes(randomGood));
                        goodsArray.push(randomGood);
                        const goodsTemp = new GoodsData(
                            await app.inventory.inventoryItemsNameRandom(randomGood).textContent(), 
                            await app.inventory.inventoryItemsDescRandom(randomGood).textContent(),
                            await app.inventory.inventoryItemsPriceRandom(randomGood).textContent(),
                        );      
                selectedGoods.push(goodsTemp);
                await app.inventory.inventoryItemsRandomButton(randomGood).click();
                };
// go to shopping cart
                await app.inventory.goToCart.click();
//go to checkout
                await app.shoppingCart.goToCheckout.click();
// fill in form
                await app.informForm.applyForm('John', 'Smith', '010101');             
// get goods data
                let checkoutGoods = [];
                const checkoutGoodsCount = await app.checkout.checkoutItems.count();
                for (let i=1; i<=checkoutGoodsCount; i++){
                        const goodsTemp = new GoodsData(
                                await app.checkout.checkoutItemsNameRandom(i).textContent(),
                                await app.checkout.checkoutItemsDescRandom(i).textContent(),
                                await app.checkout.checkoutItemsPriceRandom(i).textContent(),
                                );      
                        checkoutGoods.push(goodsTemp);                      
                };
//calculate total

                let total=0;
                for (let i=1; i<=checkoutGoodsCount; i++){
                        let price= await app.checkout.checkoutItemsPriceRandom(i).textContent();
                        total = total +  (parseFloat(price.replace('$', '')));
                };
                let tax = await app.checkout.taxCheckoutSelector.textContent();

                tax = parseFloat(parseFloat(tax.replace('Tax: $', '')).toFixed(2));
                total = total + tax;
                const checkoutTotal = await app.checkout.totalCheckoutSelector.textContent();
                const checkoutTotal1 = (parseFloat(checkoutTotal.replace('Total: $', '')));
                
             await expect(checkoutTotal1).toEqual(total);
             await expect(checkoutGoodsCount).toEqual(3);
        });
});
