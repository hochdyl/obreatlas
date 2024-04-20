type SuccessApiResponse<T> = {
    status: 'success';
    data: T
}

type FailApiResponse<T> = {
    status: 'fail';
    data: T
}

type ErrorApiResponse = {
    status: 'error';
    message: string
}