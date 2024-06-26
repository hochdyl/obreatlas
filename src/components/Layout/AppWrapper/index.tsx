'use client'
import React, {PropsWithChildren, ReactElement} from "react"
import {Container} from "@mui/material"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/ui/Toast";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import Loader from "@/components/common/Loader";

const AppContainer = ({children}: PropsWithChildren): ReactElement => {
    return (
        <Container maxWidth="xl" component="main" sx={{
            display: "flex",
            overflow: "hidden",
            height: 1
        }}>
            {children}
        </Container>
    )
}

const AppWrapper = ({children}: PropsWithChildren): ReactElement => {
    const {isLoading} = useAuthenticatedUser()

    return (
        isLoading ?
            <AppContainer>
                <Loader/>
            </AppContainer>
            :
            <>
                <Header/>
                <AppContainer>
                    {children}
                </AppContainer>
                <Footer/>
                <Toast/>
            </>
    )
}
export default AppWrapper