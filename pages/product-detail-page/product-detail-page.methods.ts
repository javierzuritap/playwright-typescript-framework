import { Page, expect, test } from '@playwright/test'
import { ProductDetailPageElements } from './product-detail-page.elements'

export class ProductDetailPageMethods {
    private page: Page
    private productDetailPageElements: ProductDetailPageElements

    constructor(page: Page) {
        this.page = page
        this.productDetailPageElements = new ProductDetailPageElements(page)
    }

    async clickOnAddToCart() {
        await test.step('Añadir al carrito desde el detalle del producto', async () => {
            await this.productDetailPageElements.buttons.addToCart.click()
        })
    }

    async clickOnRemoveFromCart() {
        await test.step('Eliminar del carrito desde el detalle del producto', async () => {
            await this.productDetailPageElements.buttons.removeFromCart.click()
        })
    }

    async clickOnBackToProducts() {
        await test.step('Volver a la página de productos', async () => {
            await this.productDetailPageElements.buttons.backToProducts.click()
        })
    }

    async verifyProductName(productName: string) {
        await test.step(`Verificar nombre del producto: "${productName}"`, async () => {
            await expect(this.productDetailPageElements.labels.productName).toHaveText(productName)
        })
    }

    async verifyProductPrice(price: string) {
        await test.step(`Verificar precio del producto: "${price}"`, async () => {
            await expect(this.productDetailPageElements.labels.productPrice).toHaveText(price)
        })
    }

    async getProductName(): Promise<string> {
        return await this.productDetailPageElements.labels.productName.innerText()
    }

    async getProductPrice(): Promise<string> {
        return await this.productDetailPageElements.labels.productPrice.innerText()
    }
}
