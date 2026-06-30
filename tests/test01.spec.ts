import { test } from '../fixtures/fixtures'
import { LoginPageData } from '../pages/login-page/login-page.data'
import { allure } from 'allure-playwright'

const { usernames, password } = LoginPageData.credentials
const { errorMessages } = LoginPageData

test.describe('Login', () => {
    test.beforeEach(async ({ commonPageMethods }) => {
        
        await commonPageMethods.navigateToTheApplication()
    })

    test('should login successfully with standard_user', async ({ loginPageMethods, productsPageMethods }) => {
        await allure.description('Verifica que un usuario válido puede iniciar sesión y acceder a la página de productos.')
        await allure.severity('critical')

        
        await loginPageMethods.login(usernames.standardUser, password)

        
        await productsPageMethods.verifyProductsPageIsDisplayed()
    })

    test('should show error for locked_out_user', async ({ loginPageMethods }) => {
        await allure.description('Verifica que un usuario bloqueado recibe el mensaje de error correspondiente.')
        await allure.severity('normal')

        
        await loginPageMethods.login(usernames.lockedOutUser, password)

        
        await loginPageMethods.verifyErrorMessageIsVisible(errorMessages.lockedOut)
    })

    test('should show error for invalid credentials', async ({ loginPageMethods }) => {
        await allure.description('Verifica que credenciales inválidas muestran el mensaje de error genérico.')
        await allure.severity('critical')

        
        await loginPageMethods.login('invalid_user', 'wrong_password')

        
        await loginPageMethods.verifyErrorMessageIsVisible(errorMessages.invalidCredentials)
    })

    test('should show error when username is empty', async ({ loginPageMethods }) => {
        await allure.description('Verifica que el login falla si el campo usuario está vacío.')
        await allure.severity('normal')

        
        await loginPageMethods.login('', password)

        
        await loginPageMethods.verifyErrorMessageIsVisible(errorMessages.emptyUsername)
    })

    test('should show error when password is empty', async ({ loginPageMethods }) => {
        await allure.description('Verifica que el login falla si el campo contraseña está vacío.')
        await allure.severity('normal')

        
        await loginPageMethods.login(usernames.standardUser, '')

        
        await loginPageMethods.verifyErrorMessageIsVisible(errorMessages.emptyPassword)
    })
})
