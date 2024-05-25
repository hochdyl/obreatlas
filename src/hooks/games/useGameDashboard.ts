'use client'
import useSWR from "swr";

const useGameDashboard = (gameSlug: string) => {
    const {data: game, error, isLoading, mutate} = useSWR<GameDashboard>(`/games/${gameSlug}`)

    return {game, error, isLoading, mutate}
}
export default useGameDashboard