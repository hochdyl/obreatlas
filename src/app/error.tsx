'use client'
import {Button, Stack, Typography} from "@mui/material"
import React from "react"
import {useSWRConfig} from "swr";
import {useRouter} from "next/navigation";
import theme from "@/theme";

type ErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({error}: ErrorProps) => {
    const router = useRouter()
    const {mutate} = useSWRConfig()

    const handleBackHome = () => {
        mutate(() => true).then(() => router.push('/'))
    }

    return (
        <Stack sx={{alignItems: "center", justifyContent: "center", gap: theme.spacing(3), flex: 1}}>
            <Typography variant="h1">Oh no!</Typography>
            <Typography variant="h2">Something went wrong</Typography>
            <Typography sx={{fontSize: 30}}>{error.message}</Typography>
            <Button onClick={handleBackHome} variant="contained">Back to home</Button>
        </Stack>
    )
}
export default ErrorPage