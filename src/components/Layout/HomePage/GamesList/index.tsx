'use client'
import React, {ReactElement} from "react";
import {Paper, Stack, Typography} from "@mui/material";
import useGames from "@/hooks/games/useGames";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import GameCardSkeleton from "@/components/layout/HomePage/GamesList/GameCard/GameCardSkeleton";
import GameCard from "@/components/layout/HomePage/GamesList/GameCard";
import LoginForm from "@/features/authentication/LoginForm";

const GamesList = (): ReactElement => {
    const {user} = useAuthenticatedUser()
    const {games, isLoading} = useGames()

    return (
        <Stack component={Paper} sx={{flex: 1, overflowX: "hidden", overflowY: "auto"}}>
            {!user ? <LoginForm sx={{p: 4}}/> :
                !games ?
                    [...Array(3)].map((_, index) => (
                        <GameCardSkeleton key={index} divider={index !== 3 - 1}/>
                    ))
                    :
                    games.length ?
                        games.map((game, index) => (
                            <GameCard key={game.id} game={game} divider={index !== games.length - 1}/>
                        ))
                        :
                        <Typography variant="h5" sx={{p: 4, textAlign: "center"}}>No games found</Typography>
            }
        </Stack>
    )
}
export default GamesList