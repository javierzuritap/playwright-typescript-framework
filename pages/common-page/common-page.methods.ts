import type { Page } from '@playwright/test';

export class CommonPageMethods {
    constructor(private page: Page) {}

    async navigateToTheApplication() {
        await this.page.goto('https://www.saucedemo.com/');
    }
}
