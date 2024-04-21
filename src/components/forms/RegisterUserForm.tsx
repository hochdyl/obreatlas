'use client'
import {ReactElement, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import callApi from "@/utils/axios";
import SessionService from "@/services/SessionService";

type RegisterForm = {
    username: string
    password: string
    passwordConfirm: string
}
type RegisterFormFail = Omit<RegisterForm, "passwordConfirm">

const RegisterUserForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: {errors}
    } = useForm<RegisterForm>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<RegisterForm> = (data) => {
        setLoading(true)

        callApi<User>({url: "/register", method: "POST", data: data})
            .then(res => {
                SessionService.openSession(res.apiToken)
                router.push('/')
            })
            .catch(e => {
                if (ApiResponseService.isError(e))
                    setError('root', {type: 'server', message: e.message})

                else if (ApiResponseService.isFail<RegisterFormFail>(e))
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof RegisterFormFail, {type: 'server', message: value})
                    })
            })
            .finally(() => setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button onClick={() => router.push('/login')}>login</button>
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

            <input
                placeholder="confirm password"
                type="password"
                {...register("passwordConfirm", {
                    required: {
                        value: true,
                        message: "Confirm your password"
                    },
                    validate: {
                        value: value => value === getValues().password ||
                            "Passwords don't match"
                    }
                })}
            />
            {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}

            <input type="submit"/>
            {errors.root && <span>{errors.root.message}</span>}

            {loading && <p>loading...</p>}
        </form>
    )
}
export default RegisterUserForm