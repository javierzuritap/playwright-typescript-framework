import { Page } from "@playwright/test"

export class LoginPageElements{
    private page: Page

    constructor(page: Page){
        this.page=page
    }

    get textboxes(){
        return{
            username: this.page.locator('[data-test="username"]'),
            password: this.page.locator('[data-test="password"]'),
        }
    }

    get buttons(){
        return{
            login: this.page.locator('#login-button')
        }
    }
}