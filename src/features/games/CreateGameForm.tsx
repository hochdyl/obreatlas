'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import useGames from "@/hooks/games/useGames";
import moment from "moment";
import slugify from "@/utils/slugify";
import {createGame} from "@/api/games/GameApi";

const CreateGameForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        trigger,
        formState: {errors}
    } = useForm<CreateGameFormData>({
        defaultValues: {
            startedAt: moment().format('YYYY-MM-DD')
        }
    })
    const {games, mutate} = useGames()
    const [formLoading, setFormLoading] = useState<boolean>(false)

    if (!games) return <p>Loading...</p>

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('title').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<CreateGameFormData> = async newGame => {
        setFormLoading(true)
        const addedGame = await createGame(newGame)

        mutate([addedGame, ...games])
            .then(() => console.log('TODO: PTIT TOAST LA'))
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e))
                    setError('root', {type: 'server', message: e.message})

                else if (ApiService.isFail<BaseFormFail<CreateGameFormData>>(e))
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<CreateGameFormData>, {type: 'server', message: value})
                    })
            })
            .finally(() => setFormLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create game</h1>
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
                type="date"
                {...register("startedAt", {
                    required: {
                        value: true,
                        message: "Start date is required"
                    }
                })}
            />
            {errors.startedAt && <span>{errors.startedAt.message}</span>}

            <input type="submit"/>
            {errors.root && <span>{errors.root.message}</span>}
            {formLoading && <span>Loading form...</span>}
        </form>
    )
}
export default CreateGameForm