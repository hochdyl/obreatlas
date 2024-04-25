'use client'
import {ReactElement} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import useGames from "@/hooks/games/useGames";
import {createGameMutation, createGameOptions} from "@/helpers/games/gamesMutations";

const CreateGameForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<CreateGameFormData>()
    const {games, mutate} = useGames()

    if (!games) return <p>Loading...</p>

    const onSubmit: SubmitHandler<CreateGameFormData> = newGame => {
        mutate(
            createGameMutation(games, newGame),
            createGameOptions(games, newGame)
        )
            .then(() => console.log('TODO: PTIT TOAST LA'))
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e))
                    setError('root', {type: 'server', message: e.message})

                else if (ApiService.isFail<CreateGameFormFail>(e))
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof CreateGameFormFail, {type: 'server', message: value})
                    })
            })
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
                    }
                })}
            />
            {errors.title && <span>{errors.title.message}</span>}

            <input
                type="date"
                {...register("startedAt", {
                    setValueAs: value => value || undefined,
                })}
            />
            {errors.startedAt && <span>{errors.startedAt.message}</span>}

            <input type="submit"/>
            {errors.root && <span>{errors.root.message}</span>}
        </form>
    )
}
export default CreateGameForm