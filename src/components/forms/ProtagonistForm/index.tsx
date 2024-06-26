'use client'
import React, {ChangeEvent, ReactElement, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import {useParams} from "next/navigation";
import {useSWRConfig} from "swr";
import {Box} from "@mui/system";
import {Stack, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {LoadingButton} from "@mui/lab";
import {createProtagonist, editProtagonist} from "@/api/protagonists/ProtagonistApi";
import Uploader from "@/components/common/Uploader";
import {toast} from "react-toastify";
import {FormType} from "@/enums/formType";
import getImage from "@/utils/getImage";
import theme from "@/theme";

type ProtagonistFormProps = {
    onSubmit?: () => void
    protagonist?: Protagonist
}

const ProtagonistForm = ({onSubmit = () => null, protagonist}: ProtagonistFormProps): ReactElement => {
    const {mutate} = useSWRConfig()
    const params = useParams<{ gameSlug: string }>()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const type = protagonist ? FormType.Edit : FormType.Create
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        setError,
        trigger,
        formState: {errors}
    } = useForm<ProtagonistFormData>({
        defaultValues: {
            name: protagonist?.name ?? "",
            slug: protagonist?.slug ?? "",
            story: protagonist?.story ?? undefined,
            level: protagonist?.level ?? 1,
            portrait: protagonist?.portrait ?? undefined
        }
    })

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('name').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const getPortrait = () => {
        const portrait = getValues('portrait')
        return portrait ? getImage(portrait) : null
    }

    const addPortrait = (file: Upload) => {
        setValue("portrait", file)
    }

    const removePortrait = () => {
        setValue("portrait", null)
    }

    const handleOnSubmit: SubmitHandler<ProtagonistFormData> = protagonistFormData => {
        setFormLoading(true)

        let protagonistForm: Promise<Protagonist>
        let successMessage: string
        switch (type) {
            case FormType.Create:
                protagonistForm = createProtagonist(params.gameSlug, protagonistFormData)
                successMessage = "Protagonist successfully created"
                break
            case FormType.Edit:
                if (!protagonist) {
                    throw Error('An error happened when loading protagonist')
                }
                protagonistForm = editProtagonist(protagonist.id, protagonistFormData)
                successMessage = "Protagonist successfully updated"
                break
        }

        protagonistForm
            .then(() => {
                toast.success(successMessage)
                mutate(() => true).then(() => onSubmit())
            })
            .catch(e => {
                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<ProtagonistFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<ProtagonistFormData>, {
                            type: 'server',
                            message: value
                        })
                    })
                }
            })
            .finally(() => setFormLoading(false))
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{gap: theme.spacing(2)}}>
            <Stack direction="row" sx={{gap: theme.spacing(2)}}>
                <Uploader
                    preview={getPortrait()}
                    onFinished={addPortrait}
                    onRemove={removePortrait}
                />

                <Box hidden>
                    <TextField
                        id="portrait"
                        aria-describedby="portrait-file"
                        {...register("portrait")}
                    />
                </Box>

                <FormControl error={!!errors.slug} disabled={formLoading} sx={{flex: 1}}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="filled"
                        aria-describedby="name-text"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            },
                            onChange: e => handleNameChange(e)
                        })}
                    />
                    {errors.name &&
                        <FormHelperText id="name-text">
                            {errors.name.message}
                        </FormHelperText>
                    }
                </FormControl>

                {type === FormType.Edit &&
                    <FormControl error={!!errors.level} disabled={formLoading}>
                        <TextField
                            id="level"
                            type="number"
                            label="Level"
                            variant="filled"
                            aria-describedby="level-text"
                            {...register("level", {
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: "Level is required"
                                },
                                min: {
                                    value: 1,
                                    message: "Minimum level is 1"
                                }
                            })}
                        />
                        {errors.name &&
                            <FormHelperText id="name-text">
                                {errors.name.message}
                            </FormHelperText>
                        }
                    </FormControl>
                }
            </Stack>

            <Box hidden>
                <TextField
                    id="slug"
                    aria-describedby="slug-text"
                    {...register("slug", {
                        required: {
                            value: true,
                            message: "Name is required"
                        }
                    })}
                />
            </Box>

            <FormControl error={!!errors.story} disabled={formLoading}>
                <TextField
                    id="story"
                    label="Story"
                    variant="filled"
                    aria-describedby="story-text"
                    multiline
                    rows={5}
                    {...register("story")}
                />
                {errors.story &&
                    <FormHelperText id="name-text">
                        {errors.story.message}
                    </FormHelperText>
                }
            </FormControl>

            <FormControl error={!!errors.root}>
                <LoadingButton type="submit" loading={formLoading} variant="contained">
                    Submit
                </LoadingButton>
                {errors.root &&
                    <FormHelperText>
                        {errors.root.message}
                    </FormHelperText>
                }
            </FormControl>
        </Stack>
    )
}
export default ProtagonistForm