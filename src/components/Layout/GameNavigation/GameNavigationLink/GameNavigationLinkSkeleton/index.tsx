'use client'
import React, {ReactElement} from "react";
import {IconButton, Skeleton} from "@mui/material";

const GameNavigationLinkSkeleton = (): ReactElement => {

    return (
        <IconButton disabled>
            <Skeleton variant="circular" animation="wave" width={25} height={25}/>
        </IconButton>
    )
}
export default GameNavigationLinkSkeleton