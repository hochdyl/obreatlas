'use client'
import React, {ReactElement} from "react"
import {Backdrop, Button, CardActions, CardContent, Typography} from "@mui/material"
import {useSWRConfig} from "swr"
import {GlassCard} from "@/components/Glass"

type UpdaterProps = {
    show: boolean,
    newVersion: AppVersion
}

const UpdateCard = ({show, newVersion}: UpdaterProps): ReactElement => {
    const {mutate} = useSWRConfig()

    const handleUpdate = () => {
        mutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => location.reload())
    }

    return (
        <Backdrop open={show} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <GlassCard>
                <CardContent>
                    <Typography variant="h4">Update available</Typography>
                    <Typography sx={{mb: 2}}>Version {newVersion.number}</Typography>
                    <Typography>{newVersion.features}</Typography>
                    <Typography>{newVersion.bugfix}</Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "center"}}>
                    <Button onClick={handleUpdate} variant="contained">Update</Button>
                </CardActions>
            </GlassCard>
        </Backdrop>
    )
}
export default UpdateCard