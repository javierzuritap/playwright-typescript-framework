import { Page } from '@playwright/test'

export class ProductsPageElements {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    get icons() {
        return {
            cart: this.page.locator('#shopping_cart_container'),
        }
    }

    get buttons() {
        return {
            addToCart: (productName: string) =>
                this.page.locator(`//div[.="${productName}"]//ancestor::div[@class="inventory_item"]//button`),
            removeFromCart: (productName: string) =>
                this.page.locator(`//div[.="${productName}"]//ancestor::div[@class="inventory_item"]//button`),
        }
    }

    get dropdowns() {
        return {
            sortProducts: this.page.locator('[data-test="product-sort-container"]'),
        }
    }

    get labels() {
        return {
            pageTitle: this.page.locator('[data-test="title"]'),
            productNames: this.page.locator('.inventory_item_name'),
            productPrices: this.page.locator('.inventory_item_price'),
        }
    }

    productCard(productName: string) {
        return this.page.locator(`//div[.="${productName}"]//ancestor::div[@class="inventory_item"]`)
    }
}
