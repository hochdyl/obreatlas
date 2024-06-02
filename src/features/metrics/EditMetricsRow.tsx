'use client'
import {ReactElement, useState} from "react";
import {useFormContext} from "react-hook-form";
import EmojiPicker, {Emoji, EmojiStyle} from "emoji-picker-react";
import Autocomplete from "@/components/Autocomplete";

type EditMetricsRowProps = {
    index: number,
}

const EditMetricsRow = ({index}: EditMetricsRowProps): ReactElement => {
    const {
        register,
        setValue,
        getValues,
        watch
    } = useFormContext()
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <input
                type="hidden"
                {...register(`metrics.${index}.id`)}
            />
            <button value="emoji" onClick={() => setOpen(!open)}>Open emoji</button>
            <input
                type="hidden"
                {...register(`metrics.${index}.emoji`, {
                    required: true,
                    value: watch(`metrics.${index}.emoji`)
                })}
            />
            <EmojiPicker
                open={open}
                emojiStyle={EmojiStyle.TWITTER}
                onEmojiClick={emoji => {
                    console.log(emoji)
                    return setValue(`metrics.${index}.emoji`, emoji.unified)
                }}
                previewConfig={{showPreview: false}}
                lazyLoadEmojis={true}
            />
            <Emoji unified={getValues(`metrics.${index}.emoji`)} emojiStyle={EmojiStyle.TWITTER}/>
            <input
                placeholder="name"
                {...register(`metrics.${index}.name`, {
                    required: {
                        value: true,
                        message: "Name is required"
                    },
                })}
            />
            <input
                type="number"
                placeholder="value"
                {...register(`metrics.${index}.value`, {
                    valueAsNumber: true,
                    required: {
                        value: true,
                        message: "Value is required"
                    },
                })}
            />
            <input
                type="number"
                placeholder="max"
                {...register(`metrics.${index}.max`, {
                    valueAsNumber: true,
                })}
            />
        </>
    )
}
export default EditMetricsRow