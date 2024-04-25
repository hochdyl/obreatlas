'use client'
import useSWR from "swr";

const useGames = () => {
    const {data: games, error, isLoading, mutate} = useSWR<SWRGame[]>('/games')

    return {games, error, isLoading, mutate}
}
export default useGames