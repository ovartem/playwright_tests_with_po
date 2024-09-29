export function getRandomProducts(allProducts, count) {
    const allRandomProducts = allProducts.sort(() => Math.random() - 0.5);
    const randomProducts = allRandomProducts.slice(0, count);
    return randomProducts;
}
