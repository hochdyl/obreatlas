'use client'
import useSWR from "swr";

const useProtagonists = (gameSlug: string) => {
    const {data: protagonists, error, isLoading, mutate} = useSWR<Protagonist[]>(`protagonists/${gameSlug}`)

    return {protagonists, error, isLoading, mutate}
}
export default useProtagonists