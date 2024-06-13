'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import useGame from "@/hooks/games/useGameLobby";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import {useSWRConfig} from "swr";
import {SubmitHandler, useForm} from "react-hook-form";
import moment from "moment/moment";
import slugify from "@/utils/slugify";
import {editGame} from "@/api/games/GameApi";
import ApiService from "@/services/ApiService";
import Loader from "../../../../components/Loading";

const EditGamePage = (): ReactElement => {
    const router = useRouter()
    const {mutate} = useSWRConfig()
    const params = useParams<{ gameSlug: string }>()
    const {game, isLoading, error} = useGame(params.gameSlug)
    const {user} = useAuthenticatedUser()
    const [formLoading, setFormLoading] = useState<boolean>(false)

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <LoadingPage/>

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        trigger,
        getValues,
        formState: {errors}
    } = useForm<EditGameFormData>({
        defaultValues: {
            title: game.title,
            slug: game.slug,
            closed: game.closed,
            startedAt: moment(game.startedAt).format('YYYY-MM-DD')
        }
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
                    .then(() => router.push(`/${getValues('slug')}/game-master/edit`))
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
            <p>Edit game</p>
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
                type="date"
                {...register("startedAt", {
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
export default EditGamePage