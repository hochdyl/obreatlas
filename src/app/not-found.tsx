'use client'
import React, {ReactElement} from "react"
import Link from "next/link"
import {Button, Stack, Typography} from "@mui/material"
import theme from "@/theme";

const NotFoundPage = (): ReactElement => {
    return (
        <Stack sx={{flex: 1, alignItems: "center", justifyContent: "center", gap: theme.spacing(3)}}>
            <Typography variant="h1">404 Not found!</Typography>
            <Link href={'/'}>
                <Button variant="contained">Back to home</Button>
            </Link>
        </Stack>
    )
}
export default NotFoundPage