'use client'
import {ChangeEvent, ReactElement, useEffect, useMemo, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";
import useProtagonistData from "@/hooks/protagonists/useProtagonistData";
import {useSWRConfig} from "swr";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import slugify from "@/utils/slugify";
import {editProtagonist} from "@/api/protagonists/ProtagonistApi";
import ApiService from "@/services/ApiService";
import FileUpload from "@/components/ui/FileUpload";
import getImage from "@/utils/getImage";
import {Simulate} from "react-dom/test-utils";

const EditProtagonistPage = (): ReactElement => {
    const router = useRouter()
    const {mutate} = useSWRConfig()
    const params = useParams<{ gameSlug: string, protagonistSlug: string }>()
    const {protagonist, isLoading, error} = useProtagonistData(params.gameSlug, params.protagonistSlug)
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const methods = useForm<EditProtagonistFormData>()

    useEffect(() => {
        if (protagonist) {
            methods.reset({
                name: protagonist.name,
                slug: protagonist.slug,
                story: protagonist.story,
                level: protagonist.level,
                portrait: protagonist.portrait
            });
        }
    }, [protagonist]);

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist) return <PageLoading/>

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        methods.trigger('name').then(() => {
            const slug = slugify(e.target.value)
            methods.setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<EditProtagonistFormData> = protagonistFormData => {
        setFormLoading(true)

        editProtagonist(protagonist.id, protagonistFormData)
            .then(() => {
                mutate(() => true)
                    .then(() => router.push(`/${params.gameSlug}/game-master/protagonists/${methods.getValues('slug')}`))
                console.log('TODO: PTIT TOAST LA')
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
            })
            .finally(() => setFormLoading(false))
    }

    return (
        <>
            <Link href={`/${protagonist.game.slug}/game-master`}>Back to game master dashboard</Link>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <h1>Edit protagonist</h1>
                    <input
                        placeholder="name"
                        {...methods.register("name", {
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
                    {methods.formState.errors.name && <span>{methods.formState.errors.name.message}</span>}

                    <input
                        placeholder="slug"
                        disabled
                        {...methods.register("slug", {
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
                    {methods.formState.errors.slug && <span>{methods.formState.errors.slug.message}</span>}

                    <input
                        placeholder="story"
                        {...methods.register("story")}
                    />
                    {methods.formState.errors.slug && <span>{methods.formState.errors.story?.message}</span>}

                    <input
                        type="number"
                        placeholder="level"
                        {...methods.register("level", {
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
                    {methods.formState.errors.level && <span>{methods.formState.errors.level?.message}</span>}

                    <FileUpload inputName="portrait" preview={getImage(protagonist.portrait, '/images/default.jpg')}/>
                    {methods.formState.errors.slug && <span>{methods.formState.errors.portrait?.message}</span>}

                    <input type="submit"/>
                    {methods.formState.errors.root && <span>{methods.formState.errors.root.message}</span>}
                    {formLoading && <span>Loading form...</span>}
                </form>
            </FormProvider>
        </>
    )
}
export default EditProtagonistPage