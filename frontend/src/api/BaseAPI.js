import axios from "axios";

const API_CALL_TIMEOUT = 30000;

const axiosConfig = {
    timeout: API_CALL_TIMEOUT,
    headers: {
        Accept: "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
    },
};

const API = axios.create(axiosConfig);

// normalization for axios http-errors
const castError = (error) => {
    const { response } = error;
    const errorResult = response ? response.data : error;
    const status = response ? response.status : error.code;
    const statusText = response ? response.statusText : error.message;

    if (process.env.NODE_ENV !== "production") {
        console.error("API:", errorResult); // eslint-disable-line
    }

    return {
        errorResult,
        status,
        statusText,
    };
};

class BaseAPI {
    call({
             data,
             method,
             url,
             params,
             headers,
             timeout,
             baseURL,
         }) {
        const callParams = {
            method,
            url,
            params,
            timeout,
            baseURL: baseURL || API.defaults.baseURL,
            headers: {
                ...API.defaults.headers,
                ...headers,
            },
            data,
        };
        return API(callParams).catch((error) => Promise.reject(castError(error)));
    }
}

export default BaseAPI;
