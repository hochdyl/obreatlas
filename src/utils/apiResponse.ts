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