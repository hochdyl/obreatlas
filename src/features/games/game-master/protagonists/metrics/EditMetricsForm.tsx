'use client'
import {ReactElement, useState} from "react";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useParams, useRouter} from "next/navigation";
import {useSWRConfig} from "swr";
import EditMetricsRow from "@/features/games/game-master/protagonists/metrics/EditMetricsRow";

type EditMetricsFormProps = {
    protagonist: Protagonist
}

const EditMetricsForm = ({protagonist}: EditMetricsFormProps): ReactElement => {
    const router = useRouter()
    const {mutate} = useSWRConfig()
    const params = useParams<{ gameSlug: string, protagonistSlug: string }>()
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

    const onSubmit: SubmitHandler<EditMetricsFormData> = protagonistMetricsFormData => {
        setFormLoading(true)

        // editProtagonist(protagonist.id, protagonistFormData)
        //     .then(() => {
        //         mutate(() => true)
        //             .then(() => router.push(`/${params.gameSlug}/protagonists/${getValues('slug')}/edit`))
        //         console.log('TODO: PTIT TOAST LA')
        //     })
        //     .catch(e => {
        //         console.log('TODO: PTIT TOAST LA')
        //         if (ApiService.isError(e)) {
        //             setError('root', {type: 'server', message: e.message})
        //         } else if (ApiService.isFail<BaseFormFail<CreateProtagonistFormData>>(e)) {
        //             Object.entries(e.data).forEach(([key, value]) => {
        //                 setError(key as keyof BaseFormFail<CreateProtagonistFormData>, {type: 'server', message: value})
        //             })
        //         }
        //     })
        //     .finally(() => setFormLoading(false))
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h1>Edit protagonist</h1>
            {fields.map((field, index) =>
                <>
                    <EditMetricsRow
                        key={field.id}
                        index={index}
                        methods={methods}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        DELETE
                    </button>
                </>
            )}
            <button type="button" onClick={() => handleAddRow()}>
                APPEND
            </button>

            <input type="submit"/>
            {methods.formState.errors.root && <span>{methods.formState.errors.root.message}</span>}
            {formLoading && <span>Loading form...</span>}
        </form>
    )
}
export default EditMetricsForm