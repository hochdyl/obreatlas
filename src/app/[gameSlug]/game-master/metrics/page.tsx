'use client'
import {ReactElement, useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import useMetrics from "@/hooks/metrics/useMetrics";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import MetricFormPart from "@/features/metrics/MetricFormPart";
import MetricCard from "@/features/metrics/MetricCard";
import {createMetric} from "@/api/metrics/MetricsApi";
import ApiService from "@/services/ApiService";
import Loader from "@/components/Loader";

const EditProtagonistPage = (): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {metrics, error, isLoading, mutate} = useMetrics(params.gameSlug)
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const methods = useForm<CreateMetricFormData>()

    if (error) throw new Error(error.message)
    if (isLoading || !metrics) return <Loader/>

    const onSubmit: SubmitHandler<CreateMetricFormData> = metricFormData => {
        setFormLoading(true)

        createMetric(params.gameSlug, metricFormData)
            .then(() => {
                void mutate()
                console.log('TODO: PTIT TOAST LA')
            })
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e)) {
                    methods.setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<CreateMetricFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        methods.setError(key as keyof BaseFormFail<CreateMetricFormData>, {type: 'server', message: value})
                    })
                }
            })
            .finally(() => setFormLoading(false))
    }

    return (
        <>
            <Link href={`/${params.gameSlug}/game-master`}>Back to game master dashboard</Link>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <h1>Create metrics</h1>
                    <MetricFormPart/>

                    <input type="submit"/>
                    {methods.formState.errors.root && <span>{methods.formState.errors.root.message}</span>}
                    {formLoading && <span>Loading form...</span>}
                </form>
            </FormProvider>

            <h2>Metrics list</h2>
            {metrics.map(metric =>
                <MetricCard metric={metric} key={metric.id}/>
            )}
        </>
    )
}
export default EditProtagonistPage