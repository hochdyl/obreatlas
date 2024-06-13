'use client'
import Link from "next/link"
import {Button, Stack, Typography} from "@mui/material"
import React from "react"

type ErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({error}: ErrorProps) => {
    return (
        <Stack sx={{alignItems: "center", justifyContent: "center", gap: 3, width: 1}}>
            <Typography variant="h1">Oh no!</Typography>
            <Typography variant="h2">Something went wrong</Typography>
            <Typography sx={{fontSize: 30}}>{error.message}</Typography>
            <Link href={'/'}>
                <Button variant="contained">Back to home</Button>
            </Link>
        </Stack>
    )
}
export default ErrorPage