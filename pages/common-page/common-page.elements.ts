import { Page } from "@playwright/test"

export class CommonPageElements{
    private page: Page

    constructor(page: Page){
        this.page = page
    }

    get leftMenu(){
        return{
            allItems: this.page.locator('#inventory_sidebar_link'),
            about: this.page.locator('#about_sidebar_link'),
            logout: this.page.locator('#logout_sidebar_link'),
            resetAppState: this.page.locator('#reset_sidebar_link'),

        }
    }

    get buttons(){
        return{
            openMenu: this.page.locator('.bm-burger-button button')
        }
    }
}