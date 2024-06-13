'use client'
import React, {ReactElement, useState} from "react";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import CreateGameForm from "@/features/games/CreateGameForm";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import useGames from "@/hooks/games/useGames";
import {
    GlassDialog,
    GlassDialogHeader,
    GlassDialogOuterContent,
    GlassDialogInnerContent
} from "@/components/ui/Glass/GlassDialog";

const GamesList = (): ReactElement => {
    const {user} = useAuthenticatedUser()
    const {games, isLoading, error} = useGames()
    const [open, setOpen] = useState(false)

    return (
        <Stack sx={{gap: 1, minWidth: 350}}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1}}>
                <Typography variant="h4">Game list</Typography>
                <Button onClick={() => setOpen(true)} disabled={!user}>New game</Button>
            </Box>
            <GlassDialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
                <GlassDialogInnerContent>
                    <GlassDialogHeader>
                        <Typography variant="h4">Create a game</Typography>
                    </GlassDialogHeader>
                    <CreateGameForm/>
                </GlassDialogInnerContent>
                <GlassDialogOuterContent/>
            </GlassDialog>
            <Paper sx={{flex: 1, overflowY: "auto"}}>
                <Typography marginY={30} textAlign="center">Test Test Test Test Test Test Test Test </Typography>
                <Typography marginY={30} textAlign="center">Test</Typography>
                <Typography marginY={30} textAlign="center">Test</Typography>
            </Paper>
        </Stack>
    )
}
export default GamesList