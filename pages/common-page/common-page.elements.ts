import { Page } from '@playwright/test'

export class CommonPageElements {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    get leftMenu() {
        return {
            allItems: this.page.locator('#inventory_sidebar_link'),
            about: this.page.locator('#about_sidebar_link'),
            logout: this.page.locator('#logout_sidebar_link'),
            resetAppState: this.page.locator('#reset_sidebar_link'),
        }
    }

    get buttons() {
        return {
            openMenu: this.page.locator('.bm-burger-button button'),
            closeMenu: this.page.locator('.bm-cross-button button'),
        }
    }

    get header() {
        return {
            title: this.page.locator('.app_logo'),
            cartBadge: this.page.locator('.shopping_cart_badge'),
        }
    }
}
