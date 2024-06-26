'use client'
import React, {ReactElement, useRef, useState} from "react"
import {Button, Slide, Stack} from "@mui/material"
import {Box} from "@mui/system";
import {GlassCard} from "@/components/ui/Glass";
import {ClickAwayListener} from "@mui/base";
import RegisterForm from "@/components/forms/RegisterForm";
import LoginForm from "@/components/forms/LoginForm";
const AuthenticateButton = (): ReactElement => {
    const [open, setOpen] = useState<boolean>(false)
    const [loginTab, setRegisterTab] = useState<boolean>(true)
    const [containerVisible, setContainerVisible] = useState<boolean>(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const offsetHeight = buttonRef.current ? buttonRef.current.offsetHeight + 10 : 0

    const switchTab = () => setRegisterTab(prev => !prev)

    const handleClick = () => setOpen(!open)

    const handleClickAway = () => {
        if (open && containerVisible) {
            setOpen(false)
        }
    }

    return (
        <Box sx={{position: "relative", display: "flex", flex: 1, justifyContent: "flex-end"}}>
            <Button variant="contained" onClick={handleClick} ref={buttonRef}>
                Login
            </Button>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Slide
                    direction="left"
                    in={open}
                    onEntered={() => setContainerVisible(true)}
                    onExited={() => setContainerVisible(false)}
                >
                    <GlassCard sx={{
                        position: "absolute",
                        display: "flex",
                        top: offsetHeight,
                        width: 250,
                        pt: 2,
                        pb: 1,
                        px: 2
                    }}>
                        <Slide
                            mountOnEnter
                            unmountOnExit
                            direction="right"
                            in={loginTab}
                            style={{display: loginTab ? 'flex' : 'none'}}
                        >
                            <Stack sx={{flex: 1, alignItems: "center"}}>
                                <LoginForm/>
                                <Button variant="text" onClick={switchTab} sx={{fontSize: 10}}>
                                    Register an account
                                </Button>
                            </Stack>
                        </Slide>
                        <Slide
                            mountOnEnter
                            unmountOnExit
                            direction="left"
                            in={!loginTab}
                            style={{display: !loginTab ? 'flex' : 'none'}}
                        >
                            <Stack sx={{flex: 1, alignItems: "center"}}>
                                <RegisterForm/>
                                <Button variant="text" onClick={switchTab} sx={{fontSize: 10}}>
                                    I have an account
                                </Button>
                            </Stack>
                        </Slide>
                    </GlassCard>
                </Slide>
            </ClickAwayListener>
        </Box>
    )
}
export default AuthenticateButton