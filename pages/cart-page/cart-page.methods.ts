import { Page, expect, test } from '@playwright/test'
import { CartPageElements } from './cart-page.elements'

export class CartPageMethods {
    private page: Page
    private cartPageElements: CartPageElements

    constructor(page: Page) {
        this.page = page
        this.cartPageElements = new CartPageElements(page)
    }

    async clickOnCheckoutButton() {
        await test.step('Pulsar botón Checkout', async () => {
            await this.cartPageElements.buttons.checkout.click()
        })
    }

    async clickOnContinueShoppingButton() {
        await test.step('Pulsar botón Continue Shopping', async () => {
            await this.cartPageElements.buttons.continueShopping.click()
        })
    }

    async clickOnRemoveButton(productName: string) {
        await test.step(`Eliminar del carrito: "${productName}"`, async () => {
            await this.cartPageElements.buttons.removeItem(productName).click()
        })
    }

    async verifyCartPageIsDisplayed() {
        await test.step('Verificar que se muestra la página del carrito', async () => {
            await expect(this.cartPageElements.labels.pageTitle).toBeVisible()
            await expect(this.cartPageElements.labels.pageTitle).toHaveText('Your Cart')
        })
    }

    async verifyProductIsInCart(productName: string) {
        await test.step(`Verificar que el producto está en el carrito: "${productName}"`, async () => {
            await expect(this.cartPageElements.cartItem(productName)).toBeVisible()
        })
    }

    async verifyProductIsNotInCart(productName: string) {
        await test.step(`Verificar que el producto no está en el carrito: "${productName}"`, async () => {
            await expect(this.cartPageElements.cartItem(productName)).not.toBeVisible()
        })
    }

    async getCartItemNames(): Promise<string[]> {
        return await this.cartPageElements.labels.cartItemNames.allInnerTexts()
    }
}
