'use client'
import {ChangeEvent, ReactElement, useState} from "react";
import Image from "next/image";
import {useFormContext} from "react-hook-form";

type FileUploadProps = {
    inputName: string
}

const FileUpload = ({inputName}: FileUploadProps): ReactElement => {
    const [filePreview, setFilePreview] = useState<string | undefined>(undefined)
    const {register} = useFormContext();

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file && file.type.includes('image')) {
            const urlImage = URL.createObjectURL(file)
            setFilePreview(urlImage)
        }
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
            <input
                type="file"
                {...register(inputName, {
                    onChange: handleFileChange
                })}
            />
        </>

    )
}
export default FileUpload