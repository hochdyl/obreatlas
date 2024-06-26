'use client'
import React, {ReactElement} from "react";
import getImage from "@/utils/getImage";
import Image from "next/image";
import {Box} from "@mui/material";

type ProtagonistFadedPortraitProps = {
    portrait: Upload
    alt?: string
}

const ProtagonistFadedPortrait = (props: ProtagonistFadedPortraitProps): ReactElement => {
    const {
        portrait,
        alt = "protagonist portrait"
    } = props

    return (
        <Box sx={{
            position: "absolute",
            height: 1,
            width: "50%",
            right: 0,
            bottom: 0,
            zIndex: -1,
            maskImage: "linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .3) 100%)"
        }}>
            <Image
                alt={alt}
                src={getImage(portrait)}
                fill
                style={{objectFit: "cover"}}
                sizes="100%"
            />
        </Box>
    )
}
export default ProtagonistFadedPortrait