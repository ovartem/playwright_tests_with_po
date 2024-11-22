import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.describe('Sorting Test', () => {
    test('Sort Item By Title From Z - A', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        // get default Item list
        const defaultList = await app.inventory.itemTitle.allTextContents();
        // sort from A to Z
        const sortedAscList = defaultList.sort();
        const sortedDescList = sortedAscList.toReversed();
        // sort item on UI
        await app.inventory.sortItemBy('za');
        const sortedDescUi = await app.inventory.itemTitle.allTextContents();
        expect(sortedDescUi).toEqual(sortedDescList);
    });
    test('Sort Item Price From Low to Hi', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        // get default sorting by Price on UI
        let defaultListPrice = await app.inventory.itemPrice.allTextContents();
        // remove $ sign
        defaultListPrice = defaultListPrice.map((item) => parseInt(item.replace('$', '')));
        // sort ASC
        const sortAscPrice = defaultListPrice.toSorted((a, b) => a - b);
        // sort on UI by Price Lo > Hi
        await app.inventory.sortItemBy('lohi');
        let SortedPriceAscUi = await app.inventory.itemPrice.allTextContents();
        // remove $ sign
        SortedPriceAscUi = SortedPriceAscUi.map((item) => parseInt(item.replace('$', '')));
        expect(SortedPriceAscUi).toEqual(sortAscPrice);
    });
});
