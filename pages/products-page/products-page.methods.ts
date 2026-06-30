import { Page, expect, test } from '@playwright/test'
import { ProductsPageElements } from './products-page.elements'

export class ProductsPageMethods {
    private page: Page
    private productsPageElements: ProductsPageElements

    constructor(page: Page) {
        this.page = page
        this.productsPageElements = new ProductsPageElements(page)
    }

    async clickOnAddToCart(productName: string) {
        await test.step(`Añadir al carrito: "${productName}"`, async () => {
            await this.productsPageElements.buttons.addToCart(productName).click()
        })
    }

    async clickOnRemoveFromCart(productName: string) {
        await test.step(`Eliminar del carrito desde Products: "${productName}"`, async () => {
            await this.productsPageElements.buttons.removeFromCart(productName).click()
        })
    }

    async clickOnCartIcon() {
        await test.step('Pulsar icono del carrito', async () => {
            await this.productsPageElements.icons.cart.click()
        })
    }

    async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await test.step(`Ordenar productos por: "${option}"`, async () => {
            await this.productsPageElements.dropdowns.sortProducts.selectOption(option)
        })
    }

    async clickOnProduct(productName: string) {
        await test.step(`Abrir detalle del producto: "${productName}"`, async () => {
            await this.productsPageElements.labels.productNames.filter({ hasText: productName }).click()
        })
    }

    async verifyProductsPageIsDisplayed() {
        await test.step('Verificar que se muestra la página de productos', async () => {
            await expect(this.productsPageElements.labels.pageTitle).toBeVisible()
            await expect(this.productsPageElements.labels.pageTitle).toHaveText('Products')
        })
    }

    async verifyProductIsDisplayed(productName: string) {
        await test.step(`Verificar que el producto es visible: "${productName}"`, async () => {
            await expect(this.productsPageElements.productCard(productName)).toBeVisible()
        })
    }

    async verifyAddToCartButtonText(productName: string, buttonText: 'Add to cart' | 'Remove') {
        await test.step(`Verificar texto del botón para "${productName}": "${buttonText}"`, async () => {
            await expect(this.productsPageElements.buttons.addToCart(productName)).toHaveText(buttonText)
        })
    }

    async getAllProductNames(): Promise<string[]> {
        return await this.productsPageElements.labels.productNames.allInnerTexts()
    }

    async getAllProductPrices(): Promise<string[]> {
        return await this.productsPageElements.labels.productPrices.allInnerTexts()
    }
}
