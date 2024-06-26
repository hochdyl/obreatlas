'use client'
import React, {ChangeEvent, ReactElement, useRef, useState} from "react";
import Image from "next/image";
import {ButtonBase, Fade, LinearProgress, Paper, Stack} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";
import {AxiosProgressEvent} from "axios";
import {toast} from "react-toastify";
import {upload} from "@/api/uploads/UploadApi";

type FileUploadProps = {
    preview?: string | null
    previewSize?: number
    onUpload?: () => void
    onFinished?: (file: Upload) => void
    onRemove?: () => void
}

const Uploader = (props: FileUploadProps): ReactElement => {
    const {
        previewSize = 100,
        onUpload = () => null,
        onFinished = () => null,
        onRemove = () => null
    } = props
    const [preview, setPreview] = useState<string | null | undefined>(props.preview)
    const [hovered, setHovered] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number | undefined>(undefined)
    const inputRef = useRef<HTMLInputElement>(null)
    const interacted = hovered || typeof uploadProgress !== "undefined"

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file && file.type.includes('image')) {
            setUploadProgress(0)

            const urlImage = URL.createObjectURL(file)
            setPreview(urlImage)

            return handleUpload(file)
        }
        setPreview(preview)
    }

    const onUploadProgress = (event: AxiosProgressEvent) => {
        if (event.progress) {
            const progress = Math.round(event.progress * 100)
            return setUploadProgress(progress)
        }
        setUploadProgress(0)
    }

    const handleUpload = (file: File) => {
        onUpload()

        upload(file, onUploadProgress)
            .then(({data: {data: file}}) => {
                setUploadProgress(undefined)
                toast.success('File successfully uploaded')
                onFinished(file)
            })
            .catch(() => {
                setPreview(undefined)
                toast.error('Something went wrong during upload')
            })
            .finally(() => {
                setUploadProgress(undefined)
            })
    }

    const handleClick = () => {
        if (preview) {
            if (uploadProgress) return
            setPreview(undefined)
            onRemove()
            return
        }

        inputRef.current?.click()
    }

    return (
        <Paper sx={{backgroundImage: "none"}}>
            <ButtonBase
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleClick}
                sx={{
                    borderRadius: 1,
                    position: "relative",
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                    height: previewSize,
                    width: previewSize,
                }}
            >
                {typeof uploadProgress !== "undefined" &&
                    <LinearProgress variant="determinate" value={uploadProgress} sx={{
                        width: `calc(100% - 16px)`,
                        position: "absolute",
                        bottom: 10,
                        borderRadius: 1,
                        zIndex: 2
                    }}/>
                }
                {preview ?
                    <>
                        <Image
                            src={preview}
                            alt="Uploaded image preview"
                            width={previewSize}
                            height={previewSize}
                            style={{position: "absolute"}}
                        />
                        <Stack sx={{
                            zIndex: 1,
                            flex: 1,
                            height: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            transition: ".2s",
                            backgroundColor: `rgba(0,0,0,${interacted ? .3 : 0})`,
                            backdropFilter: `blur(${interacted ? 2 : 0}px)`,
                            borderRadius: 1
                        }}>
                            {!uploadProgress &&
                                <Fade in={hovered}>
                                    <Delete fontSize="large"/>
                                </Fade>
                            }
                        </Stack>
                    </>
                    :
                    <Add fontSize="large"/>
                }
            </ButtonBase>
            <input hidden ref={inputRef} type="file" onChange={onChange}/>
        </Paper>
    )
}
export default Uploader