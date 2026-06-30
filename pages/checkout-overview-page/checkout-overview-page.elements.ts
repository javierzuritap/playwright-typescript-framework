import { Page } from '@playwright/test'

export class CheckoutOverviewPageElements {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    get buttons() {
        return {
            finish: this.page.locator('[data-test="finish"]'),
            cancel: this.page.locator('[data-test="cancel"]'),
            backHome: this.page.locator('[data-test="back-to-products"]'),
        }
    }

    get labels() {
        return {
            pageTitle: this.page.locator('[data-test="title"]'),
            itemNames: this.page.locator('.inventory_item_name'),
            summarySubtotal: this.page.locator('.summary_subtotal_label'),
            summaryTax: this.page.locator('.summary_tax_label'),
            summaryTotal: this.page.locator('.summary_total_label'),
            completeHeader: this.page.locator('[data-test="complete-header"]'),
            completeText: this.page.locator('[data-test="complete-text"]'),
        }
    }
}
