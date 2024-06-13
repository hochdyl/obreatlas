'use client'
import React, {ReactElement} from "react"
import {Typography} from "@mui/material"
import moment from "moment"
import {Box} from "@mui/system";
import AppVersion from "@/components/layout/Footer/AppVersion";

const Footer = (): ReactElement => {
    const currentYear = moment().year()

    return (
        <Box component="footer" sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 40
        }}>
            <AppVersion/>
            <Typography sx={{whiteSpace: "nowrap"}}>© Atlas {currentYear}</Typography>
        </Box>
    )
}
export default Footer