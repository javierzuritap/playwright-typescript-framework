import { authenticatedTest as test, expect } from '../fixtures/fixtures'

test.describe('Products', () => {
    test('should display products page after login', async ({ productsPageMethods }) => {
        
        await productsPageMethods.verifyProductsPageIsDisplayed()
    })

    test('should add a product to cart', async ({ productsPageMethods, commonPageMethods }) => {
        
        await productsPageMethods.clickOnAddToCart('Sauce Labs Backpack')

        
        await commonPageMethods.verifyCartBadgeIsVisible()
        const count = await commonPageMethods.getCartItemCount()
        expect(count).toBe('1')
    })

    test('should remove a product from cart on products page', async ({ productsPageMethods, commonPageMethods }) => {
        
        await productsPageMethods.clickOnAddToCart('Sauce Labs Backpack')

        
        await productsPageMethods.clickOnRemoveFromCart('Sauce Labs Backpack')

        
        await commonPageMethods.verifyCartBadgeIsNotVisible()
    })

    test('should add multiple products to cart', async ({ productsPageMethods, commonPageMethods }) => {
        
        await productsPageMethods.clickOnAddToCart('Sauce Labs Backpack')
        await productsPageMethods.clickOnAddToCart('Sauce Labs Bike Light')

        
        const count = await commonPageMethods.getCartItemCount()
        expect(count).toBe('2')
    })

    test('should sort products by name A to Z', async ({ productsPageMethods }) => {
        
        await productsPageMethods.sortProductsBy('az')

        
        const productNames = await productsPageMethods.getAllProductNames()
        const sorted = [...productNames].sort()
        expect(productNames).toEqual(sorted)
    })

    test('should sort products by name Z to A', async ({ productsPageMethods }) => {
        
        await productsPageMethods.sortProductsBy('za')

        
        const productNames = await productsPageMethods.getAllProductNames()
        const sorted = [...productNames].sort().reverse()
        expect(productNames).toEqual(sorted)
    })

    test('should sort products by price low to high', async ({ productsPageMethods }) => {
        
        await productsPageMethods.sortProductsBy('lohi')

        
        const prices = await productsPageMethods.getAllProductPrices()
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')))
        const sorted = [...numericPrices].sort((a, b) => a - b)
        expect(numericPrices).toEqual(sorted)
    })

    test('should sort products by price high to low', async ({ productsPageMethods }) => {
        
        await productsPageMethods.sortProductsBy('hilo')

        
        const prices = await productsPageMethods.getAllProductPrices()
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')))
        const sorted = [...numericPrices].sort((a, b) => b - a)
        expect(numericPrices).toEqual(sorted)
    })

    test('should navigate to product detail page', async ({ productsPageMethods, productDetailPageMethods }) => {
        
        await productsPageMethods.clickOnProduct('Sauce Labs Backpack')

        
        await productDetailPageMethods.verifyProductName('Sauce Labs Backpack')
    })
})
