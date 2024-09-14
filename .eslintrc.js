import { expect } from '@playwright/test';
import { test } from '../fixtures/base'; // Путь к твоим базовым тестовым файлам
import { users } from '../test_data/users'; // Путь к данным пользователей

test.describe('Inventory Sorting Tests', () => {
    test.beforeEach(async ({ app }) => {
        const { username, password } = users.standardUser;
        await app.login.navigate();
        await app.login.performLogin(username, password);
        await expect(app.inventory.headerTitle).toBeVisible();
    });

    test('Sort items by different criteria', async ({ app }) => {
        // Получаем начальные данные
        const productNames = await app.inventory.getItemNames();
        const productPrices = await app.inventory.getItemPrices();
        
        // Определяем варианты сортировки
        const sortOptions = [
            'Name (A to Z)',
            'Name (Z to A)',
            'Price (low to high)',
            'Price (high to low)'
        ];

        // Применяем сортировку и проверяем результаты
        for (const sortBy of sortOptions) {
            await app.inventory.sortItems(sortBy);

            // Проверяем сортировку в зависимости от типа
            if (sortBy === 'Name (A to Z)') {
                await app.inventory.sortInventoriesTest(sortBy, productNames, productPrices);
            } else if (sortBy === 'Name (Z to A)') {
                await app.inventory.sortInventoriesTest(sortBy, productNames, productPrices);
            } else if (sortBy === 'Price (low to high)') {
                await app.inventory.sortInventoriesTest(sortBy, productNames, productPrices);
            } else if (sortBy === 'Price (high to low)') {
                await app.inventory.sortInventoriesTest(sortBy, productNames, productPrices);
            }
        }
    });
});
