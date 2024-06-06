import type {Metadata} from "next"
import "../styles/globals.scss"
import React, {PropsWithChildren, ReactElement} from "react"
import {SwrProvider} from "@/providers/SwrProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {Container, ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme";

export const metadata: Metadata = {
    title: "Atlas",
    description: "A new way to play RPG",
}

const RootLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    return (
        <ThemeProvider theme={theme}>
            <html lang="fr">
            <Container component="body" maxWidth="xl" sx={{display: "flex"}}>
                <AppRouterCacheProvider>
                    <SwrProvider>
                        <Header/>
                        <Container
                            component="main"
                            maxWidth={false}
                            sx={{flex: 1}}>
                            {children}
                        </Container>
                        <Footer/>
                    </SwrProvider>
                </AppRouterCacheProvider>
            </Container>
            </html>
        </ThemeProvider>

    );
}
export default RootLayout