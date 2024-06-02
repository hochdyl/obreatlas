'use client'
import {ReactElement, useState} from "react";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useSWRConfig} from "swr";
import ApiService from "@/services/ApiService";
import {editMetrics} from "@/api/metrics/MetricsApi";
import EditMetricsRow from "@/features/metrics/EditMetricsRow";

type EditMetricsFormProps = {
    protagonist: ProtagonistData
}

const EditMetricsForm = ({protagonist}: EditMetricsFormProps): ReactElement => {
    const {mutate} = useSWRConfig()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const methods = useForm<EditMetricsFormData>({
        defaultValues: {
            metrics: protagonist.metricsValues.map(metricValue => {
                return {
                    id: metricValue.metric.id,
                    name: metricValue.metric.name,
                    emoji: metricValue.metric.emoji,
                    value: metricValue.value,
                    max: metricValue.max
                }
            })
        }
    })
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        name: "metrics",
        control: methods.control
    });

    const handleAddRow = (metricId: number | null) => {
        let metric: EditMetricPartialFormRow = {
            id: null,
            emoji: "",
            name: "",
            value: 0,
            max: null
        }

        if (metricId) {
            // Api call pour recupéré la metric
        }

        append(metric)
    }

    const onSubmit: SubmitHandler<EditMetricsFormData> = metricsFormData => {
        setFormLoading(true)

        editMetrics(protagonist.id, metricsFormData)
            .then(() => {
                void mutate(() => true)
                console.log('TODO: PTIT TOAST LA')
            })
            .catch(e => {
                console.log('TODO: PTIT TOAST LA')
                if (ApiService.isError(e)) {
                    methods.setError('root', {type: 'server', message: e.message})
                } else if (ApiService.isFail<BaseFormFail<CreateProtagonistFormData>>(e)) {
                    Object.entries(e.data).forEach(([key, value]) => {
                        methods.setError(key as keyof BaseFormFail<EditMetricsFormData>, {type: 'server', message: value})
                    })
                }
            })
            .finally(() => setFormLoading(false))
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <h1>Edit metrics</h1>
                <input type="text" placeholder="search"/>
                <button onClick={() => handleAddRow(null)}>Simuler la selection</button>

                {fields.map((field, index) =>
                    <div key={field.id}>
                        <EditMetricsRow index={index}/>
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
    )
}
export default EditMetricsForm