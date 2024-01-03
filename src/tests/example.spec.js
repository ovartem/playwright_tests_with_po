// @ts-check
const { expect } = require("@playwright/test");
const { test } = require("../fixture");
const { CheckoutOverviewPage } = require("../pages/CheckOutOverview.page");

test.describe("", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin("standard_user", "secret_sauce");
  });

  test("Perform login", async ({ inventoryPage }) => {
    await expect(inventoryPage.headerTitle).toBeVisible();

    expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(
      1
    );
  });

  test("Add and remove product from the cart", async ({
    inventoryPage,
    shopingCartPage,
  }) => {
    await inventoryPage.addItemToCartById(0);
    expect(await inventoryPage.getNumberOfItemsInCart()).toBe("1");

    await inventoryPage.shopingCart.click();
    expect(await shopingCartPage.cartItems.count()).toBeGreaterThanOrEqual(1);

    await shopingCartPage.removeCartItemById(0);
    await expect(shopingCartPage.cartItems).not.toBeAttached();
  });

  const filterArr = ["az", "za", "lohi", "hilo"];
 


  for (let element of filterArr) {
    test(`Perform and verify sorting on the Inventory page by ${element}`, async ({
      inventoryPage,
    }) => {
      //sorting names
      const elementsNames =  await inventoryPage.productElementName.allTextContents();
      const expectedAZ = await elementsNames.sort();
     

      //sorting prices
      const elementsPrice = await inventoryPage.productPrice.allTextContents();
      const elementsNumberOfPrice = await inventoryPage.selectPriceNumber(elementsPrice);
      const expectedLoHi = await elementsNumberOfPrice.sort(function (a, b) { return a - b; });
   

      await inventoryPage.sortContainer.selectOption(element);
      const catualElementsName = await inventoryPage.productElementName.allTextContents();
      const actualElementsPrice = await inventoryPage.productPrice.allTextContents();
      const actualElementsNumberOfPrice = await inventoryPage.selectPriceNumber(actualElementsPrice);

      if (element === "az") {
        expect(catualElementsName ).toEqual(expectedAZ);
      } else if (element === "za") {
        expect(catualElementsName).toEqual(expectedAZ.reverse());
      } else if (element === "lohi") {
         expect(actualElementsNumberOfPrice).toEqual(expectedLoHi );
      } else if (element === "hilo") { 
        expect(actualElementsNumberOfPrice).toEqual( expectedLoHi.reverse() );
      }
    
    });
  }

  test("Add several random products to the Shopping Cart and verify products are displayed correctly", async ({
    inventoryPage,
    shopingCartPage,
  }) => {
    //select all "Add to cards btns"
    const addToCartBtns = await inventoryPage.inventoryItems.allTextContents();

    // select random product index
    const randomProductNumbers =  Math.floor(Math.random()*addToCartBtns.length) +1 

    // creation an array of random number of products

    let arrayOfProductRandomIndex = [];

    for( let i = 0; i < randomProductNumbers; i++){
        const randomFunction = async function(){
            let randomProductIndex = Math.floor(Math.random()*addToCartBtns.length)+1;
            // const arrayItemExisting = randomArrayOfProductItems.includes(randomProductIndex)
            if(arrayOfProductRandomIndex.includes(randomProductIndex)){
                randomFunction()
            }else {
                arrayOfProductRandomIndex.push(randomProductIndex)
            }
        }
        randomFunction()
    }

    let sortedArrayOfProductRandomIndex =  arrayOfProductRandomIndex.sort()
   
    //Get information about products
    const productsInformation = await inventoryPage.getProductsInformation();

   //click on Add to card button

    for(let i = 0; i < sortedArrayOfProductRandomIndex.length; i++) {
        await inventoryPage.addItemToCartByInventoryItem(sortedArrayOfProductRandomIndex[i])
    }

    //click on shopping icon
    await inventoryPage.shopingCart.click();

    //Get information about products on ShoppingCardPage
    const shoppingProductCardItems = await shopingCartPage.getCartProductsInformation()

    for(let i = 0 ; i < sortedArrayOfProductRandomIndex.length; i++){
   
   
    await expect(productsInformation[sortedArrayOfProductRandomIndex[i]-1].name).toEqual(shoppingProductCardItems[i].name);
   
    await expect(productsInformation[sortedArrayOfProductRandomIndex[i]-1].description).toEqual(shoppingProductCardItems[i].description);
    await expect(productsInformation[sortedArrayOfProductRandomIndex[i]-1].price).toEqual(shoppingProductCardItems[i].price);
        
    }

  });

  test("Verify checkout information", async ({ inventoryPage, shopingCartPage, checkoutInfoPage , checkoutOverviewPage}) => {
     //select all "Add to cards btns"
     const addToCartBtns = await inventoryPage.inventoryItems.allTextContents();

     // select random product index
     const randomProductNumbers =  Math.floor(Math.random()*addToCartBtns.length) +1 
 
     // creation an array of random number of products
 
     let arrayOfProductRandomIndex = [];
 
     for( let i = 0; i < randomProductNumbers; i++){
         const randomFunction = async function(){
             let randomProductIndex = Math.floor(Math.random()*addToCartBtns.length)+1;
             // const arrayItemExisting = randomArrayOfProductItems.includes(randomProductIndex)
             if(arrayOfProductRandomIndex.includes(randomProductIndex)){
                 randomFunction()
             }else {
                 arrayOfProductRandomIndex.push(randomProductIndex)
             }
         }
         randomFunction()
     }
     let sortedArrayOfProductRandomIndex =  arrayOfProductRandomIndex.sort()
    
    //click on Add to card button
 
     for(let i = 0; i < sortedArrayOfProductRandomIndex.length; i++) {
         await inventoryPage.addItemToCartByInventoryItem(sortedArrayOfProductRandomIndex[i])
     }
 
     //click on shopping icon
     await inventoryPage.shopingCart.click();

      //Get information about products on ShoppingCardPage
    const shoppingProductCardItems = await shopingCartPage.getCartProductsInformation()
    const elementsPrice = await shopingCartPage.productPrice.allTextContents();
    const elementsNumberOfPrice = await shopingCartPage.selectPriceNumber(elementsPrice);
    const sumWithInitial = elementsNumberOfPrice.reduce((acc, curValue) => acc + curValue)
  
     //click on checkout btn
     await shopingCartPage.checkoutbtn.click()

     // add checkout information
     await checkoutInfoPage.performCheckoutInfo("standard", "user", "12345")
     

   const checkoutProductInformation= await checkoutOverviewPage.getProductsInformation()

   //get total sum
   const itemTotal = await checkoutOverviewPage.itemTotal.textContent() ;
   const totalSum = Number(itemTotal.slice(13))

   for(let i = 0 ; i < sortedArrayOfProductRandomIndex.length; i++){
        await expect(checkoutProductInformation[i].name).toEqual(shoppingProductCardItems[i].name);
        await expect(checkoutProductInformation[i].description).toEqual(shoppingProductCardItems[i].description);
        await expect(checkoutProductInformation[i].price).toEqual(shoppingProductCardItems[i].price);
        
    }
        await expect(totalSum).toEqual(sumWithInitial);
   

  });
});


