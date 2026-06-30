import { User } from '../../interfaces/user.interface'

export class LoginPageData {
    static get standardUser(): User {
        return {
            username: LoginPageData.credentials.usernames.standardUser,
            password: LoginPageData.credentials.password,
        }
    }

    static get lockedOutUser(): User {
        return {
            username: LoginPageData.credentials.usernames.lockedOutUser,
            password: LoginPageData.credentials.password,
        }
    }

    static get credentials() {
        return {
            usernames: {
                standardUser: 'standard_user',
                lockedOutUser: 'locked_out_user',
                problemUser: 'problem_user',
                performanceGlitchUser: 'performance_glitch_user',
            },
            password: 'secret_sauce',
        }
    }

    static get errorMessages() {
        return {
            lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
            invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
            emptyUsername: 'Epic sadface: Username is required',
            emptyPassword: 'Epic sadface: Password is required',
        }
    }
}
