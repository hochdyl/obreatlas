'use client'
import {ReactElement} from "react";
import {UseFormReturn} from "react-hook-form";

type EditMetricsRowProps = {
    index: number,
    methods: UseFormReturn<EditMetricsFormData>
}

const EditMetricsRow = ({index, methods}: EditMetricsRowProps): ReactElement => {
    return (
        <>
            <input
                placeholder="name"
                {...methods.register(`metric.${index}.name` as const, {
                    required: true
                })}
            />
            <span>{methods.formState.errors?.metric?.[index]?.name?.message}</span>
        </>
    )
}
export default EditMetricsRow