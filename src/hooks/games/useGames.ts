'use client'
import useSWR from "swr";

const useGames = () => {
    const {data: games, error, isLoading, mutate} = useSWR<Game[]>('/games')

    return {games, error, isLoading, mutate}
}
export default useGames