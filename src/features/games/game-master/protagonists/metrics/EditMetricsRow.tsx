'use client'
import {ReactElement, useState} from "react";
import {useFormContext} from "react-hook-form";
import EmojiPicker, {Emoji, EmojiStyle} from "emoji-picker-react";

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
            <button value="emoji" onClick={() => setOpen(!open)}>Open emoji</button>
            <input
                type="hidden"
                placeholder="icon"
                {...register(`metric.${index}.emoji`, {
                    required: true,
                    value: watch(`metric.${index}.emoji`)
                })}
            />
            <EmojiPicker
                open={open}
                emojiStyle={EmojiStyle.TWITTER}
                onEmojiClick={emoji => setValue(`metric.${index}.emoji`, emoji.unified)}
                previewConfig={{showPreview: false}}
                lazyLoadEmojis={true}
            />
            <Emoji unified={getValues(`metric.${index}.emoji`)} emojiStyle={EmojiStyle.TWITTER}/>
            <input
                placeholder="name"
                {...register(`metric.${index}.name`, {
                    required: {
                        value: true,
                        message: "Name is required"
                    },
                })}
            />
            <input
                type="number"
                placeholder="value"
                {...register(`metric.${index}.value`, {
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
                {...register(`metric.${index}.max`, {
                    valueAsNumber: true,
                })}
            />
        </>
    )
}
export default EditMetricsRow