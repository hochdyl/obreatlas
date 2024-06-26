'use client'
import React, {ReactElement} from "react";
import {Paper, Skeleton, Stack} from "@mui/material";
import theme from "@/theme";

const GamesListSkeleton = (): ReactElement => {
    return (
        <Stack sx={{flex: 1, gap: theme.spacing(1)}}>
            {[...Array(5)].map((_, index) => (
                <Paper key={index} sx={{p: 2}}>
                    <Skeleton animation="wave" width={100}/>
                </Paper>
            ))}
        </Stack>
    )
}
export default GamesListSkeleton