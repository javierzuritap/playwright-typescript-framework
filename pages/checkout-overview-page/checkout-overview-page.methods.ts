import { Page, expect, test } from '@playwright/test'
import { CheckoutOverviewPageElements } from './checkout-overview-page.elements'

export class CheckoutOverviewPageMethods {
    private page: Page
    private checkoutOverviewPageElements: CheckoutOverviewPageElements

    constructor(page: Page) {
        this.page = page
        this.checkoutOverviewPageElements = new CheckoutOverviewPageElements(page)
    }

    async clickOnFinishButton() {
        await test.step('Pulsar botón Finish', async () => {
            await this.checkoutOverviewPageElements.buttons.finish.click()
        })
    }

    async clickOnCancelButton() {
        await test.step('Pulsar botón Cancel', async () => {
            await this.checkoutOverviewPageElements.buttons.cancel.click()
        })
    }

    async clickOnBackHomeButton() {
        await test.step('Pulsar botón Back Home', async () => {
            await this.checkoutOverviewPageElements.buttons.backHome.click()
        })
    }

    async verifyCheckoutStepTwoIsDisplayed() {
        await test.step('Verificar que se muestra el paso 2 del checkout (Overview)', async () => {
            await expect(this.checkoutOverviewPageElements.labels.pageTitle).toHaveText('Checkout: Overview')
        })
    }

    async verifyOrderConfirmationIsDisplayed() {
        await test.step('Verificar confirmación del pedido', async () => {
            await expect(this.checkoutOverviewPageElements.labels.completeHeader).toBeVisible()
            await expect(this.checkoutOverviewPageElements.labels.completeHeader).toHaveText('Thank you for your order!')
        })
    }

    async getItemNames(): Promise<string[]> {
        return await this.checkoutOverviewPageElements.labels.itemNames.allInnerTexts()
    }

    async getSubtotal(): Promise<string> {
        return await this.checkoutOverviewPageElements.labels.summarySubtotal.innerText()
    }

    async getTax(): Promise<string> {
        return await this.checkoutOverviewPageElements.labels.summaryTax.innerText()
    }

    async getTotal(): Promise<string> {
        return await this.checkoutOverviewPageElements.labels.summaryTotal.innerText()
    }
}
