import { history } from "utils";
import sha256 from 'js-sha256'

export const USER_AUTH = "USER_AUTH";

class AuthorizationUtils {
    storeSession(token) {
        localStorage.setItem(USER_AUTH, token);
    }

    getSessionToken() {
        return localStorage.getItem(USER_AUTH);
    }

    clearSession() {
        localStorage.removeItem(USER_AUTH);
    }

    redirectToLoginForm() {
        this.clearSession();
        history.push("/login");
    }

    redirectToHomePage() {
        const token = this.getSessionToken();
        if (token) {
            history.push("/main");
        } else {
            this.redirectToLoginForm();
        }
    }

    encryptBySHA256 = passwords => passwords.map(item => sha256(item))
}

export default new AuthorizationUtils();
