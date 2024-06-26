'use client'
import React, {ReactElement} from "react";
import {GlassPaper} from "@/components/ui/Glass";
import getImage from "@/utils/getImage";
import Image from "next/image";
import {Box, Divider, IconButton, Skeleton, Stack, Tooltip, Typography} from "@mui/material";
import {Dashboard, EmojiEvents, List, Numbers} from "@mui/icons-material";
import Link from "next/link";
import GameNavigationLinkSkeleton
    from "@/components/layout/GameNavigation/GameNavigationLink/GameNavigationLinkSkeleton";
import theme from "@/theme";

const ProtagonistCardSkeleton = (): ReactElement => {
    return (
        <Stack component={GlassPaper} sx={{position: "relative", overflow: "hidden"}}>
            <Stack sx={{px: 2, py: 1}}>
                <Stack direction="row" sx={{
                    gap: theme.spacing(2),
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography>
                        <Skeleton animation="wave" width={50}/>
                    </Typography>
                    <Typography variant="overline">
                        <Skeleton animation="wave" width={50}/>
                    </Typography>
                </Stack>
                <Stack direction="row" sx={{flexWrap: "wrap", pt: 1, pb: 0}}>
                    <GameNavigationLinkSkeleton/>
                    <GameNavigationLinkSkeleton/>
                    <GameNavigationLinkSkeleton/>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default ProtagonistCardSkeleton