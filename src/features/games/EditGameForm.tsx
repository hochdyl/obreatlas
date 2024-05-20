'use client'
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import {editGame} from "@/api/games/GameApi";
import {useParams} from "next/navigation";
import useGame from "@/hooks/games/useGame";
import moment from "moment";

const EditGameForm = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {game, mutate} = useGame(params.gameSlug)
    const [formLoading, setFormLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        trigger,
        reset,
        formState: {errors}
    } = useForm<EditGameFormData>()

    useEffect(() => {
        if (game) {
            const formattedGame: Game = {
                ...game,
                startedAt: moment(game.startedAt).format('YYYY-MM-DD HH:MM:SS')
            }
            reset(formattedGame)
        }
    }, [game])

    if (!game) return <p>Loading...</p>

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('title').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<EditGameFormData> = game => {
        setFormLoading(true)

        editGame(game)
            .then(() => console.log('TODO: PTIT TOAST LA'))
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                }
                else if (ApiService.isFail<BaseFormFail<EditGameFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<EditGameFormData>, {type: 'server', message: value})
                    })
                }
            })
            .finally(() => {
                mutate().then(() => setFormLoading(false))
            })
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
                        value: /^[a-zA-Z0-9\- ]+$/,
                        message: "Title contains wrong characters"
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
                    }
                })}
            />
            {errors.slug && <span>{errors.slug.message}</span>}

            <input
                type="datetime-local"
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
export default EditGameForm