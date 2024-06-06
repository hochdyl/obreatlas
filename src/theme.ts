'use client'
import {Inter} from 'next/font/google'
import {createTheme} from '@mui/material/styles'

const inter = Inter({subsets: ["latin"]})

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
    },
    palette: {
        primary: {
            light: '#F4E3B2',
            main: '#EFC88B',
            dark: '#CF5C36',
            contrastText: '#000',
        },
        secondary: {
            light: '#1c6563',
            main: '#183a37',
            dark: '#142928',
            contrastText: '#fff',
        },
        background: {
            default: '#142928',
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1024,
            xl: 1920,
        },
    },
})

export default theme