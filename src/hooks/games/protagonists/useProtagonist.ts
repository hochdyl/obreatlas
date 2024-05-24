'use client'
import useSWR from "swr";

const useProtagonist = (gameSlug: string, protagonistSlug: string) => {
    const {data: protagonist, error, isLoading, mutate} = useSWR<Protagonist>(`/protagonists/${gameSlug}/${protagonistSlug}`)

    return {protagonist, error, isLoading, mutate}
}
export default useProtagonist