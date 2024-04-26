'use client'
import {ReactElement, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import SessionService from "@/services/SessionService";
import ApiService from "@/services/ApiService";
import {registerUser} from "@/api/authentication/AuthenticationApi";

const RegisterUserForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: {errors}
    } = useForm<RegisterUserForm>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<RegisterUserForm> = (data) => {
        setLoading(true)

        registerUser(data)
            .then(res => {
                SessionService.startSession(res.sessionToken)
                router.push('/')
            })
            .catch(e => {
                setLoading(false)

                if (ApiService.isError(e))
                    setError('root', {type: 'server', message: e.message})

                else if (ApiService.isFail<RegisterUserFormFail>(e))
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof RegisterUserFormFail, {type: 'server', message: value})
                    })
            })
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