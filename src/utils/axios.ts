import axios from "axios";
import SessionService from "@/services/SessionService";

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${SessionService.getSession()}`
    return config
})

axiosInstance.interceptors.response.use(
    res => res,
    err => {
        if (err.isAxiosError && err.request.status === 401)
            // Next middleware will redirect if no session is found
            SessionService.closeSession()

        return Promise.reject(err);
    }
);

export default axiosInstance