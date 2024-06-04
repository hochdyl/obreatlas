'use client'
import useSWR from "swr";

const useMetrics = (gameSlug: string) => {
    const {data: metrics, error, isLoading, mutate} = useSWR<Metric[]>(`/metrics/${gameSlug}`)

    return {metrics, error, isLoading, mutate}
}
export default useMetrics