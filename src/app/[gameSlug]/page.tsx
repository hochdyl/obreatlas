'use client'
import React, {ReactElement, useState} from "react";
import useGame from "@/hooks/games/useGame";
import {Button, Skeleton, Stack, Typography} from "@mui/material";
import {GlassDialog, GlassDialogHeader} from "@/components/ui/Glass/GlassDialog";
import ProtagonistForm from "@/components/forms/ProtagonistForm";
import GameForm from "@/components/forms/GameForm";
import theme from "@/theme";

const GameLobbyPage = (): ReactElement => {
    const {isGameMaster, game, error, isLoading} = useGame()
    const [gameDialogOpen, setGameDialogOpen] = useState(false)
    const [protagonistDialogOpen, setProtagonistDialogOpen] = useState(false)

    if (error) throw new Error(error.message)

    return (
        <>
            <Stack direction="row" sx={{
                gap: theme.spacing(5),
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography variant="h2">
                    {game ? game.title : <Skeleton animation="wave" width={300}/>}
                </Typography>
                <Stack direction="row" sx={{gap: theme.spacing(1)}}>
                    {isGameMaster &&
                        <Button variant="contained" onClick={() => setGameDialogOpen(true)}>
                            Edit game
                        </Button>
                    }
                    {game ?
                        <Button variant="contained" onClick={() => setProtagonistDialogOpen(true)}>
                            Create a protagonist
                        </Button>
                        :
                        <Skeleton variant="rounded" animation="wave" height={40} width={150}/>
                    }
                </Stack>
            </Stack>


            <GlassDialog maxWidth="md" open={protagonistDialogOpen} onClose={() => setProtagonistDialogOpen(false)}>
                <GlassDialogHeader>
                    <Typography variant="h4">Create a protagonist</Typography>
                </GlassDialogHeader>
                <ProtagonistForm onSubmit={() => setProtagonistDialogOpen(false)}/>
            </GlassDialog>

            {isGameMaster &&
                <GlassDialog maxWidth="sm" open={gameDialogOpen} onClose={() => setGameDialogOpen(false)}>
                    <GlassDialogHeader>
                        <Typography variant="h4">Edit game</Typography>
                    </GlassDialogHeader>
                    <GameForm game={game} onSubmit={() => setGameDialogOpen(false)}/>
                </GlassDialog>
            }
        </>
    )
}
export default GameLobbyPage