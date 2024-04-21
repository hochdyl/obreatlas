abstract class ApiResponseService {
    static isSuccess = <T = any>(res: any): res is SuccessApiResponse<T> => (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'success' &&
        res.data !== undefined
    )

    static isFail = <T = any>(res: any): res is FailApiResponse<T> => (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'fail' &&
        res.data !== undefined
    )

    static isError = (res: any): res is ErrorApiResponse => (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'error' &&
        res.message !== undefined
    )
}