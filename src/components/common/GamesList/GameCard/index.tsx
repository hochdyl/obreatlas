'use client'
import React, {ReactElement} from "react";
import {Button, Paper, Stack, SxProps, Typography} from "@mui/material";
import Link from "next/link";
import theme from "@/theme";

type GameCardProps = {
    game: Game
    sx?: SxProps
}

const GameCard = ({game, sx}: GameCardProps): ReactElement => {
    const href = `/${game.slug}`

    return (
        <Stack direction="row" component={Paper} sx={{
                justifyContent: "space-between",
                alignItems: "center",
                pl: 2,
                pr: 1,
                py: 1,
                gap: theme.spacing(2),
                ...sx
        }}>
            <Typography>{game.title}</Typography>
            <Link href={href}>
                <Button variant="outlined">Enter</Button>
            </Link>
        </Stack>
    )
}
export default GameCard