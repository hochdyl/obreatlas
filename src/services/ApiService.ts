import {AxiosError, AxiosRequestConfig} from "axios";
import axiosInstance from "@/lib/axios";

abstract class ApiService {
    static fetch = <T = any>(config: AxiosRequestConfig) =>
        new Promise<T>((resolve, reject) =>
            axiosInstance<SuccessResponse<T>>({...config})
                .then(res => resolve(res.data.data))
                .catch((err: AxiosError<ErrorResponse>) => reject(err))
        )

    static isSuccess = <T = any>(res: any): res is SuccessResponse<T> => (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'success' &&
        res.data !== undefined
    )

    static isFail = <T = any>(res: any): res is FailResponse<T> => (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'fail' &&
        res.data !== undefined
    )

    static isError = (res: any): res is ErrorResponse => (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'error' &&
        res.message !== undefined
    )
}
export default ApiService