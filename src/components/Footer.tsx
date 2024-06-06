'use client'
import React, {ReactElement} from "react";
import {Container, Toolbar, Tooltip, Typography} from "@mui/material";
import useAppVersions from "@/hooks/appVersions/useAppVersions";
import moment from "moment";
import {Box} from "@mui/system";
import Updater from "@/components/Updater";

const Footer = (): ReactElement => {
    const {currentVersion, updateAvailable} = useAppVersions()
    const currentYear = moment().year()

    return (
        <Container
            component="footer"
            maxWidth="xl"
            sx={{
                display: "flex",
                justifyContent: "center",
                userSelect: "none"
            }}>
            <Toolbar>
                {currentVersion &&
                    <Box sx={{display: "flex", gap: 1}}>
                        <Tooltip
                            title={`Version ${currentVersion.name} ${currentVersion.number}`}
                            disableInteractive>
                            <Typography>{currentVersion.number}</Typography>
                        </Tooltip>
                        <Typography>© Atlas {currentYear}</Typography>
                    </Box>
                }
                <Updater show={updateAvailable}/>
            </Toolbar>
        </Container>
    )
}
export default Footer