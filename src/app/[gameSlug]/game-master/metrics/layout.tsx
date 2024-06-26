'use client'
import React, {PropsWithChildren, ReactElement} from "react"
import {useParams} from "next/navigation";
import useMetrics from "@/hooks/metrics/useMetrics";
import Loader from "@/components/common/Loader";

const MetricsLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {metrics, error, isLoading} = useMetrics(params.gameSlug)

    if (error) throw new Error(error.message)
    if (isLoading || !metrics) return <Loader/>

    return (
        <>
            {children}
        </>
    );
}
export default MetricsLayout