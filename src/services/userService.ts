export class UserService {
    static async registerUser(data: LoginForm) {
        console.log(process.env.API_URL + `/user`)
        console.log(`http://localhost:8000/user`)
        const response = await fetch(`http://localhost:8000/user`, {
            body: JSON.stringify({
                username: data.username,
                password: data.password
            }),
            method: 'POST'
        })
        console.log(response)
    }
}