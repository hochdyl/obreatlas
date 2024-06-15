'use client'
import React, {ReactElement} from "react";
import {Divider, Skeleton, Stack, SxProps} from "@mui/material";
import LoginForm from "@/features/authentication/LoginForm";
import theme from "@/theme";

type GameCardSkeletonProps = {
    divider?: boolean
}

const GameCardSkeleton = ({divider = false}: GameCardSkeletonProps): ReactElement => {
    return (
        <>
            <Stack sx={{
                flexFlow: "row nowrap",
                justifyContent: "space-between",
                alignItems: "center",
                pl: 4,
                pr: 2,
                py: 1,
                gap: 2,
            }}>
                <Skeleton variant="rounded" sx={{width: 100, my: 1}}/>
            </Stack>
            {divider && <Divider/>}
        </>

    )
}
export default GameCardSkeleton