'use client'
import useSWR from "swr";

const useProtagonistData = (gameSlug: string, protagonistSlug: string) => {
    const {data: protagonist, error, isLoading, mutate} = useSWR<ProtagonistData>(`/protagonists/${gameSlug}/${protagonistSlug}`)

    return {protagonist, error, isLoading, mutate}
}
export default useProtagonistData