'use client'
import useSWR from "swr";

const useGame = (gameSlug: string | null = null) => {
    const {data: game, error, isLoading, mutate} = useSWR<Game>(`/games/${gameSlug}`)

    return {game, error, isLoading, mutate}
}
export default useGame