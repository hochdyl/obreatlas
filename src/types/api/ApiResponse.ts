type ApiRequest = {
    endpoint: string,
    method: 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: object
}

type SuccessApiResponse = {
    status: 'success';
    data: any
}

type FailApiResponse = {
    status: 'fail';
    data: any
}

type ErrorApiResponse = {
    status: 'error';
    message: string
}

type ApiResponse = SuccessApiResponse | FailApiResponse | ErrorApiResponse;