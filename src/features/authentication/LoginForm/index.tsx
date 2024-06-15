'use client'
import React, {ReactElement, useState} from "react"
import {InputLabel, Stack, SxProps} from "@mui/material";
import {useSWRConfig} from "swr";
import {SubmitHandler, useForm} from "react-hook-form";
import {loginUser} from "@/api/authentication/AuthenticationApi";
import {toast} from "react-toastify";
import SessionService from "@/services/SessionService";
import ApiService from "@/services/ApiService";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import {LoadingButton} from "@mui/lab";

type LoginFormProps = {
    sx?: SxProps
}

const LoginForm = ({sx}: LoginFormProps): ReactElement => {
    const {mutate} = useSWRConfig()
    const [formLoading, setFormLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<LoginUserForm>({
        defaultValues: {
            username: "admin",
            password: "admin"
        }
    })

    const onSubmit: SubmitHandler<LoginUserForm> = loginFormData => {
        setFormLoading(true)

        loginUser(loginFormData)
            .then(user => {
                SessionService.startSession(user.sessionToken)
                toast.success('Successfully logged in')
                void mutate(() => true)
            })
            .catch(e => {
                setFormLoading(false)

                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<LoginUserForm>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<LoginUserForm>, {type: 'server', message: value})
                    })
                }
            })
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{gap: 1, width: 1, ...sx}}>
            <FormControl error={!!errors.username} variant="standard" disabled={formLoading}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                    size="small"
                    id="username"
                    aria-describedby="username-text"
                    autoComplete="username"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required"
                        },
                    })}
                />
                {errors.username &&
                    <FormHelperText id="username-text">
                        {errors.username.message}
                    </FormHelperText>
                }
            </FormControl>

            <FormControl error={!!errors.password} variant="standard" disabled={formLoading}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    aria-describedby="password-text"
                    autoComplete="current-password"
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Password is required"
                        },
                    })}
                />
                {errors.password &&
                    <FormHelperText id="password-text">
                        {errors.password.message}
                    </FormHelperText>
                }
            </FormControl>

            <FormControl error={!!errors.root} sx={{mt: 1}}>
                <LoadingButton type="submit" loading={formLoading} variant="contained">
                    Login
                </LoadingButton>
                {errors.root && <FormHelperText>{errors.root.message}</FormHelperText>}
            </FormControl>
        </Stack>
    )
}
export default LoginForm