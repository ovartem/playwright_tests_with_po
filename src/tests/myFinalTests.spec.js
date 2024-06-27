// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { currentOrderOnPage, sortArray, compareTwoArrays } = require('./utils');

['az', 'za', 'lohi', 'hilo'].forEach((sortingType) => {
    test.describe('Basic tests', () => {
        test.beforeEach(async ({ loginPage, inventoryPage }) => {
            await loginPage.navigate();
            await loginPage.performLogin('standard_user', 'secret_sauce');
    
            await expect(inventoryPage.headerTitle).toBeVisible();
        });
      
        test(`Test 1 - Verify sort by ${sortingType}`, async ({ inventoryPage }) => {
            // Calculate expected result
            const orderOnPage = await currentOrderOnPage(sortingType, inventoryPage); 
            const sortExpected = sortArray(sortingType, orderOnPage);
            
            // Get actual result on page after sorting
            await inventoryPage.sortBy(sortingType);
            const sortActual = await currentOrderOnPage(sortingType, inventoryPage);

            // Compare actual and expected items lists    
            expect(sortActual.length).toEqual(sortExpected.length);
    
            const compareResult = compareTwoArrays(sortActual, sortExpected);
    
            expect(compareResult, `Lists should be the same.
                Expected sorting: ${sortExpected}
                Actual sorting: ${sortActual}`).toEqual(0);         
        });
    });
});
