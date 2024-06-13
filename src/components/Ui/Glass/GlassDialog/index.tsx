'use client'
import React, {Children, isValidElement, PropsWithChildren, ReactElement} from "react";
import {Breakpoint, Dialog, Divider, IconButton, Paper, Stack, SxProps, Typography} from "@mui/material";
import {GlassPaper} from "@/components/ui/Glass";
import CloseIcon from "@mui/icons-material/Close";

type GlassDialogProps = {
    open: boolean
    onClose?: () => void
    closeBtn?: boolean
    sx?: SxProps
    maxWidth?: Breakpoint
    fullWidth?: boolean
}

export const GlassDialog = (props: PropsWithChildren<GlassDialogProps>): ReactElement => {
    const {
        children,
        open,
        onClose,
        closeBtn = true,
        sx,
        maxWidth = "md",
        fullWidth = false
    } = props

    const childrenArray = Children.toArray(children)

    const innerContent = childrenArray.find((child): child is ReactElement => {
        return isValidElement(child) && child.type === GlassDialogInnerContent
    })
    const outerContent = childrenArray.find((child): child is ReactElement => {
        return isValidElement(child) && child.type === GlassDialogOuterContent
    })

    const indexOfPaperContent = innerContent ? childrenArray.indexOf(innerContent) : -1
    const indexOfOuterContent = outerContent ? childrenArray.indexOf(outerContent) : -1
    const outerPosition = indexOfPaperContent > indexOfOuterContent ? "left" : "right"

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    flexFlow: "row nowrap",
                    border: "none",
                    overflowX: "hidden",
                    position: "relative",
                    ...sx
                }
            }}
            PaperComponent={GlassPaper}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
            {outerPosition === "left" && outerContent}
            {innerContent}
            {outerPosition === "right" && outerContent}
            {closeBtn &&
                <IconButton onClick={onClose} aria-label="close dialog" sx={{position: "absolute", top: 10, right: 10}}>
                    <CloseIcon/>
                </IconButton>
            }
        </Dialog>
    )
}

type GlassDialogHeaderProps = {
    sx?: SxProps
    divider?: boolean
}

export const GlassDialogHeader = (props: PropsWithChildren<GlassDialogHeaderProps>): ReactElement => {
    const {sx, divider = true, children} = props
    return (
        <>
            <Stack sx={{px: 4, py: 2, ...sx}}>
                {children}
            </Stack>
            {divider && <Divider/>}
        </>
    )
}

type GlassDialogContentProps = {
    sx?: SxProps
}

export const GlassDialogInnerContent = ({sx, children}: PropsWithChildren<GlassDialogContentProps>): ReactElement => {
    return (
        <Stack component={Paper} sx={{flex: 1, minWidth: 60, ...sx}}>
            {children}
        </Stack>
    )
}
export const GlassDialogOuterContent = ({sx, children}: PropsWithChildren<GlassDialogContentProps>): ReactElement => {
    return (
        <Stack sx={{minWidth: 60, ...sx}}>
            {children}
        </Stack>
    )
}