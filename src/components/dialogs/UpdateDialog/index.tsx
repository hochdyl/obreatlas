'use client'
import React, {ReactElement} from "react"
import {Button, Typography} from "@mui/material"
import {useSWRConfig} from "swr"
import {GlassDialog, GlassDialogHeader} from "@/components/ui/Glass/GlassDialog";

type UpdaterProps = {
    show: boolean,
    newVersion: AppVersion
}

const UpdateDialog = ({show, newVersion}: UpdaterProps): ReactElement => {
    const {mutate} = useSWRConfig()

    const handleUpdate = () => {
        mutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => location.reload())
    }

    return (
        <GlassDialog open={show} closeBtn={false} maxWidth="xs">
            <GlassDialogHeader divider={false}>
                <Typography variant="h4">Update available</Typography>
                <Typography>Version {newVersion.number}</Typography>
            </GlassDialogHeader>
            <Button onClick={handleUpdate} variant="contained">Update</Button>
        </GlassDialog>
    )
}
export default UpdateDialog