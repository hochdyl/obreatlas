'use client'
import React, {ReactElement} from "react";
import {Stack, Typography} from "@mui/material";
import Image from "next/image";
import loadingGif from "../../../../public/images/loading.gif"

const LoadingPage = (): ReactElement => {
    return (
        <Stack sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            width: 1
        }}>
            <Image priority unoptimized src={loadingGif} alt="loading animation" width="400" height="200"/>
            <Typography variant="h3">Loading</Typography>
        </Stack>

    )
}
export default LoadingPage