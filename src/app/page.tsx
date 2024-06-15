'use client'
import React, {ReactElement, useState} from "react"
import {Button, Container, Stack, Typography} from "@mui/material"
import GamesList from "@/components/layout/HomePage/GamesList";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import LoadingPage from "@/components/layout/LoadingPage";
import AppFeatureCard from "@/components/layout/HomePage/AppFeatureCard";
import {GlassDialog, GlassDialogHeader} from "@/components/ui/Glass/GlassDialog";
import CreateGameForm from "@/features/games/CreateGameForm";

const HomePage = (): ReactElement => {
    const {user, isLoading} = useAuthenticatedUser()
    const [open, setOpen] = useState(false)

    if (isLoading) return <LoadingPage/>

    return (
        <Container maxWidth="lg" sx={{display: "flex", gap: 10, py: 3}}>
            <Stack sx={{gap: 3}}>
                <Typography variant="h1" sx={{mt: 10}}>
                    Welcome to {' '}
                    <Typography color="primary" variant="h1" component="span">Atlas</Typography>
                </Typography>
                <Typography variant="h4" sx={{fontStyle: "italic"}}>A new way to play RPG</Typography>
                <Stack sx={{flexFlow: "row nowrap", alignItems: "flex-start", gap: 3, mt: 5}}>
                    <AppFeatureCard title="Dashboards">
                        Manage RPG sessions easily with dynamics
                        dashboard for Game Master and players.
                    </AppFeatureCard>
                    <AppFeatureCard title="Characters">
                        Create detailed character profiles
                        with attributes, skills, and backstories.
                    </AppFeatureCard>
                    <AppFeatureCard title="Evolutive">
                        Regular updates introduce new tools and
                        enhancements to enrich your RPG experience.
                    </AppFeatureCard>
                </Stack>
            </Stack>

            <Stack sx={{gap: 1, minWidth: 350}}>
                <Stack direction="row" sx={{justifyContent: "space-between", gap: 2}}>
                    <Typography variant="h4">Game list</Typography>
                    <Button onClick={() => setOpen(true)} disabled={!user}>New game</Button>
                </Stack>
                <GamesList/>
            </Stack>

            <GlassDialog open={open} onClose={() => setOpen(false)}>
                <GlassDialogHeader>
                    <Typography variant="h4">Create a game</Typography>
                </GlassDialogHeader>
                <CreateGameForm/>
            </GlassDialog>
        </Container>
    )
}
export default HomePage