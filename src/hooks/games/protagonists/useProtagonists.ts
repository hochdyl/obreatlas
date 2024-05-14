'use client'
import useSWR from "swr";

const useProtagonists = (gameSlug: string) => {
    const {data: protagonists, error, isLoading, mutate} = useSWR<Protagonist[]>(`${gameSlug}/protagonists`)

    return {protagonists, error, isLoading, mutate}
}
export default useProtagonists