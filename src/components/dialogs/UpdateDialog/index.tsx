'use client'
import React, {ReactElement} from "react"
import {Button, CardActions, CardContent, Dialog, Stack, Typography} from "@mui/material"
import {useSWRConfig} from "swr"
import {GlassCard} from "@/components/ui/Glass";
import {
    GlassDialog,
    GlassDialogHeader,
    GlassDialogInnerContent,
    GlassDialogOuterContent
} from "@/components/ui/Glass/GlassDialog";

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
            <GlassDialogInnerContent>
                <GlassDialogHeader divider={false}>
                    <Typography variant="h4">Update available</Typography>
                    <Typography>Version {newVersion.number}</Typography>
                </GlassDialogHeader>
                <Button onClick={handleUpdate} variant="contained">Update</Button>
            </GlassDialogInnerContent>
            <GlassDialogOuterContent>

            </GlassDialogOuterContent>
        </GlassDialog>
    )
}
export default UpdateDialog