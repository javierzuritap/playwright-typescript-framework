import { test as base, Page } from '@playwright/test'
import { CommonPageMethods } from '../pages/common-page/common-page.methods'
import { LoginPageMethods } from '../pages/login-page/login-page.methods'
import { ProductsPageMethods } from '../pages/products-page/products-page.methods'
import { CartPageMethods } from '../pages/cart-page/cart-page.methods'
import { CheckoutPageMethods } from '../pages/checkout-page/checkout-page.methods'
import { CheckoutOverviewPageMethods } from '../pages/checkout-overview-page/checkout-overview-page.methods'
import { ProductDetailPageMethods } from '../pages/product-detail-page/product-detail-page.methods'
import { LoginPageData } from '../pages/login-page/login-page.data'
import { Logger } from '../utils/logger'

type PageObjects = {
    commonPageMethods: CommonPageMethods
    loginPageMethods: LoginPageMethods
    productsPageMethods: ProductsPageMethods
    cartPageMethods: CartPageMethods
    checkoutPageMethods: CheckoutPageMethods
    checkoutOverviewPageMethods: CheckoutOverviewPageMethods
    productDetailPageMethods: ProductDetailPageMethods
}

type AuthenticatedFixtures = PageObjects & {
    authenticatedPage: Page
}

export const test = base.extend<PageObjects>({
    commonPageMethods: async ({ page }, use) => {
        await use(new CommonPageMethods(page))
    },
    loginPageMethods: async ({ page }, use) => {
        await use(new LoginPageMethods(page))
    },
    productsPageMethods: async ({ page }, use) => {
        await use(new ProductsPageMethods(page))
    },
    cartPageMethods: async ({ page }, use) => {
        await use(new CartPageMethods(page))
    },
    checkoutPageMethods: async ({ page }, use) => {
        await use(new CheckoutPageMethods(page))
    },
    checkoutOverviewPageMethods: async ({ page }, use) => {
        await use(new CheckoutOverviewPageMethods(page))
    },
    productDetailPageMethods: async ({ page }, use) => {
        await use(new ProductDetailPageMethods(page))
    },
})

export const authenticatedTest = base.extend<AuthenticatedFixtures>({
    authenticatedPage: async ({ page }, use, testInfo) => {
        Logger.info(`Iniciando fixture autenticada para el test: "${testInfo.title}"`)
        const commonPageMethods = new CommonPageMethods(page)
        const loginPageMethods = new LoginPageMethods(page)
        const user = LoginPageData.standardUser
        await commonPageMethods.navigateToTheApplication()
        await loginPageMethods.login(user.username, user.password)
        Logger.info(`Login completado con el usuario: "${user.username}"`)
        await use(page)
    },
    commonPageMethods: async ({ authenticatedPage }, use) => {
        await use(new CommonPageMethods(authenticatedPage))
    },
    loginPageMethods: async ({ authenticatedPage }, use) => {
        await use(new LoginPageMethods(authenticatedPage))
    },
    productsPageMethods: async ({ authenticatedPage }, use) => {
        await use(new ProductsPageMethods(authenticatedPage))
    },
    cartPageMethods: async ({ authenticatedPage }, use) => {
        await use(new CartPageMethods(authenticatedPage))
    },
    checkoutPageMethods: async ({ authenticatedPage }, use) => {
        await use(new CheckoutPageMethods(authenticatedPage))
    },
    checkoutOverviewPageMethods: async ({ authenticatedPage }, use) => {
        await use(new CheckoutOverviewPageMethods(authenticatedPage))
    },
    productDetailPageMethods: async ({ authenticatedPage }, use) => {
        await use(new ProductDetailPageMethods(authenticatedPage))
    },
})

export { expect } from '@playwright/test'
