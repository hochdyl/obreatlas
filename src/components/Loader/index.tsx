'use client'
import React, {ReactElement} from "react";
import {Container, Typography} from "@mui/material";
import Image from "next/image";
import loadingGif from "../../../public/images/loading.gif";

const Loader = (): ReactElement => {
    return (
        <Container sx={{
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 3
        }}>
            <Image priority src={loadingGif} alt="loading animation" width="200" height="200"/>
            <Typography variant="h3">Loading</Typography>
        </Container>

    )
}
export default Loader