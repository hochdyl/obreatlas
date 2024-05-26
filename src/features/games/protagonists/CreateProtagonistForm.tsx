'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import {useParams, useRouter} from "next/navigation";
import FileUpload from "@/components/ui/FileUpload";
import {createProtagonist} from "@/api/games/protagonists/ProtagonistApi";

const CreateProtagonistForm = (): ReactElement => {
    const router = useRouter()
    const params = useParams<{gameSlug: string}>()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const methods = useForm<CreateProtagonistFormData>({
        defaultValues: {
            story: undefined
        }
    })
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        trigger,
        getValues,
        formState: {errors}
    } = methods

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('name').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<CreateProtagonistFormData> = newProtagonistFormData => {
        setFormLoading(true)

        createProtagonist(params.gameSlug, newProtagonistFormData)
            .then(() => {
                router.push(`${params.gameSlug}/${getValues('slug')}`)
                console.log('TODO: PTIT TOAST LA')
            })
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                }

                else if (ApiService.isFail<BaseFormFail<CreateProtagonistFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<CreateProtagonistFormData>, {type: 'server', message: value})
                    })
                }
                setFormLoading(false)
            })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Create protagonist</h1>
                <input
                    placeholder="name"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "Name is required"
                        },
                        pattern: {
                            value: /^(?!edit$)[a-zA-Z0-9\- ]+$/,
                            message: "Name is invalid"
                        },
                        onChange: e => handleNameChange(e)
                    })}
                />
                {errors.name && <span>{errors.name.message}</span>}

                <input
                    placeholder="slug"
                    disabled
                    {...register("slug", {
                        required: {
                            value: true,
                            message: "Slug is required"
                        },
                        pattern: {
                            value: /^(?!edit$)[a-zA-Z0-9\- ]+$/,
                            message: "Slug is invalid"
                        }
                    })}
                />
                {errors.slug && <span>{errors.slug.message}</span>}

                <input
                    placeholder="story"
                    {...register("story")}
                />
                {errors.slug && <span>{errors.story?.message}</span>}

                <FileUpload inputName="portrait" preview="/images/default.jpg"/>
                {errors.slug && <span>{errors.portrait?.message}</span>}

                <input type="submit"/>
                {errors.root && <span>{errors.root.message}</span>}
                {formLoading && <span>Loading form...</span>}
            </form>
        </FormProvider>
    )
}
export default CreateProtagonistForm