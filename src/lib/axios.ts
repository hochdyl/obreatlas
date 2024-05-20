import axios, {AxiosError, HttpStatusCode} from "axios";
import SessionService from "@/services/SessionService";

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Accept: "application/json",
    },
    timeout: 3000,
    timeoutErrorMessage: "Server took too long to respond"
})

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${SessionService.getSession()}`
    return config
})

axiosInstance.interceptors.response.use(
    res => res,
    err => {
        if (err.isAxiosError) {
            if (err.request.status === HttpStatusCode.Unauthorized)
                SessionService.closeSession()

            if (err.code === AxiosError.ECONNABORTED) {
                const errorResponse = {status: "error", message: err.message} as ErrorResponse
                return Promise.reject(errorResponse)
            }

            if (err.response)
                return Promise.reject(err.response.data)
        }
        return Promise.reject(err);
    }
);
export default axiosInstance