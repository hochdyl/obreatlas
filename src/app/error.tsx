'use client'
import {useSWRConfig} from "swr"
import Link from "next/link"
import {Button, Container, Typography} from "@mui/material"
import React from "react"

type ErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({error, reset}: ErrorProps) => {
    const {mutate} = useSWRConfig()

    const handleReset = () => {
        mutate(() => true).then(() => reset())
    }

    return (
        <Container sx={{
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            textAlign: "center"
        }}>
            <Typography variant="h1">Oh no!</Typography>
            <Typography variant="h2">Something went wrong</Typography>
            <Typography sx={{fontSize: 30}}>{error.message}</Typography>
            <Link href={'/'}>
                <Button variant="contained">Back to home</Button>
            </Link>
        </Container>
    )
}
export default ErrorPage