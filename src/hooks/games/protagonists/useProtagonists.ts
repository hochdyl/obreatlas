'use client'
import useSWR from "swr";

const useProtagonists = (gameSlug: string) => {
    const {data: protagonists, error, isLoading, mutate} = useSWR<SWRProtagonist[]>(`${gameSlug}/protagonists`)

    return {protagonists, error, isLoading, mutate}
}
export default useProtagonists