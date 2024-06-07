import type {Metadata} from "next"
import "./globals.scss"
import React, {PropsWithChildren, ReactElement} from "react"
import {SwrProvider} from "@/providers/SwrProvider";
import Footer from "@/components/Footer";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme";
import {Bounce, ToastContainer} from "react-toastify";
import Header from "@/components/Header/Header";
import {Box} from "@mui/system";

export const metadata: Metadata = {
    title: "Atlas",
    description: "A new way to play RPG",
}

const RootLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <html lang="fr">
            <body>
            <AppRouterCacheProvider>
                <SwrProvider>
                    <Container maxWidth="xl" sx={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        minHeight: "100vh"
                    }}>
                        <Header/>
                        <Box maxWidth="xl" component="main" sx={{display: "flex", flex: 1}}>
                            {children}
                        </Box>
                        <Footer/>
                        <ToastContainer
                            position="bottom-left"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable={false}
                            pauseOnHover={false}
                            theme="light"
                            transition={Bounce}
                        />
                    </Container>
                </SwrProvider>
            </AppRouterCacheProvider>
            </body>
            </html>
        </ThemeProvider>
    );
}
export default RootLayout