'use client'
import useSWR from "swr";

const usePlayProtagonist = (gameSlug: string, protagonistSlug: string) => {
    const {data: protagonist, error, isLoading, mutate} = useSWR<PlayProtagonist>(`/protagonists/${gameSlug}/${protagonistSlug}`)

    return {protagonist, error, isLoading, mutate}
}
export default usePlayProtagonist