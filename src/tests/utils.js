export async function currentOrderOnPage(sortingType, inventoryPage) {
    let orderOnPage = [];
    if (sortingType == 'az' || sortingType == 'za') {
        orderOnPage = await inventoryPage.inventoryItemsNames();
    } else if (sortingType == 'lohi' || sortingType == 'hilo') {
        const pricesWithCurrency = await inventoryPage.inventoryItemsPrices();
        orderOnPage = pricesWithCurrency.map((element) => element.substring(1));
    }
    return orderOnPage;
};

export function sortArray(sortType, arrayToSort) {
    let sortedArray = [];
    switch (sortType) {
        case 'az':
            sortedArray = arrayToSort.toSorted();
            break;
        case 'za':
            sortedArray = arrayToSort.toSorted().reverse();
            break;
        case 'lohi':
            sortedArray = arrayToSort.toSorted((a, b) => a - b);
            break;
        case 'hilo':
            sortedArray = arrayToSort.toSorted((a, b) => b - a);
            break;
    };
    return sortedArray;
};