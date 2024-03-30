'use client'
import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {callApi, isError, isFail} from "@/services/ApiService";
import {useRouter} from "next/navigation";
import {setSession} from "@/services/SessionService";
import {useAuthentication} from "@/contexts/AuthenticationContext";

export type RegisterForm = {
    username: string
    password: string
    passwordConfirm: string
}

const RegisterUserForm: FC = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors, isValid}
    } = useForm<RegisterForm>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {setUser} = useAuthentication()

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        setLoading(true)
        callApi<User>({
            endpoint: 'register',
            method: 'POST',
            body: data
        }, async res => {
            if (isError(res)) {
                return
            } else if (isFail(res)) {
                return
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
                    required: true
                })}
            />
            {errors.username && <span>This field is required</span>}

            <input
                placeholder="password"
                type="password"
                {...register("password", {
                    required: true
                })}
            />
            {errors.password && <span>This field is required</span>}

            <input
                placeholder="confirm password"
                type="password"
                {...register("passwordConfirm", {
                    required: true,
                    validate: value => value === getValues().password
                })}
            />
            {errors.password && <span>This field is required</span>}

            <input type="submit" disabled={!isValid}/>
            {loading &&
                <p>loading...</p>
            }
        </form>
    )
}
export default RegisterUserForm