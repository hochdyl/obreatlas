'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import useProtagonists from "@/hooks/games/protagonists/useProtagonists";
import {useParams} from "next/navigation";
import FileUpload from "@/components/ui/FileUpload";
import {createProtagonist} from "@/api/games/protagonists/ProtagonistApi";

const CreateProtagonistForm = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
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
        formState: {errors}
    } = methods
    const {protagonists, mutate} = useProtagonists(params.gameSlug)
    const [formLoading, setFormLoading] = useState<boolean>(false)

    if (!protagonists) return <p>Loading...</p>

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('name').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<CreateProtagonistFormData> = async newProtagonist => {
        setFormLoading(true)

        await createProtagonist(params.gameSlug, newProtagonist)
            .then(() => console.log('TODO: PTIT TOAST LA'))
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e))
                    setError('root', {type: 'server', message: e.message})

                else if (ApiService.isFail<BaseFormFail<CreateProtagonistFormData>>(e))
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<CreateProtagonistFormData>, {type: 'server', message: value})
                    })
            })

        mutate()
            .then(() => setFormLoading(false))
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
                            value: /^[a-zA-Z0-9\- ]+$/,
                            message: "Name contains wrong characters"
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
                        }
                    })}
                />
                {errors.slug && <span>{errors.slug.message}</span>}

                <input
                    placeholder="story"
                    {...register("story")}
                />
                {errors.slug && <span>{errors.story?.message}</span>}

                <FileUpload inputName="portrait" />
                {errors.slug && <span>{errors.portrait?.message}</span>}

                <input type="submit"/>
                {errors.root && <span>{errors.root.message}</span>}
                {formLoading && <span>Loading form...</span>}
            </form>
        </FormProvider>
    )
}
export default CreateProtagonistForm