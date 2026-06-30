import { Page } from '@playwright/test'

export class CartPageElements {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    get buttons() {
        return {
            checkout: this.page.locator('[data-test="checkout"]'),
            continueShopping: this.page.locator('[data-test="continue-shopping"]'),
            removeItem: (productName: string) =>
                this.page.locator(`//div[.="${productName}"]//ancestor::div[@class="cart_item"]//button`),
        }
    }

    get labels() {
        return {
            pageTitle: this.page.locator('[data-test="title"]'),
            cartItemNames: this.page.locator('.inventory_item_name'),
            cartItemPrices: this.page.locator('.inventory_item_price'),
            cartQuantity: (productName: string) =>
                this.page.locator(`//div[.="${productName}"]//ancestor::div[@class="cart_item"]//div[@class="cart_quantity"]`),
        }
    }

    cartItem(productName: string) {
        return this.page.locator(`//div[.="${productName}"]//ancestor::div[@class="cart_item"]`)
    }
}
