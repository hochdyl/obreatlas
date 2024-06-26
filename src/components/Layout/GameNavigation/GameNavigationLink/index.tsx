'use client'
import React, {ReactElement} from "react";
import {IconButton, Tooltip} from "@mui/material";
import Link from "next/link";

type GameNavigationLinkProps = {
    href?: string
    title?: string
    icon: ReactElement
}

const GameNavigationLink = (props: GameNavigationLinkProps): ReactElement => {
    const {href, title, icon} = props

    return (href && title ?
        <Link href={href}>
            <Tooltip title={title} arrow>
                <IconButton aria-label={title}>
                    {icon}
                </IconButton>
            </Tooltip>
        </Link>
        :
        <IconButton disabled aria-label={title}>
            {icon}
        </IconButton>
    )
}
export default GameNavigationLink