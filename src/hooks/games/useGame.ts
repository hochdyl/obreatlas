'use client'
import useSWR from "swr";

const useGameDetails = (gameSlug: string) => {
    const {data: game, error, isLoading, mutate} = useSWR<GameDetails>(`/games/${gameSlug}`)

    return {game, error, isLoading, mutate}
}
export default useGameDetails