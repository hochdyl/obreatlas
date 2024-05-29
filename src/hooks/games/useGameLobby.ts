'use client'
import useSWR from "swr";

const useGameLobby = (gameSlug: string) => {
    const {data: game, error, isLoading, mutate} = useSWR<GameLobby>(`/games/${gameSlug}`)

    return {game, error, isLoading, mutate}
}
export default useGameLobby