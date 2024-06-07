'use client'
import React, {ReactElement} from "react";
import {Tooltip, Typography} from "@mui/material";
import useAppVersions from "@/hooks/appVersions/useAppVersions";
import moment from "moment";
import Updater from "@/components/Updater";
import {Box} from "@mui/system";

const Footer = (): ReactElement => {
    const {currentVersion, updateAvailable} = useAppVersions()
    const currentYear = moment().year()

    return (
        <Box component="footer" sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            height: 40
        }}>
            {currentVersion &&
                <>
                    <Tooltip title={`Version ${currentVersion.name} ${currentVersion.number}`} disableInteractive>
                        <Typography>{currentVersion.number}</Typography>
                    </Tooltip>
                    <Typography sx={{whiteSpace: "nowrap"}}>© Atlas {currentYear}</Typography>
                </>
            }
            <Updater show={updateAvailable}/>
        </Box>
    )
}
export default Footer