'use client'
import {ReactElement, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import SessionService from "@/services/SessionService";
import ApiService from "@/services/ApiService";

type LoginUserForm = {
    username: string
    password: string
}

const LoginUserForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<LoginUserForm>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<LoginUserForm> = (data) => {
        setLoading(true)

        ApiService.fetch<User>({url: "/authentication/login", method: "POST", data: data})
            .then(res => {
                SessionService.openSession(res.apiToken)
                router.push('/')
            })
            .catch(e => {
                setLoading(false)
                
                if (ApiService.isError(e))
                    setError('root', {type: 'server', message: e.message})

                else if (ApiService.isFail<LoginUserForm>(e))
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof LoginUserForm, {type: 'server', message: value})
                    })
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button onClick={() => router.push('/register')}>register</button>
            <input
                placeholder="username"
                autoComplete="username"
                {...register("username", {
                    required: {
                        value: true,
                        message: "Username is required"
                    },
                })}
            />
            {errors.username && <span>{errors.username.message}</span>}

            <input
                placeholder="password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                    required: {
                        value: true,
                        message: "Password is required"
                    },
                })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <input type="submit"/>
            {errors.root && <span>{errors.root.message}</span>}

            {loading && <p>loading...</p>}
        </form>
    )
}
export default LoginUserForm