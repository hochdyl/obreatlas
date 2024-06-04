'use client'
import {ReactElement, useState} from "react";
import {useFormContext} from "react-hook-form";
import EmojiPicker, {Emoji, EmojiStyle} from "emoji-picker-react";
import Autocomplete from "@/components/Autocomplete";

type MetricFormPartProps = {
    index?: number
}

const MetricFormPart = ({index}: MetricFormPartProps): ReactElement => {
    const {
        register,
        setValue,
        getValues,
        watch,
        formState: {errors}
    } = useFormContext()
    const [open, setOpen] = useState<boolean>(false)

    const isFieldArray = () => typeof index === 'number'

    const fieldPrefix = isFieldArray() ? `metricsValues.${index}.` : ''

    return (
        <>
            <input
                type="hidden"
                {...register(`${fieldPrefix}id`)}
            />
            <button value="emoji" onClick={() => setOpen(!open)}>Open emoji</button>
            <input
                type="hidden"
                    {...register(`${fieldPrefix}emoji`, {
                    required: true,
                    value: watch(`${fieldPrefix}emoji`)
                })}
            />
            <EmojiPicker
                open={open}
                emojiStyle={EmojiStyle.TWITTER}
                onEmojiClick={emoji => setValue(`${fieldPrefix}emoji`, emoji.unified)}
                previewConfig={{showPreview: false}}
                lazyLoadEmojis={true}
            />
            <Emoji unified={getValues(`${fieldPrefix}emoji`)} emojiStyle={EmojiStyle.TWITTER}/>
            <input
                placeholder="name"
                {...register(`${fieldPrefix}name`, {
                    required: {
                        value: true,
                        message: "Name is required"
                    },
                })}
            />
        </>
    )
}
export default MetricFormPart