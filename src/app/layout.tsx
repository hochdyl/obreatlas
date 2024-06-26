import type {Metadata} from "next"
import "./globals.scss"
import React, {PropsWithChildren, ReactElement} from "react"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter"
import theme from "@/theme"
import 'react-toastify/dist/ReactToastify.css';
import SwrProvider from "@/providers/SwrProvider";
import LocalizationProvider from "@/providers/LocalizationProvider";
import AppWrapper from "@/components/layout/AppWrapper";

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
                        <AppWrapper>
                            {children}
                        </AppWrapper>
                    </SwrProvider>
                </AppRouterCacheProvider>
                </body>
                </html>
            </LocalizationProvider>
        </ThemeProvider>
    )
}
export default RootLayout