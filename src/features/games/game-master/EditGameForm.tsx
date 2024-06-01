'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import {editGame} from "@/api/games/GameApi";
import {useRouter} from "next/navigation";
import moment from "moment";
import {useSWRConfig} from "swr";

type EditGameFormProps = {
    game: Game
}

const EditGameForm = ({game}: EditGameFormProps): ReactElement => {
    const router = useRouter()
    const {mutate} = useSWRConfig()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        trigger,
        getValues,
        formState: {errors}
    } = useForm<EditGameFormData>({
        defaultValues: {...game, startedAt: moment(game.startedAt).format('YYYY-MM-DD HH:MM:SS')}
    })

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('title').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<EditGameFormData> = gameFormData => {
        setFormLoading(true)

        editGame(game.id, gameFormData)
            .then(() => {
                mutate(() => true)
                    .then(() => router.push(`/${getValues('slug')}/edit`))
            })
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<EditGameFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<EditGameFormData>, {type: 'server', message: value})
                    })
                }
            })
            .finally(() => setFormLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Edit game</h1>
            <input
                placeholder="title"
                {...register("title", {
                    required: {
                        value: true,
                        message: "Title is required"
                    },
                    pattern: {
                        value: /^(?!games$)[a-zA-Z0-9\- ]+$/,
                        message: "Title is invalid"
                    },
                    onChange: e => handleTitleChange(e)
                })}
            />
            {errors.title && <span>{errors.title.message}</span>}

            <input
                placeholder="slug"
                disabled
                {...register("slug", {
                    required: {
                        value: true,
                        message: "Slug is required"
                    },
                    pattern: {
                        value: /^(?!games$)[a-zA-Z0-9\- ]+$/,
                        message: "Slug is invalid"
                    }
                })}
            />
            {errors.slug && <span>{errors.slug.message}</span>}

            <input
                type="datetime-local"
                {...register("startedAt", {
                    valueAsDate: true,
                    required: {
                        value: true,
                        message: "Start date is required"
                    }
                })}
            />
            {errors.startedAt && <span>{errors.startedAt.message}</span>}

            <input
                type="checkbox"
                {...register("closed")}
            />
            {errors.closed && <span>{errors.closed.message}</span>}

            <input type="submit"/>
            {errors.root && <span>{errors.root.message}</span>}
            {formLoading && <span>Loading form...</span>}
        </form>
    )
}
export default EditGameForm