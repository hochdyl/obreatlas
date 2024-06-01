'use client'
import {ReactElement, useState} from "react";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useSWRConfig} from "swr";
import EditMetricsRow from "@/features/games/game-master/protagonists/metrics/EditMetricsRow";
import {editMetrics} from "@/api/games/protagonists/metrics/MetricsApi";
import ApiService from "@/services/ApiService";

type EditMetricsFormProps = {
    protagonist: Protagonist
}

const EditMetricsForm = ({protagonist}: EditMetricsFormProps): ReactElement => {
    const {mutate} = useSWRConfig()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const methods = useForm<EditMetricsFormData>({
        defaultValues: {
            metric: [{name: "OUH OUHH", value: 1}]
        }
    })
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        name: "metric",
        control: methods.control
    });

    const handleAddRow = () => {
        append({
            name: "",
            value: 0
        })
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
                {fields.map((field, index) =>
                    <div key={field.id}>
                        <EditMetricsRow index={index}/>
                        <button type="button" onClick={() => remove(index)}>
                            DELETE
                        </button>
                    </div>
                )}
                <button type="button" onClick={() => handleAddRow()}>
                    APPEND
                </button>

                <input type="submit"/>
                {methods.formState.errors.root && <span>{methods.formState.errors.root.message}</span>}
                {formLoading && <span>Loading form...</span>}
            </form>
        </FormProvider>
    )
}
export default EditMetricsForm