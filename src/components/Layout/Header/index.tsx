'use client'
import React, {ReactElement} from "react"
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser"
import {AppBar, Container, Toolbar, Typography} from "@mui/material"
import Link from "next/link"
import {styled} from "@mui/system"
import theme from "@/theme"
import {usePathname} from "next/navigation"
import UserMenu from "@/components/layout/Header/UserMenu";
import AuthenticateButton from "@/components/layout/Header/AuthenticateButton";

const Offset = styled('div')(() => theme.mixins.toolbar)

const Header = (): ReactElement => {
    const {user, isLoading} = useAuthenticatedUser()
    const pathname = usePathname()

    return (
        <>
            <AppBar component="header" position="fixed">
                <Toolbar sx={{justifyContent: "space-between", gap: 5}}>
                    <Container maxWidth="xl" sx={{display: "flex", justifyContent: "space-between"}}>
                        {pathname !== '/' &&
                            <Link href={'/'}>
                                <Typography variant="standout" sx={{flex: 1, fontSize: 24}}>Atlas</Typography>
                            </Link>
                        }
                        {user ? <UserMenu user={user}/> : <AuthenticateButton/>}
                    </Container>
                </Toolbar>
            </AppBar>
            <Offset/>
        </>
    )
}
export default Header