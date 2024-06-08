'use client'
import React, {ReactElement, useRef, useState} from "react"
import {Button, Slide} from "@mui/material"
import {Box} from "@mui/system"
import {GlassCard} from "@/components/Glass";
import AuthenticationTabs from "@/components/AuthenticationTabs";

const AuthenticationSlider = (): ReactElement => {
    const [open, setOpen] = useState<boolean>(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const offsetHeight = buttonRef.current ? buttonRef.current.offsetHeight + 10 : 0

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <Box sx={{position: "relative", display: "flex", flex: 1, justifyContent: "flex-end"}}>
            <Button variant="contained" onClick={handleClick} ref={buttonRef}>
                Login
            </Button>
            <Slide direction="left" in={open}>
                <GlassCard sx={{
                    position: "absolute",
                    display: "flex",
                    top: offsetHeight,
                    width: 250,
                    py: 2,
                    px: 4
                }}>
                    <AuthenticationTabs/>
                </GlassCard>
            </Slide>
        </Box>
    )
}
export default AuthenticationSlider