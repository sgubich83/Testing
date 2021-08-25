import { BaseAPI } from 'api'
import { AuthorizationUtils } from 'utils'

class AuthService extends BaseAPI {
    login({ password, login }) {
        const encrypted = AuthorizationUtils.encryptBySHA256([password])
        return this.call({
            method: 'post',
            url: '/auth',
            data: {
                login,
                password: encrypted[0],
            },
        })
    }

    logout() {
        const token = AuthorizationUtils.getSessionToken()
        return this.call({
            method: 'DELETE',
            url: `/logout/${token}`,
        })
    }

}

export default new AuthService()
