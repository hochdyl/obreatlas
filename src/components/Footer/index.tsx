'use client'
import React, {ReactElement} from "react"
import {Tooltip, Typography} from "@mui/material"
import useAppVersions from "@/hooks/appVersions/useAppVersions"
import moment from "moment"
import UpdateCard from "@/components/UpdateCard"
import {Box} from "@mui/system"

const Footer = (): ReactElement => {
    const {versions, currentVersion, updateAvailable} = useAppVersions()
    const currentYear = moment().year()

    return (
        <Box component="footer" sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            height: 40
        }}>
            {versions && currentVersion &&
                <>
                    <Tooltip title={`Version ${currentVersion.name} ${currentVersion.number}`} disableInteractive>
                        <Typography>{currentVersion.number}</Typography>
                    </Tooltip>
                    <Typography sx={{whiteSpace: "nowrap"}}>© Atlas {currentYear}</Typography>
                    <UpdateCard show={updateAvailable} newVersion={versions[0]}/>
                </>
            }
        </Box>
    )
}
export default Footer