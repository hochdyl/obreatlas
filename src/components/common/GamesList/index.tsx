'use client'
import React, {ReactElement} from "react";
import {Paper, Stack, Typography} from "@mui/material";
import useGames from "@/hooks/games/useGames";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import GameCard from "@/components/common/GamesList/GameCard";
import GamesListSkeleton from "@/components/common/GamesList/GamesListSkeleton";
import theme from "@/theme";

const GamesList = (): ReactElement => {
    const {user, isLoading: isUserLoading} = useAuthenticatedUser()
    const {games, isLoading: isGamesLoading} = useGames(!!user)

    if (isUserLoading || isGamesLoading) return <GamesListSkeleton/>

    return (
        <Stack sx={{flex: 1, gap: theme.spacing(1), overflowX: "hidden", overflowY: "auto"}}>
            {user && games ?
                games.length ?
                    games.map(game => <GameCard key={game.id} game={game}/>)
                    :
                    <Paper sx={{p: 2, textAlign: "center"}}>
                        <Typography>No games found</Typography>
                    </Paper>
                :
                <Paper sx={{p: 2}}>
                    <Typography sx={{textAlign: "center"}}>
                        Login to see games
                    </Typography>
                </Paper>
            }
        </Stack>
    )
}

export default GamesList