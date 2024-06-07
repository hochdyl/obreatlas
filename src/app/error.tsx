'use client'
import {useSWRConfig} from "swr";
import Link from "next/link";
import {Button, Card, Container, Paper, Typography} from "@mui/material";
import GamesList from "@/features/games/GamesList";
import React from "react";

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
        <Container maxWidth="lg" sx={{
            display: "flex",
            flexFlow: "column nowrap"
        }}>
            <Typography variant="h1">Oh no!</Typography>
            <Typography variant="h2">Something went wrong</Typography>
            <Card>
                <Typography>{error.message}</Typography>
            </Card>
            <Link href={'/'}>
                <Button variant="contained">Back to home</Button>
            </Link>
        </Container>
    )
}
export default ErrorPage