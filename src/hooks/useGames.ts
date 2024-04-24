'use client'
import useSWR from "swr";

const useGames = () => {
    const {data: games, error, isLoading} = useSWR<SuccessResponse<Game[]>>('/games')

    return {
        games,
        isLoading,
        error
    }
}
export default useGames