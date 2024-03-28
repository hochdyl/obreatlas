type ApiRequest = {
    endpoint: string,
    method: 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: object
}

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

type ApiResponse<T, T2 = any> = SuccessApiResponse<T> | FailApiResponse<T2> | ErrorApiResponse;