'use client'
import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {callApi, isError, isFail} from "@/services/ApiService";
import {useRouter} from "next/navigation";
import {setSession} from "@/services/SessionService";
import {useAuthentication} from "@/contexts/AuthenticationContext";

type LoginForm = {
    username: string
    password: string
}

const LoginUserForm: FC = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<LoginForm>()
    const router = useRouter()
    const {setUser} = useAuthentication()
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        setLoading(true)

        callApi<User, LoginForm>({
            endpoint: 'login',
            method: 'POST',
            body: data
        }, async res => {
            setLoading(false)

            if (isError(res)) {
                return setError('root', {type: 'server', message: res.message})
            }
            else if (isFail(res)) {
                return Object.entries(res.data).forEach(([key, value]) => {
                    setError(key as keyof LoginForm, {type: 'server', message: value})
                })
            }

            await setSession(res.data.apiToken)
            setUser(res.data)
            router.push('/')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder="username"
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