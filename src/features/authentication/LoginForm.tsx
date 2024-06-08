'use client'
import React, {ReactElement, useState} from "react"
import {InputLabel, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import {useSWRConfig} from "swr";
import {SubmitHandler, useForm} from "react-hook-form";
import {loginUser} from "@/api/authentication/AuthenticationApi";
import {toast} from "react-toastify";
import SessionService from "@/services/SessionService";
import ApiService from "@/services/ApiService";
import {Box} from "@mui/system";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import {LoadingButton} from "@mui/lab";

const LoginForm = (): ReactElement => {
    const router = useRouter()
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
                mutate(() => true).then(() => router.replace('/'))
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
            display: "flex",
            flexFlow: "column nowrap",
            gap: 1
        }}>
            <Typography sx={{textAlign: "center", fontWeight: "bold", fontSize: 30}}>Login</Typography>

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

            <FormControl error={!!errors.root} disabled={formLoading} sx={{mt: 2}}>
                <LoadingButton type="submit" loading={formLoading} variant="outlined">
                    Submit
                </LoadingButton>
                {errors.root && <FormHelperText>{errors.root.message}</FormHelperText>}
            </FormControl>
        </Box>
    )
}
export default LoginForm