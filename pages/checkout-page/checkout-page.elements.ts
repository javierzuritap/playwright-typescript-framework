import { Page } from '@playwright/test'

export class CheckoutPageElements {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    get textboxes() {
        return {
            firstName: this.page.locator('[data-test="firstName"]'),
            lastName: this.page.locator('[data-test="lastName"]'),
            postalCode: this.page.locator('[data-test="postalCode"]'),
        }
    }

    get buttons() {
        return {
            continue: this.page.locator('[data-test="continue"]'),
            cancel: this.page.locator('[data-test="cancel"]'),
        }
    }

    get labels() {
        return {
            pageTitle: this.page.locator('[data-test="title"]'),
            errorMessage: this.page.locator('[data-test="error"]'),
        }
    }
}
