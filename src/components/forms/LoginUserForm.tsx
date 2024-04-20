'use client'
import {ReactElement, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import callApi from "@/utils/axios";
import {SESSION_COOKIE_NAME, setSession} from "@/utils/session";
import {isError, isFail} from "@/utils/apiResponse";
import {setCookie} from "cookies-next";

type LoginForm = {
    username: string
    password: string
}

const LoginUserForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<LoginForm>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<LoginForm> = (data) => {
        setLoading(true)

        callApi<User>({url: "/login", method: "POST", data: data})
            .then(res => {
                setSession(res.apiToken)
                router.push('/')
            })
            .catch(e => {
                if (isError(e))
                    setError('root', {type: 'server', message: e.message})
                else if (isFail<LoginForm>(e))
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof LoginForm, {type: 'server', message: value})
                    })
            })
            .finally(() => setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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