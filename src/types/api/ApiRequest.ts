type ApiRequest = {
    endpoint: string,
    method: 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: any
}