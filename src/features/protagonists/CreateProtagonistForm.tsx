'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import {useParams, useRouter} from "next/navigation";
import FileUpload from "@/components/ui/FileUpload";
import {useSWRConfig} from "swr";
import {createProtagonist} from "@/api/protagonists/ProtagonistApi";

const CreateProtagonistForm = (): ReactElement => {
    const router = useRouter()
    const {mutate} = useSWRConfig()
    const params = useParams<{ gameSlug: string }>()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const methods = useForm<CreateProtagonistFormData>({
        defaultValues: {
            story: undefined
        }
    })

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        methods.trigger('name').then(() => {
            const slug = slugify(e.target.value)
            methods.setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<CreateProtagonistFormData> = newProtagonistFormData => {
        setFormLoading(true)

        createProtagonist(params.gameSlug, newProtagonistFormData)
            .then(() => {
                console.log('TODO: PTIT TOAST LA')
                mutate(() => true)
                    .then(() => router.push(`/${params.gameSlug}/play/${methods.getValues('slug')}`))
            })
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e)) {
                    methods.setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<CreateProtagonistFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        methods.setError(key as keyof BaseFormFail<CreateProtagonistFormData>, {type: 'server', message: value})
                    })
                }
                setFormLoading(false)
            })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <h1>Create protagonist</h1>
                <input
                    placeholder="name"
                    {...methods.register("name", {
                        required: {
                            value: true,
                            message: "Name is required"
                        },
                        onChange: e => handleNameChange(e)
                    })}
                />
                {methods.formState.errors.name && <span>{methods.formState.errors.name.message}</span>}

                <input
                    placeholder="slug"
                    disabled
                    {...methods.register("slug", {
                        required: {
                            value: true,
                            message: "Slug is required"
                        }
                    })}
                />
                {methods.formState.errors.slug && <span>{methods.formState.errors.slug.message}</span>}

                <input
                    placeholder="story"
                    {...methods.register("story")}
                />
                {methods.formState.errors.slug && <span>{methods.formState.errors.story?.message}</span>}

                <FileUpload inputName="portrait" preview="/images/default.jpg"/>
                {methods.formState.errors.slug && <span>{methods.formState.errors.portrait?.message}</span>}

                <input type="submit"/>
                {methods.formState.errors.root && <span>{methods.formState.errors.root.message}</span>}
                {formLoading && <span>Loading form...</span>}
            </form>
        </FormProvider>
    )
}
export default CreateProtagonistForm