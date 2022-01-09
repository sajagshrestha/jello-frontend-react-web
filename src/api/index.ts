import axios, {AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
import {getToken} from '../utils/local-storage';

/**
 * Axios instance with auth.
 */
const jelloWithAuth: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = getToken();
    if (!token) return config;

    //config may be undefined
    if (!config) {
        config = {};
    }
    if (!config.headers) {
        config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
};

const onError = (error: AxiosError | any) => {
    if (error.response.data.message) {
        return Promise.reject({
            ...error,
            message: error?.response?.data?.message
        });
    }

    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
    return response;
};

jelloWithAuth.interceptors.request.use(onRequest);
jelloWithAuth.interceptors.response.use(onResponse, onError);

/**
 * Axios instance without auth
 */
const jelloWithoutAuth: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

jelloWithoutAuth.interceptors.response.use(onResponse, onError);

export {jelloWithAuth, jelloWithoutAuth};
