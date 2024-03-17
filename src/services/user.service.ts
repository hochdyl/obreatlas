import {ApiService} from "@/services/api.service";

export class UserService extends ApiService
{
    static RegisterUser(data: LoginForm)
    {
        return this.CallApi<RegisteredUser>('register', 'POST', {
            username: data.username,
            password: data.password
        })
    }
}