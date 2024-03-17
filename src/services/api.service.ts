export class ApiService
{
    static async CallApi<T>(
        endpoint: string,
        method: 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        body?: object
    ): Promise<T>
    {
        const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.getToken() ?? ''
            },
            body: body ? JSON.stringify(body) : undefined,
        })
        const data = await response.json()
        if (!response.ok) {
            return Promise.reject(data)
        }
        return data
    }

    static getToken(): string|null {
        return localStorage.getItem('apiToken')
    }
}