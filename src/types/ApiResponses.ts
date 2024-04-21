type SuccessResponse<T> = {
    status: 'success';
    data: T
}

type FailResponse<T> = {
    status: 'fail';
    data: T
}

type ErrorResponse = {
    status: 'error';
    message: string
}