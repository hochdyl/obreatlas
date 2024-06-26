'use client'
import React, {ReactElement, useState} from "react"
import {Stack, SxProps, TextField} from "@mui/material";
import {useSWRConfig} from "swr";
import {SubmitHandler, useForm} from "react-hook-form";
import {registerUser} from "@/api/authentication/AuthenticationApi";
import SessionService from "@/services/SessionService";
import ApiService from "@/services/ApiService";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";
import theme from "@/theme";

type RegisterUserFormFail = Omit<RegisterUserForm, "passwordConfirm">

type RegisterFormProps = {
    sx?: SxProps
}

const RegisterForm = ({sx}: RegisterFormProps): ReactElement => {
    const {mutate} = useSWRConfig()
    const [formLoading, setFormLoading] = useState(false)
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: {errors}
    } = useForm<RegisterUserForm>()

    const onSubmit: SubmitHandler<RegisterUserForm> = registerFormData => {
        setFormLoading(true)

        registerUser(registerFormData)
            .then(user => {
                SessionService.startSession(user.sessionToken)
                toast.success('Successfully logged in')
                void mutate(() => true)
            })
            .catch(e => {
                setFormLoading(false)

                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<RegisterUserFormFail>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof RegisterUserFormFail, {type: 'server', message: value})
                    })
                }
            })
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{gap: theme.spacing(1), width: 1, ...sx}}>
            <FormControl error={!!errors.username} disabled={formLoading}>
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    aria-describedby="username-text"
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

            <FormControl error={!!errors.password} disabled={formLoading}>
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    aria-describedby="password-text"
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

            <FormControl error={!!errors.password} disabled={formLoading}>
                <TextField
                    id="password-confirm"
                    label="Confirm password"
                    variant="outlined"
                    aria-describedby="password-confirm-text"
                    {...register("passwordConfirm", {
                        required: {
                            value: true,
                            message: "Confirm your password"
                        },
                        validate: {
                            value: value => value === getValues().password || "Passwords don't match"
                        }
                    })}
                />
                {errors.passwordConfirm &&
                    <FormHelperText id="password-text">
                        {errors.passwordConfirm.message}
                    </FormHelperText>
                }
            </FormControl>

            <FormControl error={!!errors.root} sx={{mt: 2}}>
                <LoadingButton type="submit" loading={formLoading} variant="contained">
                    Register
                </LoadingButton>
                {errors.root && <FormHelperText>{errors.root.message}</FormHelperText>}
            </FormControl>
        </Stack>
    )
}
export default RegisterForm