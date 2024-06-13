import type {Metadata} from "next"
import "./globals.scss"
import React, {PropsWithChildren, ReactElement} from "react"
import {Container, CssBaseline, ThemeProvider} from "@mui/material"
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter"
import theme from "@/theme"
import 'react-toastify/dist/ReactToastify.css';
import SwrProvider from "@/providers/SwrProvider";
import LocalizationProvider from "@/providers/LocalizationProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/ui/Toast";

export const metadata: Metadata = {
    title: "Atlas",
    description: "A new way to play RPG",
}

const RootLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <LocalizationProvider>
                <html lang="fr">
                <body>
                <AppRouterCacheProvider>
                    <SwrProvider>
                        <Header/>
                        <Container maxWidth="xl" component="main" sx={{
                            display: "flex",
                            overflow: "hidden",
                            height: "100%"
                        }}>
                            {children}
                        </Container>
                        <Footer/>
                        <Toast/>
                    </SwrProvider>
                </AppRouterCacheProvider>
                </body>
                </html>
            </LocalizationProvider>
        </ThemeProvider>
    )
}
export default RootLayout