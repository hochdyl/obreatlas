'use client'
import theme from "@/theme"
import React, {ReactElement} from "react"
import {Bounce, ToastContainer} from "react-toastify"
import {styled} from "@mui/system"
import glassStyleProps from "@/utils/glassStyleProps";

const StyledContainer = styled(ToastContainer)`
    .Toastify__toast {
        border: ${glassStyleProps.border};
        background-color: ${glassStyleProps.backgroundColor};
        backdrop-filter: ${glassStyleProps.backdropFilter};
    }

    .Toastify__toast-body {
        color: ${theme.palette.mode === "light" ? '#000' : '#fff'}
    }

    .Toastify__close-button {
        color: ${theme.palette.mode === "light" ? '#000' : '#fff'}
    }
`;

const Toast = (): ReactElement => {
    return (
        <StyledContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={true}
            transition={Bounce}
        />
    )
}

export default Toast