import produce from "immer";
import MainService from "modules/Main/api/MainService";

export const GET_WALLET = "GET_WALLET";
export const ADD_WALLET = "ADD_WALLET";
export const EDIT_WALLET = "EDIT_WALLET";
export const DELETE_WALLET = "DELETE_WALLET";
export const INCREASE_VALUE = "INCREASE_VALUE";
export const DECREASE_VALUE = "DECREASE_VALUE";
export const TRANSFER_VALUE = "TRANSFER_VALUE";
export const GET_WALLET_LIST = "GET_WALLET_LIST";

export const getWallet = id => ({
    type: GET_WALLET,
    apiCall: () => MainService.getWallet(id),
});

export const addWallet = data => dispatch => {
    dispatch({
        type: ADD_WALLET,
        apiCall: () => MainService.addWallet(data),
        shouldCallAPI: state => !state.main.walletAdded.isLoading,
    }).then(({success}) => {
        if (success) {
            dispatch(getWallets())
        }
    })
}

export const editWallet = data => dispatch => {
    dispatch({
        type: EDIT_WALLET,
        apiCall: () => MainService.editWallet(data),
        shouldCallAPI: state => !state.main.walletEdited.isLoading,
    }).then(({success}) => {
        if (success) {
            dispatch(getWallets())
        }
    })
}

export const deleteWallet = id => dispatch => {
    dispatch({
        type: DELETE_WALLET,
        apiCall: () => MainService.deleteWallet(id),
        shouldCallAPI: state => !state.main.walletDeleted.isLoading,
    }).then(({success}) => {
        if (success) {
            dispatch(getWallets())
        }
    })
}

export const increaseValue = data => dispatch => {
    dispatch({
        type: INCREASE_VALUE,
        apiCall: () => MainService.increaseValue(data),
        shouldCallAPI: state => !state.main.increasedValue.isLoading,
    }).then(({success}) => {
        if (success) {
            dispatch(getWallets())
        }
    })
}

export const decreaseValue = data => dispatch => {
    dispatch({
        type: DECREASE_VALUE,
        apiCall: () => MainService.decreaseValue(data),
        shouldCallAPI: state => !state.main.decreasedValue.isLoading,
    }).then(({success}) => {
        if (success) {
            dispatch(getWallets())
        }
    })
}

export const transferValue = data => dispatch => {
    dispatch({
        type: TRANSFER_VALUE,
        apiCall: () => MainService.transferValue(data),
        shouldCallAPI: state => !state.main.transferedValue.isLoading,
    }).then(({success}) => {
        if (success) {
            dispatch(getWallets())
        }
    })
}

export const getWallets = () => ({
    type: GET_WALLET_LIST,
    apiCall: () => MainService.getWallets(),
});

export const initialState = {
    currentWallet: {},
    usersList: {},
    walletAdded: {},
    walletEdited: {},
    walletDeleted: {},
    increasedValue: {},
    decreasedValue: {},
    transferedValue: {},
    walletList: {
        data: [],
    },
};

export default produce((draft, action) => {
    const {type, result = {}, payload = {}} = action;
    switch (type) {

        case GET_WALLET: {
            const {isLoading, error} = result
            const {data = {}} = payload
            draft.currentWallet = {data, isLoading, error};
            break;
        }

        case ADD_WALLET: {
            const {isLoading, error} = result
            const {data = {}} = payload
            draft.walletAdded = {data, isLoading, error};
            break;
        }

        case EDIT_WALLET: {
            const {isLoading, error} = result
            const {data = {}} = payload
            draft.walletEdited = {data, isLoading, error};
            break;
        }

        case DELETE_WALLET: {
            const {isLoading, error} = result
            const {data = {}} = payload
            draft.walletDeleted = {data, isLoading, error};
            break;
        }

        case INCREASE_VALUE: {
            const {isLoading, error} = result
            const {data = {}} = payload
            draft.increasedValue = {data, isLoading, error};
            break;
        }

        case DECREASE_VALUE: {
            const {isLoading, error} = result
            const {data = {}} = payload
            draft.decreasedValue = {data, isLoading, error};
            break;
        }

        case TRANSFER_VALUE: {
            const {isLoading, error} = result
            const {data = {}} = payload
            draft.transferedValue = {data, isLoading, error};
            break;
        }

        case GET_WALLET_LIST: {
            const {isLoading, error} = result
            const {data = []} = payload
            draft.walletList = {data, isLoading, error};
            break;
        }

        default:
            return draft;
    }
}, initialState);
