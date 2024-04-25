import ApiService from "@/services/ApiService";

const ROUTE_URL = '/authentication'

export const loginUser = (data: LoginUserForm) => ApiService.fetch<User>({
    url: `${ROUTE_URL}/login`,
    method: "POST",
    data
})

export const registerUser = (data: RegisterUserForm) => ApiService.fetch<User>({
    url: `${ROUTE_URL}/register`,
    method: "POST",
    data: data
})