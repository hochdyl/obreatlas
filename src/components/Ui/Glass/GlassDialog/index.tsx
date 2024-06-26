'use client'
import React, {Children, cloneElement, isValidElement, PropsWithChildren, ReactElement} from "react";
import {Breakpoint, Dialog, Divider, IconButton, Paper, Stack, SxProps} from "@mui/material";
import {GlassPaper} from "@/components/ui/Glass";
import CloseIcon from "@mui/icons-material/Close";
import {glassStyleProps} from "@/theme";

type GlassDialogProps = {
    open: boolean
    onClose?: () => void
    closeBtn?: boolean
    containerSx?: SxProps
    innerSx?: SxProps
    outerSx?: SxProps
    maxWidth?: Breakpoint
    fullWidth?: boolean
    keepMounted?: boolean
}

export const GlassDialog = (props: PropsWithChildren<GlassDialogProps>): ReactElement => {
    const {
        children,
        open,
        onClose,
        closeBtn = true,
        containerSx,
        innerSx,
        outerSx,
        maxWidth = "sm",
        fullWidth = true,
        keepMounted = false
    } = props

    const childrenArray = Children.toArray(children)

    const header = childrenArray.find((child): child is ReactElement => {
        return isValidElement(child) && child.type === GlassDialogHeader
    })

    let outerContent = childrenArray.find((child): child is ReactElement => {
        return isValidElement(child) && child.type === GlassDialogOuterContent
    })
    if (!outerContent) {
        outerContent = <GlassDialogOuterContent/>
    }
    outerContent = cloneElement(outerContent as ReactElement<GlassDialogOuterContentProps>, {sx: outerSx})

    const innerContent = childrenArray.filter(child => {
        return !(isValidElement(child) && (child === outerContent || child === header))
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
                    position: "relative",
                }
            }}
            keepMounted={keepMounted}
            PaperComponent={GlassPaper}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
            {outerPosition === "left" && outerContent}
            <Paper sx={{flex: 1, minWidth: 60, overflowY: "auto", borderRadius: 0, ...containerSx}}>
                {header}
                <Stack sx={{p: 4, ...innerSx}}>
                    {innerContent}
                </Stack>
            </Paper>
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
        <Paper variant="outlined" sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#00000020",
            border: "none",
            backdropFilter: glassStyleProps.backdropFilter,
            zIndex: (theme) => theme.zIndex.drawer + 1,
        }}>
            <Stack sx={{px: 4, py: 2, alignItems: "flex-start", ...sx}}>
                {children}
            </Stack>
            {divider && <Divider/>}
        </Paper>
    )
}

type GlassDialogOuterContentProps = {
    sx?: SxProps
}
export const GlassDialogOuterContent = (props: PropsWithChildren<GlassDialogOuterContentProps>): ReactElement => {
    const {sx, children} = props

    return (
        <Stack sx={{minWidth: 60, ...sx}}>
            {children}
        </Stack>
    )
}