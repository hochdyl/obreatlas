'use client'
import {ReactElement, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import {useSWRConfig} from "swr";

type CreateGameForm = {
    title: string,
    startedAt: Date
}
type RegisterFormFail = {
    [K in keyof CreateGameForm]: string
}

const CreateGameForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<CreateGameForm>()
    const [loading, setLoading] = useState(false)
    const {mutate} = useSWRConfig()

    const onSubmit: SubmitHandler<CreateGameForm> = (data) => {
        setLoading(true)

        ApiService.fetch<Game>({url: "/games", method: "POST", data: data})
            .then(game => {
                void mutate('/games', game)
            })
            .catch(e => {
                if (ApiService.isError(e))
                    setError('root', {type: 'server', message: e.message})

                else if (ApiService.isFail<RegisterFormFail>(e))
                    Object.entries(e.data).forEach(([key, value]) => {
                        setError(key as keyof RegisterFormFail, {type: 'server', message: value})
                    })
            })
            .finally(() => setLoading(false))
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

            {loading && <p>loading...</p>}
        </form>
    )
}
export default CreateGameForm