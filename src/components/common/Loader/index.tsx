'use client'
import React, {ReactElement} from "react";
import {Stack, Typography} from "@mui/material";
import Image from "next/image";
import loadingGif from "../../../../public/images/loading.gif"
import theme from "@/theme";

const Loader = (): ReactElement => {
    return (
        <Stack sx={{flex: 1, alignItems: "center", justifyContent: "center", gap: theme.spacing(2)}}>
            <Image priority unoptimized src={loadingGif} alt="loading animation" width="400" height="200"/>
            <Typography variant="h3">Loading</Typography>
        </Stack>

    )
}
export default Loader