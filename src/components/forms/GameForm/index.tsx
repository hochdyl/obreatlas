'use client'
import React, {ChangeEvent, ReactElement, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {createGame, editGame} from "@/api/games/GameApi";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import {useSWRConfig} from "swr";
import moment from "moment/moment";
import {Box} from "@mui/system";
import {Stack, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {GameFormData} from "@/types/games/GameFormData";
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";
import {FormType} from "@/enums/formType";
import {useRouter} from "next/navigation";
import theme from "@/theme";

type GameFormProps = {
    onSubmit?: () => void
    game?: Game
}

const GameForm = ({onSubmit = () => null, game}: GameFormProps): ReactElement => {
    const router = useRouter()
    const {mutate} = useSWRConfig()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const type = game ? FormType.Edit : FormType.Create
    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        trigger,
        formState: {errors}
    } = useForm<GameFormData>({
        defaultValues: {
            title: game?.title ?? "",
            slug: game?.slug ?? "",
            closed: game?.closed ?? undefined,
            startedAt: game?.startedAt ? moment(game?.startedAt, 'YYYY-MM-DD') : moment()
        }
    })

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('title').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const handleOnSubmit: SubmitHandler<GameFormData> = gameFormData => {
        setFormLoading(true)

        let gameForm: Promise<Game>
        let successMessage: string
        switch (type) {
            case FormType.Create:
                gameForm = createGame(gameFormData)
                successMessage = "Game successfully created"
                break
            case FormType.Edit:
                if (!game) {
                    throw Error('An error happened when loading game')
                }
                gameForm = editGame(game.id, gameFormData)
                successMessage = "Game successfully updated"
                break
        }

        gameForm
            .then(() => {
                toast.success(successMessage)
                mutate(() => true).then(() => {
                    if (type === FormType.Edit && game && game.slug !== gameFormData.slug) {
                        return router.push(`/${gameFormData.slug}`)
                    }
                    onSubmit()
                })
            })
            .catch(e => {
                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<GameFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<GameFormData>, {
                            type: 'server',
                            message: value
                        })
                    })
                }
            })
            .finally(() => setFormLoading(false))
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{gap: theme.spacing(1)}}>
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
export default GameForm