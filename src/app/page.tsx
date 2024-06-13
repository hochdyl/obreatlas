'use client'
import React, {ReactElement} from "react"
import {Container} from "@mui/material"
import LandingHeadline from "../components/layout/HomePage/LandingHeadline";
import GamesList from "@/components/layout/HomePage/GamesList";

const HomePage = (): ReactElement => {
    return (
        <Container maxWidth="lg" sx={{display: "flex", gap: 10, py: 3}}>
            <LandingHeadline/>
            <GamesList/>
        </Container>
    )
}
export default HomePage