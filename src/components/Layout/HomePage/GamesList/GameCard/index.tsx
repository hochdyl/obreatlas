'use client'
import React, {ReactElement, useState} from "react";
import {Button, Divider, Slide, Stack, SxProps, Typography} from "@mui/material";
import Link from "next/link";
import theme from "@/theme"

type GameCardProps = {
    game: Game
    divider?: boolean
    sx?: SxProps
}

const GameCard = ({game, divider = false, sx}: GameCardProps): ReactElement => {
    const [linkVisible, setLinkVisible] = useState<boolean>(false)
    const href = `/${game.slug}`

    return (
        <>
            <Stack
                onMouseEnter={() => setLinkVisible(true)}
                onMouseLeave={() => setLinkVisible(false)}
                sx={{
                    flexFlow: "row nowrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pl: 4,
                    pr: 2,
                    py: 1,
                    gap: 2,
                    transition: "background-color .1s ease-in-out;",
                    "&:hover": {
                        backgroundColor: theme.palette.background.paper,
                    },
                    ...sx
                }}
            >
                <Typography sx={{fontWeight: "bold"}}>{game.title}</Typography>
                <Slide in={linkVisible} direction="left">
                    <Link href={href}>
                        <Button>Access</Button>
                    </Link>
                </Slide>
            </Stack>
            {divider && <Divider/>}
        </>
    )
}
export default GameCard