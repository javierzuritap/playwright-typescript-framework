import { Page, expect, test } from '@playwright/test'
import { LoginPageElements } from './login-page.elements'

export class LoginPageMethods {
    private page: Page
    private loginPageElements: LoginPageElements

    constructor(page: Page) {
        this.page = page
        this.loginPageElements = new LoginPageElements(page)
    }

    async insertUsername(username: string) {
        await test.step(`Insertar usuario: "${username}"`, async () => {
            await this.loginPageElements.textboxes.username.fill(username)
        })
    }

    async insertPassword(password: string) {
        await test.step('Insertar contraseña', async () => {
            await this.loginPageElements.textboxes.password.fill(password)
        })
    }

    async clickOnLoginButton() {
        await test.step('Pulsar botón de login', async () => {
            await this.loginPageElements.buttons.login.click()
        })
    }

    async login(username: string, password: string) {
        await test.step(`Login con usuario "${username}"`, async () => {
            await this.insertUsername(username)
            await this.insertPassword(password)
            await this.clickOnLoginButton()
        })
    }

    async verifyErrorMessageIsVisible(errorMessage: string) {
        await test.step(`Verificar mensaje de error: "${errorMessage}"`, async () => {
            await expect(this.loginPageElements.error.container).toBeVisible()
            await expect(this.loginPageElements.error.container).toContainText(errorMessage)
        })
    }

    async verifyLoginPageIsDisplayed() {
        await test.step('Verificar que se muestra la página de login', async () => {
            await expect(this.loginPageElements.buttons.login).toBeVisible()
        })
    }
}
