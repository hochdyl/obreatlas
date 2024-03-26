export const callApi = (req: ApiRequest, res: (res: ApiResponse) => void): void => {
    const {endpoint, method, body} = req

    fetch(`${process.env.API_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ''
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(async response => {
        try {
            const data = await response.json();
            if (!isValid(data)) {
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
export const isSuccess = (res: any): res is SuccessApiResponse => {
    return (
        typeof res === 'object' &&
        typeof res.status === 'string' &&
        res.status === 'success' &&
        res.data !== undefined
    )
}
export const isFail = (res: any): res is FailApiResponse => {
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
        res.data !== undefined
    )
}
export const isValid = (res: any): res is ApiResponse => {
    return isSuccess(res) || isFail(res) || isError(res)
}