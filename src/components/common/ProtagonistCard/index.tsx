'use client'
import React, {ReactElement} from "react";
import {GlassPaper} from "@/components/ui/Glass";
import getImage from "@/utils/getImage";
import Image from "next/image";
import {Box, Button, IconButton, Stack, Typography} from "@mui/material";
import {EmojiEvents, List} from "@mui/icons-material";
import ProtagonistFadedPortrait from "@/components/common/ProtagonistFadedPortrait";
import theme from "@/theme";

type ProtagonistCardProps = {
    protagonist: Protagonist
    displayData?: boolean
    onClick?: () => void
    actionTitle?: string
}

const ProtagonistCard = (props: ProtagonistCardProps): ReactElement => {
    const {
        protagonist,
        displayData = true,
        onClick = () => null,
        actionTitle = "Choose"
    } = props

    return (
        <Stack component={GlassPaper} sx={{position: "relative", overflow: "hidden"}}>
            {protagonist.portrait &&
                <ProtagonistFadedPortrait portrait={protagonist.portrait}/>
            }
            <Stack sx={{pl: 2, pr: 1, py: 1}}>
                <Stack direction="row" sx={{
                    gap: theme.spacing(2),
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography>{protagonist.name}</Typography>
                    <Button size="small" variant="outlined" onClick={onClick}>{actionTitle}</Button>
                </Stack>
                {displayData &&
                    <>
                        <Typography variant="overline">
                            Level: {protagonist.level}
                        </Typography>

                        <Stack direction="row" sx={{flexWrap: "wrap"}}>
                            <IconButton disabled aria-label="Achievements">
                                <EmojiEvents/>
                            </IconButton>
                            <IconButton disabled aria-label="Logs">
                                <List/>
                            </IconButton>
                        </Stack>
                    </>
                }
            </Stack>
        </Stack>
    )
}
export default ProtagonistCard