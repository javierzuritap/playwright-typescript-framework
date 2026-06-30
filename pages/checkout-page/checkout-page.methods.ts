import { Page, expect, test } from '@playwright/test'
import { CheckoutPageElements } from './checkout-page.elements'

export class CheckoutPageMethods {
    private page: Page
    private checkoutPageElements: CheckoutPageElements

    constructor(page: Page) {
        this.page = page
        this.checkoutPageElements = new CheckoutPageElements(page)
    }

    async fillFirstName(firstName: string) {
        await test.step(`Rellenar nombre: "${firstName}"`, async () => {
            await this.checkoutPageElements.textboxes.firstName.fill(firstName)
        })
    }

    async fillLastName(lastName: string) {
        await test.step(`Rellenar apellido: "${lastName}"`, async () => {
            await this.checkoutPageElements.textboxes.lastName.fill(lastName)
        })
    }

    async fillPostalCode(postalCode: string) {
        await test.step(`Rellenar código postal: "${postalCode}"`, async () => {
            await this.checkoutPageElements.textboxes.postalCode.fill(postalCode)
        })
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await test.step('Rellenar formulario de datos de env\ío', async () => {
            await this.fillFirstName(firstName)
            await this.fillLastName(lastName)
            await this.fillPostalCode(postalCode)
        })
    }

    async clickOnContinueButton() {
        await test.step('Pulsar botón Continue', async () => {
            await this.checkoutPageElements.buttons.continue.click()
        })
    }

    async clickOnCancelButton() {
        await test.step('Pulsar botón Cancel', async () => {
            await this.checkoutPageElements.buttons.cancel.click()
        })
    }

    async verifyCheckoutStepOneIsDisplayed() {
        await test.step('Verificar que se muestra el paso 1 del checkout', async () => {
            await expect(this.checkoutPageElements.labels.pageTitle).toHaveText('Checkout: Your Information')
        })
    }

    async verifyErrorMessageIsVisible(errorMessage: string) {
        await test.step(`Verificar mensaje de error: "${errorMessage}"`, async () => {
            await expect(this.checkoutPageElements.labels.errorMessage).toBeVisible()
            await expect(this.checkoutPageElements.labels.errorMessage).toContainText(errorMessage)
        })
    }
}
