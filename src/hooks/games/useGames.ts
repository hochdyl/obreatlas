'use client'
import useSWR from "swr";

const useGames = (enabled = true) => {
    const {data: games, error, isLoading, mutate} = useSWR<Game[]>(enabled ? '/games' : null)

    return {games, error, isLoading, mutate}
}
export default useGames