'use client'
import React, {ReactElement} from "react";
import {Button, Skeleton, Tooltip, Typography} from "@mui/material";
import useAppVersions from "@/hooks/appVersions/useAppVersions";
import {GlassDialog, GlassDialogHeader} from "@/components/ui/Glass/GlassDialog";
import {useSWRConfig} from "swr";

const AppVersion = (): ReactElement => {
    const {mutate} = useSWRConfig()
    const {versions, currentVersion, updateAvailable} = useAppVersions()

    const handleUpdate = () => {
        mutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => location.reload())
    }

    return (
        <>
            {versions && currentVersion ?
                <Tooltip title={`Version ${currentVersion.name} ${currentVersion.number}`} disableInteractive>
                    <Typography>{currentVersion.number}</Typography>
                </Tooltip>
                :
                <Skeleton animation="wave" width={40}/>
            }

            <GlassDialog open={updateAvailable} closeBtn={false} maxWidth="xs">
                <GlassDialogHeader divider={false}>
                    <Typography variant="h4">Update available</Typography>
                    <Typography>
                        {versions ?
                            `Version ${versions[0].number}`
                            :
                            <Skeleton animation="wave" width={80}/>
                        }
                    </Typography>
                </GlassDialogHeader>
                <Button onClick={handleUpdate} variant="contained">Update</Button>
            </GlassDialog>
        </>
    )
}
export default AppVersion