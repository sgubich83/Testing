export const REQUEST_TYPE = '_STARTED'
export const SUCCESS_TYPE = '_SUCCESS'
export const FAILURE_TYPE = '_FAILURE'

const apiCallMiddleware = ({ dispatch, getState }) => next => action => {
    const {
        type, apiCall, shouldCallAPI, params
    } = action

    // Normal action: pass it on
    if (!apiCall) {
        return next(action)
    }

    // mechanism for caching || preventing duplicate requests
    if (shouldCallAPI && !shouldCallAPI(getState())) {
        return null
    }

    const requestType = `${type}${REQUEST_TYPE}`
    const successType = `${type}${SUCCESS_TYPE}`
    const failureType = `${type}${FAILURE_TYPE}`

    dispatch({ type, subtype: requestType, payload: {}, params }) // isLoading

    return apiCall()
        .then(({ data }) => {
            dispatch({ type, subtype: successType, payload: { data }, params })

            return data
        })
        .catch(error => {
            dispatch({ type, subtype: failureType, payload: { error: error.errorResult }, params })
            return error
        })
}

export default apiCallMiddleware
