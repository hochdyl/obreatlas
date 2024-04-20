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
        if (err.isAxiosError && err.request.status === 401)
            // Next middleware will redirect if no session is found
            deleteSession()

        return Promise.reject(err);
    }
);

export const callApi = <T = any>(config: AxiosRequestConfig) =>
    new Promise<T>((resolve, reject) =>
        axiosInstance<SuccessApiResponse<T>>({...config})
            .then(res => resolve(res.data.data))
            .catch((err: AxiosError<ErrorApiResponse>) => {
                if (err.isAxiosError && err.response) {
                    const response = err.response
                    reject(response.data)
                }
                reject(err)
            })
    )
export default callApi