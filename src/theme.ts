'use client'
import {Archivo, Red_Hat_Display, Days_One} from 'next/font/google'
import {createTheme} from '@mui/material/styles'
import React from "react";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        standout: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        standout?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        standout: true;
    }
}

const archivo = Archivo({subsets: ["latin"]})
const redHatDisplay = Red_Hat_Display({subsets: ["latin"]})
const daysOne = Days_One({weight: "400", subsets: ["latin"]})

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFF8F0',
        },
        secondary: {
            main: '#00A6ED',
        },
        error: {
            main: '#ff3737',
        },
        warning: {
            main: '#ffba37',
        },
        info: {
            main: '#37a5ff',
        },
        success: {
            main: '#37ff9f',
        },
        divider: '#FFF8F0',
    },
    typography: {
        fontFamily: redHatDisplay.style.fontFamily,
        fontWeightMedium: 600,
        h1: {
            fontFamily: daysOne.style.fontFamily,
        },
        h2: {
            fontFamily: daysOne.style.fontFamily,
        },
        h3: {
            fontFamily: daysOne.style.fontFamily,
        },
        h4: {
            fontFamily: daysOne.style.fontFamily,
        },
        h5: {
            fontFamily: daysOne.style.fontFamily,
        },
        h6: {
            fontFamily: daysOne.style.fontFamily,
            fontWeight: 400,
        },
        subtitle1: {
            fontFamily: redHatDisplay.style.fontFamily,
        },
        subtitle2: {
            fontFamily: archivo.style.fontFamily,
            fontWeight: 600,
        },
        body1: {
            fontFamily: redHatDisplay.style.fontFamily,
        },
        body2: {
            fontFamily: redHatDisplay.style.fontFamily,
        },
        button: {
            fontFamily: redHatDisplay.style.fontFamily,
        },
        caption: {
            fontFamily: redHatDisplay.style.fontFamily,
        },
        standout: {
            fontFamily: daysOne.style.fontFamily,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 720,
            lg: 1280,
            xl: 1920,
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    standout: 'span',
                },
            },
        }
    },
})

export default theme