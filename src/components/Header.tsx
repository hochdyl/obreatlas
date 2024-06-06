'use client'
import React, {ReactElement} from "react";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import {styled} from "@mui/system";

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

const Header = (): ReactElement => {
    const {user, logout} = useAuthenticatedUser()

    return (
        <>
            <AppBar
                component="header"
                position="fixed"
                sx={{
                    background: "transparent",
                    boxShadow: 0,
                    userSelect: "none"
                }}>
                <Toolbar>
                    <Container
                        maxWidth="xl"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                        <Typography sx={{flex: 1}}>Atlas</Typography>
                        {user ?
                            <>
                                <Typography>{user.username}</Typography>
                                <Button
                                    onClick={logout}
                                    variant="outlined"
                                    color="secondary"
                                    size="small">
                                    Logout
                                </Button>
                            </>
                            :
                            <>
                                <Link href={'/login'}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small">
                                        Login
                                    </Button>
                                </Link>
                                <Link href={'/register'}>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        size="small">
                                        Register
                                    </Button>
                                </Link>
                            </>
                        }
                    </Container>
                </Toolbar>
            </AppBar>
            <Offset/>
        </>
    )
}
export default Header