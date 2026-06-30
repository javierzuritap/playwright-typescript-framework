import { Page } from '@playwright/test'

export class ProductDetailPageElements {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    get buttons() {
        return {
            addToCart: this.page.locator('[data-test^="add-to-cart"]'),
            removeFromCart: this.page.locator('[data-test^="remove"]'),
            backToProducts: this.page.locator('[data-test="back-to-products"]'),
        }
    }

    get labels() {
        return {
            productName: this.page.locator('[data-test="inventory-item-name"]'),
            productDescription: this.page.locator('[data-test="inventory-item-desc"]'),
            productPrice: this.page.locator('[data-test="inventory-item-price"]'),
        }
    }
}
