import { Page } from "@playwright/test";
import { LoginPageElements } from "./login-page.elements";

export class LoginPageMethods{
    static insertUsername(arg0: string) {
        throw new Error('Method not implemented.');
    }
    private page: Page
    private loginPageElements: LoginPageElements
    constructor(page: Page){
        this.page = page
        this.loginPageElements = new LoginPageElements(page)
    }

    async insertUsername(username: string){
        await this.loginPageElements.textboxes.username.fill(username)
    }
    async insertPassword(password: string){
    await this.loginPageElements.textboxes.password.fill(password)
    }
    
    async clickOnLoginButton(){
        await this.loginPageElements.buttons.login.click()
    }
}