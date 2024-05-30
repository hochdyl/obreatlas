'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import Image from "next/image";
import {useFormContext} from "react-hook-form";

type FileUploadProps = {
    inputName: string,
    preview?: string | undefined
}

const FileUpload = ({inputName, preview = undefined}: FileUploadProps): ReactElement => {
    const {register, setValue} = useFormContext();
    const [filePreview, setFilePreview] = useState<string | undefined>(preview)

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setValue(inputName, file)

            if (file.type.includes('image')) {
                const urlImage = URL.createObjectURL(file)
                return setFilePreview(urlImage)
            }
        }
        return setFilePreview(undefined)
    }

    return (
        <>
            {filePreview &&
                <Image
                    src={filePreview}
                    alt="Uploaded image preview"
                    width="50"
                    height="50"
                />
            }
            <input type="file" onChange={handleFileChange}/>
            <input
                hidden
                {...register(inputName)}
            />
        </>
    )
}
export default FileUpload