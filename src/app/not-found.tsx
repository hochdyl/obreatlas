'use client'
import React, {ReactElement} from "react"
import Link from "next/link"
import {Button, Stack, Typography} from "@mui/material"

const NotFoundPage = (): ReactElement => {
    return (
        <Stack sx={{alignItems: "center", justifyContent: "center", gap: 3, width: 1}}>
            <Typography variant="h1">404 Not found!</Typography>
            <Link href={'/'}>
                <Button variant="contained">Back to home</Button>
            </Link>
        </Stack>
    )
}
export default NotFoundPage