'use client'
import React, {ChangeEvent, ReactElement, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {createGame} from "@/api/games/GameApi";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import {useRouter} from "next/navigation";
import {useSWRConfig} from "swr";
import moment from "moment/moment";
import {Box} from "@mui/system";
import {Stack, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {CreateGameFormData} from "@/types/games/CreateGameFormData";
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";

const CreateGameForm = (): ReactElement => {
    const router = useRouter()
    const {mutate} = useSWRConfig()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        trigger,
        getValues,
        formState: {errors}
    } = useForm<CreateGameFormData>({
        defaultValues: {
            startedAt: moment()
        }
    })

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('title').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<CreateGameFormData> = newGameFormData => {
        setFormLoading(true)

        createGame(newGameFormData)
            .then(() => {
                toast.success('Game successfully created')
                mutate(() => true).then(() => router.push(`/${getValues('slug')}`))
            })
            .catch(e => {
                setFormLoading(false)

                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<CreateGameFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<CreateGameFormData>, {type: 'server', message: value})
                    })
                }
            })
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{gap: 1}}>
            <FormControl error={!!errors.slug} disabled={formLoading}>
                <TextField
                    id="title"
                    label="Title"
                    variant="filled"
                    aria-describedby="title-text"
                    {...register("title", {
                        required: {
                            value: true,
                            message: "Title is required"
                        },
                        pattern: {
                            value: /^(?!login$|register$)[a-zA-Z0-9\- ]+$/,
                            message: "Title is invalid"
                        },
                        onChange: e => handleTitleChange(e)
                    })}
                />
                {errors.slug &&
                    <FormHelperText id="title-text">
                        {errors.slug.message}
                    </FormHelperText>
                }
            </FormControl>

            <Box hidden>
                <TextField
                    id="slug"
                    aria-describedby="slug-text"
                    {...register("slug", {
                        required: {
                            value: true,
                            message: "Title is required"
                        },
                        pattern: {
                            value: /^(?!login$|register$)[a-zA-Z0-9\- ]+$/,
                            message: "Title is invalid"
                        },
                    })}
                />
            </Box>

            <Controller
                control={control}
                name="startedAt"
                rules={{
                    required: {
                        value: true,
                        message: "Start date is required"
                    }
                }}
                render={({field}) =>
                    <DatePicker
                        label="Started at"
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(date) => {
                            field.onChange(date);
                        }}
                        slotProps={{
                            textField: {
                                variant: "filled",
                                error: !!errors.startedAt,
                                helperText: errors.startedAt?.message
                            }
                        }}
                    />
                }
            />

            <FormControl error={!!errors.root}>
                <LoadingButton type="submit" loading={formLoading} variant="contained" sx={{mt: 1}}>
                    Submit
                </LoadingButton>
                {errors.root && <FormHelperText>{errors.root.message}</FormHelperText>}
            </FormControl>
        </Stack>
    )
}
export default CreateGameForm