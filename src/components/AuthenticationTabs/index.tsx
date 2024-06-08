'use client'
import React, {ReactElement} from "react"
import {Box} from "@mui/system"
import {Button, Slide} from "@mui/material";
import RegisterForm from "@/features/authentication/RegisterForm";
import LoginForm from "@/features/authentication/LoginForm";

const AuthenticationTabs = (): ReactElement => {
    const [loginTab, setRegisterTab] = React.useState<boolean>(true)

    const switchTab = () => setRegisterTab((prev) => !prev)

    return (
        <>
            <Slide
                mountOnEnter
                unmountOnExit
                direction="right"
                in={loginTab}
                style={{display: loginTab ? 'flex' : 'none'}}
            >
                <Box sx={{display: "flex", flexFlow: "column nowrap", width: 1}}>
                    <LoginForm/>
                    <Button variant="text" onClick={switchTab} sx={{fontSize: 10}}>
                        Register an account
                    </Button>
                </Box>
            </Slide>
            <Slide
                mountOnEnter
                unmountOnExit
                direction="left"
                in={!loginTab}
                style={{display: !loginTab ? 'flex' : 'none'}}
            >
                <Box sx={{display: "flex", flexFlow: "column nowrap", width: 1}}>
                    <RegisterForm/>
                    <Button variant="text" onClick={switchTab} sx={{fontSize: 10}}>
                        I have an account
                    </Button>
                </Box>
            </Slide>
        </>
    )
}
export default AuthenticationTabs