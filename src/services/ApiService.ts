import {AxiosError, AxiosRequestConfig} from "axios";
import axiosInstance from "@/lib/axios";

abstract class ApiService {
    static fetch = <T = any>(config: AxiosRequestConfig) => {
        return new Promise<T>((resolve, reject) => {
            axiosInstance<SuccessResponse<T>>({...config})
                .then(({data: res}) => resolve(res.data))
                .catch((err: AxiosError<ErrorResponse>) => {
                    console.log(err)
                    reject(err)
                })
        })
    }

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