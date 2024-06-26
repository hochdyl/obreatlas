'use client'
import React, {PropsWithChildren, ReactElement} from "react"
import useGame from "@/hooks/games/useGame";
import GameNavigation from "@/components/layout/GameNavigation";
import {Stack} from "@mui/material";
import theme from "@/theme";

const GameLobbyLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const {error} = useGame()

    if (error) throw new Error(error.message)

    return (
        <>
            <GameNavigation/>
            <Stack sx={{flex: 1, gap: 1, px: theme.spacing(4)}}>
                {children}
            </Stack>
        </>

    );
}
export default GameLobbyLayout