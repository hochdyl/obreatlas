'use client'
import React, {PropsWithChildren, ReactElement} from "react";
import {CardContent, Stack, Typography} from "@mui/material";
import {GlassCard} from "@/components/ui/Glass";

type AppFeatureCard = {
    title: string
}

const AppFeatureCard = ({title, children}: PropsWithChildren<AppFeatureCard>): ReactElement => {
    return (
        <GlassCard sx={{flex: 1}}>
            <Stack component={CardContent} sx={{gap: 2, justifyContent: "flex-start"}}>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{textAlign: "justify"}}>
                    {children}
                </Typography>
            </Stack>
        </GlassCard>
    )
}
export default AppFeatureCard