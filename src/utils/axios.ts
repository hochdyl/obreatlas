'use client'
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {deleteSession, getSession} from "@/utils/session";

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${getSession()}`
    return config
})

axiosInstance.interceptors.response.use(
    res => res,
    err => {
        if (err.isAxiosError && err.response) {
            const response = err.response

            // Next middleware will redirect if no session is found
            if (response.status === 401) {
                deleteSession()
            }
        }
        return Promise.reject(err);
    }
);

export const callApi = <T = any>(config: AxiosRequestConfig) => {
    return new Promise<T>((resolve, reject) => {
        axiosInstance<SuccessApiResponse<T>>({...config})
        .then(res => {
            resolve(res.data.data)
        })
        .catch((err: AxiosError<ErrorApiResponse>) => {
            if (err.isAxiosError && err.response) {
                const response = err.response
                reject({status: response.status, data: response.data})
            }
            reject(err)
        })
    });
}
export default callApi