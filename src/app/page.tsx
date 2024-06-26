'use client'
import React, {ReactElement, useState} from "react"
import {Button, Container, Stack, Typography} from "@mui/material"
import {GlassDialog, GlassDialogHeader} from "@/components/ui/Glass/GlassDialog";
import AppFeatureCard from "@/components/common/AppFeatureCard";
import GamesList from "@/components/common/GamesList";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import GameForm from "@/components/forms/GameForm";
import theme from "@/theme";

const HomePage = (): ReactElement => {
    const {user} = useAuthenticatedUser()
    const [open, setOpen] = useState(false)

    return (
        <Container maxWidth="lg" sx={{display: "flex", gap: theme.spacing(10), py: 3}}>
            <Stack sx={{gap: theme.spacing(3)}}>
                <Typography variant="h1" sx={{mt: 10}}>
                    Welcome to {' '}
                    <Typography color="primary" variant="h1" component="span">Atlas</Typography>
                </Typography>
                <Typography variant="h4" sx={{fontStyle: "italic"}}>A new way to play RPG</Typography>
                <Stack direction="row" sx={{alignItems: "flex-start", gap: theme.spacing(3), mt: 5}}>
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

            <Stack sx={{gap: theme.spacing(3), minWidth: 350}}>
                <Stack direction="row" sx={{justifyContent: "space-between", gap: theme.spacing(2)}}>
                    <Typography variant="h4">Games</Typography>
                    <Button onClick={() => setOpen(true)} disabled={!user} variant="contained" sx={{
                        alignSelf: "flex-end"
                    }}>
                        New game
                    </Button>
                </Stack>
                <GamesList/>
            </Stack>

            {user &&
                <GlassDialog open={open} onClose={() => setOpen(false)}>
                    <GlassDialogHeader>
                        <Typography variant="h4">Create a game</Typography>
                    </GlassDialogHeader>
                    <GameForm onSubmit={() => setOpen(false)}/>
                </GlassDialog>
            }
        </Container>
    )
}
export default HomePage