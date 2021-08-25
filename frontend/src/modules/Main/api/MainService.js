import {BaseAPI} from "api";

class UsersService extends BaseAPI {
    getWallet(id) {
        return this.call({
            method: "GET",
            url: `/wallet/${id}`,
        });
    }

    getUsers() {
        return this.call({
            method: "GET",
            url: "/users",
        });
    }

    addWallet(data) {
        return this.call({
            method: "POST",
            url: "/wallet",
            data,
        });
    }

    editWallet(data) {
        return this.call({
            method: "PUT",
            url: "/wallet",
            data,
        });
    }

    deleteWallet(id) {
        return this.call({
            method: "DELETE",
            url: `/wallet/${id}`,
        });
    }

    increaseValue(data) {
        return this.call({
            method: "PUT",
            url: "/increase",
            data,
        });
    }

    decreaseValue(data) {
        return this.call({
            method: "PUT",
            url: "/decrease",
            data,
        });
    }

    transferValue(data) {
        return this.call({
            method: "POST",
            url: "/transfer",
            data,
        });
    }

    getWallets() {
        return this.call({
            method: "GET",
            url: "/wallets",
        });
    }
}

export default new UsersService();
