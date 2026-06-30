import { authenticatedTest as test, expect } from '../fixtures/fixtures'

test.describe('Cart', () => {
    test.beforeEach(async ({ productsPageMethods }) => {
        
        await productsPageMethods.clickOnAddToCart('Sauce Labs Backpack')
        await productsPageMethods.clickOnCartIcon()
    })

    test('should display cart page with added product', async ({ cartPageMethods }) => {
        
        await cartPageMethods.verifyCartPageIsDisplayed()
        await cartPageMethods.verifyProductIsInCart('Sauce Labs Backpack')
    })

    test('should remove a product from cart', async ({ cartPageMethods }) => {
        
        await cartPageMethods.clickOnRemoveButton('Sauce Labs Backpack')

        
        await cartPageMethods.verifyProductIsNotInCart('Sauce Labs Backpack')
    })

    test('should continue shopping from cart', async ({ cartPageMethods, productsPageMethods }) => {
        
        await cartPageMethods.clickOnContinueShoppingButton()

        
        await productsPageMethods.verifyProductsPageIsDisplayed()
    })

    test('should navigate to checkout from cart', async ({ cartPageMethods, checkoutPageMethods }) => {
        
        await cartPageMethods.clickOnCheckoutButton()

        
        await checkoutPageMethods.verifyCheckoutStepOneIsDisplayed()
    })

    test('should display correct product names in cart', async ({ cartPageMethods }) => {
        
        const cartItems = await cartPageMethods.getCartItemNames()

        
        expect(cartItems).toContain('Sauce Labs Backpack')
    })
})
