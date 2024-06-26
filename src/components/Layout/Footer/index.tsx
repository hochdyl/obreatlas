'use client'
import React, {ReactElement} from "react"
import {Stack, Typography} from "@mui/material"
import moment from "moment"
import AppVersion from "@/components/layout/Footer/AppVersion";
import theme from "@/theme";

const Footer = (): ReactElement => {
    const currentYear = moment().year()

    return (
        <Stack direction="row" component="footer" sx={{
            gap: theme.spacing(1),
            alignItems: "center",
            justifyContent: "center",
            height: 40
        }}>
            <AppVersion/>
            <Typography sx={{whiteSpace: "nowrap"}}>© Atlas {currentYear}</Typography>
        </Stack>
    )
}
export default Footer