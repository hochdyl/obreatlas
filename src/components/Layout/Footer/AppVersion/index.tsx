'use client'
import React, {ReactElement} from "react";
import {Skeleton, Tooltip, Typography} from "@mui/material";
import useAppVersions from "@/hooks/appVersions/useAppVersions";
import UpdateDialog from "@/components/dialogs/UpdateDialog";

const AppVersion = (): ReactElement => {
    const {versions, currentVersion, updateAvailable} = useAppVersions()

    return (versions && currentVersion ?
            <>
                <Tooltip title={`Version ${currentVersion.name} ${currentVersion.number}`} disableInteractive>
                    <Typography>{currentVersion.number}</Typography>
                </Tooltip>
                <UpdateDialog show={updateAvailable} newVersion={versions[0]}/>
            </>
            :
            <Skeleton variant="text" sx={{fontSize: '1rem', width: 40, height: 30}}/>
    )
}
export default AppVersion