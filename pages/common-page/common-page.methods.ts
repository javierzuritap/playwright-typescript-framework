import { Page, expect, test } from '@playwright/test'
import { CommonPageElements } from './common-page.elements'

export class CommonPageMethods {
    private page: Page
    private commonPageElements: CommonPageElements

    constructor(page: Page) {
        this.page = page
        this.commonPageElements = new CommonPageElements(page)
    }

    async navigateToTheApplication() {
        await test.step('Navegar a la aplicación SauceDemo', async () => {
            await this.page.goto('/')
        })
    }

    async openMenu() {
        await test.step('Abrir el menú lateral', async () => {
            await this.commonPageElements.buttons.openMenu.click()
        })
    }

    async closeMenu() {
        await test.step('Cerrar el menú lateral', async () => {
            await this.commonPageElements.buttons.closeMenu.click()
        })
    }

    async clickOnAllItemsOption() {
        await test.step('Pulsar opción All Items del menú', async () => {
            await this.commonPageElements.leftMenu.allItems.click()
        })
    }

    async clickOnAboutOption() {
        await test.step('Pulsar opción About del menú', async () => {
            await this.commonPageElements.leftMenu.about.click()
        })
    }

    async clickOnLogoutOption() {
        await test.step('Pulsar opción Logout del menú', async () => {
            await this.commonPageElements.leftMenu.logout.click()
        })
    }

    async clickOnResetAppStateOption() {
        await test.step('Pulsar opción Reset App State del menú', async () => {
            await this.commonPageElements.leftMenu.resetAppState.click()
        })
    }

    async getCartItemCount(): Promise<string> {
        return await this.commonPageElements.header.cartBadge.innerText()
    }

    async verifyCartBadgeIsVisible() {
        await test.step('Verificar que el contador del carrito es visible', async () => {
            await expect(this.commonPageElements.header.cartBadge).toBeVisible()
        })
    }

    async verifyCartBadgeIsNotVisible() {
        await test.step('Verificar que el contador del carrito no es visible', async () => {
            await expect(this.commonPageElements.header.cartBadge).not.toBeVisible()
        })
    }
}
