const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { currentOrderOnPage, sortArray } = require('./utils');

const sortingTypeParams = [
    {
    sortingTitle: 'A to Z',
    sortingType: 'az',
    },
    {
    sortingTitle: 'Z to A',
    sortingType: 'za',
    },
    {
    sortingTitle: 'Low to High',
    sortingType: 'lohi',
    },
    {
    sortingTitle: 'High to Low',
    sortingType: 'hilo',
    }
    ]

    sortingTypeParams.forEach(({sortingTitle, sortingType}) => {
    test.describe('Basic tests', () => {
        test(`Test 1 - Verify sort by ${sortingTitle}`, async ({ inventoryPage }) => {
            // Calculate expected result
            await inventoryPage.navigate();
            const orderOnPage = await currentOrderOnPage(sortingType, inventoryPage); 
            const sortExpected = sortArray(sortingType, orderOnPage);
            
            // Get actual result on page after sorting
            await inventoryPage.sortBy(sortingType);
            const sortActual = await currentOrderOnPage(sortingType, inventoryPage);

            // Compare actual and expected items lists    
            expect(sortActual.length).toEqual(sortExpected.length);
    
            //const compareResult = compareTwoArrays(sortActual, sortExpected);
    
            expect(sortActual, `Lists should be the same.
                Expected sorting: ${sortExpected}
                Actual sorting: ${sortActual}`).toEqual(sortExpected);     
        });
    });
});
