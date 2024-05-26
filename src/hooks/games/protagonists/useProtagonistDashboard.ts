'use client'
import useSWR from "swr";

const useProtagonistDashboard = (gameSlug: string, protagonistSlug: string) => {
    const {data: protagonist, error, isLoading, mutate} = useSWR<ProtagonistDashboard>(`/protagonists/${gameSlug}/${protagonistSlug}`)

    return {protagonist, error, isLoading, mutate}
}
export default useProtagonistDashboard