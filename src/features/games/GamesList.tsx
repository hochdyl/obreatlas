'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import GameCard from "@/features/games/GameCard";
import useGames from "@/hooks/games/useGames";
import PageLoading from "@/components/ui/PageLoading";
import {SubmitHandler, useForm} from "react-hook-form";
import {createGame} from "@/api/games/GameApi";
import ApiService from "@/services/ApiService";
import slugify from "@/utils/slugify";
import {useRouter} from "next/navigation";
import {useSWRConfig} from "swr";
import moment from "moment/moment";

const GamesList = (): ReactElement => {
    const router = useRouter()
    const {mutate} = useSWRConfig()
    const {games, isLoading, error} = useGames()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        trigger,
        getValues,
        formState: {errors}
    } = useForm<CreateGameFormData>({
        defaultValues: {
            startedAt: moment().format('YYYY-MM-DD')
        }
    })

    if (error) throw new Error(error.message)
    if (isLoading || !games) return <PageLoading/>

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        trigger('title').then(() => {
            const slug = slugify(e.target.value)
            setValue('slug', slug)
        })
    }

    const onSubmit: SubmitHandler<CreateGameFormData> = newGameFormData => {
        setFormLoading(true)

        console.log(newGameFormData)

        createGame(newGameFormData)
            .then(() => {
                mutate(() => true)
                    .then(() => router.push(`/${getValues('slug')}`))
                console.log('TODO: PTIT TOAST LA')
            })
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e)) {
                    setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<CreateGameFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof BaseFormFail<CreateGameFormData>, {type: 'server', message: value})
                    })
                }
                setFormLoading(false)
            })
    }

    return (
        <>
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
                            value: /^(?!login$|register$)[a-zA-Z0-9\- ]+$/,
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
                            value: /^(?!login$|register$)[a-zA-Z0-9\- ]+$/,
                            message: "Slug is invalid"
                        },
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

            <h1>Games</h1>
            {games.map(game =>
                <GameCard game={game} key={game.id}/>
            )}
        </>
    )
}
export default GamesList