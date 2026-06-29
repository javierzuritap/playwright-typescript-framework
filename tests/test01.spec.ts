import { test } from '@playwright/test';
import { CommonPageMethods } from '../pages/common-page/common-page.methods';
import { LoginPageMethods } from '../pages/login-page/login-page.methods';
import { LoginPageData } from '../pages/login-page/login-page.data';

const userCredentials = LoginPageData.credentials;

test('Login', async ({ page }) => {
    const commonPageMethods = new CommonPageMethods(page);
    const loginPageMethods = new LoginPageMethods(page)

    await commonPageMethods.navigateToTheApplication();
    await loginPageMethods.insertUsername(userCredentials.usernames.standardUser)
    await loginPageMethods.insertPassword(userCredentials.password)
    await loginPageMethods.clickOnLoginButton()
    await page.waitForTimeout(5000)
});
