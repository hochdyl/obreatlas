'use client'
import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {router} from "next/client";
import {callApi, isSuccess} from "@/services/ApiService";

export type RegisterForm = {
    username: string
    password: string
    passwordConfirm: string
}

const RegisterUserForm: FC = () => {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors, isValid}
    } = useForm<RegisterForm>()
    // const {user, setUser} = useAuthentication()

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        setLoading(true)
        callApi({
            endpoint: 'register',
            method: 'POST',
            body: data
        }, res => {
            if (isSuccess(res)) {
                router.push('/')
            } else {
                console.log(res)
            }
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