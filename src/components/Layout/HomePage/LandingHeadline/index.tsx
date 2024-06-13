'use client'
import React, {ReactElement} from "react";
import {Stack, Typography} from "@mui/material";

const LandingHeadline = (): ReactElement => {
    return (
        <Stack sx={{gap: 5}}>
            <Typography variant="h1" sx={{mt: 16}}>
                Welcome to {' '}
                <Typography color="primary" variant="h1" component="span">Atlas</Typography>
            </Typography>
            <Typography variant="h4">A new way to play RPG</Typography>
        </Stack>
    )
}
export default LandingHeadline