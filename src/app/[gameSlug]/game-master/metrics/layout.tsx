'use client'
import React, {PropsWithChildren, ReactElement} from "react"
import {useParams} from "next/navigation";
import PageLoading from "@/components/ui/PageLoading";
import useMetrics from "@/hooks/metrics/useMetrics";

const MetricsLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {metrics, error, isLoading} = useMetrics(params.gameSlug)

    if (error) throw new Error(error.message)
    if (isLoading || !metrics) return <PageLoading/>

    return (
        <>
            {children}
        </>
    );
}
export default MetricsLayout