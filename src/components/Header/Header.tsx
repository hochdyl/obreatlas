'use client'
import React, {ReactElement} from "react";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import {styled} from "@mui/system";
import theme from "@/theme";
import AuthenticationLinks from "@/components/Header/AuthenticationLinks";
import UserMenu from "@/components/Header/UserMenu";
import {usePathname} from "next/navigation";

const Offset = styled('div')(() => theme.mixins.toolbar);

const Header = (): ReactElement => {
    const {user, isLoading} = useAuthenticatedUser()
    const pathname = usePathname()

    if (isLoading) return <></>

    return (
        <>
            <AppBar component="header" position="fixed" sx={{
                background: "transparent",
                boxShadow: 0,
            }}>
                <Toolbar sx={{justifyContent: "space-between", gap: 5}}>
                    <Container maxWidth="xl" sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        {pathname !== '/' &&
                            <Link href={'/'}>
                                <Typography sx={{flex: 1, fontSize: 24}}>Atlas</Typography>
                            </Link>
                        }
                        {user ? <UserMenu user={user}/> : <AuthenticationLinks/>}
                    </Container>
                </Toolbar>
            </AppBar>
            <Offset/>
        </>
    )
}
export default Header