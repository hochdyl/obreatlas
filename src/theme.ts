'use client'
import {Days_One, Red_Hat_Display} from 'next/font/google'
import {createTheme} from '@mui/material/styles'
import {CSSProperties} from "react";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        standout: CSSProperties;
    }

    interface TypographyVariantsOptions {
        standout?: CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        standout: true;
    }
}

const redHatDisplay = Red_Hat_Display({subsets: ["latin"]})
const daysOne = Days_One({weight: "400", subsets: ["latin"]})

export const glassStyleProps = {
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: `#fddf9720`,
    backdropFilter: "blur(10px)"
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#202020',
        },
        primary: {
            main: '#fddf97',
            contrastText: '#000',
        },
        secondary: {
            main: '#e09664',
            contrastText: '#000',
        },
        error: {
            main: '#C91D1D',
        },
        warning: {
            main: '#E8A530',
        },
        info: {
            main: '#30BCED',
        },
        success: {
            main: '#5EB234',
        },
        divider: '#FDDF9720',
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
            fontFamily: redHatDisplay.style.fontFamily,
            fontWeight: 800,
        },
        h5: {
            fontFamily: redHatDisplay.style.fontFamily,
            fontWeight: 600,
        },
        h6: {
            fontFamily: redHatDisplay.style.fontFamily,
            fontWeight: 400,
        },
        subtitle1: {
            fontFamily: redHatDisplay.style.fontFamily,
        },
        subtitle2: {
            fontFamily: redHatDisplay.style.fontFamily,
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
            letterSpacing: .5
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
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    border: glassStyleProps.border,
                    backgroundColor: glassStyleProps.backgroundColor,
                    backdropFilter: glassStyleProps.backdropFilter,
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "transparent",
                    boxShadow: "none"
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: theme => ({
                '&::-webkit-scrollbar': {
                    width: 4
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: theme.palette.background.paper,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.primary.main,
                    border: "none"
                }
            }),
        },
    },
})

export default theme