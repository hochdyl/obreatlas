'use client'
import {ReactElement, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import {useSWRConfig} from "swr";
import useMetrics from "@/hooks/metrics/useMetrics";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import ApiService from "@/services/ApiService";
import {editAllMetricsValues} from "@/api/metrics/MetricsApi";
import MetricFormPart from "@/components/forms/metrics/MetricFormPart";
import Loader from "@/components/common/Loader";

const EditMetricsValuesPage = (): ReactElement => {
    const {mutate} = useSWRConfig()
    const params = useParams<{ gameSlug: string, protagonistSlug: string }>()
    const {metrics} = useMetrics(params.gameSlug)
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const methods = useForm<EditMetricValueFormData>()
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        name: "metricsValues",
        control: methods.control
    });

    useEffect(() => {
        if (protagonist) {
            const defaultMetricsValues = protagonist.metricsValues.map(metricValue => {
                return {
                    id: metricValue.metric.id,
                    name: metricValue.metric.name,
                    emoji: metricValue.metric.emoji,
                    value: metricValue.value,
                    max: metricValue.max
                }
            })
            methods.setValue('metricsValues', defaultMetricsValues)
        }
    }, [protagonist]);

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist || !metrics) return <Loader/>

    const handleAddRow = (metricId: number | undefined) => {
        let metric: MetricValueRowFormPart = {
            id: undefined,
            emoji: "",
            name: "",
            value: 0,
            max: null
        }

        append(metric)
    }

    const onSubmit: SubmitHandler<EditMetricValueFormData> = metricsFormData => {
        setFormLoading(true)

        editAllMetricsValues(protagonist.id, metricsFormData)
            .then(() => {
                void mutate(() => true)
                console.log('TODO: PTIT TOAST LA')
            })
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e)) {
                    methods.setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<ProtagonistFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        methods.setError(key as keyof BaseFormFail<EditMetricValueFormData>, {type: 'server', message: value})
                    })
                }
            })
            .finally(() => setFormLoading(false))
    }

    return (
        <>
            <Link href={`/${protagonist.game.slug}/game-master`}>Back to game master dashboard</Link>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <p>Edit metrics</p>
                    <input placeholder="search"/>
                    <button onClick={() => handleAddRow(undefined)}>Simuler la selection</button>

                    {fields.map((field, index) =>
                        <div key={field.id}>
                            <MetricFormPart index={index}/>
                            <input
                                placeholder="value"
                                type="number"
                                {...methods.register(`metricsValues.${index}.value`, {
                                    valueAsNumber: true,
                                    required: {
                                        value: true,
                                        message: "Value is required"
                                    },
                                })}
                            />
                            <input
                                placeholder="max"
                                type="number"
                                {...methods.register(`metricsValues.${index}.max`, {
                                    valueAsNumber: true
                                })}
                            />
                            <button type="button" onClick={() => remove(index)}>
                                DELETE
                            </button>
                        </div>
                    )}

                    <input type="submit"/>
                    {methods.formState.errors.root && <span>{methods.formState.errors.root.message}</span>}
                    {formLoading && <span>Loading form...</span>}
                </form>
            </FormProvider>
        </>
    )
}
export default EditMetricsValuesPage