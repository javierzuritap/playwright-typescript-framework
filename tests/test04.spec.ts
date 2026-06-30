import { authenticatedTest as test, expect } from '../fixtures/fixtures'
import { allure } from 'allure-playwright'

test.describe('Checkout', () => {
    test.beforeEach(async ({ productsPageMethods, cartPageMethods }) => {
        
        await productsPageMethods.clickOnAddToCart('Sauce Labs Backpack')
        await productsPageMethods.clickOnCartIcon()
        await cartPageMethods.clickOnCheckoutButton()
    })

    test('should display checkout step one', async ({ checkoutPageMethods }) => {
        
        await checkoutPageMethods.verifyCheckoutStepOneIsDisplayed()
    })

    test('should complete checkout step one with valid data', async ({ checkoutPageMethods, checkoutOverviewPageMethods }) => {
        
        await checkoutPageMethods.fillCheckoutInformation('John', 'Doe', '12345')
        await checkoutPageMethods.clickOnContinueButton()

        
        await checkoutOverviewPageMethods.verifyCheckoutStepTwoIsDisplayed()
    })

    test('should show error when first name is empty', async ({ checkoutPageMethods }) => {
        
        await checkoutPageMethods.fillCheckoutInformation('', 'Doe', '12345')
        await checkoutPageMethods.clickOnContinueButton()

        
        await checkoutPageMethods.verifyErrorMessageIsVisible('First Name is required')
    })

    test('should show error when last name is empty', async ({ checkoutPageMethods }) => {
        
        await checkoutPageMethods.fillCheckoutInformation('John', '', '12345')
        await checkoutPageMethods.clickOnContinueButton()

        
        await checkoutPageMethods.verifyErrorMessageIsVisible('Last Name is required')
    })

    test('should show error when postal code is empty', async ({ checkoutPageMethods }) => {
        
        await checkoutPageMethods.fillCheckoutInformation('John', 'Doe', '')
        await checkoutPageMethods.clickOnContinueButton()

        
        await checkoutPageMethods.verifyErrorMessageIsVisible('Postal Code is required')
    })

    test('should cancel checkout and return to cart', async ({ checkoutPageMethods, cartPageMethods }) => {
        
        await checkoutPageMethods.clickOnCancelButton()

        
        await cartPageMethods.verifyCartPageIsDisplayed()
    })

    test('should complete full checkout flow', async ({ checkoutPageMethods, checkoutOverviewPageMethods }) => {
        await allure.description('Verifica el flujo completo de compra: relleno de datos, overview y confirmación del pedido.')
        await allure.severity('blocker')

        
        await checkoutPageMethods.fillCheckoutInformation('John', 'Doe', '12345')
        await checkoutPageMethods.clickOnContinueButton()
        await checkoutOverviewPageMethods.verifyCheckoutStepTwoIsDisplayed()
        await checkoutOverviewPageMethods.clickOnFinishButton()

        
        await checkoutOverviewPageMethods.verifyOrderConfirmationIsDisplayed()
    })

    test('should cancel order overview and return to products', async ({ checkoutPageMethods, checkoutOverviewPageMethods, productsPageMethods }) => {
        
        await checkoutPageMethods.fillCheckoutInformation('John', 'Doe', '12345')
        await checkoutPageMethods.clickOnContinueButton()
        await checkoutOverviewPageMethods.clickOnCancelButton()

        
        await productsPageMethods.verifyProductsPageIsDisplayed()
    })

    test('should display correct subtotal, tax and total in overview', async ({ checkoutPageMethods, checkoutOverviewPageMethods }) => {
        
        await checkoutPageMethods.fillCheckoutInformation('John', 'Doe', '12345')
        await checkoutPageMethods.clickOnContinueButton()
        const subtotal = await checkoutOverviewPageMethods.getSubtotal()
        const tax = await checkoutOverviewPageMethods.getTax()
        const total = await checkoutOverviewPageMethods.getTotal()

        
        expect(subtotal).toContain('Item total:')
        expect(tax).toContain('Tax:')
        expect(total).toContain('Total:')
    })
})
