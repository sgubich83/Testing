import produce from "immer";
import AuthService from 'modules/Auth/api/AuthService'

export const SIGN_IN_USER = 'SIGN_IN_USER'

export const login = params => ({
    type: SIGN_IN_USER,
    apiCall: () => AuthService.login(params),
})

export const initialState = {
    loggedIn: {},
}

export default produce((draft, action) => {
    const { type, result = {}, payload = {} } = action
    switch (type) {
        case SIGN_IN_USER:
        {
            const { isLoading } = result
            const { data = {} } = payload
            draft.loggedIn = { data: data.result, isLoading, error: data.errorCode};
            break;
        }

        default:
            return draft
    }
}, initialState)

