/**
 * Perform a call to the app's backend
 *
 * @param {ApiRequest} req Request parameters
 * @param req.endpoint - Url to call
 * @param req.method - Http method
 * @param req.body - Data to send
 * @param {(res) => ApiResponse} res Response callback
 *
 * @author HOCHET Dylan
 */
export const callApi = <T = any, T2 = any>(req: ApiRequest, res: (res: ApiResponse<T, T2>) => void): void => {
    const {endpoint, method, body} = req

    fetch(`${process.env.API_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ''
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(async r => {
        try {
            const data = await r.json();
            if (!isValid<T, T2>(data)) {
                return res({
                    status: 'error',
                    message: 'Response error: Invalid JSend object'
                })
            }
            return res(data)
        } catch (error) {
            return res({
                status: 'error',
                message: 'Client error: Something went wrong'
            })
        }
    }).catch(() => {
        return res({
            status: 'error',
            message: 'Server error: Something went wrong'
        })
    })
}
const isValid = <T, T2>(res: any): res is ApiResponse<T, T2> => {
    return isSuccess<T>(res) || isFail<T2>(res) || isError(res)
}
export const isSuccess = <T = any>(res: any): res is SuccessApiResponse<T> => {
    return (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'success' &&
        res.data !== undefined
    )
}
export const isFail = <T = any>(res: any): res is FailApiResponse<T> => {
    return (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'fail' &&
        res.data !== undefined
    )
}
export const isError = (res: any): res is ErrorApiResponse => {
    return (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'error' &&
        res.message !== undefined
    )
}